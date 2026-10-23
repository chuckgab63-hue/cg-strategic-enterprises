// Spanish /es/terms. NEEDS NATIVE/LEGAL REVIEW (docs/SPANISH_REVIEW.md).
// A courtesy translation of src/pages/Terms.tsx: the English version governs
// and LegalPage says so at the top. Keep the two in step when either changes.
// Program names stay in English: they're the names registered with carriers.

import { Link } from 'react-router-dom';
import LegalPage, { LegalSection } from '../../components/LegalPage';
import MailingAddress from '../../components/MailingAddress';
import {
  BUSINESS_NAME, LEGAL_BUSINESS_NAME, EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF, TERMS_LAST_UPDATED,
} from '../../config/site';
import { LOCALE } from '../lang';

const linkClass = 'text-brand-orange underline hover:text-white transition-colors';

export default function TermsEs() {
  const updated = new Date(TERMS_LAST_UPDATED).toLocaleDateString(LOCALE.es, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <LegalPage title="Términos del servicio" lastUpdated={TERMS_LAST_UPDATED}>
      <p>
        Estos Términos del servicio ("Términos") rigen su uso de cgstrategic.dev y de los servicios que
        presta {LEGAL_BUSINESS_NAME} ("la Compañía", "nosotros" o "nuestro"). Al usar este sitio web o
        nuestros servicios, usted acepta estos Términos. Si no los acepta, le pedimos que no los use.
      </p>

      <LegalSection title="1. Servicios que prestamos">
        <p>
          {LEGAL_BUSINESS_NAME} presta servicios de ingeniería de infraestructura digital, aplicaciones web
          a la medida, integración de inteligencia artificial y automatización de flujos de trabajo. Los
          entregables, plazos y costos específicos se detallarán en una Declaración de Trabajo (SOW, por
          sus siglas en inglés) o en un Acuerdo Marco de Servicios (MSA, por sus siglas en inglés) aparte
          para su proyecto. Si esos documentos contradicen estos Términos, prevalece el acuerdo firmado.
        </p>
      </LegalSection>

      <LegalSection title="2. Uso de este sitio web">
        <p>
          Puede usar este sitio web únicamente con fines lícitos. No intente interrumpir el sitio, obtener
          acceso no autorizado a él ni enviar información falsa o engañosa mediante nuestros formularios.
          Las demostraciones interactivas de este sitio son ejemplos de nuestro trabajo y se ofrecen solo
          con fines de demostración.
        </p>
      </LegalSection>

      <LegalSection title="3. Propiedad intelectual">
        <p>
          Salvo que su contrato específico indique expresamente lo contrario, todo el código preexistente,
          las plantillas de automatización y los marcos de trabajo propios que se usen para construir su
          solución siguen siendo propiedad intelectual de {LEGAL_BUSINESS_NAME}. Los clientes reciben una
          licencia para usar el producto final implementado según lo previsto. El contenido, el diseño y el
          código de este sitio web pertenecen a {LEGAL_BUSINESS_NAME} y no pueden copiarse sin nuestro
          permiso.
        </p>
      </LegalSection>

      <LegalSection title="4. Exención de garantías y limitación de responsabilidad">
        <p>
          Este sitio web y su contenido se ofrecen "tal cual", sin garantías de ningún tipo. En la máxima
          medida que permita la ley, {LEGAL_BUSINESS_NAME} no será responsable de ningún daño indirecto,
          incidental o consecuente que resulte del uso de este sitio web.
        </p>
      </LegalSection>

      <LegalSection title="5. Privacidad">
        <p>
          Nuestra <Link to="/es/privacy" className={linkClass}>Política de privacidad</Link> explica cómo
          recopilamos, usamos y protegemos su información.
        </p>
      </LegalSection>

      <LegalSection title="6. Ley aplicable">
        <p>Estos Términos se rigen por las leyes del estado de Florida.</p>
      </LegalSection>

      <LegalSection id="sms" title="Términos de SMS">
        <p>
          Tenemos dos programas de mensajes de texto independientes. Cada uno tiene su propia casilla de
          aceptación opcional en nuestro <Link to="/es/contact" className={linkClass}>formulario de contacto</Link>,
          así que puede unirse a uno, a ambos o a ninguno.
        </p>

        <h3 className="text-white font-bold text-lg mt-2">Programa 1: mensajes para clientes</h3>
        <p>
          <strong className="text-white">Nombre del programa:</strong> CG Strategic Enterprises Client Messaging
        </p>
        <p>
          <strong className="text-white">Descripción:</strong> Si lo acepta, {BUSINESS_NAME} le enviará
          mensajes de texto sobre las consultas que envíe, la programación de citas y recordatorios, y el
          avance de sus proyectos.
        </p>
        <p>La frecuencia de los mensajes varía.</p>

        <h3 className="text-white font-bold text-lg mt-2">Programa 2: noticias y ofertas</h3>
        <p>
          CG Strategic Enterprises News &amp; Offers: noticias, consejos y ofertas promocionales ocasionales para los suscriptores que lo acepten por separado. Hasta 4 mensajes al mes.
        </p>

        <h3 className="text-white font-bold text-lg mt-2">Cómo inscribirse</h3>
        <p>
          Marque la casilla de consentimiento para mensajes de texto del programa que desee en nuestro{' '}
          <Link to="/es/contact" className={linkClass}>formulario de contacto</Link> e ingrese su número de
          celular. Ambas casillas son opcionales y aparecen sin marcar. El consentimiento no es una
          condición de compra.
        </p>

        <h3 className="text-white font-bold text-lg mt-2">Términos que se aplican a ambos programas</h3>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Pueden aplicarse tarifas de mensajes y datos.</li>
          <li>Responda STOP para cancelar en cualquier momento. Después de que envíe STOP, le enviaremos un mensaje de confirmación y ningún otro mensaje.</li>
          <li>Responder STOP detiene todos los mensajes de texto de nuestro número, en ambos programas.</li>
          <li>
            Responda HELP para obtener ayuda, o comuníquese con nosotros a{' '}
            <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a> o al{' '}
            <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>.
          </li>
          <li>Los operadores de telefonía móvil no son responsables de los mensajes retrasados o no entregados.</li>
        </ul>
        <p>
          Para saber cómo tratamos su número de celular y su consentimiento, consulte nuestra{' '}
          <Link to="/es/privacy" className={linkClass}>Política de privacidad</Link>.
        </p>
        <p className="text-sm text-slate-400">Última actualización de los Términos de SMS: {updated}</p>
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
