/**
 * Diseño: Taller de Alto Contraste. Landing editorial carbón/amarillo con
 * módulos de formación, práctica y comunidad de alumnos.
 */
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  BookOpen,
  Building2,
  BriefcaseBusiness,
  Calculator,
  CalendarDays,
  Check,
  ClipboardCheck,
  Clock3,
  DollarSign,
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
  TrendingUp,
  TicketCheck,
  Table2,
  Users,
  Wrench,
} from "lucide-react";

const WaitlistModal = lazy(() => import("./WaitlistModal"));
const FaqList = lazy(() => import("./FaqList"));

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
  { title: "Pisos marmoleados, metálicos y unicolor", image: "/manus-storage/piso-metalico_e19ee2d1.webp", position: "center center" },
  { title: "Pisos con hojuela y granito antiderrapante", image: "/manus-storage/piso-antiderrapante_d347b0f3.webp", position: "center center" },
  { title: "Pisos 3D", image: "/manus-storage/piso-3d_69280b5d.webp", position: "center 52%" },
  { title: "Mesas tipo río y decoraciones", image: "/manus-storage/mesa-rio_c4ac227a.webp", position: "center 48%" },
];

const earningFacts = [
  { icon: DollarSign, label: "Referencia de cobro", detail: "$1,000 a $1,500 MXN por m²" },
  { icon: Calculator, label: "Ejemplo práctico", detail: "Una casa de 100 m² puede cotizarse entre $100,000 y $150,000 MXN" },
  { icon: TrendingUp, label: "Servicio de alto valor", detail: "Un solo proyecto bien cotizado puede representar una oportunidad importante de ingresos." },
];

const studentGallery = [
  { image: "/manus-storage/alumno-practica-roja_99be4dca.webp", alt: "Alumno aplicando resina roja durante el taller" },
  { image: "/manus-storage/alumno-practica-azul_ac182caa.webp", alt: "Alumno aplicando resina azul durante el taller" },
  { image: "/manus-storage/alumno-practica-negra_f6afd7d8.webp", alt: "Alumno aplicando resina negra durante el taller" },
  { image: "/manus-storage/alumno-practica-azul-detalle_9d4f3565.webp", alt: "Alumno creando un acabado decorativo con resina" },
  { image: "/manus-storage/alumno-practica-mezcla_5961ed1f.webp", alt: "Alumnos preparando mezclas de resina durante la práctica" },
  { image: "/manus-storage/alumno-practica-granito_1e42691c.webp", alt: "Alumno aplicando sistema de granito antiderrapante" },
];

const prioritySteps = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "Regístrate GRATIS",
    text: "Únete a la lista de espera dejando tu nombre, WhatsApp y correo.",
  },
  {
    icon: MonitorPlay,
    number: "02",
    title: "Asiste a la clase online gratuita",
    text: "Aprenderás las 5 capas que conforman un piso epóxico, verás una demostración en vivo y podrás resolver todas tus dudas sobre el curso presencial.",
  },
  {
    icon: TicketCheck,
    number: "03",
    title: "Descubre tu descuento de preventa",
    text: "Al final de la clase en vivo revelaremos el precio especial disponible únicamente para quienes se registraron en la lista.",
  },
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
  { icon: BookOpen, title: "Manual del aplicador", text: "Guía de apoyo con procesos y conceptos clave" },
  { icon: Calculator, title: "Calculadora de materiales", text: "Para estimar resina, pigmentos y cantidades" },
  { icon: BadgeCheck, title: "Certificado de participación", text: "Reconoce tu participación en el curso" },
  { icon: Headphones, title: "Soporte posterior al curso", text: "Resuelve dudas sobre tus primeras aplicaciones" },
];

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [shouldLoadFaq, setShouldLoadFaq] = useState(false);
  const faqSectionRef = useRef<HTMLElement>(null);

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

  const openWaitlist = () => {
    setIsWaitlistOpen(true);
  };

  return (
    <main className="landing-shell">
      <header className="site-header" aria-label="Encabezado del curso">
        <a className="brand-lockup" href="#inicio" aria-label="Ocares Academy">
          <img className="brand-mark" src="/manus-storage/ocares-academy-logo-mobile_a3dbed22.webp" width="217" height="72" alt="Ocares Academy" />
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
          <p className="event-line"><MapPin aria-hidden="true" /> Playa del Carmen <b>|</b><CalendarDays aria-hidden="true" /> 18 de Septiembre</p>
          <p className="course-lede"><span>La formación <strong>#1</strong> para aplicadores</span><span>de resina epóxica en México.</span></p>
          <ul className="benefit-list">
            {benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" strokeWidth={3.2} /><span>{benefit}</span></li>)}
          </ul>
          <button className="waitlist-cta" type="button" onClick={openWaitlist}>Únete GRATIS a la lista de espera <MoveUpRight aria-hidden="true" /></button>
          <div className="course-footer" id="lista-de-espera"><span className="footer-rule" /><p><b>+1,000</b> alumnos ya aprendieron con nosotros</p></div>
        </div>
        <aside className="visual-column" aria-label="Espacio reservado para fotografía del curso">
          <div className="photo-frame">
            <div className="frame-corner frame-corner-top" aria-hidden="true" />
            <div className="frame-corner frame-corner-bottom" aria-hidden="true" />
            <div className="photo-placeholder"><div className="placeholder-grid" aria-hidden="true" /><p>Espacio reservado<br /><span>para fotografía del curso</span></p><span className="placeholder-index" aria-hidden="true">01</span></div>
            <span className="photo-note">IMAGEN PRINCIPAL</span>
          </div>
        </aside>
      </section>

      <section className="audience-section" aria-labelledby="audience-title">
        <div className="audience-layout">
          <div className="audience-intro">
            <div className="light-eyebrow">¿Para quién es este curso?</div>
            <h2 id="audience-title">El curso<br />intensivo es<br />para ti si<span>…</span></h2>
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
          <aside className="earning-card" aria-labelledby="earning-title">
            <div className="earning-photo"><img src="/manus-storage/piso-marmoleado-economico_fe9c195f.webp" alt="Piso marmoleado de resina epóxica" loading="lazy" /></div>
            <div className="earning-details"><h3 id="earning-title">¿Cuánto se cobra por este tipo de proyectos?</h3><div className="earning-facts">{earningFacts.map(({ icon: Icon, label, detail }) => <div className="earning-fact" key={label}><span className="earning-icon" aria-hidden="true"><Icon strokeWidth={2.2} /></span><strong>{label}</strong><p>{detail}</p></div>)}</div></div>
            <p className="earning-disclaimer">*Los precios son aproximados y pueden variar según superficie, complejidad, materiales, ciudad y condiciones del trabajo.</p>
          </aside>
        </div>
      </section>

      <section className="community-section" aria-labelledby="community-title">
        <div className="community-inner">
          <div className="community-copy">
            <h2 id="community-title"><span className="community-line">Más de <b className="community-highlight">500 alumnos</b></span><span className="community-line">ya perdieron el miedo</span><span className="community-line">a la resina y hoy crean</span><span className="community-line">acabados increíbles.</span><em>Tú puedes ser el siguiente.</em></h2>
            <button className="community-cta" type="button" onClick={openWaitlist}>Únete GRATIS a la lista de espera <MoveUpRight aria-hidden="true" /></button>
          </div>
          <div className="community-gallery" aria-label="Galería de alumnos durante las prácticas">
            {studentGallery.map(({ image, alt }, index) => <figure className={`community-photo photo-${index + 1}`} key={image}><img src={image} alt={alt} loading="lazy" /></figure>)}
          </div>
        </div>
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <div className="process-inner">
          <div className="process-heading">
            <h2 id="process-title"><span className="process-line">Únete <b>GRATIS</b> a la lista</span><span className="process-line">prioritaria y accede a un</span><strong className="process-line">descuento exclusivo de preventa</strong></h2>
            <span className="dark-title-rule" aria-hidden="true" />
          </div>

          <div className="process-steps">
            {prioritySteps.map(({ icon: Icon, number, title, text }) => (
              <article className="process-step" key={number}>
                <div className="process-step-top"><span className="process-icon"><Icon aria-hidden="true" strokeWidth={2.3} /></span><b>{number}</b></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <aside className="process-course-note" aria-label="Detalles del curso presencial">
            <span className="process-calendar"><CalendarDays aria-hidden="true" strokeWidth={2.25} /></span>
            <div className="process-course-copy">
              <h3>Curso presencial: <span>Playa del Carmen — 18 de septiembre</span></h3>
              <ul>
                <li><Check aria-hidden="true" strokeWidth={3} />Los miembros de la lista de espera tendrán acceso primero a los lugares antes de abrir las inscripciones al público general.</li>
                <li><Check aria-hidden="true" strokeWidth={3} />Una vez dentro de la lista recibirás tu acceso a la clase online gratuita, donde revelaremos la oferta especial de preventa exclusiva para los miembros registrados.</li>
              </ul>
            </div>
          </aside>
          <button className="process-cta" type="button" onClick={openWaitlist}>Únete GRATIS a la lista de espera <MoveUpRight aria-hidden="true" /></button>
        </div>
      </section>

      <section className="included-section" aria-labelledby="included-title">
        <div className="included-inner">
          <header className="included-heading">
            <h2 id="included-title">Todo lo que necesitas para aprender, practicar y empezar a aplicar <span>resina</span> por tu cuenta</h2>
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

      <section className="about-section" aria-labelledby="about-title">
        <header className="about-heading">
          <h2 id="about-title">¿Quiénes somos y por qué podemos ayudarte?</h2>
          <span className="dark-title-rule" aria-hidden="true" />
        </header>
        <div className="about-inner">
          <div className="about-copy">
            <p className="about-greeting">¡Hola! Somos <strong>Oscar Cárdenas</strong> y <strong>Oscar Ganem</strong>.</p>
            <div className="about-prose">
              <p>Somos <strong>Grupo Ocares</strong>. Desde hace años nos dedicamos a la construcción, remodelación y aplicación de acabados, <strong>trabajando directamente en obra</strong> y enfrentándonos a los mismos retos que cualquier profesional de la construcción.</p>
              <p>Con el tiempo decidimos llevar toda esa experiencia a nuestros <strong>cursos presenciales</strong> y comenzar a enseñar a otras personas lo que nosotros mismos hemos aprendido trabajando en campo.</p>
              <p>Hoy hemos capacitado a <strong>cientos de alumnos</strong> en distintas ciudades de México, quienes han aplicado estos conocimientos en proyectos personales, en su trabajo e incluso para iniciar sus propios negocios.</p>
            </div>
            <div className="about-trust">
              <h3>¿Por qué te contamos esto?</h3>
              <p>Porque para nosotros es importante que sepas quién está detrás de la información que vas a recibir.</p>
              <p>Sabemos que aprender una nueva técnica —y mucho más si piensas convertirla en un negocio— requiere <strong>confiar en las personas que te están enseñando</strong>.</p>
            </div>
          </div>
          <figure className="about-photo">
            <div className="about-photo-frame"><img src="/manus-storage/grupo-ocares-team_ac748c58.webp" alt="Oscar Cárdenas y Oscar Ganem, equipo de Grupo Ocares" loading="lazy" /></div>
          </figure>
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
                  <h3>CANACO Servitur</h3>
                  <p>Playa del Carmen</p>
                </div>
              </div>

              <div className="venue-divider" aria-hidden="true"><span /></div>

              <dl className="venue-details">
                <div>
                  <dt><span className="venue-detail-icon"><CalendarDays aria-hidden="true" strokeWidth={1.9} /></span><span>Fecha</span></dt>
                  <dd>Viernes 18 de septiembre</dd>
                </div>
                <div>
                  <dt><span className="venue-detail-icon"><Clock3 aria-hidden="true" strokeWidth={1.9} /></span><span>Horario</span></dt>
                  <dd>10:00 am a 5:00 pm</dd>
                </div>
                <div>
                  <dt><span className="venue-detail-icon"><MapPin aria-hidden="true" strokeWidth={1.9} /></span><span>Dirección</span></dt>
                  <dd>Carretera Federal, Manzana 8, Lote 6, S/N,<br />Gonzalo Guerrero, 77710 Playa del Carmen, Q.R.</dd>
                </div>
              </dl>

              <div className="venue-note"><span className="venue-note-icon"><Info aria-hidden="true" strokeWidth={1.9} /></span><p>Te recomendamos llegar 1 hora antes para el registro.</p></div>
            </article>

            <div className="venue-map">
              <span className="venue-map-tag">Ubicación</span>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.824431774057!2d-87.076498!3d20.636011899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e4326db4db907%3A0x967b3c90e3eda04d!2sCANACO%20SERVYTUR%20PLAYA%20DEL%20CARMEN!5e0!3m2!1ses-419!2smx!4v1787349497546!5m2!1ses-419!2smx"
                title="Ubicación de CANACO Servitur Playa del Carmen"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
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
              <img src="/manus-storage/prueba-alumnos-principal_8ff31ef4.webp" alt="Grupo de alumnos de una capacitación de resina epóxica" loading="lazy" />
            </figure>
            <div className="proof-grid">
              <figure><img src="/manus-storage/prueba-alumnos-01_1b085399.webp" alt="Alumnos reunidos después de una capacitación práctica" loading="lazy" /></figure>
              <figure><img src="/manus-storage/prueba-alumnos-02_517ece59.webp" alt="Participantes de un curso presencial de resina" loading="lazy" /></figure>
              <figure><img src="/manus-storage/prueba-alumnos-03_b9160a17.webp" alt="Grupo de alumnos mostrando sus proyectos de resina" loading="lazy" /></figure>
              <figure><img src="/manus-storage/prueba-alumnos-04_7ed2cdc6.webp" alt="Grupo de asistentes a una capacitación de resina epóxica" loading="lazy" /></figure>
              <figure><img src="/manus-storage/prueba-practica-01_784b8232.webp" alt="Alumna aplicando resina epóxica durante una práctica" loading="lazy" /></figure>
              <figure><img src="/manus-storage/prueba-practica-02_fe684c40.webp" alt="Alumno extendiendo resina roja en una práctica presencial" loading="lazy" /></figure>
              <figure><img src="/manus-storage/prueba-practica-03_32c5b58c.webp" alt="Alumnos aplicando resina sobre paneles durante el curso" loading="lazy" /></figure>
              <figure><img src="/manus-storage/prueba-practica-04_57479a44.webp" alt="Alumno distribuyendo resina azul durante una demostración práctica" loading="lazy" /></figure>
            </div>
            <div className="proof-cta-area">
              <p>El próximo aplicador de resina epóxica puedes ser tú</p>
              <button className="proof-cta" type="button" onClick={openWaitlist}>Únete GRATIS a la lista de espera <MoveUpRight aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      </section>

      <section ref={faqSectionRef} className="faq-section" aria-labelledby="faq-title">
        <div className="faq-inner">
          <header className="faq-heading">
            <h2 id="faq-title">¿Aún tienes preguntas?</h2>
          </header>
          {shouldLoadFaq && <Suspense fallback={null}><FaqList /></Suspense>}
        </div>
      </section>

      <section className="final-cta-section" aria-labelledby="final-cta-title">
        <div className="final-cta-inner">
          <h2 id="final-cta-title" aria-label="Únete AHORA a la lista de espera y da el primer paso para convertirte en aplicador de Resina Epóxica">
            <span className="final-headline-desktop" aria-hidden="true">
              <span className="final-headline-line">Únete <strong>AHORA</strong> a la lista de espera</span>
              <span className="final-headline-line">y da el primer paso para convertirte</span>
              <span className="final-headline-line">en aplicador de <em>Resina Epóxica</em></span>
            </span>
            <span className="final-headline-mobile" aria-hidden="true">
              Únete <strong>AHORA</strong> a la lista de espera y da el primer paso para convertirte en aplicador de <em>Resina Epóxica</em>
            </span>
          </h2>
          <span className="dark-title-rule" aria-hidden="true" />
          <p className="final-cta-intro">Al registrarte GRATIS obtendrás:</p>
          <ul className="final-benefit-list">
            <li><Check aria-hidden="true" strokeWidth={3.1} /><span>Descuento exclusivo de preventa</span></li>
            <li><Check aria-hidden="true" strokeWidth={3.1} /><span>Acceso prioritario al curso antes de abrir inscripciones al público general</span></li>
            <li><Check aria-hidden="true" strokeWidth={3.1} /><span>Acceso GRATIS a nuestra clase online sobre las 5 capas de un piso epóxico</span></li>
          </ul>
          <button className="final-cta-button" type="button" onClick={openWaitlist}>Unirme GRATIS a la lista de espera <MoveUpRight aria-hidden="true" /></button>
          <p className="final-cta-trust">Registro gratuito · Sin compromiso · Cupo presencial limitado</p>
        </div>
      </section>

      {isWaitlistOpen && (
        <Suspense fallback={null}>
          <WaitlistModal
            open={isWaitlistOpen}
            onOpenChange={setIsWaitlistOpen}
          />
        </Suspense>
      )}
    </main>
  );
}
