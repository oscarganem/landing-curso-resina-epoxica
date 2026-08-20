/**
 * Diseño: Taller de Alto Contraste. Una landing editorial carbón/amarillo con
 * composición asimétrica, gran jerarquía tipográfica y fotografía reservada.
 */
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  GraduationCap,
  HardHat,
  Home as House,
  MapPin,
  MoveUpRight,
  Palette,
  Ruler,
  ShieldCheck,
  Users,
} from "lucide-react";

const benefits = [
  "Aprende a crear acabados marmoleados, metálicos, unicolor y 3D.",
  "Crea pisos con hojuelas y granito antiderrapante.",
  "Obtén acceso GRATIS a nuestra clase online previa al curso.",
  "Accede a un PRECIO EXCLUSIVO de preventa.",
];

const audienceReasons = [
  {
    icon: BriefcaseBusiness,
    text: "Quieres convertirte en aplicador de resina epóxica e iniciar un negocio en tu ciudad que te genere ingresos extra al principio y pueda convertirse en tu fuente principal a mediano plazo.",
  },
  {
    icon: House,
    text: "Te gustaría renovar los pisos, barras o mesas de tu casa con acabados de lujo y ahorrarte miles de pesos en mano de obra.",
  },
  {
    icon: Palette,
    text: "Te encanta hacer manualidades y quieres aprender a crear decoraciones para vender, regalar o disfrutar como hobby...",
  },
  {
    icon: HardHat,
    text: "Te dedicas a la construcción o remodelación y quieres capacitarte o capacitar a tu equipo para sumar un servicio de alto valor a tu negocio.",
  },
];

const audienceGroups = [
  { icon: House, label: "Amas de casa" },
  { icon: Users, label: "Padres de familia" },
  { icon: GraduationCap, label: "Estudiantes" },
  { icon: Ruler, label: "Arquitectos" },
  { icon: HardHat, label: "Albañiles" },
];

const techniques = [
  {
    title: "Pisos marmoleados, metálicos y unicolor",
    image: "/manus-storage/piso-metalico_e19ee2d1.webp",
    position: "center center",
  },
  {
    title: "Pisos con hojuela y granito antiderrapante",
    image: "/manus-storage/piso-antiderrapante_d347b0f3.webp",
    position: "center center",
  },
  {
    title: "Pisos 3D",
    image: "/manus-storage/piso-3d_69280b5d.webp",
    position: "center 52%",
  },
  {
    title: "Mesas tipo río y decoraciones",
    image: "/manus-storage/mesa-rio_c4ac227a.webp",
    position: "center 48%",
  },
];

export default function Home() {
  return (
    <main className="landing-shell">
      <header className="site-header" aria-label="Encabezado del curso">
        <a className="brand-lockup" href="#inicio" aria-label="Curso de resina epoxica">
          <img
            className="brand-mark"
            src="/manus-storage/resina-pro-logo_ee0235df.png"
            width="42"
            height="42"
            alt=""
          />
          <span>RESINA <b>PRO</b></span>
        </a>
      </header>

      <section className="hero" id="inicio" aria-labelledby="course-title">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> Curso presencial
          </div>

          <h1 id="course-title">
            Aprende a aplicar <span>resina epóxica</span> en pisos, barras y mesas de río
          </h1>

          <p className="event-line">
            <MapPin aria-hidden="true" /> Playa del Carmen <b>|</b>
            <CalendarDays aria-hidden="true" /> 18 de Septiembre
          </p>

          <p className="course-lede">
            La formación <strong>#1</strong> para aplicadores de resina epóxica en México.
          </p>

          <ul className="benefit-list">
            {benefits.map((benefit) => (
              <li key={benefit}>
                <Check aria-hidden="true" strokeWidth={3.2} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <a className="waitlist-cta" href="#lista-de-espera">
            Únete GRATIS a la lista de espera <MoveUpRight aria-hidden="true" />
          </a>

          <div className="course-footer" id="lista-de-espera">
            <span className="footer-rule" />
            <p><b>+1,000</b> alumnos ya aprendieron con nosotros</p>
          </div>
        </div>

        <aside className="visual-column" aria-label="Espacio reservado para fotografía del curso">
          <div className="photo-frame">
            <div className="frame-corner frame-corner-top" aria-hidden="true" />
            <div className="frame-corner frame-corner-bottom" aria-hidden="true" />
            <div className="photo-placeholder">
              <div className="placeholder-grid" aria-hidden="true" />
              <p>Espacio reservado<br /><span>para fotografía del curso</span></p>
              <span className="placeholder-index" aria-hidden="true">01</span>
            </div>
            <span className="photo-note">IMAGEN PRINCIPAL</span>
          </div>
        </aside>
      </section>

      <section className="audience-section" aria-labelledby="audience-title">
        <div className="audience-layout">
          <div className="audience-intro">
            <div className="light-eyebrow">¿Para quién es este curso?</div>
            <h2 id="audience-title">El curso<br />intensivo es<br />para ti si<span>…</span></h2>
            <div className="experience-note">
              <span className="experience-icon" aria-hidden="true"><ShieldCheck strokeWidth={2.4} /></span>
              <div className="experience-copy">
                <strong>NO NECESITAS<br />EXPERIENCIA PREVIA</strong>
                <p>Te enseñaremos desde cero,<br />paso a paso.</p>
              </div>
            </div>
          </div>

          <div className="audience-content">
            <ul className="audience-list">
              {audienceReasons.map(({ icon: Icon, text }, index) => (
                <li key={text}>
                  <span className="audience-icon" aria-hidden="true"><Icon strokeWidth={2.1} /></span>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="audience-groups" aria-label="Perfiles para quienes está dirigido el curso">
            <p>No importa a qué te dediques:</p>
            <div>
              {audienceGroups.map(({ icon: Icon, label }) => (
                <span key={label}><Icon aria-hidden="true" />{label}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="learning-section" aria-labelledby="learning-title">
        <div className="learning-inner">
          <div className="learning-heading">
            <div className="section-eyebrow"><span /> Lo que aprenderás</div>
            <h2 id="learning-title">Domina las principales técnicas de aplicación de <span>resina epóxica</span> en una sola clase práctica</h2>
            <p>Aprende los fundamentos para crear pisos marmoleados, acabados metálicos, sistemas antiderrapantes, pisos 3D y aplicaciones decorativas.</p>
          </div>

          <div className="technique-grid">
            {techniques.map(({ title, image, position }) => (
              <article className="technique-card" key={title}>
                <img src={image} alt={title} loading="lazy" style={{ objectPosition: position }} />
                <div className="technique-shade" aria-hidden="true" />
                <div className="technique-status"><Check aria-hidden="true" strokeWidth={3} /> Incluido en el taller presencial</div>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
