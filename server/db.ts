import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { InsertWaitlistSignup, waitlistSignups } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertWaitlistSignup(signup: InsertWaitlistSignup) {
  const db = await getDb();
  if (!db) {
    throw new Error("La base de datos no está disponible en este momento.");
  }

  const existing = await db
    .select({ id: waitlistSignups.id })
    .from(waitlistSignups)
    .where(eq(waitlistSignups.email, signup.email))
    .limit(1);

  await db.insert(waitlistSignups).values(signup).onDuplicateKeyUpdate({
    set: {
      fullName: signup.fullName,
      whatsapp: signup.whatsapp,
    },
  });

  const [savedSignup] = await db
    .select()
    .from(waitlistSignups)
    .where(eq(waitlistSignups.email, signup.email))
    .limit(1);

  if (!savedSignup) {
    throw new Error("No fue posible recuperar el registro guardado.");
  }

  return { isNew: existing.length === 0, signup: savedSignup };
}

export async function markWaitlistSignupSentToMake(signupId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("La base de datos no está disponible en este momento.");
  }

  await db
    .update(waitlistSignups)
    .set({ makeWebhookSentAt: new Date() })
    .where(eq(waitlistSignups.id, signupId));
}
