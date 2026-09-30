import { Link } from 'react-router-dom';
import LegalPage, { LegalSection } from '../components/LegalPage';
import MailingAddress from '../components/MailingAddress';
import {
  BUSINESS_NAME, LEGAL_BUSINESS_NAME, BUSINESS_LOCATION, EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF,
} from '../config/site';

const linkClass = 'text-brand-orange underline hover:text-white transition-colors';

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        {LEGAL_BUSINESS_NAME} ("{BUSINESS_NAME}," "we," "our," or "us") is a technology consulting
        business based in {BUSINESS_LOCATION}. This Privacy Policy explains, in plain language, what
        information we collect when you visit cgstrategic.dev, fill out one of our forms, or call or
        text us, how we use it, and the choices you have.
      </p>

      <LegalSection title="Information We Collect">
        <p>We collect information you choose to give us, such as when you submit a contact form, call us, or text us:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your phone number, including a mobile number if you provide one</li>
          <li>Your company or business name</li>
          <li>The content of your message and any details you share about your project</li>
          <li>Whether you agreed to receive service texts, promotional texts, or marketing emails from us, and when</li>
          <li>Records of calls and text messages you exchange with us</li>
        </ul>
        <p>
          When you visit our website, our hosting provider also automatically records basic
          technical information, such as your IP address, browser type, and the pages you visited,
          so we can keep the site secure and working properly.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <p>We use your information only to run our business and serve you, including to:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Respond to your inquiry and answer your questions</li>
          <li>Schedule appointments and send reminders</li>
          <li>Provide, manage, and send updates about the projects you hire us for</li>
          <li>Send text messages and marketing emails you have agreed to receive</li>
          <li>Keep records of our work and meet our legal and accounting obligations</li>
          <li>Keep our website secure and improve how it works</li>
        </ul>
        <p>We do not sell or rent your personal information to anyone.</p>
      </LegalSection>

      <LegalSection title="SMS/Text Messaging">
        <p>
          Mobile phone numbers and SMS consent collected by CG Strategic Enterprises will not be shared, sold, or rented to third parties or affiliates for marketing or promotional purposes. Information may be shared with service providers (such as our messaging platform) solely to deliver messages you have requested. Text messaging originator opt-in data and consent will not be shared with any third parties.
        </p>
        <p>
          You can opt in to text messages using the consent checkbox on our{' '}
          <Link to="/contact" className={linkClass}>Contact page</Link>. Text messaging is optional. You can opt out at any time by replying STOP, or get help by
          replying HELP. See our <Link to="/terms#sms" className={linkClass}>SMS Terms</Link> for
          full program details.
        </p>
        <p>
          Promotional text messages (occasional news, tips, and offers) are a separate program with
          their own opt-in checkbox. Agreeing to texts about your inquiry does not sign you up for
          promotional texts, and you can join either program without the other. Consent for either
          program is never shared with third parties or affiliates for their marketing purposes.
        </p>
      </LegalSection>

      <LegalSection title="Email Communications">
        <p>
          We reply by email to inquiries you send us and email you about projects you hire us for.
          We only send marketing emails, such as occasional news, tips, and offers, to people who
          opt in using the email checkbox on our{' '}
          <Link to="/contact" className={linkClass}>Contact page</Link>.
        </p>
        <p>
          Every marketing email we send includes an unsubscribe link, and we honor unsubscribe
          requests promptly. You can also unsubscribe by emailing{' '}
          <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a>. Unsubscribing from marketing
          emails does not stop messages about an inquiry or project you have with us.
        </p>
        <p>
          We may use an email delivery provider to send marketing emails. That provider processes
          your email address only to deliver our messages and may not use it for its own marketing.
        </p>
      </LegalSection>

      <LegalSection title="Service Providers We Use">
        <p>
          We rely on a small number of trusted service providers to operate. They process information
          only on our behalf and only as needed to provide their services to us:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li><strong className="text-white">Website hosting</strong> (Vercel) — hosts and delivers this website.</li>
          <li><strong className="text-white">Make.com</strong> — automation platform that receives form submissions and routes them to our team.</li>
          <li><strong className="text-white">Twilio</strong> — phone and messaging platform we use to make and receive calls and texts.</li>
          <li><strong className="text-white">Google Workspace / Gmail</strong> — email, documents, and records we use to communicate with you and manage our work.</li>
          <li><strong className="text-white">Email delivery provider</strong> — may be used to send marketing emails to people who have opted in.</li>
          <li><strong className="text-white">Google Gemini</strong> (Google's generative AI API) — images and text you upload to the interactive demos on our portfolio are sent to Gemini for processing. {BUSINESS_NAME} does not use them for any other purpose.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          We keep your information only as long as we need it for the purposes described above. In
          general, we keep inquiry and project records for as long as we are working with you and
          for a reasonable period afterward to meet our legal, tax, and accounting obligations. We
          keep records of text-message and marketing-email consent, opt-outs, and unsubscribes for as
          long as needed to honor your choices and show that we did. When information is no longer needed, we delete it.
        </p>
      </LegalSection>

      <LegalSection title="Your Choices and Deletion Requests">
        <p>
          You can ask us to access, correct, or delete the personal information we hold about you
          by emailing <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a>. We will confirm your
          request and respond within a reasonable time. We may keep limited information when the law
          requires it, such as a record that you opted out of text messages.
        </p>
        <p>
          You can stop receiving text messages at any time by replying STOP, and unsubscribe from
          marketing emails using the link in any of them.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We use reasonable safeguards to protect your information. No method of sending or storing
          data online is completely secure, but we work to protect your information and limit
          access to people who need it.
        </p>
      </LegalSection>

      <LegalSection title="Children's Privacy">
        <p>
          Our website and services are intended for businesses and adults. We do not knowingly
          collect information from children under 13.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this policy from time to time. When we do, we will change the "Last updated"
          date at the top of this page.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <MailingAddress />
        <p>
          Email: <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a><br />
          Phone: <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
