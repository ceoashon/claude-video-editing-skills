// ===================== "If I Started Editing Videos With AI in 2026" =====================
const css2 = document.createElement('style');
css2.textContent = `
.pill { background: var(--blue2); box-shadow: 0 10px 40px rgba(124,92,255,.45); }
.pill.or { background: var(--or); box-shadow: 0 10px 40px rgba(232,130,90,.4); font-size: 34px; padding: 16px 30px; }
.li.on .num, .chip.on, .box.on { background: var(--blue2); }
.chip.on { box-shadow: 0 10px 40px rgba(124,92,255,.45); }
.bar i { background: var(--blue2); }
.num.w { width: auto; padding: 0 16px; }
.b2.strike.on { opacity: .42; text-decoration: line-through; text-decoration-thickness: 12px; text-decoration-color: #ff6b6b; }
.card2 { background: rgba(14,10,28,.82); }
.rrow b.or { color: var(--or); }
.bub.cl { background: rgba(20,14,36,.92); color: #fff; border: 1px solid rgba(255,255,255,.12); border-bottom-left-radius: 8px; }
.bub.cl .who { display: block; font-size: 18px; letter-spacing: .14em; text-transform: uppercase; color: var(--or); margin-bottom: 6px; }
.bub.me { background: var(--blue2); }
.chip { white-space: nowrap; }
.mini { zoom: 1.4; }
.flow { display: flex; align-items: center; gap: 22px; margin: 14px 0; font-weight: 900; font-size: 46px; text-transform: uppercase; letter-spacing: -.01em; white-space: nowrap; text-shadow: 0 4px 30px rgba(0,0,0,.5); }
.flow .ic { width: 76px; height: 76px; flex: none; border-radius: 22px; background: rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center; }
.flow small { display: block; font-size: 20px; letter-spacing: .14em; color: rgba(255,255,255,.62); font-weight: 700; }
.flow.end .ic { background: var(--blue2); }
.arrowd { margin: 0 0 0 30px; height: 26px; width: 4px; background: rgba(255,255,255,.25); border-radius: 2px; }
.mini { width: 270px; transform-origin: 0 0; height: 170px; border-radius: 18px; background: #1a1430; position: relative; overflow: hidden; border: 2px solid rgba(255,255,255,.14); }
.mini .head { position: absolute; left: 105px; top: 40px; width: 60px; height: 60px; border-radius: 30px; background: rgba(255,255,255,.28); }
.mini .body { position: absolute; left: 75px; top: 108px; width: 120px; height: 80px; border-radius: 60px 60px 0 0; background: rgba(255,255,255,.2); }
.mini .t { position: absolute; height: 14px; border-radius: 7px; background: #ffd84d; }
.mini .s { position: absolute; width: 34px; height: 34px; border-radius: 10px; }
.tag { margin-top: 14px; font-weight: 900; font-size: 26px; letter-spacing: .08em; text-transform: uppercase; display: flex; align-items: center; gap: 12px; }
.folder { width: 540px; }
.frow { display: flex; align-items: center; gap: 16px; padding: 10px 0; font-weight: 700; font-size: 26px; color: rgba(255,255,255,.88); border-bottom: 1px solid rgba(255,255,255,.08); }
.frow i { width: 30px; height: 24px; border-radius: 5px; background: var(--blue2); display: block; flex: none; }
.frow i.f { width: 24px; height: 30px; border-radius: 4px; background: rgba(255,255,255,.3); }
.ubar { position: relative; width: 500px; height: 46px; border-radius: 23px; background: rgba(255,255,255,.12); margin: 16px 0 44px; }
.ubar i { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 23px; background: var(--or); display: block; }
.ubar .mk { position: absolute; left: 70%; top: -12px; bottom: -12px; width: 4px; background: #fff; border-radius: 2px; }
.ubar .mk span { position: absolute; top: 64px; left: -40px; width: 80px; text-align: center; font-weight: 900; font-size: 22px; }
.tbar { height: 54px; border-radius: 14px; display: flex; align-items: center; padding: 0 20px; font-weight: 900; font-size: 30px; margin: 8px 0 22px; box-sizing: border-box; white-space: nowrap; }
`;
document.head.appendChild(css2);
const CL = s => `<div class="bub cl"><span class="who">Claude</span>${s}</div>`;
const ME = s => `<div class="bub me">${s}</div>`;
const ICON = {
  cam: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"><rect x="2" y="7" width="15" height="12" rx="3"/><path d="M17 11l5-3v10l-5-3z"/></svg>`,
  cloud: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"><path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.5 1.5A3.3 3.3 0 0 0 7 18z"/><path d="M12 15v-5m-2.5 2.5L12 10l2.5 2.5" stroke-linecap="round"/></svg>`,
  term: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M6 9l3 3-3 3M12 15h5"/></svg>`,
  play: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#fff"><path d="M8 5.5v13l11-6.5z"/></svg>`,
};

// ---------- HOOK ----------
block('HOOK', 'this entire', 'so to get', L2('every cut · every graphic · every sound') + B2('Edited<br><span class="blue">by AI</span>', null, 'font-size:150px'), { tail: -.1 });
block('HOOK', '10 hours', 'if i were',
  `<div class="lab2">CapCut · Premiere Pro</div><div class="b2 strike" data-on="using ai">10 hrs</div>
   <div class="lab2 blue" data-at="using ai" style="margin-top:40px">with AI</div><div class="b2 blue" data-at="two hours">2 hrs</div>
   <div class="sub2" data-at="from my phone">from my phone</div>`, { side: 'R' });
block('HOOK', 'if i were', 'and in this', L2('if I started editing with AI in') + B2('2026', null, 'font-size:190px') +
  `<div style="margin-top:30px;width:660px"><span class="chip" data-at="skills" data-fx="pop">skills</span><span class="chip" data-at="prompts" data-fx="pop">prompts</span><span class="chip on" data-at="everything i use" data-fx="pop">everything I use</span></div>`);
block('HOOK', 'and in this', '$', L2('in this video') +
  `<div class="li" data-at="five to eight" data-on="five to eight"><span class="num w">5–8</span>shorts a day</div>
   <div class="li" data-at="one professionally" data-on="one professionally"><span class="num">1</span>long form</div>
   <div class="li" data-at="30 minutes" data-on="30 minutes"><span class="num w">30</span>minutes</div>` + S2('just my phone and a tripod', 'phone and a tripod'), { side: 'R', tail: -.15 });

// ---------- INTRO ----------
block('INTRO', 'opus 5 5', 'so the exact', L2('the model') + B2('Opus 5.5', null, 'font-size:140px') + S2('raw footage → a professionally edited video', 'raw footage') +
  `<div style="margin-top:30px" data-at="20 clod pro" data-fx="pop"><span class="pill or">$20/mo · Claude Pro</span></div>`);
block('INTRO', 'the exact flow', '$', L2('the exact flow') +
  `<div class="flow" data-at="raw footage#2"><span class="ic">${ICON.cam}</span><span>Raw footage<small>camera</small></span></div><div class="arrowd" data-at="upload it"></div>
   <div class="flow" data-at="upload it"><span class="ic">${ICON.cloud}</span><span>Google Drive<small>upload from phone</small></span></div><div class="arrowd" data-at="give it to"></div>
   <div class="flow" data-at="give it to"><span class="ic">${ICON.term}</span><span>Claude Code<small>Opus 5.5</small></span></div><div class="arrowd" data-at=">clod code"></div>
   <div class="flow end" data-at=">clod code"><span class="ic">${ICON.play}</span><span>Edited video</span></div>`, { side: 'R', tail: -.1 });

// ---------- STEP 1: setup ----------
block('S1', 'tripod', "it's preferable", L2('the basics') + NUM(1, 'Tripod', 'tripod') + NUM(2, 'Light', 'light') + NUM(3, 'Frame it', 'frame') + NUM(4, 'Record', 'recording'));
block('S1', 'preferable', 'also if you', L2('camera settings') +
  `<div class="card2" style="width:500px"><div class="rrow" data-at="1080p"><span>Resolution</span><b>1080p</b></div>
   <div class="rrow" data-at="hdr off" style="border-bottom:none"><span>HDR Video</span><b class="or">OFF</b></div></div>` +
  S2('Settings › Camera › Record Video', 'helps the ai'), { side: 'R' });
block('S1', 'pick up', 'for me', L2('then') + B2('Get a<br><span class="blue">mic</span>') + S2('get your audio as good as possible', 'audio quality') +
  `<div class="sub2" data-at="small studio" style="color:var(--blue)">+ a small studio light</div>`);
// lighting diagram (top-down)
block('S1', 'lighting was', 'claude help', L2('lighting, from above') + `
  <svg width="520" height="485" viewBox="0 0 600 560" style="overflow:visible">
    <g><rect x="20" y="10" width="560" height="26" rx="8" fill="rgba(124,92,255,.35)"/><text x="300" y="68" fill="rgba(255,255,255,.7)" font-size="22" font-weight="700" text-anchor="middle" letter-spacing="3">BACKDROP</text></g>
    <g><circle cx="300" cy="260" r="48" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-width="3"/><text x="300" y="268" fill="#fff" font-size="24" font-weight="900" text-anchor="middle">YOU</text></g>
    <g data-at="head level"><rect x="268" y="470" width="64" height="44" rx="10" fill="#fff"/><circle cx="300" cy="492" r="12" fill="#1a1430"/><text x="300" y="548" fill="#fff" font-size="22" font-weight="900" text-anchor="middle" letter-spacing="2">CAMERA · HEAD LEVEL</text></g>
    <g data-at="distance"><path d="M470 44 V206" stroke="var(--blue)" stroke-width="5" stroke-linecap="round"/><path d="M458 60l12-16 12 16M458 190l12 16 12-16" stroke="var(--blue)" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="492" y="134" fill="var(--blue)" font-size="24" font-weight="900" letter-spacing="2">DISTANCE</text></g>
    <g data-at="get a light"><circle cx="86" cy="420" r="34" fill="#ffd27a"/><text x="86" y="488" fill="#ffd27a" font-size="22" font-weight="900" text-anchor="middle" letter-spacing="2">LIGHT</text></g>
    <g data-at="one side"><path d="M112 398 L262 236 L292 300 Z" fill="rgba(255,210,122,.32)"/><text x="150" y="300" fill="#ffd27a" font-size="20" font-weight="900" letter-spacing="2" transform="rotate(-47 150 300)">ONE SIDE</text></g>
    <g data-at="not just straight"><path d="M300 456 V330" stroke="#ff6b6b" stroke-width="4" stroke-dasharray="10 10"/><path d="M282 376l36 36M318 376l-36 36" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><text x="336" y="400" fill="#ff6b6b" font-size="20" font-weight="900" letter-spacing="2">NOT STRAIGHT ON</text></g>
  </svg>`, { side: 'R', style: 'left:1290px;width:560px;transform-origin:0 50%' });
block('S1', 'claude help', 'also at walmart', L2('tip') + B2('Claude can<br><span class="blue">check it</span>') + S2('ask it to help adjust your lighting', 'adjust'));
block('S1', 'walmart', "i'm recording", L2('$5 · walmart') + B2('LED<br><span class="blue">strip</span>', null, 'font-size:150px') + S2('opposite your main light → a little glow', 'little glow'));
block('S1', "i'm recording", '$', L2('my setup') +
  `<div class="card2" style="width:520px"><div class="rrow" data-at="16 pro max"><span>Camera</span><b>iPhone 16 Pro Max</b></div>
   <div class="rrow" data-at="40 mic" style="border-bottom:none"><span>Mic</span><b>$40 plug-in</b></div></div>`, { side: 'R', tail: -.1 });

// ---------- STEP 2: don't script it ----------
block('S2', "don't really need", 'you could say', B2("Doesn't need<br>to be <span class=\"blue\">perfect</span>", null, 'font-size:104px'));
{ // scattered takes snap into one timeline
  const cols = ['#7c5cff', '#b197ff', '#e8825a', '#5fd0b5', '#ffd27a', '#ff7ab6'];
  const scat = [[20, 30, -12], [330, 0, 9], [120, 170, 6], [400, 160, -8], [40, 330, 10], [300, 320, -5]];
  const e = block('S2', 'bits and pieces', 'me personally', `<div class="lab2 l1">your takes, out of order</div><div class="lab2 blue l2" data-at="mush it all" style="position:absolute;top:calc(50% - 250px)">one clean timeline</div>
    <div class="clips" style="position:relative;width:520px;height:420px;transform:scale(.9);transform-origin:0 50%">${cols.map((c, i) => `<div class="clip" style="position:absolute;width:${180 + (i * 37) % 60}px;height:84px;border-radius:16px;background:${c};box-shadow:0 14px 40px rgba(0,0,0,.4)"></div>`).join('')}</div>`, { side: 'R' });
  const clips = [...e.querySelectorAll('.clip')], l1 = e.querySelector('.l1');
  const tg = tm('S2', 'mush it all') - .05;
  let x = 0; const row = clips.map(c => { const w = parseFloat(c.style.width) * .52; const r = x; x += w + 6; return [r, w]; });
  cues.push(t => {
    const q = eio(P(t, tg, .7));
    clips.forEach((c, i) => { const [sx, sy, sr] = scat[i], [rx, rw] = row[i];
      const w = parseFloat(c.style.width); const sc = 1 + (rw / w - 1) * q;
      c.style.left = (sx + (rx - sx) * q) + 'px'; c.style.top = (sy + (170 - sy) * q) + 'px';
      c.style.transformOrigin = '0 0'; c.style.transform = `rotate(${sr * (1 - q)}deg) scale(${sc},1)`; });
    l1.style.opacity = 1 - q;
  });
}
// shot sheet on the second phone (screen recording)
function phoneVid(sec, at, until, dir, n, side, label) {
  const e = el(`<div class="mid ${side}" style="${side === 'R' ? 'left:1340px' : 'left:150px'}"><div class="lab2">${label}</div>
    <div class="phone" style="width:420px;height:910px;box-sizing:border-box;transform:scale(.86);transform-origin:0 0;margin-bottom:-127px"><div class="scr" style="background:#000"><img style="object-fit:cover"></div></div></div>`, { left: 0, top: 0 });
  const img = e.querySelector('img'); const t0 = tm(sec, at) - .12, t1 = tm(sec, until) - .25;
  (window.BLOCKS = window.BLOCKS || []).push([sec, t0, t1, side]);
  let cur = '';
  cues.push(t => {
    const [v, p] = env(t, t0, t1, .4, .3);
    if (v <= 0) { set(e, 0); return; }
    set(e, v, (side === 'L' ? -40 : 40) * (1 - p), 0, 1); blur(e, 10 * (1 - p));
    const k = Math.min(n, Math.max(1, Math.floor((t - t0) * 30000 / 1001) + 1));
    const src = `assets/${dir}/${String(k).padStart(4, '0')}.jpg`;
    if (src !== cur) { cur = src; img.src = src; window.PENDING.push(img.decode().catch(() => {})); }
  });
}
phoneVid('S2', 'secondary phone', 'second phone', 'sr1', 524, 'R', 'my shot sheet · second phone');
block('S2', 'second phone', 'keep your recording', L2('second phone · amazon, renewed') + B2('$190', null, 'font-size:190px'));
block('S2', 'keep your recording', '$', L2('take length') + B2('1–2 min', null, 'font-size:150px') + S2('short takes are easier for the AI to work with', 'easier'), { tail: -.1 });

// ---------- STEP 3: phone to computer ----------
phoneVid('S3', 'best way', 'just allow', 'sr2', 601, 'R', 'phone → google drive');
block('S3', 'google drive', 'just allow', L2('the easy way') + B2('Google<br><span class="blue">Drive</span>') + S2('select the files → send → done', 'select the files') +
  `<div class="sub2" data-at="mac" style="font-size:24px;color:rgba(255,255,255,.6)">on a Mac you can just plug in</div>`);
block('S3', 'just allow', 'so if you', L2('claude code sees the whole folder') +
  `<div class="card2 folder"><div class="frow" style="font-weight:900;font-size:30px"><i></i>Eliftforlife youtube</div>
   <div class="frow" data-at="access it" style="padding-left:40px"><i class="f"></i>IMG_8117.MOV … IMG_8138.MOV</div>
   <div class="frow" data-at="everything" style="padding-left:40px"><i></i>audio</div>
   <div class="frow" data-at="that folder" style="padding-left:40px"><i></i>archive photos</div>
   <div class="frow" data-at="build the files" style="padding-left:40px;border-bottom:none"><i class="f" style="background:var(--or)"></i>final video</div></div>`, { side: 'R' });
block('S3', 'audio', '$', L2('no music library') + B2('It makes<br><span class="blue">the music</span>') + S2('every sound in this video was generated by code', 'make the audio'), { tail: -.1 });

// ---------- STEP 4: let it interview you ----------
block('S4', 'general outline', 'so ask it', L2('before you record') + B2('Get an<br><span class="blue">outline</span>', null, 'font-size:140px'));
block('S4', 'ask it to interview', 'so you could', L2('it interviews you first') +
  `<div data-at="interview">${CL('Before AI, how did you edit your videos?')}</div>
   <div data-at="video topic#2">${ME('CapCut and Premiere. An edit like this took like 10 hours.')}</div>
   <div data-at="short takes">${CL('What was the "wow" moment?')}</div>
   <div data-at="manipulate">${ME('The motion graphics.')}</div>`, { side: 'R', style: 'left:1290px;width:560px' });
block('S4', 'ramble', '$', B2('Ramble.<br><span class="blue">It still works.</span>', null, 'font-size:110px'), { tail: -.1 });

// ---------- STEP 5: you're the director ----------
block('S5', 'creative direction', 'got to be', L2("AI edits · you direct") + B2('Creative<br><span class="blue">direction</span>'));
block('S5', 'hey this', 'some of the', L2('use your eyes') +
  `<div data-at="hey this">${ME("This doesn't look very good. The music's too loud under my voice.")}</div>
   <div data-at="adjust">${CL('Fixed. Music now sits about 19 dB under your voice.')}</div>`, { side: 'R', style: 'left:1290px;width:560px' });
block('S5', 'skills and prompts', 'i believe', L2('in the description') + B2('My skills<br><span class="blue">& prompts</span>'));
block('S5', 'fail', '$', B2('Fail.<br>Test.<br><span class="blue">Repeat.</span>', null, 'font-size:130px'), { side: 'R', tail: -.1 });

// ---------- STEP 6: motion graphics ----------
block('S6', 'motion graphics', 'and this is', L2('the crazy part') + B2('Motion<br><span class="blue">graphics</span>'));
block('S6', '3d website', '$', L2('every graphic in this video') + B2('No After<br><span class="blue">Effects</span>') + S2('rendered straight from code', 'after effects'), { side: 'R', tail: -.05 });

// ---------- STEP 7: don't overdo it ----------
block('S7', 'overkill', 'from what', B2("Don't go<br><span class=\"blue\">overkill</span>", null, 'font-size:130px'));
const MINI_BUSY = `<div class="mini"><div class="head"></div><div class="body"></div>
  <i class="t" style="left:20px;top:14px;width:150px"></i><i class="t" style="left:60px;top:136px;width:160px;background:#fff"></i>
  <i class="s" style="left:200px;top:30px;background:#ff7ab6"></i><i class="s" style="left:16px;top:80px;background:#5fd0b5"></i><i class="s" style="left:214px;top:96px;background:#e8825a"></i></div>`;
const MINI_CLEAN = `<div class="mini"><div class="head"></div><div class="body"></div><i class="t" style="left:60px;top:136px;width:150px;background:#fff"></i></div>`;
block('S7', 'one clear focal', 'you kind of', L2('left alone, AI does this') + `<div data-at="one clear focal">${MINI_BUSY}</div>` +
  `<div class="tag" data-at="distracting" style="color:#ff6b6b">✕ too much going on</div>`, { side: 'R' });
block('S7', 'one thing at a time', 'and so you need', L2('what you want') + `<div data-at="one thing at a time">${MINI_CLEAN}</div>` +
  `<div class="tag" data-at="one spot" style="color:var(--blue)">✓ one focal point</div>`, { side: 'R' });
block('S7', 'subtitles up here', 'and so as long', L2('subtitles everywhere') +
  `<div class="mini" style="width:400px;height:250px"><div class="head" style="left:170px;top:60px;width:70px;height:70px;border-radius:35px"></div><div class="body" style="left:135px;top:140px;width:140px"></div>
   <i class="t" data-at="subtitles up here" data-fx="pop" style="left:30px;top:20px;width:260px"></i>
   <i class="t" data-at="subtitles down here" data-fx="pop" style="left:90px;top:206px;width:240px;background:#fff"></i></div>` +
  `<div style="margin-top:26px;transform-origin:0 50%" data-at="viewers lost" data-fx="stamp"><span class="stamp" style="font-size:70px;border-width:8px">LOST</span></div>`, { side: 'R' });
block('S7', 'one core focus', "i'm still", L2('the rule') + B2('One focus<br><span class="blue">point</span>', null, 'font-size:130px'));

// ---------- STEP 8: check your quality ----------
block('S8', 'audio getting', "so i've kind", L2('what I noticed after editing') +
  `<div class="li" data-at="audio getting"><span class="num" style="background:#ff6b6b">↓</span>Audio</div>
   <div class="li" data-at="video quality"><span class="num" style="background:#ff6b6b">↓</span>Video quality</div>`);
block('S8', 'made some skills', 'but i would', L2('so I made skills for it') +
  `<div><span class="chip on" data-at="made some skills" data-fx="pop">audio check</span><span class="chip on" data-at="help you" data-fx="pop">quality check</span></div>`, { side: 'R' });
block('S8', 'nitpick', 'communicate', L2('what was wrong on my first video') +
  `<div class="card2" style="width:540px">
    <div class="rrow" data-at="nitpick"><span>iPhone HDR footage treated as normal video</span></div>
    <div class="rrow" data-at="went wrong"><span>Compressed 4 times before upload</span></div>
    <div class="rrow" data-at="final recording" style="border-bottom:none"><span>Dim room, dark footage</span></div></div>` +
  S2('fixed: 1080p, HDR off, one clean render', 'audio levels'), { side: 'R', style: 'left:1290px;width:560px' });
block('S8', 'communicate', '$', B2('Tell Claude<br><span class="blue">what feels off</span>', null, 'font-size:96px'), { tail: -.05 });

// ---------- WHY ----------
block('WHY', 'big thing', 'the whole', B2('The big<br><span class="blue">thing</span>', null, 'font-size:150px'));
block('WHY', 'spend more time', 'because before', B2('More time<br><span class="blue">making content</span>', null, 'font-size:100px'));
block('WHY', '10 hours', 'and then now', L2('editing time') +
  `<div class="lab2" style="margin:6px 0 0">before</div><div class="tbar" data-at="10 hours" data-fx="wipe" style="width:500px;background:rgba(255,255,255,.16)">10 HRS</div>
   <div class="lab2 blue" style="margin:0" data-at="now might">now</div><div class="tbar" data-at="an hour" data-fx="wipe" style="width:170px;background:var(--blue2)">1 HR</div>
   <div data-at="send a message" style="margin-top:10px">${ME('alright, edit that')}</div>`, { side: 'R' });
block('WHY', 'stay consistent', 'that really is', L2('more time to') + `<div><span class="chip" data-at="stay consistent" data-fx="pop">stay consistent</span><span class="chip on" data-at="what you love" data-fx="pop">make what you love</span></div>`);
block('WHY', 'no views', 'because people', L2('editing can take a video from') + B2('0 views', null, 'font-size:120px') +
  `<div class="b2 blue" data-at="hundreds of thousands" style="font-size:120px">→ 100K+</div>`, { side: 'R' });
block('WHY', 'production quality', '$', B2('Production<br><span class="blue">value</span>', null, 'font-size:130px'), { tail: -.1 });

// ---------- COST ----------
block('COST', 'only costing', "haven't even", L2('claude pro') + B2('$20/mo', null, 'font-size:170px;color:var(--or)') +
  `<div class="li small" data-at="five long form" data-on="five long form"><span class="num">5</span>long forms</div>
   <div class="li small" data-at="50 shorts" data-on="50 shorts"><span class="num w">50+</span>shorts</div>`, { side: 'R' });
block('COST', "haven't even", 'so for 20', L2('weekly limit used') +
  `<div class="ubar"><i data-at="touched" data-fx="wipe" style="width:64%"></i><div class="mk" data-at="mark"><span>70%</span></div></div>` + S2("haven't even hit 70%", 'weekly limit'), { side: 'R' });
block('COST', 'full time video', '$', L2('for $20 a month') + B2('A full-time<br><span class="blue">editor</span>', null, 'font-size:120px'), { tail: -.05 });

// ---------- CTA ----------
block('CTA', 'everything that', 'that description', L2('free · in the description') +
  NUM(1, 'Skills', 'skills', true) + NUM(2, 'Prompts', 'prompts', true) + NUM(3, 'Shot sheet', 'shot sheet', true) +
  `<div class="sub2" data-at="description" style="color:var(--blue);font-size:36px">↓ link below</div>`, { side: 'R' });
block('CTA', 'completely made', 'this video was', L2('even the description') + B2('Written<br><span class="blue">by AI</span>', null, 'font-size:140px'));
block('CTA', 'one day', '$', B2('1 day.<br><span class="blue">~1 hour.</span>', null, 'font-size:140px'), { side: 'R', tail: -.05 });

// ---------- OUTRO ----------
block('OUT', 'if i were', 'this is what you', L2('if I started editing with AI in') + B2('2026', null, 'font-size:190px'));
block('OUT', 'this is what you', '$', B2('Your<br><span class="blue">turn.</span>', null, 'font-size:150px'), { tail: -.1 });

// ---------- chapter cards (step titles) ----------
const CH = { CARD1: ['01', 'Set up<br><span class="blue">your shot</span>'], CARD2: ['02', "Don't<br><span class=\"blue\">script it</span>"],
  CARD3: ['03', 'Phone to<br><span class="blue">computer</span>'], CARD4: ['04', 'Let it<br><span class="blue">interview you</span>'],
  CARD5: ['05', "You're the<br><span class=\"blue\">director</span>"], CARD6: ['06', 'Motion<br><span class="blue">graphics</span>'],
  CARD7: ['07', "Don't go<br><span class=\"blue\">overkill</span>"], CARD8: ['08', 'Check your<br><span class="blue">quality</span>'] };
for (const [label, [num, title]] of Object.entries(CH)) {
  const [a, b] = slot(label);
  const e = el(`<div class="bg" style="position:absolute;inset:0;width:1920px;height:1080px;background:radial-gradient(1200px 800px at 30% 50%,#1d1340,#0b0816)"></div>
    <div class="nb" style="position:absolute;right:120px;top:0;height:1080px;display:flex;align-items:center;font-weight:900;font-size:520px;letter-spacing:-.04em;color:rgba(177,151,255,.08)">${num}</div>
    <div class="txt" style="position:absolute;left:150px;top:0;height:1080px;display:flex;flex-direction:column;justify-content:center">
      <div class="label" style="color:var(--blue)">step ${num} / 08</div>
      <div class="big" style="font-size:130px;margin-top:14px">${title}</div>
      <div class="line" style="margin-top:34px;height:6px;width:0;border-radius:3px;background:var(--blue2)"></div></div>`,
    { left: 0, top: 0, width: '1920px', height: '1080px' });
  const bg = e.querySelector('.bg'), txt = e.querySelector('.txt'), line = e.querySelector('.line'), nb = e.querySelector('.nb');
  const t0 = a - .25, t1 = label === 'CARD7' ? b + .5 : b;      // card 7 also covers him sitting back down
  cues.push(t => {
    if (t < t0 || t > t1) { set(e, 0); return; }
    set(e, 1);
    const out = eio(P(t, t1 - .4, .4));
    bg.style.opacity = eio(P(t, t0, .4)) * (1 - out);
    const q = eo(P(t, t0 + .25, .5)); txt.style.opacity = q * (1 - out);
    txt.style.transform = `translateX(${-40 * (1 - q)}px) scale(${1 + .04 * out})`; txt.style.filter = q < 1 || out > 0 ? `blur(${10 * (1 - q) + 8 * out}px)` : 'none';
    nb.style.opacity = q * (1 - out); nb.style.transform = `translateX(${60 * (1 - q) + 40 * P(t, t0, t1 - t0)}px)`;
    line.style.width = (560 * eo(P(t, t0 + .5, .8))) + 'px';
  });
}

// ---------- SHOW: a few seconds of pure motion graphics ----------
{
  const [a, b] = slot('SHOW');
  const word = 'MOTION GRAPHICS';
  const e = el(`<div class="bg" style="position:absolute;inset:0;width:1920px;height:1080px;background:radial-gradient(1100px 700px at 50% 45%,#2a1660,#0a0714 70%);overflow:hidden">
      <div class="floor" style="position:absolute;left:-480px;right:-480px;top:560px;height:900px;transform-origin:50% 0;transform:perspective(700px) rotateX(68deg);
        background-image:linear-gradient(rgba(177,151,255,.35) 2px,transparent 2px),linear-gradient(90deg,rgba(177,151,255,.35) 2px,transparent 2px);background-size:90px 90px"></div>
      <div class="ring r1" style="position:absolute;left:660px;top:140px;width:600px;height:600px;border-radius:50%;border:3px solid rgba(177,151,255,.5)"></div>
      <div class="ring r2" style="position:absolute;left:560px;top:40px;width:800px;height:800px;border-radius:50%;border:2px dashed rgba(232,130,90,.45)"></div>
      <div class="scene" style="position:absolute;left:810px;top:290px;width:300px;height:300px;perspective:1100px">
        <div class="cube" style="position:absolute;inset:0;transform-style:preserve-3d">
          ${['rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'].map((r, i) =>
            `<div style="position:absolute;inset:0;transform:${r} translateZ(150px);border:4px solid ${i % 2 ? '#e8825a' : '#b197ff'};background:${i % 2 ? 'rgba(232,130,90,.16)' : 'rgba(124,92,255,.22)'};border-radius:24px;backface-visibility:visible"></div>`).join('')}
        </div></div>
      <div class="word" style="position:absolute;left:0;width:1920px;top:770px;text-align:center;font-weight:900;font-size:120px;letter-spacing:.02em">${[...word].map(c => `<span style="display:inline-block;white-space:pre">${c}</span>`).join('')}</div>
      <div class="sub" style="position:absolute;left:0;width:1920px;top:920px;text-align:center" ><span class="label" style="color:var(--blue)">made with code · no after effects</span></div>
    </div>`, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const bg = e.querySelector('.bg'), cube = e.querySelector('.cube'), floor = e.querySelector('.floor'), r1 = e.querySelector('.r1'), r2 = e.querySelector('.r2');
  const letters = [...e.querySelectorAll('.word span')], sub = e.querySelector('.sub');
  const t0 = a - .2, t1 = b;
  cues.push(t => {
    if (t < t0 || t > t1) { set(e, 0); return; }
    set(e, 1);
    const k = t - t0, out = eio(P(t, t1 - .35, .35));
    bg.style.opacity = eio(P(t, t0, .35)) * (1 - out);
    floor.style.backgroundPosition = `0 ${k * 160}px`;
    const s = back(P(t, t0 + .2, .7));
    cube.style.transform = `scale(${s}) rotateX(${-22 + 12 * Math.sin(k * 1.3)}deg) rotateY(${k * 70}deg)`;
    r1.style.transform = `rotate(${k * 40}deg) scale(${.6 + .4 * eo(P(t, t0 + .1, .8))})`; r2.style.transform = `rotate(${-k * 25}deg) scale(${.7 + .3 * eo(P(t, t0 + .3, .9))})`;
    letters.forEach((l, i) => { const q = back(P(t, t0 + .9 + i * .05, .45)); l.style.opacity = clamp(q * 2); l.style.transform = `translateY(${60 * (1 - q)}px) scale(${.6 + .4 * q})`; });
    sub.style.opacity = eo(P(t, t0 + 2.0, .5));
  });
}

// ---------- END card ----------
{
  const [a, b] = slot('END');
  const e = el(`<div class="bg" style="position:absolute;inset:0;width:1920px;height:1080px;background:radial-gradient(1200px 800px at 50% 50%,#1d1340,#0b0816)"></div>
    <div class="ct" style="position:absolute;left:0;top:0;width:1920px;height:1080px;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <div class="label">@eliftforlife</div>
      <div class="big" style="font-size:120px;margin-top:20px;text-transform:none;letter-spacing:-.02em">subscribe for a <span class="blue">lemon</span> 🍋</div>
      <div class="label" style="margin-top:34px;color:var(--blue)">every skill from this video is in the description</div></div>`,
    { left: 0, top: 0, width: '1920px', height: '1080px' });
  const bg = e.querySelector('.bg'), ct = e.querySelector('.ct');
  const t0 = a - .2;
  cues.push(t => {
    if (t < t0) { set(e, 0); return; }
    set(e, 1); bg.style.opacity = eio(P(t, t0, .5));
    const q = eo(P(t, t0 + .3, .6)), out = eio(P(t, b - 1.0, 1.0));
    ct.style.opacity = q * (1 - out); ct.style.transform = `translateY(${40 * (1 - q)}px)`;
  });
}

