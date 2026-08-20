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
            <h2 id="audience-title">El curso intensivo es para ti si<span>…</span></h2>
            <div className="experience-note">
              <span>01</span>
              <p><strong>NO NECESITAS EXPERIENCIA PREVIA,</strong> te enseñaremos desde cero paso a paso.</p>
            </div>
          </div>

          <div className="audience-content">
            <ul className="audience-list">
              {audienceReasons.map(({ icon: Icon, text }, index) => (
                <li key={text}>
                  <span className="audience-icon" aria-hidden="true"><Icon strokeWidth={2.1} /></span>
                  <div>
                    <span className="audience-number">0{index + 1}</span>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="audience-groups" aria-label="Perfiles para quienes está dirigido el curso">
              <p>Una formación práctica para</p>
              <div>
                {audienceGroups.map(({ icon: Icon, label }) => (
                  <span key={label}><Icon aria-hidden="true" />{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
