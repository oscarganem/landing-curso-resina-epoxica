import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();
const indexHtml = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
const thankYouSource = readFileSync(resolve(projectRoot, "client/src/pages/ThankYou.tsx"), "utf8");

describe("Configuración de Meta Pixel", () => {
  it("instala una sola vez el snippet oficial con el Pixel correcto y PageView global", () => {
    expect(indexHtml).toContain("if(f.fbq)return;");
    expect(indexHtml).toContain("fbq('init', '1064040862296356');");
    expect(indexHtml).toContain("fbq('track', 'PageView');");
    expect(indexHtml.match(/fbevents\.js/g)).toHaveLength(1);
    expect(indexHtml.indexOf("fbq('track', 'PageView');")).toBeLessThan(indexHtml.indexOf('/src/main.tsx'));
  });

  it("ejecuta Lead directamente al montar ThankYou sin depender del formulario", () => {
    expect(thankYouSource).toContain("useEffect(() => {");
    expect(thankYouSource).toContain('window.fbq("track", "Lead");');
    expect(thankYouSource).not.toContain("sessionStorage");
    expect(thankYouSource).not.toContain("isMetaPixelReady");
  });
});
