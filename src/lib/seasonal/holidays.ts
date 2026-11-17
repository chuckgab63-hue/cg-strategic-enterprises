// Holiday calendar for the seasonal corner animations. Pure functions, no site-specific code.
// All dates are civil dates in America/New_York.

export type HolidayId =
  | 'new-years' | 'mlk' | 'presidents' | 'valentines' | 'st-patricks' | 'easter' | 'memorial' | 'mothers'
  | 'fathers' | 'juneteenth' | 'independence' | 'labor' | 'columbus' | 'halloween' | 'veterans'
  | 'thanksgiving' | 'christmas';

export interface Holiday {
  id: HolidayId;
  label: string;
  /** Quiet themes are gentle and respectful: no jokes, minimal motion. */
  tone: 'festive' | 'quiet' | 'neutral';
  /** Days before the holiday the theme starts. Falls back to the site-wide window. */
  fixedWindow?: number;
  /** [month 1-12, day] for a given year. */
  date: (year: number) => [number, number];
}

/** The nth (1-based) given weekday (0 = Sunday) of a month (1-12). */
function nthWeekday(year: number, month: number, weekday: number, n: number): number {
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  return 1 + ((weekday - first + 7) % 7) + 7 * (n - 1);
}

/** The last given weekday of a month. */
function lastWeekday(year: number, month: number, weekday: number): number {
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lw = new Date(Date.UTC(year, month - 1, lastDay)).getUTCDay();
  return lastDay - ((lw - weekday + 7) % 7);
}

/** Western Easter Sunday (Meeus/Jones/Butcher computus). */
export function easter(year: number): [number, number] {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return [month, day];
}

export const HOLIDAYS: Holiday[] = [
  { id: 'new-years', label: "New Year's Day", tone: 'festive', date: () => [1, 1] },
  { id: 'mlk', label: 'Martin Luther King Jr. Day', tone: 'quiet', date: (y) => [1, nthWeekday(y, 1, 1, 3)] },
  { id: 'presidents', label: "Presidents' Day", tone: 'neutral', date: (y) => [2, nthWeekday(y, 2, 1, 3)] },
  { id: 'valentines', label: "Valentine's Day", tone: 'festive', date: () => [2, 14] },
  { id: 'st-patricks', label: "St. Patrick's Day", tone: 'festive', date: () => [3, 17] },
  { id: 'easter', label: 'Easter', tone: 'festive', date: easter },
  { id: 'memorial', label: 'Memorial Day', tone: 'quiet', date: (y) => [5, lastWeekday(y, 5, 1)] },
  { id: 'mothers', label: "Mother's Day", tone: 'festive', date: (y) => [5, nthWeekday(y, 5, 0, 2)] },
  { id: 'fathers', label: "Father's Day", tone: 'festive', date: (y) => [6, nthWeekday(y, 6, 0, 3)] },
  { id: 'juneteenth', label: 'Juneteenth', tone: 'quiet', date: () => [6, 19] },
  { id: 'independence', label: 'Independence Day', tone: 'festive', date: () => [7, 4] },
  { id: 'labor', label: 'Labor Day', tone: 'neutral', date: (y) => [9, nthWeekday(y, 9, 1, 1)] },
  { id: 'columbus', label: "Columbus / Indigenous Peoples' Day", tone: 'neutral', date: (y) => [10, nthWeekday(y, 10, 1, 2)] },
  { id: 'halloween', label: 'Halloween', tone: 'festive', fixedWindow: 16, date: () => [10, 31] }, // from Oct 15
  { id: 'veterans', label: 'Veterans Day', tone: 'quiet', date: () => [11, 11] },
  { id: 'thanksgiving', label: 'Thanksgiving', tone: 'festive', date: (y) => [11, nthWeekday(y, 11, 4, 4)] },
  { id: 'christmas', label: 'Christmas', tone: 'festive', fixedWindow: 24, date: () => [12, 25] }, // from Dec 1
];

export function holidayById(id: string): Holiday | undefined {
  return HOLIDAYS.find((h) => h.id === id);
}

/** Today's civil date in America/New_York as YYYY-MM-DD. */
export function todayNY(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

const dayNumber = (y: number, m: number, d: number) => Math.round(Date.UTC(y, m - 1, d) / 86_400_000);

/**
 * The holiday whose window contains `isoDate` (YYYY-MM-DD). A holiday is shown from `window` days
 * before through the day itself. If windows overlap, the holiday that comes up soonest wins
 * (so Christmas Dec 1-25, then New Year's Dec 26-Jan 1).
 */
export function activeHoliday(isoDate: string, baseWindowDays = 7): Holiday | null {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return null;
  const today = dayNumber(y, m, d);
  let best: { holiday: Holiday; until: number } | null = null;
  for (const year of [y, y + 1]) {
    for (const holiday of HOLIDAYS) {
      const [hm, hd] = holiday.date(year);
      const until = dayNumber(year, hm, hd) - today;
      const window = holiday.fixedWindow ?? baseWindowDays;
      if (until >= 0 && until <= window && (!best || until < best.until)) best = { holiday, until };
    }
  }
  return best?.holiday ?? null;
}
