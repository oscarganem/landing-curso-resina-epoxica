import { Fragment } from "react";
import type { CourseCampaignConfig } from "@/config/courseCampaigns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CourseFaqList({ campaign }: { campaign: CourseCampaignConfig }) {
  const { date, schedule, venue, pricing } = campaign;
  const eventDate = `${date.dayOfWeek} ${date.label}`;
  const faqItems = [
    { question: "¿Qué técnicas aprenderé?", answer: <><p>Aprenderás a crear <strong>pisos flake, granito antiderrapante, efectos marmoleados y metálicos, acabados unicolor y diseños 3D</strong>.</p><p>También conocerás aplicaciones decorativas como <strong>mesas tipo río</strong>, mediante práctica guiada paso a paso.</p></> },
    { question: "¿Cuál es el precio del curso?", answer: <><p>La opción de <strong>{`preventa cuesta ${pricing.presale}`}</strong>{` en lugar de ${pricing.regular}. Puedes apartar con ${pricing.deposit} y pagar los ${pricing.remaining} restantes al llegar al curso.`}</p><p>También puedes elegir el <strong>{`precio regular de ${pricing.regular}`}</strong> y pagar en persona el día del evento, sujeto a disponibilidad.</p><p>Si vienes acompañado, contamos con opciones para {pricing.teams.map((team, index) => <Fragment key={team.people}>{index > 0 && " o "}<strong>{`${team.people} personas por ${team.total}`}</strong></Fragment>)}. Todos los paquetes incluyen los materiales, recursos y beneficios del curso.</p><p><a className="faq-price-link" href="#precios">Ver precios y elegir mi paquete</a></p></> },
    { question: "¿Dónde, cuándo y a qué hora será el curso?", answer: <><p>El curso se realizará en <strong>{venue.label}</strong>.</p><p><strong>{eventDate}</strong><br />{schedule}</p><p><strong>Dirección:</strong><br />{venue.addressLines.map((line, index) => <Fragment key={index}>{index > 0 && <br />}{line}</Fragment>)}</p></> },
    { question: "¿Necesito experiencia previa para tomar el curso?", answer: <><p>No. El taller está diseñado para que puedas <strong>aprender desde cero</strong>, incluso si nunca antes has trabajado con resina epóxica.</p><p>La práctica es guiada paso a paso por el equipo de Grupo Ocares.</p></> },
    { question: "¿Qué incluye mi inscripción?", answer: <><p>Incluye la formación presencial práctica, materiales y herramientas para practicar, <strong>Manual del Aplicador PRO</strong>, Calculadora Epóxica, certificado de participación y soporte de por vida.</p></> },
    { question: "¿Tengo que llevar materiales o herramientas?", answer: <><p>No. Durante el taller te proporcionaremos los materiales y herramientas necesarios para realizar las prácticas.</p><p>Solo necesitas presentarte con ganas de aprender.</p></> },
    { question: "¿Cómo puedo asegurar mi lugar?", answer: <><p>Revisa los paquetes disponibles y elige la opción de inscripción que prefieras. Después de elegir tu paquete, presiona el botón correspondiente para continuar tu registro por WhatsApp.</p><p>Ahí, un asesor te ayudará a resolver tus dudas y a confirmar los detalles para asegurar tu lugar.</p><p><a className="faq-price-link" href="#precios">Ver precios y elegir mi paquete</a></p></> },
  ];

  return <Accordion type="single" collapsible className="faq-list">{faqItems.map(({ question, answer }, index) => <AccordionItem value={`${campaign.faqIdPrefix}-${index + 1}`} className="faq-item" key={question}><AccordionTrigger className="faq-trigger"><span>{question}</span><span className="faq-symbol" aria-hidden="true">+</span></AccordionTrigger><AccordionContent className="faq-content">{answer}</AccordionContent></AccordionItem>)}</Accordion>;
}
