import { CalendarDays, Check, Clock3 } from "lucide-react";
import { Link } from "wouter";

export default function ThankYou() {
  return (
    <main className="thanks-page">
      <div className="thanks-shell">
        <Link className="thanks-brand" href="/" aria-label="Volver al curso de resina epoxica">
          <img src="/manus-storage/ocares-academy-logo_cf81a218.png" width="217" height="72" alt="Ocares Academy" />
        </Link>

        <section className="thanks-card" aria-labelledby="thanks-title">
          <div className="thanks-status" aria-label="Progreso de acceso">
            <div className="thanks-status-item is-complete"><span><Check aria-hidden="true" strokeWidth={3} /></span><b>01 Registro</b><small>Completado</small></div>
            <i aria-hidden="true" />
            <div className="thanks-status-item is-whatsapp"><span><img src="/manus-storage/whatsapp-icon_a58887ab.png" alt="" /></span><b>02 WhatsApp</b><small>Próximo paso</small></div>
            <i aria-hidden="true" />
            <div className="thanks-status-item"><span><CalendarDays aria-hidden="true" strokeWidth={2.3} /></span><b>03 Clase online</b><small>Próximo paso</small></div>
          </div>

          <h1 id="thanks-title">¡Ya casi estás dentro de la <span>lista de espera!</span></h1>
          <span className="thanks-rule" aria-hidden="true" />
          <p className="thanks-intro">
            <span><strong>Por último, solicita tu pase GRATIS a la CLASE ONLINE.</strong></span>
            <span>El precio especial de preventa se revelará durante esta clase.</span>
            <span>Si no asistes, no podrás acceder a este descuento para el <strong>Curso presencial en Playa del Carmen.</strong></span>
          </p>

          <button className="thanks-whatsapp" type="button" aria-label="WhatsApp se habilitará próximamente">
            <img src="/manus-storage/whatsapp-icon_a58887ab.png" alt="" /> Solicitar mi pase GRATIS por WhatsApp
          </button>

          <div className="thanks-info-row">
            <div><CalendarDays aria-hidden="true" /><span>Clase ONLINE gratuita<strong>Jueves 10 de septiembre</strong></span></div>
            <div><Clock3 aria-hidden="true" /><span>Horario<strong>8:00 PM</strong></span></div>
          </div>
        </section>
      </div>

      <section className="student-showcase-section" aria-labelledby="student-showcase-title">
        <div className="student-showcase-inner">
          <header className="student-showcase-heading">
            <h2 id="student-showcase-title">Únete a más de <span>1,000 alumnos</span> que ya aprendieron a aplicar resina epóxica con nosotros.</h2>
            <span className="student-showcase-rule" aria-hidden="true" />
          </header>

          <div className="student-horizontal-grid">
            <figure><img src="/manus-storage/alumnos-nueva-horizontal-01_3ce88029.webp" alt="Alumnos durante una capacitación presencial de resina epóxica" loading="lazy" /></figure>
            <figure><img src="/manus-storage/alumnos-nueva-horizontal-02_7a128335.webp" alt="Grupo de participantes durante el curso de resina" loading="lazy" /></figure>
            <figure className="student-horizontal-wide"><img src="/manus-storage/alumnos-nueva-horizontal-03_dad02957.webp" alt="Alumnos reunidos tras una clase práctica de resina" loading="lazy" /></figure>
          </div>

          <div className="student-vertical-grid">
            <figure><img src="/manus-storage/alumnos-nueva-vertical-01_1ab340fa.webp" alt="Alumno realizando una práctica de resina epóxica" loading="lazy" /></figure>
            <figure><img src="/manus-storage/alumnos-nueva-vertical-02_540c4291.webp" alt="Participante aplicando resina en un proyecto práctico" loading="lazy" /></figure>
            <figure><img src="/manus-storage/alumnos-nueva-vertical-03_eeed7fcc.webp" alt="Alumno aprendiendo técnicas de aplicación de resina" loading="lazy" /></figure>
          </div>
        </div>
      </section>
    </main>
  );
}
