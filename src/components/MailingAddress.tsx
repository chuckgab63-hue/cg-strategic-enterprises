import { MAILING_ADDRESS_LINES } from '../config/site';

// The business mailing address (legal name, street, city/state/ZIP), one line each.
export default function MailingAddress({ className = '' }: { className?: string }) {
  return (
    <address className={`not-italic ${className}`.trim()}>
      {MAILING_ADDRESS_LINES.map(line => (
        <span key={line} className="block">{line}</span>
      ))}
    </address>
  );
}
