/**
 * Diseño: Taller de Alto Contraste. Landing editorial carbón/amarillo con
 * módulos de formación, práctica y comunidad de alumnos.
 */
import { lazy, Suspense, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  BadgeCheck,
  BookOpen,
  Building2,
  BriefcaseBusiness,
  Calculator,
  CalendarDays,
  Check,
  Clock3,
  FlaskConical,
  Gem,
  GraduationCap,
  HardHat,
  Headphones,
  House,
  Info,
  MapPin,
  MonitorPlay,
  MoveUpRight,
  Palette,
  Paintbrush,
  Presentation,
  Ruler,
  ShieldCheck,
  Table2,
  Users,
  Wrench,
} from "lucide-react";

const CancunFaqList = lazy(() => import("./CancunFaqList"));
const whatsAppNumber = "5219617848718";
const getWhatsAppHref = (message: string) => `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
const presaleWhatsAppMessage = "Hola, quiero información sobre la preventa de $1,999 para el Curso de Resina Epóxica en Cancún.";
const regularWhatsAppMessage = "Hola, quiero registrarme con la opción de pago al llegar de $2,499 para el Curso de Resina Epóxica en Cancún.";
const teamWhatsAppMessage = "Hola, quiero información sobre los paquetes para parejas y equipos del Curso de Resina Epóxica en Cancún.";

const benefits = [
  "Incluye materiales y herramientas para todas las prácticas.",
  "Manual del Aplicador PRO + Calculadora Epóxica para calcular tus materiales paso a paso.",
  "Soporte de por vida para resolver dudas en tus futuros proyectos.",
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
  { icon: Building2, label: "Ingenieros civiles" },
];

const techniques = [
  { title: "Pisos marmoleados, metálicos y unicolor", image: "/assets/piso-metalico_e19ee2d1.webp", position: "center center" },
  { title: "Pisos con hojuela y granito antiderrapante", image: "/assets/piso-antiderrapante_d347b0f3.webp", position: "center center" },
  { title: "Pisos 3D", image: "/assets/piso-3d_69280b5d.webp", position: "center 52%" },
  { title: "Mesas tipo río y decoraciones", image: "/assets/mesa-rio_c4ac227a.webp", position: "center 48%" },
];

const studentGallery = [
  { image: "/assets/alumno-practica-roja_99be4dca.webp", alt: "Alumno aplicando resina roja durante el taller" },
  { image: "/assets/alumno-practica-azul_ac182caa.webp", alt: "Alumno aplicando resina azul durante el taller" },
  { image: "/assets/alumno-practica-negra_f6afd7d8.webp", alt: "Alumno aplicando resina negra durante el taller" },
  { image: "/assets/alumno-practica-azul-detalle_9d4f3565.webp", alt: "Alumno creando un acabado decorativo con resina" },
  { image: "/assets/alumno-practica-mezcla_5961ed1f.webp", alt: "Alumnos preparando mezclas de resina durante la práctica" },
  { image: "/assets/alumno-practica-granito_1e42691c.webp", alt: "Alumno aplicando sistema de granito antiderrapante" },
];

const courseModules = [
  { number: "1", icon: FlaskConical, title: "Fundamentos de la resina", text: "Conceptos básicos, materiales y proporciones" },
  { number: "2", icon: Paintbrush, title: "Preparación de superficies", text: "Cómo evitar desprendimientos, burbujas y fallas" },
  { number: "3", icon: Gem, title: "Acabados profesionales", text: "Marmoleados, metálicos, sólidos, 3D y antiderrapantes" },
  { number: "4", icon: Table2, title: "Aplicaciones decorativas", text: "Mesas tipo río, encapsulados y proyectos comerciales" },
];

const includedResources = [
  { icon: Presentation, title: "Curso intensivo presencial", text: "Práctica guiada durante el curso" },
  { icon: Wrench, title: "Materiales y herramientas para prácticas", text: "Todo lo necesario para aprender en clase" },
  { icon: BookOpen, title: "Manual del aplicador PRO", text: "Guía de apoyo con procesos y conceptos clave" },
  { icon: Calculator, title: "Calculadora de materiales", text: "Para estimar resina, pigmentos y cantidades" },
  { icon: BadgeCheck, title: "Certificado de participación", text: "Reconoce tu participación en el curso" },
  { icon: Headphones, title: "Soporte de por vida", text: "Resuelve dudas sobre tus primeras aplicaciones" },
];

export default function CancunLanding() {
  const [shouldLoadFaq, setShouldLoadFaq] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const faqSectionRef = useRef<HTMLElement>(null);
  const isRedirectingRef = useRef(false);
  const redirectTimerRef = useRef<number | null>(null);
  const safetyTimerRef = useRef<number | null>(null);

  const clearRedirectTimers = () => {
    if (redirectTimerRef.current !== null) {
      window.clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
    if (safetyTimerRef.current !== null) {
      window.clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  };

  const resetRedirectState = () => {
    clearRedirectTimers();
    isRedirectingRef.current = false;
    setIsRedirecting(false);
  };

  const handleWhatsAppClick = (event: MouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault();
    if (isRedirectingRef.current) return;

    isRedirectingRef.current = true;
    setIsRedirecting(true);

    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }

    redirectTimerRef.current = window.setTimeout(() => {
      redirectTimerRef.current = null;
      try {
        window.location.href = url;
      } catch {
        resetRedirectState();
      }
    }, 1500);

    safetyTimerRef.current = window.setTimeout(() => {
      resetRedirectState();
    }, 5000);
  };

  useEffect(() => {
    const target = faqSectionRef.current;
    if (!target || typeof IntersectionObserver === "undefined") {
      setShouldLoadFaq(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoadFaq(true);
      observer.disconnect();
    }, { rootMargin: "900px 0px" });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    clearRedirectTimers();
  }, []);

  useEffect(() => {
    if (!isRedirecting) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isRedirecting]);

  return (
    <main className="landing-shell">
      <header className="site-header" aria-label="Encabezado del curso">
        <a className="brand-lockup" href="#inicio" aria-label="Ocares Academy">
          <img className="brand-mark" src="/assets/ocares-academy-logo-mobile_a3dbed22.webp" width="217" height="72" alt="Ocares Academy" />
        </a>
      </header>

      <section className="hero" id="inicio" aria-labelledby="course-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> Curso presencial</div>
          <h1 id="course-title">
            <span className="hero-title-line">Aprende a aplicar</span>
            <span className="hero-title-line hero-title-yellow">resina epóxica</span>
            <span className="hero-title-line">en pisos, barras y</span>
            <span className="hero-title-line">mesas de río</span>
          </h1>
          <span className="hero-title-rule" aria-hidden="true" />
          <div className="merida-event-details" aria-label="Detalles del curso presencial en Cancún">
            <span><MapPin aria-hidden="true" /> Cancún, Quintana Roo</span>
            <span><CalendarDays aria-hidden="true" /> 19 de septiembre</span>
          </div>
          <p className="course-lede">Aprenderás crear acabados: flake, granito antiderrapante, marmoleados, metálicos y 3D.</p>
          <ul className="benefit-list">
            {benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" strokeWidth={3.2} /><span>{benefit}</span></li>)}
          </ul>
          <div className="hero-cta-group" aria-label="Acciones del curso">
            <a className="waitlist-cta" href="#precios">QUIERO INSCRIBIRME <MoveUpRight aria-hidden="true" /></a>
            <a className="hero-info-cta" href="#informacion">VER TODA LA INFORMACIÓN <MoveUpRight aria-hidden="true" /></a>
          </div>
          <div className="course-footer" id="paquetes">
            <span className="course-rating" role="img" aria-label="Cinco estrellas">★★★★★</span>
            <p>+1,000 alumnos ya aprendieron con nosotros</p>
          </div>
        </div>
        <aside className="visual-column" aria-label="Fotografía de una aplicación práctica de resina durante el curso">
          <div className="photo-frame">
            <div className="frame-corner frame-corner-top" aria-hidden="true" />
            <div className="frame-corner frame-corner-bottom" aria-hidden="true" />
            <div className="photo-placeholder photo-placeholder-filled">
              <img className="hero-course-photo" src="/assets/hero-mesa-azul-aprobada_5a76eb7d.webp" width="1080" height="1350" alt="Aplicador extendiendo resina azul sobre una mesa durante una práctica de curso" fetchPriority="high" decoding="async" />
            </div>
            <span className="photo-note">IMAGEN PRINCIPAL</span>
          </div>
        </aside>
      </section>

      <section className="audience-section" id="informacion" aria-labelledby="audience-title">
        <div className="audience-layout">
          <div className="audience-intro">
            <div className="light-eyebrow">¿Para quién es este curso?</div>
            <h2 id="audience-title" aria-label="El curso intensivo es para ti si…">
              <span className="audience-title-desktop" aria-hidden="true">El curso<br />intensivo es<br />para ti si<span className="audience-title-accent">…</span></span>
              <span className="audience-title-mobile" aria-hidden="true">El curso intensivo es para ti si<span className="audience-title-accent">…</span></span>
            </h2>
            <div className="experience-note"><span className="experience-icon" aria-hidden="true"><ShieldCheck strokeWidth={2.4} /></span><div className="experience-copy"><strong>NO NECESITAS<br />EXPERIENCIA PREVIA</strong><p>Te enseñaremos desde cero,<br />paso a paso.</p></div></div>
          </div>
          <div className="audience-content"><ul className="audience-list">
            {audienceReasons.map(({ icon: Icon, text }) => <li key={text}><span className="audience-icon" aria-hidden="true"><Icon strokeWidth={2.1} /></span><p>{text}</p></li>)}
          </ul></div>
          <div className="audience-groups" aria-label="Perfiles para quienes está dirigido el curso"><p>No importa a qué te dediques:</p><div>{audienceGroups.map(({ icon: Icon, label }) => <span key={label}><Icon aria-hidden="true" />{label}</span>)}</div></div>
        </div>
      </section>

      <section className="learning-section" aria-labelledby="learning-title">
        <div className="learning-inner">
          <div className="learning-heading"><h2 id="learning-title">Domina las principales técnicas de aplicación de <span>resina epóxica</span> en una sola clase práctica</h2><span className="dark-title-rule" aria-hidden="true" /></div>
          <div className="technique-grid">
            {techniques.map(({ title, image, position }) => <article className="technique-card" key={title}><img src={image} alt={title} loading="lazy" style={{ objectPosition: position }} /><div className="technique-shade" aria-hidden="true" /><div className="technique-status"><Check aria-hidden="true" strokeWidth={3} /> Incluido en el taller presencial</div><h3>{title}</h3></article>)}
          </div>
          <div className="earning-block">
            <h3 className="earning-title" id="earning-title"><span>Esto es lo que</span><span><em>podrías cobrar</em> por aplicar pisos de</span><span>resina epóxica</span></h3>
            <aside className="earning-card" aria-labelledby="earning-title">
              <div className="earning-summary">
                <p className="earning-label">Precio de referencia</p>
                <p className="earning-price">$1,000 a $1,500 <span>MXN por m²</span></p>
                <p className="earning-example"><strong>Ejemplo:</strong> Un proyecto de 100 m² puede cotizarse entre $100,000 y $150,000 MXN.</p>
                <p className="earning-opportunity">La aplicación de resina epóxica puede convertirse en un servicio de alto valor para tu negocio.</p>
                <p className="earning-disclaimer">*Precios aproximados. Pueden variar según la superficie, el acabado, los materiales, la ciudad y las condiciones del proyecto.</p>
              </div>
              <figure className="earning-photo"><img src="/assets/piso-azul-marmoleado_5b4a8397.webp" alt="Piso de resina azul marmoleado con vetas doradas" loading="lazy" /></figure>
            </aside>
          </div>
        </div>
      </section>

      <section className="community-section" aria-labelledby="community-title">
        <div className="community-inner">
          <div className="community-copy">
            <h2 id="community-title" aria-label="Más de 1000 alumnos ya perdieron el miedo a la resina y hoy crean acabados increíbles.">
              <span className="community-title-desktop" aria-hidden="true"><span className="community-line">Más de <b className="community-highlight">1000 alumnos</b></span><span className="community-line">ya perdieron el miedo</span><span className="community-line">a la resina y hoy crean</span><span className="community-line">acabados increíbles.</span></span>
              <span className="community-title-mobile" aria-hidden="true">Más de <b className="community-highlight">1000 alumnos</b> ya perdieron el miedo a la resina y hoy crean acabados increíbles.</span>
            </h2>
            <a className="community-cta" href="#precios">VER PAQUETES Y ASEGURAR MI LUGAR <MoveUpRight aria-hidden="true" /></a>
          </div>
          <div className="community-gallery" aria-label="Galería de alumnos durante las prácticas">
            {studentGallery.map(({ image, alt }, index) => <figure className={`community-photo photo-${index + 1}`} key={image}><img src={image} alt={alt} loading="lazy" /></figure>)}
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-title">
        <header className="about-heading">
          <h2 id="about-title">¿Quiénes somos?</h2>
          <span className="dark-title-rule" aria-hidden="true" />
        </header>
        <div className="about-inner">
          <div className="about-copy">
            <div className="about-prose">
              <p>Somos <strong>Oscar Cárdenas y Oscar Ganem</strong>, fundadores de <strong>Grupo Ocares</strong>.</p>
              <p>Desde hace años trabajamos directamente en construcción, remodelación y aplicación de acabados, enfrentándonos en obra a los mismos retos que cualquier profesional del sector.</p>
              <p>Esa experiencia nos llevó a crear nuestros cursos presenciales, donde enseñamos de forma práctica lo que hemos aprendido trabajando en campo.</p>
              <p>Hoy hemos capacitado a cientos de alumnos en distintas ciudades de México, ayudándolos a aplicar estos conocimientos en sus proyectos, su trabajo e incluso en sus propios negocios.</p>
            </div>
            <div className="about-trust">
              <h3>¿Por qué te contamos esto?</h3>
              <p>Porque si vas a aprender una nueva técnica, es importante saber quién te está enseñando y de dónde viene su experiencia.</p>
            </div>
          </div>
          <figure className="about-photo">
            <div className="about-photo-frame"><img src="/assets/grupo-ocares-team_ac748c58.webp" alt="Oscar Cárdenas y Oscar Ganem, equipo de Grupo Ocares" loading="lazy" /></div>
          </figure>
        </div>
      </section>

      <section className="included-section" aria-labelledby="included-title">
        <div className="included-inner">
          <header className="included-heading">
            <h2 id="included-title">Todo esto incluye tu entrada al curso</h2>
          </header>

          <div className="resource-grid">
            {includedResources.map(({ icon: Icon, title, text }) => (
              <article className="resource-card" key={title}>
                <span className="resource-icon"><Icon aria-hidden="true" strokeWidth={1.9} /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>

          <div className="module-area">
            <div className="module-label">4 módulos prácticos</div>
            <div className="module-grid">
              {courseModules.map(({ number, icon: Icon, title, text }) => (
                <article className="module-card" key={number}>
                  <div className="module-icon-row"><span className="module-number">{number}</span><Icon aria-hidden="true" strokeWidth={1.9} /></div>
                  <h3>{title}</h3>
                  <span className="module-rule" />
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section" id="precios" aria-labelledby="pricing-title">
        <div className="pricing-inner">
          <header className="pricing-heading">
            <h2 id="pricing-title">Elige cómo quieres <span>asegurar tu lugar</span></h2>
            <p>Todos los paquetes incluyen los materiales, recursos y beneficios mostrados arriba.</p>
          </header>

          <div className="pricing-grid">
            <article className="pricing-card pricing-card-featured" aria-labelledby="presale-title">
              <span className="pricing-recommended">Más recomendado</span>
              <div className="pricing-card-copy">
                <h3 id="presale-title">Precio de preventa</h3>
                <p className="pricing-previous-price">$2,499</p>
                <p className="pricing-current-price">$1,999</p>
                <p className="pricing-description">Aparta con $100 y paga los $1,899 restantes al llegar.</p>
                <p className="pricing-deadline">La preventa termina el 17 de septiembre.</p>
              </div>
              <ul className="pricing-benefits">
                <li><Check aria-hidden="true" strokeWidth={3} /><span>Lugar confirmado.</span></li>
                <li><Check aria-hidden="true" strokeWidth={3} /><span>Incluye todos los beneficios mostrados arriba.</span></li>
              </ul>
              <a className="pricing-primary-cta" href={getWhatsAppHref(presaleWhatsAppMessage)} onClick={(event) => handleWhatsAppClick(event, getWhatsAppHref(presaleWhatsAppMessage))} aria-disabled={isRedirecting}>REGISTRARME POR WHATSAPP <MoveUpRight aria-hidden="true" /></a>
            </article>

            <article className="pricing-card pricing-card-regular" aria-labelledby="regular-title">
              <div className="pricing-card-copy">
                <h3 id="regular-title">Precio regular</h3>
                <p className="pricing-current-price">$2,499</p>
                <p className="pricing-description">Paga en persona el día del curso, sin anticipos.</p>
                <p className="pricing-availability">Registro sujeto a disponibilidad.</p>
              </div>
              <ul className="pricing-benefits">
                <li><Check aria-hidden="true" strokeWidth={3} /><span>No necesitas pagar ahora.</span></li>
                <li><Check aria-hidden="true" strokeWidth={3} /><span>Incluye todos los beneficios mostrados arriba.</span></li>
              </ul>
              <a className="pricing-secondary-cta" href={getWhatsAppHref(regularWhatsAppMessage)} onClick={(event) => handleWhatsAppClick(event, getWhatsAppHref(regularWhatsAppMessage))} aria-disabled={isRedirecting}>REGISTRARME SIN ANTICIPO <MoveUpRight aria-hidden="true" /></a>
            </article>
          </div>

          <aside className="team-pricing-block" aria-labelledby="team-pricing-title">
            <div className="team-pricing-intro">
              <span className="team-pricing-icon"><Users aria-hidden="true" strokeWidth={2.1} /></span>
              <div>
                <h3 id="team-pricing-title">¿Vienes acompañado?</h3>
                <p>Ideal para constructoras, empresas de remodelación y equipos de trabajo.</p>
              </div>
            </div>
            <div className="team-price-options" aria-label="Precios para parejas y equipos">
              <div className="team-price-option"><strong>2 personas — $3,800</strong><span>$1,900 por persona</span></div>
              <div className="team-price-option"><strong>3 personas — $4,999</strong><span>Aproximadamente $1,667 por persona</span></div>
            </div>
            <div className="team-pricing-action">
              <p>Todos los participantes reciben los materiales, recursos y beneficios del curso.</p>
              <a className="team-pricing-cta" href={getWhatsAppHref(teamWhatsAppMessage)} onClick={(event) => handleWhatsAppClick(event, getWhatsAppHref(teamWhatsAppMessage))} aria-disabled={isRedirecting}>INSCRIBIR A MI EQUIPO POR WHATSAPP <MoveUpRight aria-hidden="true" /></a>
            </div>
          </aside>
        </div>
      </section>

      <section className="venue-section" aria-labelledby="venue-title">
        <div className="venue-inner">
          <header className="venue-heading">
            <h2 id="venue-title">¿Dónde y cuándo se realizará el curso?</h2>
          </header>
          <div className="venue-layout">
            <article className="venue-card">
              <div className="venue-card-top">
                <span className="venue-place-icon"><Building2 aria-hidden="true" strokeWidth={1.8} /></span>
                <div>
                  <h3>Salón Alianza Desafío</h3>
                  <p>Espacio sede del curso presencial</p>
                </div>
              </div>

              <div className="venue-divider" aria-hidden="true"><span /></div>

              <dl className="venue-details">
                <div>
                  <dt><span className="venue-detail-icon"><CalendarDays aria-hidden="true" strokeWidth={1.9} /></span><span>Fecha</span></dt>
                  <dd>19 de septiembre</dd>
                </div>
                <div>
                  <dt><span className="venue-detail-icon"><Clock3 aria-hidden="true" strokeWidth={1.9} /></span><span>Horario</span></dt>
                  <dd>10:00 am a 5:00 pm</dd>
                </div>
                <div>
                  <dt><span className="venue-detail-icon"><MapPin aria-hidden="true" strokeWidth={1.9} /></span><span>Dirección</span></dt>
                  <dd>Av. Xel-Ha LT 56 y 57, MZ 28, Edificio Siglo XXI, tercer nivel, Supermanzana 24, 77509 Cancún, Q.R.</dd>
                </div>
              </dl>

              <div className="venue-note"><span className="venue-note-icon"><Info aria-hidden="true" strokeWidth={1.9} /></span><p>El curso es impartido exclusivamente por Ocares Academy. El espacio de Salón Alianza Desafío es rentado para la realización del evento; Alianza Desafío no imparte este curso.</p></div>
            </article>

            <div className="venue-map" aria-label="Mapa de Salón Alianza Desafío en Cancún"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.7454512254853!2d-86.8352751247397!3d21.16252608052045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2bb2e6867a01%3A0x57d3bbb939158b0f!2sAlianza%20Desaf%C3%ADo%20Canc%C3%BAn!5e0!3m2!1ses-419!2smx!4v1788838945719!5m2!1ses-419!2smx" title="Mapa de Salón Alianza Desafío en Cancún" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div>
          </div>
        </div>
      </section>

      <section className="proof-section" aria-labelledby="proof-title">
        <div className="proof-inner">
          <header className="proof-heading">
            <h2 id="proof-title">Cientos de alumnos ya dieron el primer paso</h2>
            <span className="dark-title-rule" aria-hidden="true" />
          </header>

          <div className="proof-gallery">
            <figure className="proof-main-photo">
              <img src="/assets/prueba-alumnos-principal_8ff31ef4.webp" alt="Grupo de alumnos de una capacitación de resina epóxica" loading="lazy" />
            </figure>
            <div className="proof-grid">
              <figure><img src="/assets/prueba-alumnos-01_1b085399.webp" alt="Alumnos reunidos después de una capacitación práctica" loading="lazy" /></figure>
              <figure><img src="/assets/prueba-alumnos-02_517ece59.webp" alt="Participantes de un curso presencial de resina" loading="lazy" /></figure>
              <figure><img src="/assets/prueba-alumnos-03_b9160a17.webp" alt="Grupo de alumnos mostrando sus proyectos de resina" loading="lazy" /></figure>
              <figure><img src="/assets/prueba-alumnos-04_7ed2cdc6.webp" alt="Grupo de asistentes a una capacitación de resina epóxica" loading="lazy" /></figure>
              <figure><img src="/assets/prueba-practica-01_784b8232.webp" alt="Alumna aplicando resina epóxica durante una práctica" loading="lazy" /></figure>
              <figure><img src="/assets/prueba-practica-02_fe684c40.webp" alt="Alumno extendiendo resina roja en una práctica presencial" loading="lazy" /></figure>
              <figure><img src="/assets/prueba-practica-03_32c5b58c.webp" alt="Alumnos aplicando resina sobre paneles durante el curso" loading="lazy" /></figure>
              <figure><img src="/assets/prueba-practica-04_57479a44.webp" alt="Alumno distribuyendo resina azul durante una demostración práctica" loading="lazy" /></figure>
            </div>
            <div className="proof-cta-area">
              <p>El próximo aplicador de resina epóxica puedes ser tú</p>
              <a className="proof-cta" href="#precios">VER PAQUETES Y ASEGURAR MI LUGAR <MoveUpRight aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>

      <section ref={faqSectionRef} className="faq-section" aria-labelledby="faq-title">
        <div className="faq-inner">
          <header className="faq-heading">
            <h2 id="faq-title">¿Aún tienes preguntas?</h2>
          </header>
          {shouldLoadFaq && <Suspense fallback={null}><CancunFaqList /></Suspense>}
        </div>
      </section>

      <section className="final-cta-section" aria-labelledby="final-cta-title">
        <div className="final-cta-inner">
          <h2 id="final-cta-title" aria-label="Aprende a aplicar resina epóxica y asegura tu lugar en Cancún">
            <span className="final-headline-desktop" aria-hidden="true">
              <span className="final-headline-line">Aprende a aplicar <em>resina epóxica</em></span>
              <span className="final-headline-line">y asegura tu lugar en</span>
              <span className="final-headline-line"><strong>Cancún</strong> este 19 de septiembre</span>
            </span>
            <span className="final-headline-mobile" aria-hidden="true">
              Aprende a aplicar <em>resina epóxica</em> y asegura tu lugar en <strong>Cancún</strong> este 19 de septiembre
            </span>
          </h2>
          <span className="dark-title-rule" aria-hidden="true" />
          <p className="final-cta-intro">Una jornada práctica para aprender desde cero y comenzar a aplicar acabados de alto valor.</p>
          <ul className="final-benefit-list">
            <li><Check aria-hidden="true" strokeWidth={3.1} /><span>Materiales y herramientas para realizar todas las prácticas.</span></li>
            <li><Check aria-hidden="true" strokeWidth={3.1} /><span>Manual del Aplicador PRO y Calculadora Epóxica incluidos.</span></li>
            <li><Check aria-hidden="true" strokeWidth={3.1} /><span>Soporte de por vida para tus futuras aplicaciones.</span></li>
          </ul>
          <a className="final-cta-button" href="#precios">VER PAQUETES Y ASEGURAR MI LUGAR <MoveUpRight aria-hidden="true" /></a>
          <p className="final-cta-trust">Cupo presencial limitado · Taller práctico en Cancún</p>
        </div>
      </section>

      {isRedirecting && <div className="whatsapp-redirect-overlay" role="status" aria-live="assertive" aria-label="Redirigiendo a WhatsApp">
        <div className="whatsapp-redirect-card">
          <span className="whatsapp-redirect-spinner" aria-hidden="true" />
          <h2>Redirigiendo a WhatsApp…</h2>
          <p>Por favor espera un momento mientras preparamos tu mensaje.</p>
        </div>
      </div>}
    </main>
  );
}
