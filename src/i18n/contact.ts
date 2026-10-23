// Contact form, contact modal and /contact page.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md). The consent wording
// lives in ./consent.ts, which also needs legal review.

import { BUSINESS_NAME } from '../config/site';
import type { ContactFormCopy } from '../components/ContactForm';

type ModalCopy = ContactFormCopy & { title: string; subtitle: string; formLabel: string };

const en = {
  form: {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    message: 'Message',
    mobilePhone: 'Mobile phone number',
    firstNameRequired: 'Please enter your first name.',
    lastNameRequired: 'Please enter your last name.',
    sendAnother: 'Send another message',
    errorBefore: 'Something went wrong sending your message. Please try again, or reach us directly at',
    or: 'or',
  },
  modal: {
    close: 'Close',
    voiceTitle: 'AI Voice Interface',
    voiceBody: 'Bypass the form. Instantly connect with our intelligent voice agent to ask questions and route your inquiry directly to the right engineer.',
    variants: {
      default: {
        title: "Let's Connect",
        subtitle: "Choose how you'd like to reach us.",
        formLabel: 'Direct Message',
        firstNamePlaceholder: 'First name',
        lastNamePlaceholder: 'Last name',
        emailPlaceholder: 'Email Address',
        messagePlaceholder: 'How can we help you?',
        submitLabel: 'Send Message',
        submittingLabel: 'Sending...',
        successTitle: 'Message Sent',
        successMessage: "We've received your message and will be in touch shortly.",
      },
      cinematic: {
        title: 'Initialize Communication',
        subtitle: 'Select your preferred routing protocol.',
        formLabel: 'Secure Data Transmission',
        firstNamePlaceholder: 'First name',
        lastNamePlaceholder: 'Last name',
        emailPlaceholder: 'Secure Comm Link (Email)',
        messagePlaceholder: 'Define your operational objective...',
        submitLabel: 'Transmit Payload',
        submittingLabel: 'Transmitting...',
        successTitle: 'Payload Delivered',
        successMessage: 'Your data has been successfully routed to our internal systems.',
      },
    } as Record<'default' | 'cinematic', ModalCopy>,
  },
  page: {
    title: `Contact ${BUSINESS_NAME}`,
    intro: "Tell us about your project or ask a question. Call, email, or send a message below and we'll get back to you shortly.",
    phone: 'Phone',
    email: 'Email',
    mailingAddress: 'Mailing Address',
    formTitle: 'Send Us a Message',
    /** Pre-filled when the visitor comes from "Book a free intro call" on /website-check. */
    introCallTitle: 'Book a Free Intro Call',
    introCallMessage: "I just ran the free website check and I'd like to book a free intro call about the fixes. Good times to reach me:",
    pilotTitle: 'Pilot Missed-Call Rescue',
    pilotMessage: "I used the missed-call calculator and I'd like to talk about piloting Missed-Call Rescue. Roughly how many calls we get a week, and good times to reach me:",
    form: {
      firstNamePlaceholder: 'First name',
      lastNamePlaceholder: 'Last name',
      emailPlaceholder: 'Email Address',
      messagePlaceholder: 'How can we help you?',
      submitLabel: 'Send Message',
      submittingLabel: 'Sending...',
      successTitle: 'Message Sent',
      successMessage: "Thanks for reaching out. We've received your message and will be in touch shortly.",
    } as ContactFormCopy,
  },
};

const es: typeof en = {
  form: {
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo electrónico',
    message: 'Mensaje',
    mobilePhone: 'Número de celular',
    firstNameRequired: 'Ingrese su nombre.',
    lastNameRequired: 'Ingrese su apellido.',
    sendAnother: 'Enviar otro mensaje',
    errorBefore: 'Ocurrió un problema al enviar su mensaje. Inténtelo de nuevo o comuníquese directamente con nosotros a',
    or: 'o al',
  },
  modal: {
    close: 'Cerrar',
    voiceTitle: 'Asistente de voz con IA (en inglés)',
    voiceBody: 'Sin formularios: hable de inmediato con nuestro agente de voz con IA para hacer preguntas y enviar su consulta directamente al ingeniero indicado. Por ahora, el agente solo habla inglés.',
    variants: {
      default: {
        title: 'Conectemos',
        subtitle: 'Elija cómo prefiere comunicarse con nosotros.',
        formLabel: 'Mensaje directo',
        firstNamePlaceholder: 'Nombre',
        lastNamePlaceholder: 'Apellido',
        emailPlaceholder: 'Correo electrónico',
        messagePlaceholder: '¿En qué podemos ayudarle?',
        submitLabel: 'Enviar mensaje',
        submittingLabel: 'Enviando...',
        successTitle: 'Mensaje enviado',
        successMessage: 'Recibimos su mensaje y nos comunicaremos con usted pronto.',
      },
      cinematic: {
        title: 'Iniciar comunicación',
        subtitle: 'Seleccione su protocolo de enrutamiento preferido.',
        formLabel: 'Transmisión segura de datos',
        firstNamePlaceholder: 'Nombre',
        lastNamePlaceholder: 'Apellido',
        emailPlaceholder: 'Enlace de comunicación seguro (correo electrónico)',
        messagePlaceholder: 'Defina su objetivo operativo...',
        submitLabel: 'Transmitir datos',
        submittingLabel: 'Transmitiendo...',
        successTitle: 'Datos entregados',
        successMessage: 'Sus datos se enviaron correctamente a nuestros sistemas internos.',
      },
    },
  },
  page: {
    title: `Contacto: ${BUSINESS_NAME}`,
    intro: 'Cuéntenos sobre su proyecto o háganos una pregunta. Llame, escríbanos un correo electrónico o envíenos un mensaje aquí abajo y le responderemos pronto.',
    phone: 'Teléfono',
    email: 'Correo electrónico',
    mailingAddress: 'Dirección postal',
    formTitle: 'Envíenos un mensaje',
    introCallTitle: 'Reserve una llamada introductoria gratuita',
    introCallMessage: 'Acabo de hacer la revisión gratuita de mi sitio web y me gustaría reservar una llamada introductoria gratuita sobre las mejoras. Buenos horarios para contactarme:',
    pilotTitle: 'Pruebe Missed-Call Rescue',
    pilotMessage: 'Usé la calculadora de llamadas perdidas y me gustaría hablar sobre una prueba de Missed-Call Rescue. Cuántas llamadas recibimos más o menos por semana y buenos horarios para contactarme:',
    form: {
      firstNamePlaceholder: 'Nombre',
      lastNamePlaceholder: 'Apellido',
      emailPlaceholder: 'Correo electrónico',
      messagePlaceholder: '¿En qué podemos ayudarle?',
      submitLabel: 'Enviar mensaje',
      submittingLabel: 'Enviando...',
      successTitle: 'Mensaje enviado',
      successMessage: 'Gracias por escribirnos. Recibimos su mensaje y nos comunicaremos con usted pronto.',
    },
  },
};

export default { en, es };
