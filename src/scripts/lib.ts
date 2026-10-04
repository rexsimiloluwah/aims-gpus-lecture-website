/* Browser-only helpers shared by the page scripts. Import them only from <script> tags, never from frontmatter. */

export const $ = (s: string): any => document.querySelector(s);
export const $$ = (s: string): any[] => [...document.querySelectorAll(s)];

export const store = {
  get<T>(k: string, d: T): T { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d } catch (e) { return d } },
  set(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)) } catch (e) {} },
};

export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- formatting ---------- */
export function fmtBytes(b: number) { const u = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']; let i = 0; while (b >= 1000 && i < u.length - 1) { b /= 1000; i++ } return (b >= 100 ? b.toFixed(0) : b >= 10 ? b.toFixed(1) : b.toFixed(2)) + ' ' + u[i] }
export function fmtNum(n: number) { if (n >= 1e12) return (n / 1e12).toFixed(n >= 1e13 ? 0 : 1) + 'T'; if (n >= 1e9) return (n / 1e9).toFixed(n >= 1e10 ? 0 : 1) + 'B'; if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + 'M'; if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1) + 'K'; return String(Math.round(n)) }
export function sci(n: number) { const e = Math.floor(Math.log10(n)); const m = n / Math.pow(10, e); const sup = '⁰¹²³⁴⁵⁶⁷⁸⁹'; return m.toFixed(1) + ' × 10' + String(e).split('').map(c => sup[+c]).join('') }
export function fmtTime(h: number) { if (h < 1 / 60) return (h * 3600).toFixed(1) + ' s'; if (h < 1) return (h * 60).toFixed(0) + ' min'; if (h < 48) return h.toFixed(1) + ' h'; if (h < 24 * 365) return (h / 24).toFixed(0) + ' days'; return (h / 24 / 365).toFixed(1) + ' years' }
export function money(x: number) { return x >= 1e6 ? '$' + (x / 1e6).toFixed(1) + 'M' : x >= 1e3 ? '$' + Math.round(x).toLocaleString() : '$' + x.toFixed(x < 10 ? 2 : 0) }
export const logScale = (v: number, lo: number, hi: number) => lo * Math.pow(hi / lo, v / 100);

/** Wire up a segmented control. Returns a getter for the pressed button's data-v. */
export function seg(id: string, cb?: (v: string) => void) {
  const el = document.getElementById(id)!;
  el.addEventListener('click', e => { const b = (e.target as HTMLElement).closest('button'); if (!b) return; el.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); cb && cb(b.dataset.v!) });
  return () => (el.querySelector('[aria-pressed="true"]') as HTMLElement).dataset.v!;
}

/** Wire an A/B/C/D question: mark the right option, fade the rest, flag a wrong pick. */
export function answerOpts(box: Element, right: number, onPick?: () => void) {
  box.addEventListener('click', e => {
    const b = (e.target as HTMLElement).closest('.opt') as HTMLElement | null; if (!b) return;
    box.querySelectorAll<HTMLElement>('.opt').forEach(x => { x.classList.remove('right', 'wrong', 'fade'); x.classList.add(+x.dataset.i! === right ? 'right' : 'fade') });
    if (+b.dataset.i! !== right) b.classList.replace('fade', 'wrong');
    onPick && onPick();
  });
}
