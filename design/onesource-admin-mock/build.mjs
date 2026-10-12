// Writes the static admin-area mock pages used for the One Source case study screenshots.
// Markup mirrors the real admin pages in the One Source project (src/pages/admin/*), but every
// name, number and date is fake DEMO data. Nothing here touches the real database.
// Run: node design/onesource-admin-mock/build.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const NAV = ['Dashboard', 'Staff', 'Credentials', 'Training Log', 'Applicants', 'Onboarding', 'Settings', 'My status'];

const page = (title, nav, body) => `<!doctype html>
<!-- STATIC MOCK for the CG Strategic case study screenshots. Fake DEMO data only: no real staff, applicants or license numbers. -->
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${title} | One Source Admin (demo mock)</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bitter:wght@400..800&family=Nunito+Sans:wght@400..900&display=block" />
<link rel="stylesheet" href="admin-mock.css" />
</head>
<body class="admin">
<div class="admin-shell">
<aside class="admin-sidebar">
  <a href="#" class="admin-brand admin-brand-side"><img src="shield-badge-80.png" alt="" width="40" height="40" /><span>One Source Admin</span></a>
  <nav aria-label="Admin"><ul>
${NAV.map((k) => `    <li><a href="#"${k === nav ? ' aria-current="page"' : ''}>${k}</a></li>`).join('\n')}
  </ul></nav>
  <div class="admin-user"><p><strong>Demo Owner</strong><br /><span>Owner</span></p><button type="button" class="btn btn-secondary btn-small">Sign out</button></div>
</aside>
<main class="admin-main">
<span class="demo-banner">DEMO DATA</span>
${body}
</main>
</div>
</body>
</html>
`;

const credHead = (holder) =>
  `<thead><tr>${holder ? '<th>Holder</th>' : ''}<th>Credential</th><th>Number</th><th>Categories</th><th>Issued</th><th>Expires</th><th>Status</th><th>Document</th></tr></thead>`;
const credRow = ([holder, type, label, number, cats, issued, expires, pill, tone, doc]) =>
  `<tr>${holder ? `<td><a href="#">${holder}</a></td>` : ''}<td><a href="#">${type}</a>${label ? `<span class="small muted"><br />${label}</span>` : ''}</td><td>${number}</td><td>${cats}</td><td>${issued}</td><td>${expires}</td><td><span class="pill ${tone}">${pill}</span></td><td>${doc ? '<a href="#">View</a>' : '—'}</td></tr>`;
const credTable = (holder, rows) =>
  `<div class="table-wrap"><table class="table">${credHead(holder)}<tbody>${rows.map(credRow).join('')}</tbody></table></div>`;
const bar = (label, have, target) =>
  `<p class="small">${label}: ${have} of ${target}<span class="progress" aria-hidden="true"><span style="width:${Math.min(100, Math.round((have / target) * 100))}%"></span></span></p>`;

const dashboard = page('Dashboard', 'Dashboard', `
<div class="page-head"><div><h1>Dashboard</h1><p>Today is Oct 12, 2026.</p></div></div>
<div class="stats">
  <a class="stat stat-alert" href="#"><strong>1</strong><span>Expired</span></a>
  <a class="stat stat-alert" href="#"><strong>2</strong><span>Expiring in 30 days</span></a>
  <a class="stat stat-warn" href="#"><strong>1</strong><span>Expiring in 31–60 days</span></a>
  <a class="stat" href="#"><strong>0</strong><span>Expiring in 61–90 days</span></a>
  <a class="stat stat-warn" href="#"><strong>2</strong><span>Techs not route-ready</span></a>
  <a class="stat stat-warn" href="#"><strong>3</strong><span>New applicants</span></a>
</div>
<section class="panel">
  <div class="panel-head"><h2>Credentials needing attention</h2><a href="#" class="small">All credentials</a></div>
  <h3>Expired</h3>
  ${credTable(true, [['Casey Demo', 'Driver’s license', '', 'DEMO-0007', '—', 'Oct 1, 2018', 'Oct 3, 2026', 'Expired 9 days ago', 'pill-alert', true]])}
  <h3>Expiring in the next 30 days</h3>
  ${credTable(true, [
    ['Sam Demo', 'FDACS employee ID card', '', 'DEMO-1042', 'GHP, L&amp;O', 'Oct 28, 2025', 'Oct 28, 2026', '16 days left', 'pill-alert', true],
    ['Jordan Demo', 'CEU record', 'Demo CEU hours', '—', 'WDO', 'Nov 4, 2024', 'Nov 4, 2026', '23 days left', 'pill-alert', false],
  ])}
  <h3>Expiring in 31–60 days</h3>
  ${credTable(true, [['Taylor Demo', 'Certified operator', '', 'DEMO-2210', 'GHP, L&amp;O, WDO', 'Dec 1, 2022', 'Dec 1, 2026', '50 days left', 'pill-warn', true]])}
</section>
<div class="panels-2">
  <section class="panel">
    <div class="panel-head"><h2>Techs not route-ready yet</h2></div>
    <ul class="checklist">
      <li><div><a href="#" class="item-title">Sam Demo</a><br /><span class="small muted">Next: GHP supervised training: 4 more day(s) and 9 more job(s) (verified)</span></div><span class="small">Checklist 4/6</span></li>
      <li><div><a href="#" class="item-title">Riley Demo</a><br /><span class="small muted">Next: Apply for the FDACS employee ID card</span></div><span class="small">Checklist 1/6</span></li>
    </ul>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Onboarding overdue</h2><a href="#" class="small">Onboarding</a></div>
    <ul class="checklist">
      <li><div><a href="#" class="item-title">Riley Demo</a><br /><span class="small">FDACS employee ID card applied for</span></div><span class="pill pill-alert">3 days overdue</span></li>
    </ul>
  </section>
</div>`);

const check = (title, done, note) =>
  `<li${done ? ' class="done"' : ''}><div><span class="item-title">${title}</span>${note ? `<br /><span class="small muted">${note}</span>` : ''}</div><span class="pill ${done ? 'pill-ok' : 'pill-muted'}">${done ? `Done ${done}` : 'Open'}</span></li>`;

const staff = page('Sam Demo', 'Staff', `
<p class="crumb"><a href="#">← Staff</a></p>
<div class="page-head"><div><h1>Sam Demo</h1><p>Tech · Training · Service technician</p></div>
  <div class="form-actions"><button type="button" class="btn btn-secondary">Resend invite</button></div></div>
<section class="panel">
  <div class="panel-head"><h2>Readiness</h2><span class="pill pill-warn">Not route-ready yet</span></div>
  <div class="readiness-grid">
    <div><h3>General Household Pest (GHP)</h3>${bar('Days', 6, 10)}${bar('Jobs', 31, 40)}<span class="pill pill-muted">In progress</span>
      <p class="small muted">2 logged entries waiting for verification</p></div>
    <div><h3>Lawn &amp; Ornamental (L&amp;O)</h3>${bar('Days', 5, 5)}${bar('Jobs', 20, 20)}<span class="pill pill-ok">Target met</span></div>
    <div><h3>Wood-Destroying Organisms (WDO)</h3>${bar('Days', 2, 5)}${bar('Jobs', 4, 10)}<span class="pill pill-muted">In progress</span></div>
    <div><h3>FDACS employee ID card</h3><span class="pill pill-ok">Current</span>
      <h3 style="margin-top: var(--space-4)">Onboarding checklist</h3>${bar('Done', 4, 6)}</div>
  </div>
  <h3>What’s next</h3>
  <ul class="next-list">
    <li>GHP supervised training: 4 more day(s) and 9 more job(s) (verified)</li>
    <li>WDO supervised training: 3 more day(s) and 6 more job(s) (verified)</li>
    <li>Checklist: Ride-alongs completed</li>
    <li>Checklist: First solo route sign-off</li>
  </ul>
</section>
<section class="panel">
  <div class="panel-head"><h2>Credentials</h2><a href="#" class="btn btn-secondary btn-small">Add credential</a></div>
  ${credTable(false, [
    [null, 'FDACS employee ID card', '', 'DEMO-1042', 'GHP, L&amp;O', 'Oct 28, 2025', 'Oct 28, 2026', '16 days left', 'pill-alert', true],
    [null, 'Driver’s license', '', 'DEMO-0042', '—', 'Mar 9, 2023', 'Mar 9, 2031', 'Current', 'pill-ok', true],
  ])}
</section>
<section class="panel">
  <div class="panel-head"><h2>Onboarding checklist</h2></div>
  <ul class="checklist">
    ${check('New-hire paperwork completed', 'Aug 18, 2026')}
    ${check('FDACS employee ID card applied for', 'Sep 2, 2026', 'Due within 30 days of the hire date.')}
    ${check('Safety and PPE training', 'Aug 20, 2026')}
    ${check('Equipment issued', 'Aug 18, 2026')}
    ${check('Ride-alongs completed', null)}
    ${check('First solo route sign-off', null)}
  </ul>
</section>`);

const applicant = ([name, position, applied, stage, tone, creds, certs, phone]) =>
  `<tr><td><a href="#"><strong>${name}</strong></a><span class="small muted"><br />Demo City</span></td><td>${position}</td><td>${applied}</td><td><span class="pill ${tone}">${stage}</span></td><td>${creds}${certs ? `<span class="small muted"><br />${certs}</span>` : ''}</td><td><a href="#">${phone}</a></td></tr>`;

const applicants = page('Applicants', 'Applicants', `
<div class="page-head"><div><h1>Applicants</h1><p>Applications from the website’s Careers page.</p></div></div>
<p class="notice small">Not-hired applicants are deleted automatically after the decision. No automated scoring or filtering: every application is read by a person.</p>
<nav class="stage-tabs" aria-label="Filter by stage">
  <a href="#" aria-current="page">In progress (6)</a><a href="#">New (3)</a><a href="#">Contacted (1)</a><a href="#">Interview (2)</a><a href="#">Offer (0)</a><a href="#">Hired (1)</a><a href="#">Not hired (0)</a>
</nav>
<section class="panel">
  <div class="table-wrap"><table class="table">
    <thead><tr><th>Name</th><th>Position</th><th>Applied</th><th>Stage</th><th>Credentials</th><th>Phone</th></tr></thead>
    <tbody>
${[
  ['Morgan Demo', 'Service technician', 'Oct 11, 2026', 'New', 'pill-warn', 'None yet, willing to get licensed', '', '(555) 010-0101'],
  ['Avery Demo', 'Service technician', 'Oct 10, 2026', 'New', 'pill-warn', 'FDACS ID card', 'GHP (demo)', '(555) 010-0102'],
  ['Quinn Demo', 'Office / customer service', 'Oct 9, 2026', 'New', 'pill-warn', '—', '', '(555) 010-0103'],
  ['Reese Demo', 'Service technician', 'Oct 6, 2026', 'Contacted', '', 'Certified operator', 'GHP, L&amp;O (demo)', '(555) 010-0104'],
  ['Drew Demo', 'Termite / WDO technician', 'Oct 2, 2026', 'Interview', '', 'Certified operator', 'WDO (demo)', '(555) 010-0105'],
  ['Blake Demo', 'Service technician', 'Sep 29, 2026', 'Interview', '', 'FDACS ID card', '', '(555) 010-0106'],
].map(applicant).join('\n')}
    </tbody>
  </table></div>
</section>`);

for (const [file, html] of Object.entries({ 'dashboard.html': dashboard, 'staff.html': staff, 'applicants.html': applicants })) {
  writeFileSync(join(here, file), html);
}
