import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  { question: "¿Dónde y cuándo será el curso presencial?", answer: <><p>El curso se realizará en <strong>CANACINTRA Mérida</strong>.</p><p><strong>Domingo 20 de septiembre</strong><br />10:00 am a 5:00 pm</p><p><strong>Dirección:</strong><br />C. 30 151-7A, García Ginerés,<br />97070 Mérida, Yuc.</p></> },
  { question: "¿Necesito experiencia previa para tomar el curso?", answer: <><p>No. El taller está diseñado para que puedas <strong>aprender desde cero</strong>, incluso si nunca antes has trabajado con resina epóxica.</p><p>La práctica es guiada paso a paso por el equipo de Grupo Ocares.</p></> },
  { question: "¿Qué incluye mi inscripción?", answer: <><p>Incluye la formación presencial práctica, materiales y herramientas para practicar, <strong>Manual del Aplicador PRO</strong>, Calculadora Epóxica, certificado de participación y soporte posterior.</p></> },
  { question: "¿Tengo que llevar materiales o herramientas?", answer: <><p>No. Durante el taller te proporcionaremos los materiales y herramientas necesarios para realizar las prácticas.</p><p>Solo necesitas presentarte con ganas de aprender.</p></> },
  { question: "¿Cómo puedo asegurar mi lugar?", answer: <><p>Revisa los paquetes disponibles y elige la opción de inscripción que prefieras. Una vez que asegures tu lugar, recibirás las indicaciones correspondientes.</p></> },
];

export default function MeridaFaqList() {
  return <Accordion type="single" collapsible className="faq-list">{faqItems.map(({ question, answer }, index) => <AccordionItem value={`merida-faq-${index + 1}`} className="faq-item" key={question}><AccordionTrigger className="faq-trigger"><span>{question}</span><span className="faq-symbol" aria-hidden="true">+</span></AccordionTrigger><AccordionContent className="faq-content">{answer}</AccordionContent></AccordionItem>)}</Accordion>;
}
