import { type ReactNode } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: ReactNode;
};

const faqItems: FaqItem[] = [
  { question: "¿Por qué estamos manejando una lista de espera?", answer: <><p>El curso presencial tiene <strong>cupo limitado</strong>, por lo que antes de abrir las inscripciones al público general daremos acceso primero a las personas registradas en nuestra lista.</p><p>Al unirte GRATIS tendrás acceso a la <strong>clase online previa</strong>, conocerás nuestro <strong>descuento especial de preventa</strong> y tendrás prioridad para reservar tu lugar antes de que abramos los lugares restantes al público.</p></> },
  { question: "¿Registrarme a la lista tiene algún costo o me obliga a comprar?", answer: <><p>No. <strong>Registrarte es completamente GRATIS y no te compromete a comprar el curso.</strong></p><p>La lista simplemente te permitirá recibir primero la información, acceder a la clase online y conocer las condiciones especiales de preventa.</p></> },
  { question: "¿La clase online previa también es gratuita?", answer: <><p>Sí. Al registrarte recibirás acceso completamente GRATIS a nuestra clase online previa al curso presencial.</p><p>Durante la clase conocerás al equipo, aprenderás <strong>las 5 capas que conforman un piso epóxico</strong>, verás una <strong>demostración en vivo</strong> y podrás resolver tus dudas sobre el curso presencial.</p><p>Al final de la clase revelaremos el precio especial de preventa disponible exclusivamente para los miembros de la lista prioritaria.</p></> },
  { question: "¿Necesito experiencia previa para tomar el curso?", answer: <><p>No. El curso está diseñado para que puedas <strong>aprender desde cero</strong>, incluso si nunca antes has trabajado con resina epóxica.</p><p>Durante el presencial aprenderás los fundamentos, preparación de superficies, aplicación y diferentes tipos de acabados.</p></> },
  { question: "¿Cuánto cuesta el curso presencial?", answer: <><p>El <strong>precio especial de preventa</strong> será revelado durante nuestra clase online gratuita.</p><p>Las personas registradas en la lista tendrán acceso primero a este precio antes de que abramos las inscripciones al público general.</p></> },
  { question: "¿Cómo podré reservar mi lugar?", answer: <><p>Durante la clase online explicaremos cómo acceder a la preventa y <strong>asegurar tu lugar en el curso presencial</strong>.</p><p>Los miembros de la lista tendrán prioridad antes de abrir los lugares restantes al público.</p></> },
  { question: "¿Qué incluye mi inscripción al curso presencial?", answer: <><p>Tu inscripción incluye la formación presencial práctica, materiales y herramientas para realizar las prácticas, Manual del Aplicador, calculadora de materiales, certificado de participación y soporte posterior al curso.</p></> },
  { question: "¿Tengo que llevar materiales o herramientas?", answer: <><p>No. Durante el curso te proporcionaremos <strong>los materiales y herramientas necesarios para realizar las prácticas</strong>.</p><p>Solo tendrás que presentarte con ganas de aprender.</p></> },
  { question: "¿Dónde y cuándo será el curso presencial?", answer: <><p>El curso se realizará en <strong>CANACO Servitur</strong><br />Playa del Carmen</p><p><strong>Viernes 18 de septiembre</strong><br />10:00 am a 5:00 pm</p><p><strong>Dirección:</strong><br />Carretera Federal, Manzana 8, Lote 6, S/N,<br />Gonzalo Guerrero, 77710 Playa del Carmen, Q.R.</p></> },
  { question: "¿Qué pasa si no puedo asistir a la clase online?", answer: <><p>Si ofrecemos una repetición de la clase, recibirás el acceso posteriormente por WhatsApp y correo durante un periodo limitado.</p><p><strong>Te recomendamos asistir en vivo</strong>, ya que podrás hacer preguntas directamente al equipo y conocer de primera mano la oferta especial de preventa.</p></> },
];

export default function FaqList() {
  return (
    <Accordion type="single" collapsible className="faq-list">
      {faqItems.map(({ question, answer }, index) => (
        <AccordionItem value={`faq-${index + 1}`} className="faq-item" key={question}>
          <AccordionTrigger className="faq-trigger"><span>{question}</span><span className="faq-symbol" aria-hidden="true">+</span></AccordionTrigger>
          <AccordionContent className="faq-content">{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
