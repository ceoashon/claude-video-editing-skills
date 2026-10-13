// Parts 01-07, outro, chapter cards and end card. Loaded after index.html's first-minute cues;
// shares its helpers (el, set, blur, env, P, eo, eio, back, cues, WORDS, PLAN, END).
(() => {
const css = document.createElement('style');
css.textContent = `
.mid { position:absolute; top:0; height:1080px; display:flex; flex-direction:column; justify-content:center; }
.L { left:150px; width:560px; } .R { left:1290px; width:520px; }
.b2 { width:max-content; font-weight:900; text-transform:uppercase; letter-spacing:-.02em; line-height:.92; text-shadow:0 6px 40px rgba(0,0,0,.55); font-size:120px; white-space:nowrap; }
.sub2 { font-weight:700; font-size:30px; line-height:1.3; color:rgba(255,255,255,.86); text-shadow:0 2px 18px rgba(0,0,0,.6); margin-top:22px; max-width:560px; }
.lab2 { font-weight:700; font-size:22px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.72); text-shadow:0 2px 16px rgba(0,0,0,.6); margin-bottom:16px; white-space:nowrap; }
.lab2.blue { color:var(--blue); }
.li { display:flex; align-items:center; gap:22px; margin:10px 0; font-weight:900; text-transform:uppercase; font-size:60px; letter-spacing:-.01em; text-shadow:0 4px 30px rgba(0,0,0,.5); white-space:nowrap; }
.num { width:62px; height:62px; flex:none; border-radius:18px; background:rgba(255,255,255,.12); display:flex; align-items:center; justify-content:center; font-size:32px; color:#fff; transition:none; }
.li.on .num { background:var(--blue); }
.li.small { font-size:44px; } .li.small .num { width:50px; height:50px; font-size:26px; border-radius:14px; }
.card2 { background:rgba(10,12,24,.8); border:1px solid rgba(255,255,255,.1); border-radius:28px; box-shadow:0 30px 80px rgba(0,0,0,.45); padding:30px 34px; }
.rrow { display:flex; justify-content:space-between; align-items:baseline; gap:24px; padding:14px 0; border-bottom:1px dashed rgba(255,255,255,.16); font-weight:700; font-size:30px; color:rgba(255,255,255,.88); }
.rrow b { font-weight:900; font-size:40px; color:#fff; }
.rrow.tot b { color:#ff6b6b; font-size:56px; } .rrow.tot { border-bottom:none; padding-top:22px; }
.chip { display:inline-block; padding:16px 28px; border-radius:999px; background:rgba(255,255,255,.12); font-weight:900; font-size:44px; margin:0 14px 14px 0; text-transform:uppercase; }
.chip.on { background:var(--blue); box-shadow:0 10px 40px rgba(47,111,224,.5); }
.bub { width:fit-content; max-width:520px; padding:22px 28px; border-radius:30px; font-weight:700; font-size:32px; line-height:1.3; margin:10px 0; }
.bub.them { background:#e9e9eb; color:#111; border-bottom-left-radius:8px; }
.bub.me { background:#1f8bff; color:#fff; margin-left:auto; border-bottom-right-radius:8px; }
.when { font-weight:700; font-size:20px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.6); margin:18px 0 4px; }
.when.me { text-align:right; }
.stamp { display:inline-block; border:10px solid #ff4d4d; color:#ff4d4d; border-radius:18px; padding:6px 30px; font-weight:900; font-size:120px; letter-spacing:.04em; }
.sw { width:120px; height:120px; border-radius:28px; border:3px solid rgba(255,255,255,.25); }
.bar { width:520px; height:44px; border-radius:22px; background:rgba(255,255,255,.12); overflow:hidden; margin:8px 0 26px; }
.bar i { display:block; height:100%; border-radius:22px; background:var(--blue); width:0; }
.box { width:46px; height:46px; border-radius:12px; border:4px solid rgba(255,255,255,.6); display:inline-flex; align-items:center; justify-content:center; margin-right:14px; }
.box svg { opacity:0 } .box.on { background:var(--blue); border-color:var(--blue); } .box.on svg { opacity:1 }
.fill { display:inline-block; min-width:220px; border-bottom:5px solid rgba(255,255,255,.5); margin-left:14px; }
.shot { border-radius:36px; overflow:hidden; box-shadow:0 30px 90px rgba(0,0,0,.5); background:#fff; }
.shot img { display:block; width:100%; }
.sub-btn { display:inline-flex; align-items:center; gap:18px; padding:26px 46px; border-radius:999px; background:#ff0033; font-weight:900; font-size:52px; letter-spacing:.02em; box-shadow:0 20px 60px rgba(255,0,51,.35); }
.sub-btn.on { background:rgba(255,255,255,.18); box-shadow:none; }
`;
document.head.appendChild(css);

// ---------- time lookups ----------
const toks = WORDS.map(x => ({ n: norm(x.w), s: x.s, e: x.e, sec: x.sec }));
function PH(sec, phrase, n = 1, end = false) {
  const q = phrase.split(/\s+/).map(norm).filter(Boolean);
  const L = toks.filter(x => x.sec === sec); let k = 0;
  for (let i = 0; i + q.length <= L.length; i++) {
    let ok = true; for (let j = 0; j < q.length; j++) if (L[i + j].n !== q[j]) { ok = false; break; }
    if (ok && ++k === n) return end ? L[i + q.length - 1].e : L[i].s;
  }
  throw new Error(`phrase not found [${sec}] "${phrase}" #${n}`);
}
const DUR = p => p.frames * 1001 / 30000;
function slot(label) { let t = 0; for (const p of PLAN) { if (p.label === label) return [t, t + DUR(p)]; t += DUR(p); } throw new Error(label); }
function secSpan(sec) { let t = 0, a = null, b = null; for (const p of PLAN) { if (p.label === sec) { if (a === null) a = t; b = t + DUR(p); } t += DUR(p); } return [a, b]; }
// time spec: number | "phrase" | "phrase#2" | ">phrase" (end of phrase) | "$" (end of section)
function tm(sec, x) {
  if (typeof x === 'number') return x;
  if (x === '$') return secSpan(sec)[1];
  let end = false; if (x[0] === '>') { end = true; x = x.slice(1); }
  let n = 1; const m = x.match(/#(\d+)$/); if (m) { n = +m[1]; x = x.slice(0, m.index); }
  return PH(sec, x, n, end);
}

// ---------- generic block: one composition per beat ----------
// children with data-at reveal at that phrase (data-fx: pop | stamp | wipe | type), data-on toggles .on
const FIT = [];
function block(sec, at, until, html, o = {}) {
  const side = o.side || 'L';
  const e = el(`<div class="mid ${side}" style="${o.style || ''}">${html}</div>`, { left: 0, top: 0 });
  const t0 = tm(sec, at) + (o.lead ?? -0.12), t1 = tm(sec, until) + (o.tail ?? -0.25);
  if (t1 <= t0) throw new Error(`empty window [${sec}] ${at} -> ${until}`);
  const kids = [...e.querySelectorAll('[data-at]')].map(k => ({ k, t: tm(sec, k.dataset.at) - .08, fx: k.dataset.fx || '', txt: k.textContent }));
  const ons = [...e.querySelectorAll('[data-on]')].map(k => ({ k, t: tm(sec, k.dataset.on) - .05 }));
  e.querySelectorAll('.b2').forEach(b => FIT.push([b, o.maxW || (side === 'L' ? 560 : 520)]));
  (window.BLOCKS = window.BLOCKS || []).push([sec, t0, t1, side]);
  for (const c of kids) (window.KIDS = window.KIDS || []).push([c.t, c.fx, sec]);
  cues.push(t => {
    const [v, p] = env(t, t0, t1, .35, .3);
    if (v <= 0) { set(e, 0); return; }
    set(e, v, (side === 'L' ? -40 : 40) * (1 - p), 0, 1); blur(e, 10 * (1 - p));
    for (const c of kids) {
      const q = P(t, c.t, c.fx === 'stamp' ? .22 : .32);
      if (c.fx === 'type') { c.k.textContent = c.txt.slice(0, Math.round(c.txt.length * clamp((t - c.t) / Math.max(.4, c.txt.length * .045)))); c.k.style.opacity = t >= c.t ? 1 : 0; continue; }
      if (c.fx === 'stamp') { const s = 1.9 - .9 * eo(q); c.k.style.opacity = clamp(q * 3); c.k.style.transform = `scale(${s}) rotate(-8deg)`; continue; }
      if (c.fx === 'wipe') { c.k.style.clipPath = `inset(0 ${100 - 100 * eo(q)}% 0 0)`; continue; }
      if (c.fx === 'pop') { const s = back(q); c.k.style.opacity = clamp(q * 2); c.k.style.transform = `scale(${s})`; continue; }
      c.k.style.opacity = eo(q); c.k.style.transform = `translateY(${18 * (1 - eo(q))}px)`; c.k.style.filter = q < 1 ? `blur(${8 * (1 - eo(q))}px)` : 'none';
    }
    for (const c of ons) c.k.classList.toggle('on', t >= c.t);
  });
  return e;
}
const L2 = (s, cls = '') => `<div class="lab2 ${cls}">${s}</div>`;
const B2 = (s, at, extra = '') => `<div class="b2" ${at ? `data-at="${at}"` : ''} style="${extra}">${s}</div>`;
const S2 = (s, at) => `<div class="sub2" ${at ? `data-at="${at}"` : ''}>${s}</div>`;
const CHECK = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>`;
const NUM = (n, s, at, small) => `<div class="li ${small ? 'small' : ''}" data-at="${at}" data-on="${at}"><span class="num">${n}</span><span>${s}</span></div>`;
const phone = (imgs, w = 400) => `<div class="phone" style="width:${w}px;height:${Math.round(w * 2.1)}px;box-sizing:border-box"><div class="scr">${imgs}</div></div>`;

