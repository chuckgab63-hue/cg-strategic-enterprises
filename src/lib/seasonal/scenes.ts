// The seasonal corner scenes, ported from the One Source build (their admin swaps the
// corner animation by calendar date). The theme modules in ./themes and the helpers in
// ./geometry.ts, ./holidays.ts and ./palettes.ts are that repo's files, copied as they
// are so the look and the motion stay faithful; this file is the part that is ours: the
// list, the labels in both languages, and the loaders that keep each scene in its own
// chunk.
//
// There are seventeen holiday scenes. The spider web is not one of them -- it is the
// year-round default the holidays interrupt -- so the showcase carries it as its own
// first frame and the seventeen follow in calendar order.

import { HOLIDAYS, activeHoliday, todayNY, type Holiday } from './holidays';
import type { Lang } from '../../i18n/lang';

export type { ThemeModule } from './loaders';
import type { ThemeModule } from './loaders';

/** The year-round web, which is what runs when no holiday window is open. */
export const SPIDER_ID = 'spider';

/** Each scene is its own chunk: only the ones actually shown are fetched. */
const LOADERS: Record<string, () => Promise<{ default: ThemeModule }>> = {
  'new-years': () => import('./themes/new-years'),
  mlk: () => import('./themes/mlk'),
  presidents: () => import('./themes/presidents'),
  valentines: () => import('./themes/valentines'),
  'st-patricks': () => import('./themes/st-patricks'),
  easter: () => import('./themes/easter'),
  memorial: () => import('./themes/memorial'),
  mothers: () => import('./themes/mothers'),
  fathers: () => import('./themes/fathers'),
  juneteenth: () => import('./themes/juneteenth'),
  independence: () => import('./themes/independence'),
  labor: () => import('./themes/labor'),
  columbus: () => import('./themes/columbus'),
  halloween: () => import('./themes/halloween'),
  veterans: () => import('./themes/veterans'),
  thanksgiving: () => import('./themes/thanksgiving'),
  christmas: () => import('./themes/christmas'),
};

const cache = new Map<string, ThemeModule>();

/** Loads a scene's module (cached). The spider has no module: it is a component. */
export async function loadScene(id: string): Promise<ThemeModule | null> {
  if (id === SPIDER_ID) return null;
  const hit = cache.get(id);
  if (hit) return hit;
  const load = LOADERS[id];
  if (!load) return null;
  try {
    const mod = (await load()).default;
    cache.set(id, mod);
    return mod;
  } catch {
    return null;
  }
}

/** Spanish names for the holidays; English comes from the ported HOLIDAYS list. */
const ES_LABEL: Record<string, string> = {
  'new-years': 'Año Nuevo',
  mlk: 'Día de Martin Luther King Jr.',
  presidents: 'Día de los Presidentes',
  valentines: 'Día de San Valentín',
  'st-patricks': 'Día de San Patricio',
  easter: 'Pascua',
  memorial: 'Día de los Caídos',
  mothers: 'Día de la Madre',
  fathers: 'Día del Padre',
  juneteenth: 'Juneteenth',
  independence: 'Día de la Independencia',
  labor: 'Día del Trabajo',
  columbus: 'Día de la Raza / Pueblos Indígenas',
  halloween: 'Halloween',
  thanksgiving: 'Día de Acción de Gracias',
  veterans: 'Día de los Veteranos',
  christmas: 'Navidad',
};

const SPIDER_LABEL: Record<Lang, string> = { en: 'The year-round web', es: 'La telaraña de todo el año' };
const SPIDER_WHEN: Record<Lang, string> = { en: 'Whenever no holiday is running', es: 'Cuando no hay ninguna fecha activa' };

/** The window the holiday runs in: `window` days before it, through the day itself. */
export function windowDays(holiday: Holiday, base = 7): number {
  return holiday.fixedWindow ?? base;
}

const dayMs = 86_400_000;

/**
 * When the scene runs: "Nov 19–26", or "Dec 25 – Jan 1" where it crosses a month.
 *
 * The shortening has to follow the language, not just the month number. English puts the
 * month first, so one month serves both days ("Nov 19–26"); Spanish puts it last, so the
 * same trick has to move it to the end ("19–26 nov") -- shortening it the English way
 * gives "12 jun–19", which is not a date anybody writes.
 */
export function formatWindow(holiday: Holiday, lang: Lang, year: number): string {
  const [m, d] = holiday.date(year);
  const end = new Date(Date.UTC(year, m - 1, d));
  const start = new Date(end.getTime() - windowDays(holiday) * dayMs);
  const locale = lang === 'es' ? 'es-US' : 'en-US';
  const full = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  if (start.getUTCMonth() !== end.getUTCMonth()) return `${full.format(start)} – ${full.format(end)}`;

  const month = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' }).format(end);
  const days = `${start.getUTCDate()}–${end.getUTCDate()}`;
  return lang === 'es' ? `${days} ${month}` : `${month} ${days}`;
}

export interface Scene {
  id: string;
  /** Sort key: the holiday's date in the reference year. The web sorts first. */
  order: number;
}

/** The web, then the seventeen holidays in calendar order. */
export function sceneList(year: number): Scene[] {
  const holidays = HOLIDAYS.map(h => {
    const [m, d] = h.date(year);
    return { id: h.id, order: Date.UTC(year, m - 1, d) };
  }).sort((a, b) => a.order - b.order);
  return [{ id: SPIDER_ID, order: -1 }, ...holidays];
}

export function sceneLabel(id: string, lang: Lang): string {
  if (id === SPIDER_ID) return SPIDER_LABEL[lang];
  const holiday = HOLIDAYS.find(h => h.id === id);
  if (!holiday) return id;
  return lang === 'es' ? ES_LABEL[id] ?? holiday.label : holiday.label;
}

export function sceneWhen(id: string, lang: Lang, year: number): string {
  if (id === SPIDER_ID) return SPIDER_WHEN[lang];
  const holiday = HOLIDAYS.find(h => h.id === id);
  return holiday ? formatWindow(holiday, lang, year) : '';
}

/**
 * Where the showcase starts: the scene whose window contains today, by the same rule the
 * client's site uses (from `window` days before the holiday through the day itself, and
 * when two windows overlap the nearer holiday wins). No window open today means the web,
 * which is exactly what their corner shows on an ordinary day.
 */
export function todayScene(nowISO: string = todayNY()): string {
  return activeHoliday(nowISO)?.id ?? SPIDER_ID;
}
