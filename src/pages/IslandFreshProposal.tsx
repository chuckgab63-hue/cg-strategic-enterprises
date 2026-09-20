import IslandFreshHeroArt from '../components/IslandFreshHeroArt';
import IslandFreshMenu from '../components/IslandFreshMenu';

const PROTOTYPE_BASE = 'https://islandfreshmeals-git-main-chuckgab63-5322s-projects.vercel.app';

const PROTOTYPE_LINKS = [
  { label: 'Try the Storefront', href: `${PROTOTYPE_BASE}/menu` },
  { label: 'Try the Admin Dashboard', href: `${PROTOTYPE_BASE}/admin/login` },
];

const PHASES = [
  {
    n: 1,
    name: 'Audit',
    when: 'This Thursday',
    body: 'I map what you are running today: the site, the checkout, your customer and subscription data, your CRM, your email, and your payment processing. Recorded so I can work from what was actually said instead of my notes.',
  },
  {
    n: 2,
    name: 'Requirements',
    when: 'Following week',
    body: 'The audit becomes an itemized plan. Every piece written down, priced separately, with the sequence they get built in. We go back and forth until it matches what you actually want.',
  },
  // TODO(chuck): the scope behind this phase has grown since the original estimate.
  // It now includes a working backend (database + secure admin auth) and the AI image
  // pipeline, both demonstrated this week. Revisit the quoted range before numbers go out.
  {
    n: 3,
    name: 'Pricing',
    when: 'After requirements',
    body: 'A real quote, broken out line by line. Not a number I guessed at before understanding your systems.',
  },
  {
    n: 4,
    name: 'Build',
    when: 'Staged',
    body: 'Urgent items ship first so the bleeding stops early, rather than waiting for one big launch at the end.',
  },
  {
    n: 5,
    name: 'Ongoing support',
    when: 'Monthly',
    body: 'Monitoring, fixes, and keeping third-party integrations alive as they change underneath you. The thing that was missing last time.',
  },
];

const SCOPE = [
  {
    group: 'Already built',
    urgent: false,
    live: true,
    note: 'Demonstrated working this week. These are running now, not proposals.',
    items: [
      ['Secure Admin Dashboard', 'You update meal pricing, toggle free delivery on and off, manage pickup locations, and edit coupon codes yourself, in real time, with a full history of every change. No developer in the loop. Live and working as of this week.'],
      ['AI-Consistent Meal Photography', 'New meals get a professional, on-brand photo generated automatically to match the look of the existing menu, so the imagery stays consistent as the menu grows. Each image is quality-checked automatically before it comes to you for approval. Already generating real images today.'],
    ],
  },
  {
    group: 'Stop the bleeding',
    urgent: true,
    live: false,
    note: 'Built and shipped first, ahead of everything else.',
    items: [
      ['Checkout and order capture rebuild', 'A checkout that reliably records every order and customer, replacing the one that stopped logging after your provider moved servers.'],
      ['Nutritional label generation', 'Pull order and recipe data into printable labels on demand. This is the piece currently costing you real money every week.'],
    ],
  },
  {
    group: 'Foundation',
    urgent: false,
    live: false,
    note: 'The plumbing everything else depends on.',
    items: [
      ['Customer and subscription migration', 'Roughly 2,000 profiles moved with a staged export, verify, import, verify again process. You lost 50 subscriptions in a past move. That does not happen here.'],
      ['CRM platform migration', 'Move off your current tool onto something cloud-based that also absorbs what Mailchimp is doing, so you are paying for one system instead of two.'],
      ['Payment processor integration', 'Wire your existing processor into the new checkout. You mentioned your rates beat Square, so the build works around what you already have rather than forcing a switch.'],
    ],
  },
  {
    group: 'Automation',
    urgent: false,
    live: false,
    note: 'Work you currently do by hand, done for you.',
    items: [
      ['Weekly specials and rotating coupons', 'New code generated and pushed into the weekly campaign automatically. No more setting up the same FRESH20 by hand every week.'],
      ['One-click reorder', 'Past customers reorder their usual from a single link in an email. No login, no rebuilding a cart.'],
      ['Delivery notifications with live route', 'Customers get a map link showing the route from wherever they are, not a static address.'],
      ['Google review capture', 'A review prompt in the post-delivery email, plus tap-to-review cards handed over at the door.'],
    ],
  },
  {
    group: 'Intelligence',
    urgent: false,
    live: false,
    note: 'The part your current provider cannot build.',
    items: [
      ['AI meal recommendation assistant', 'Customers describe what they want in plain language and get matched to real meals from your menu. Working demo available now.'],
    ],
  },
];

function PrototypeLinks({ className = '' }) {
  return (
    <p className={`if-cta-row ${className}`.trim()}>
      {PROTOTYPE_LINKS.map((link) => (
        <a
          className="if-cta"
          href={link.href}
          key={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
          <span aria-hidden="true">→</span>
        </a>
      ))}
      <span className="if-cta-note">Both open the working build in a new tab.</span>
    </p>
  );
}

export default function IslandFreshProposal() {
  return (
    <div className="if-proposal">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Karla:wght@400;500;700&display=swap');

        .if-proposal {
          --ink: #0B2B21;
          --ink-soft: #3E5B4F;
          --ground: #F4F7F2;
          --surface: #FFFFFF;
          --edge: #D6E0D6;
          --mango: #E2930B;
          --hibiscus: #B8362E;
          --leaf: #1F7A4D;
          background: var(--ground);
          color: var(--ink);
          font-family: 'Karla', system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.6;
          /* #root in index.css centers everything site-wide. This proposal is set as
             left-aligned prose, so undo that inside the page only. */
          text-align: left;
        }
        .if-proposal h1, .if-proposal h2, .if-proposal h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.015em;
        }
        .if-wrap { max-width: 760px; margin: 0 auto; padding: 0 28px; }
        .if-measure { max-width: 63ch; }

        .if-art-band {
          width: 100%;
          background: #0B2B21;
          line-height: 0;
        }
        .if-hero-art { width: 100%; height: auto; display: block; }

        .if-hero { padding: 64px 0 72px; }
        .if-hero h1 { font-size: clamp(2.4rem, 6vw, 3.6rem); margin: 0 0 24px; }
        .if-kicker {
          font-family: 'Karla', sans-serif;
          font-size: 0.95rem;
          color: var(--ink-soft);
          margin-bottom: 20px;
        }
        .if-lede { font-size: 1.15rem; color: var(--ink-soft); }

        .if-band {
          background: var(--ink);
          color: #EAF2EB;
          padding: 56px 0;
          margin: 8px 0 72px;
        }
        .if-band h2 { color: #FFFFFF; font-size: 1.7rem; margin: 0 0 18px; }
        .if-band p { color: #B9CEC0; }
        .if-cost {
          font-family: 'Fraunces', serif;
          font-size: 1.05rem;
          color: var(--mango);
          border-left: 3px solid var(--mango);
          padding-left: 16px;
          margin-top: 26px;
        }

        .if-section { padding-bottom: 76px; }
        .if-section > h2 { font-size: 2rem; margin: 0 0 10px; }
        .if-section > .if-sub { color: var(--ink-soft); margin: 0 0 40px; }

        .if-phase { display: grid; grid-template-columns: 54px 1fr; gap: 20px; padding-bottom: 34px; }
        .if-phase-n {
          font-family: 'Fraunces', serif;
          font-size: 1.5rem;
          color: var(--mango);
          border-top: 2px solid var(--mango);
          padding-top: 8px;
        }
        .if-phase h3 { font-size: 1.25rem; margin: 4px 0 2px; }
        .if-phase-when { font-size: 0.85rem; color: var(--ink-soft); margin-bottom: 10px; }
        .if-phase p { margin: 0; color: var(--ink-soft); }

        .if-group { margin-bottom: 46px; }
        .if-group-head {
          display: flex; align-items: baseline; gap: 12px;
          border-bottom: 1px solid var(--edge);
          padding-bottom: 10px; margin-bottom: 8px;
        }
        .if-group-head h3 { font-size: 1.3rem; margin: 0; }
        .if-flag {
          font-family: 'Karla', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          color: var(--hibiscus);
          border: 1px solid var(--hibiscus);
          border-radius: 2px;
          padding: 2px 7px;
        }
        .if-group-note { font-size: 0.92rem; color: var(--ink-soft); margin: 0 0 22px; }
        .if-item { padding: 16px 0; border-bottom: 1px solid var(--edge); }
        .if-item:last-child { border-bottom: none; }
        .if-item strong { display: block; font-weight: 700; margin-bottom: 4px; }
        .if-item span { color: var(--ink-soft); font-size: 0.97rem; }
        .if-group.is-urgent .if-item strong { color: var(--hibiscus); }
        .if-flag.is-live { color: var(--leaf); border-color: var(--leaf); }
        .if-group.is-live .if-item strong { color: var(--leaf); }

        .if-note {
          background: var(--surface);
          border: 1px solid var(--edge);
          border-radius: 3px;
          padding: 26px 28px;
        }
        .if-note h3 { font-size: 1.1rem; margin: 0 0 12px; }
        .if-note ul { margin: 0; padding-left: 18px; color: var(--ink-soft); }
        .if-note li { margin-bottom: 8px; }

        .if-cta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 16px;
          margin: 0;
        }
        .if-cta-row.is-hero { margin-top: 30px; }
        .if-cta-row.is-group { margin-top: 22px; }
        .if-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Karla', sans-serif;
          font-size: 0.98rem;
          font-weight: 700;
          color: #FFFFFF;
          background: var(--ink);
          border: 1px solid var(--ink);
          border-radius: 3px;
          padding: 13px 22px;
          text-decoration: none;
          transition: background .18s ease, color .18s ease, border-color .18s ease;
        }
        .if-cta:hover { background: var(--mango); border-color: var(--mango); color: var(--ink); }
        .if-cta:focus-visible { outline: 2px solid var(--mango); outline-offset: 3px; }
        .if-cta-note { font-size: 0.88rem; color: var(--ink-soft); }

        .if-end { border-top: 3px solid var(--ink); padding: 40px 0 110px; }
        .if-end h2 { font-size: 1.6rem; margin: 0 0 14px; }
        .if-end p { color: var(--ink-soft); }
        .if-sig { margin-top: 30px; font-size: 0.9rem; color: var(--ink-soft); }

        @media (max-width: 560px) {
          .if-hero { padding: 44px 0 48px; }
          .if-phase { grid-template-columns: 40px 1fr; gap: 14px; }
          .if-cta { width: 100%; justify-content: center; }
        }
      `}</style>

      <IslandFreshMenu />

      <div className="if-art-band">
        <IslandFreshHeroArt />
      </div>

      <header className="if-hero">
        <div className="if-wrap">
          <p className="if-kicker">Prepared for Amado Vazquez, Island Fresh Meals</p>
          <h1>Your checkout stopped keeping records. Everything else follows from fixing that.</h1>
          <p className="if-lede if-measure">
            This outlines how I would approach rebuilding Island Fresh, what the work actually
            consists of, and the order I would do it in. Nothing here is final. It exists so
            Thursday is a working session instead of a recap.
          </p>
          <PrototypeLinks className="is-hero" />
        </div>
      </header>

      <section className="if-band">
        <div className="if-wrap if-measure">
          <h2>What this is costing right now</h2>
          <p>
            When your provider moved servers, the checkout stopped logging client records. Without
            those records you cannot print nutritional labels, and without labels you are working
            around a hole in your operation every single week.
          </p>
          <p className="if-cost">
            This is the one item on this page that is losing money today. It gets built first.
          </p>
        </div>
      </section>

      <section className="if-section">
        <div className="if-wrap">
          <h2>How I work</h2>
          <p className="if-sub if-measure">
            Five phases. You are never paying for something that has not been scoped first.
          </p>
          {PHASES.map((p) => (
            <div className="if-phase" key={p.n}>
              <div className="if-phase-n">{p.n}</div>
              <div className="if-measure">
                <h3>{p.name}</h3>
                <p className="if-phase-when">{p.when}</p>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="if-section">
        <div className="if-wrap">
          <h2>What the build involves</h2>
          <p className="if-sub if-measure">
            Grouped by what depends on what. This is the honest inventory, not a feature list
            padded to look impressive.
          </p>
          {SCOPE.map((g) => (
            <div
              className={`if-group${g.urgent ? ' is-urgent' : ''}${g.live ? ' is-live' : ''}`}
              key={g.group}
            >
              <div className="if-group-head">
                <h3>{g.group}</h3>
                {g.urgent && <span className="if-flag">First</span>}
                {g.live && <span className="if-flag is-live">Live</span>}
              </div>
              <p className="if-group-note">{g.note}</p>
              {g.items.map(([title, desc]) => (
                <div className="if-item" key={title}>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              ))}
              {g.live && <PrototypeLinks className="is-group" />}
            </div>
          ))}

          <div className="if-note">
            <h3>Not included, and worth saying so</h3>
            <ul>
              <li>
                Re-shooting the existing menu. The AI pipeline above keeps new meals on brand as
                they are added, but replacing the generic stock images already on the site is a
                separate piece of work with its own cost, and I would rather quote it on its own
                than bury it here.
              </li>
              <li>
                Third-party subscriptions. Your CRM, the AI usage, and review cards are billed to
                you directly by those providers. They are not marked up inside my number.
              </li>
              <li>
                The brokerage site and anything for your rentals. Separate engagements, once
                Island Fresh is stable.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="if-end">
        <div className="if-wrap if-measure">
          <h2>Thursday</h2>
          <p>
            Bring access to your site admin, your CRM, and your payment processor if that is easy.
            Looking at the real thing beats describing it. If it is simpler to pull them up live on
            the call, that works too.
          </p>
          <p className="if-sig">
            Chuck Gabbard &nbsp;/&nbsp; CG Strategic Enterprises &nbsp;/&nbsp; Jacksonville, FL
          </p>
        </div>
      </section>
    </div>
  );
}
