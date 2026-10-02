export interface CourseCampaignConfig {
  path: `/${string}`;
  city: string;
  state: string;
  date: { dayOfWeek: string; label: string };
  schedule: string;
  venue: {
    confirmed?: boolean;
    name: string;
    label: string;
    addressLines: readonly string[];
    mapEmbedUrl?: string;
  };
  whatsapp: {
    number: string;
    messages: { presale: string; regular: string; team: string };
  };
  // Display strings preserve the campaign's approved currency/rounding copy.
  pricing: {
    regular: string;
    presale: string;
    deposit: string;
    remaining: string;
    presaleEnds?: string;
    teams: readonly {
      people: number;
      total: string;
      perPerson: string;
      approximate: boolean;
    }[];
  };
  faqIdPrefix: string;
}

export const courseCampaigns = {
  merida: {
    path: "/curso-merida-sep26",
    city: "Mérida",
    state: "Yucatán",
    date: { dayOfWeek: "Domingo", label: "20 de septiembre" },
    schedule: "10:00 am a 5:00 pm",
    venue: {
      name: "CANACINTRA",
      label: "CANACINTRA Mérida",
      addressLines: ["C. 30 151-7A, García Ginerés,", "97070 Mérida, Yuc."],
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.929189470549!2d-89.6359351!3d20.9954754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5673f7999decff%3A0xdd2f54fb7aeb1223!2sCANACINTRA!5e0!3m2!1ses-419!2smx!4v1788541775352!5m2!1ses-419!2smx",
    },
    whatsapp: {
      number: "5219617848718",
      messages: {
        presale: "Hola, quiero información sobre la preventa de $1,999 para el Curso de Resina Epóxica en Mérida.",
        regular: "Hola, quiero registrarme con la opción de pago al llegar de $2,499 para el Curso de Resina Epóxica en Mérida.",
        team: "Hola, quiero información sobre los paquetes para parejas y equipos del Curso de Resina Epóxica en Mérida.",
      },
    },
    pricing: {
      regular: "$2,499",
      presale: "$1,999",
      deposit: "$100",
      remaining: "$1,899",
      presaleEnds: "17 de septiembre",
      teams: [
        { people: 2, total: "$3,800", perPerson: "$1,900", approximate: false },
        { people: 3, total: "$4,999", perPerson: "$1,667", approximate: true },
      ],
    },
    faqIdPrefix: "merida-faq",
  },
  pachuca: {
    path: "/curso-pachuca-oct26",
    city: "Pachuca",
    state: "Hidalgo",
    date: { dayOfWeek: "Viernes", label: "16 de octubre" },
    schedule: "10:00 am - 5:00 pm",
    venue: {
      confirmed: true,
      name: "Salon Manina",
      label: "Salon Manina",
      addressLines: ["Profr José Ibarra Olivares 107, Revolución,", "42060 Pachuca de Soto, Hgo."],
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3746.360572745298!2d-98.7429417!3d20.1189994!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1095d81b28da3%3A0x963e619eabaa4b77!2sSal%C3%B3n%20de%20Eventos%20%22Manina%22!5e0!3m2!1ses-419!2smx!4v1790969379514!5m2!1ses-419!2smx",
    },
    whatsapp: {
      number: "5219617848718",
      messages: {
        presale: "Hola, quiero información sobre la preventa de $1,999 para el Curso de Resina Epóxica en Pachuca.",
        regular: "Hola, quiero registrarme con la opción de pago al llegar de $2,499 para el Curso de Resina Epóxica en Pachuca.",
        team: "Hola, quiero información sobre los paquetes para parejas y equipos del Curso de Resina Epóxica en Pachuca.",
      },
    },
    pricing: {
      regular: "$2,499",
      presale: "$1,999",
      deposit: "$100",
      remaining: "$1,899",
      teams: [
        { people: 2, total: "$3,800", perPerson: "$1,900", approximate: false },
        { people: 3, total: "$4,999", perPerson: "$1,667", approximate: true },
      ],
    },
    faqIdPrefix: "pachuca-faq",
  },
  ecatepec: {
    path: "/curso-ecatepec-oct26",
    city: "Ecatepec",
    state: "Estado de México",
    date: { dayOfWeek: "Sábado", label: "17 de octubre" },
    schedule: "10:00 am a 5:00 pm",
    venue: {
      confirmed: true,
      name: "Centro de eventos Charly",
      label: "Centro de eventos Charly",
      addressLines: [
        "Melchor Ocampo 35-MZ 032, San Cristóbal Centro,",
        "55000 Ecatepec de Morelos, Méx.",
      ],
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.6344118462907!2d-99.0451686!3d19.6001572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f1bd2427c869%3A0x81a165ac1edd449f!2sCENTRO%20DE%20EVENTOS%20CHARLY!5e0!3m2!1ses-419!2smx!4v1790883712528!5m2!1ses-419!2smx",
    },
    whatsapp: {
      number: "5219617848718",
      messages: {
        presale: "Hola, quiero información sobre la preventa de $1,999 para el Curso de Resina Epóxica en Ecatepec.",
        regular: "Hola, quiero registrarme con la opción de pago al llegar de $2,499 para el Curso de Resina Epóxica en Ecatepec.",
        team: "Hola, quiero información sobre los paquetes para parejas y equipos del Curso de Resina Epóxica en Ecatepec.",
      },
    },
    pricing: {
      regular: "$2,499",
      presale: "$1,999",
      deposit: "$100",
      remaining: "$1,899",
      presaleEnds: "15 de octubre",
      teams: [
        { people: 2, total: "$3,800", perPerson: "$1,900", approximate: false },
        { people: 3, total: "$4,999", perPerson: "$1,667", approximate: true },
      ],
    },
    faqIdPrefix: "ecatepec-faq",
  },
  iztapalapa: {
    path: "/curso-iztapalapa-oct26",
    city: "Iztapalapa",
    state: "Ciudad de México",
    date: { dayOfWeek: "Domingo", label: "18 de octubre" },
    schedule: "10:00 am a 5:00 pm",
    venue: {
      confirmed: false,
      name: "Sede por confirmar",
      label: "Sede por confirmar en Iztapalapa",
      addressLines: ["Dirección por confirmar"],
    },
    whatsapp: {
      number: "5219617848718",
      messages: {
        presale: "Hola, quiero información sobre la preventa de $1,999 para el Curso de Resina Epóxica en Iztapalapa.",
        regular: "Hola, quiero registrarme con la opción de pago al llegar de $2,499 para el Curso de Resina Epóxica en Iztapalapa.",
        team: "Hola, quiero información sobre los paquetes para parejas y equipos del Curso de Resina Epóxica en Iztapalapa.",
      },
    },
    pricing: {
      regular: "$2,499",
      presale: "$1,999",
      deposit: "$100",
      remaining: "$1,899",
      presaleEnds: "15 de octubre",
      teams: [
        { people: 2, total: "$3,800", perPerson: "$1,900", approximate: false },
        { people: 3, total: "$4,999", perPerson: "$1,667", approximate: true },
      ],
    },
    faqIdPrefix: "iztapalapa-faq",
  },
} satisfies Record<string, CourseCampaignConfig>;


