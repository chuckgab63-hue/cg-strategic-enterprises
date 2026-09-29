import { Link } from 'react-router-dom';
import LegalPage, { LegalSection } from '../components/LegalPage';
import {
  BUSINESS_NAME, BUSINESS_LOCATION, EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF, LEGAL_LAST_UPDATED,
} from '../config/site';

const linkClass = 'text-brand-orange underline hover:text-white transition-colors';

export default function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These Terms of Service ("Terms") govern your use of cgstrategic.dev and the services provided
        by {BUSINESS_NAME} LLC ("Company," "we," "our," or "us"). By using this website or our
        services, you agree to these Terms. If you do not agree, please do not use them.
      </p>

      <LegalSection title="1. Services Provided">
        <p>
          {BUSINESS_NAME} LLC provides digital infrastructure engineering, custom web applications, AI
          integration, and workflow automation services. Specific deliverables, timelines, and costs
          will be outlined in a separate Statement of Work (SOW) or Master Services Agreement (MSA)
          for your specific project. If those documents conflict with these Terms, the signed
          agreement controls.
        </p>
      </LegalSection>

      <LegalSection title="2. Use of This Website">
        <p>
          You may use this website for lawful purposes only. Do not attempt to disrupt the site,
          gain unauthorized access to it, or submit false or misleading information through our
          forms. The interactive demos on this site are examples of our work and are provided for
          demonstration purposes only.
        </p>
      </LegalSection>

      <LegalSection title="3. Intellectual Property">
        <p>
          Unless explicitly stated otherwise in your specific contract, all pre-existing codebases,
          automation templates, and proprietary frameworks used to construct your solution remain the
          intellectual property of {BUSINESS_NAME} LLC. Clients receive a license to use the deployed
          final product as intended. The content, design, and code of this website belong to{' '}
          {BUSINESS_NAME} LLC and may not be copied without our permission.
        </p>
      </LegalSection>

      <LegalSection title="4. Disclaimer and Limitation of Liability">
        <p>
          This website and its content are provided "as is," without warranties of any kind. To the
          fullest extent allowed by law, {BUSINESS_NAME} LLC is not liable for any indirect,
          incidental, or consequential damages arising from your use of this website.
        </p>
      </LegalSection>

      <LegalSection title="5. Privacy">
        <p>
          Our <Link to="/privacy" className={linkClass}>Privacy Policy</Link> explains how we collect,
          use, and protect your information.
        </p>
      </LegalSection>

      <LegalSection title="6. Governing Law">
        <p>These Terms are governed by the laws of the State of Florida.</p>
      </LegalSection>

      <LegalSection id="sms" title="SMS Terms">
        <p>
          <strong className="text-white">Program name:</strong> CG Strategic Enterprises Client Messaging
        </p>
        <p>
          <strong className="text-white">Description:</strong> If you opt in, {BUSINESS_NAME} will send
          you text messages about inquiries you submit, appointment scheduling and reminders, and
          project status updates.
        </p>
        <p>
          <strong className="text-white">How to opt in:</strong> Check the optional text message consent
          box on our <Link to="/contact" className={linkClass}>contact form</Link> and provide your mobile number. Consent is not a condition of
          purchase.
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Message frequency varies.</li>
          <li>Message and data rates may apply.</li>
          <li>Reply STOP to cancel at any time. After you send STOP, we will send one confirmation message and no further messages.</li>
          <li>
            Reply HELP for help, or contact us at{' '}
            <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a> or{' '}
            <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>.
          </li>
          <li>Carriers are not liable for delayed or undelivered messages.</li>
        </ul>
        <p>
          For details on how we handle your mobile number and consent, see our{' '}
          <Link to="/privacy" className={linkClass}>Privacy Policy</Link>.
        </p>
        <p className="text-sm text-slate-400">SMS Terms last updated: {LEGAL_LAST_UPDATED}</p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          {BUSINESS_NAME} LLC<br />
          {BUSINESS_LOCATION}<br />
          Email: <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a><br />
          Phone: <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
