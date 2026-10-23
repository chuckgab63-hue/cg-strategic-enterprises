// Spanish /es/privacy. NEEDS NATIVE/LEGAL REVIEW (docs/SPANISH_REVIEW.md).
// A courtesy translation of src/pages/Privacy.tsx: the English version governs
// and LegalPage says so at the top. Keep the two in step when either changes.

import { Link } from 'react-router-dom';
import LegalPage, { LegalSection } from '../../components/LegalPage';
import MailingAddress from '../../components/MailingAddress';
import {
  BUSINESS_NAME, LEGAL_BUSINESS_NAME, BUSINESS_LOCATION, EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF, PRIVACY_LAST_UPDATED,
} from '../../config/site';

const linkClass = 'text-brand-orange underline hover:text-white transition-colors';

export default function PrivacyEs() {
  return (
    <LegalPage title="Política de privacidad" lastUpdated={PRIVACY_LAST_UPDATED}>
      <p>
        {LEGAL_BUSINESS_NAME} ("{BUSINESS_NAME}", "nosotros" o "nuestro") es una empresa de consultoría
        tecnológica con sede en {BUSINESS_LOCATION}. Esta Política de privacidad explica, en lenguaje
        sencillo, qué información recopilamos cuando usted visita cgstrategic.dev, completa uno de
        nuestros formularios o nos llama o nos envía mensajes de texto, cómo la usamos y qué opciones
        tiene.
      </p>

      <LegalSection title="Información que recopilamos">
        <p>Recopilamos la información que usted decide darnos, por ejemplo, cuando envía un formulario de contacto, nos llama o nos envía un mensaje de texto:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Su nombre</li>
          <li>Su dirección de correo electrónico</li>
          <li>Su número de teléfono, incluido un número de celular si nos lo proporciona</li>
          <li>El nombre de su compañía o negocio</li>
          <li>El contenido de su mensaje y cualquier detalle que comparta sobre su proyecto</li>
          <li>Las cifras que ingresa en nuestra calculadora para negocios de comidas preparadas, si nos pide que le enviemos un resumen por correo electrónico</li>
          <li>Si aceptó recibir de nuestra parte mensajes de texto de servicio, mensajes de texto promocionales o correos electrónicos de marketing, y cuándo lo hizo</li>
          <li>Registros de las llamadas y los mensajes de texto que intercambia con nosotros</li>
        </ul>
        <p>
          Cuando usted visita nuestro sitio web, nuestro proveedor de alojamiento también registra
          automáticamente información técnica básica, como su dirección IP, el tipo de navegador y las
          páginas que visitó, para que podamos mantener el sitio seguro y funcionando correctamente.
        </p>
      </LegalSection>

      <LegalSection title="Cómo usamos su información">
        <p>Usamos su información únicamente para operar nuestro negocio y atenderle, lo que incluye:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Responder a su consulta y a sus preguntas</li>
          <li>Programar citas y enviar recordatorios</li>
          <li>Prestar y administrar los proyectos para los que nos contrate, y enviarle novedades sobre ellos</li>
          <li>Enviar los mensajes de texto y los correos electrónicos de marketing que aceptó recibir</li>
          <li>Llevar registros de nuestro trabajo y cumplir nuestras obligaciones legales y contables</li>
          <li>Mantener nuestro sitio web seguro y mejorar su funcionamiento</li>
        </ul>
        <p>No vendemos ni alquilamos su información personal a nadie.</p>
      </LegalSection>

      <LegalSection title="Mensajes SMS/de texto">
        <p>
          Los números de celular y el consentimiento para SMS que recopila CG Strategic Enterprises no se compartirán, venderán ni alquilarán a terceros ni a afiliados con fines de marketing o promocionales. La información puede compartirse con proveedores de servicios (como nuestra plataforma de mensajería) únicamente para entregar los mensajes que usted solicitó. Los datos de aceptación y el consentimiento del remitente de los mensajes de texto no se compartirán con ningún tercero.
        </p>
        <p>
          Puede aceptar recibir mensajes de texto mediante la casilla de consentimiento de nuestra{' '}
          <Link to="/es/contact" className={linkClass}>página de contacto</Link>. Los mensajes de texto son opcionales. Puede cancelarlos en cualquier momento respondiendo STOP, u obtener ayuda
          respondiendo HELP. Consulte nuestros <Link to="/es/terms#sms" className={linkClass}>Términos de SMS</Link> para
          conocer todos los detalles del programa.
        </p>
        <p>
          Los mensajes de texto promocionales (noticias, consejos y ofertas ocasionales) son un programa
          aparte con su propia casilla de aceptación. Aceptar mensajes de texto sobre su consulta no lo
          inscribe en los mensajes promocionales, y puede unirse a cualquiera de los dos programas sin el
          otro. El consentimiento para cualquiera de los programas nunca se comparte con terceros ni con
          afiliados para sus fines de marketing.
        </p>
      </LegalSection>

      <LegalSection title="Comunicaciones por correo electrónico">
        <p>
          Respondemos por correo electrónico a las consultas que nos envía, le escribimos sobre los
          proyectos para los que nos contrata y le enviamos el resumen de la calculadora que solicite.
          Solo enviamos correos electrónicos de marketing, como noticias, consejos y ofertas ocasionales, a
          las personas que lo aceptan mediante la casilla de correo electrónico de nuestra{' '}
          <Link to="/es/contact" className={linkClass}>página de contacto</Link> o de nuestra{' '}
          <Link to="/es/meal-prep-calculator" className={linkClass}>calculadora para negocios de comidas preparadas</Link>.
        </p>
        <p>
          Cada correo electrónico de marketing que enviamos incluye un enlace para cancelar la
          suscripción, y atendemos esas solicitudes con prontitud. También puede cancelar su suscripción
          escribiendo a <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a>. Cancelar la suscripción a
          los correos de marketing no detiene los mensajes sobre una consulta o un proyecto que tenga con
          nosotros.
        </p>
        <p>
          Es posible que usemos un proveedor de envío de correo electrónico para enviar los correos de
          marketing. Ese proveedor procesa su dirección de correo electrónico solo para entregar nuestros
          mensajes y no puede usarla para su propio marketing.
        </p>
      </LegalSection>

      <LegalSection title="Proveedores de servicios que usamos">
        <p>
          Trabajamos con un pequeño número de proveedores de servicios de confianza. Ellos procesan la
          información solo en nuestro nombre y únicamente en la medida necesaria para prestarnos sus
          servicios:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li><strong className="text-white">Alojamiento del sitio web</strong> (Vercel): aloja y entrega este sitio web.</li>
          {/* NEEDS NATIVE REVIEW: Vercel Web Analytics line (docs/SPANISH_REVIEW.md). */}
          <li><strong className="text-white">Vercel Web Analytics</strong>: usamos Vercel Web Analytics, que recopila datos de uso anónimos y sin cookies para mejorar el sitio.</li>
          <li><strong className="text-white">Make.com</strong>: plataforma de automatización que recibe los envíos de formularios y los dirige a nuestro equipo.</li>
          <li><strong className="text-white">Twilio</strong>: plataforma de telefonía y mensajería que usamos para hacer y recibir llamadas y mensajes de texto.</li>
          <li><strong className="text-white">Google Workspace / Gmail</strong>: correo electrónico, documentos y registros que usamos para comunicarnos con usted y administrar nuestro trabajo.</li>
          <li><strong className="text-white">Proveedor de envío de correo electrónico</strong>: puede usarse para enviar correos de marketing a las personas que lo aceptaron.</li>
          <li><strong className="text-white">Google Gemini</strong> (la API de IA generativa de Google): las imágenes y el texto que usted sube a las demostraciones interactivas de nuestro portafolio se envían a Gemini para su procesamiento. {BUSINESS_NAME} no los usa para ningún otro fin.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Conservación de datos">
        <p>
          Conservamos su información solo durante el tiempo que la necesitemos para los fines descritos
          arriba. En general, conservamos los registros de consultas y proyectos mientras trabajamos con
          usted y durante un período razonable después, para cumplir nuestras obligaciones legales,
          fiscales y contables. Conservamos los registros del consentimiento para mensajes de texto y
          correos de marketing, de las cancelaciones y de las bajas durante el tiempo necesario para
          respetar sus decisiones y demostrar que lo hicimos. Cuando la información ya no se necesita, la
          eliminamos.
        </p>
      </LegalSection>

      <LegalSection title="Sus opciones y solicitudes de eliminación">
        <p>
          Puede pedirnos que le demos acceso a la información personal que tenemos sobre usted, que la
          corrijamos o que la eliminemos, escribiendo a <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a>.
          Confirmaremos su solicitud y responderemos en un plazo razonable. Es posible que conservemos
          información limitada cuando la ley lo exija, como el registro de que usted canceló los mensajes
          de texto.
        </p>
        <p>
          Puede dejar de recibir mensajes de texto en cualquier momento respondiendo STOP, y cancelar su
          suscripción a los correos de marketing con el enlace que aparece en cualquiera de ellos.
        </p>
      </LegalSection>

      <LegalSection title="Seguridad">
        <p>
          Usamos medidas de protección razonables para proteger su información. Ningún método para enviar
          o almacenar datos en internet es completamente seguro, pero trabajamos para proteger su
          información y limitar el acceso a las personas que la necesitan.
        </p>
      </LegalSection>

      <LegalSection title="Privacidad de los niños">
        <p>
          Nuestro sitio web y nuestros servicios están dirigidos a empresas y adultos. No recopilamos a
          sabiendas información de niños menores de 13 años.
        </p>
      </LegalSection>

      <LegalSection title="Cambios a esta política">
        <p>
          Es posible que actualicemos esta política de vez en cuando. Cuando lo hagamos, cambiaremos la
          fecha de "Última actualización" en la parte superior de esta página.
        </p>
      </LegalSection>

      <LegalSection title="Contáctenos">
        <MailingAddress />
        <p>
          Correo electrónico: <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a><br />
          Teléfono: <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
