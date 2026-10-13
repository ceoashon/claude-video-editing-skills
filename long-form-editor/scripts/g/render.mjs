// node render.mjs <startFrame> <endFrame>  -> frames/f%05d.png (1920x1080, transparent)
import { createRequire } from 'module'; import path from 'path'; import fs from 'fs'; import { pathToFileURL } from 'url';
const require = createRequire(import.meta.url);
const pw = require('playwright');
const [,, A, B, only] = process.argv; const FPS = 30000 / 1001;
const browser = await pw.chromium.launch({ args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
await page.goto(pathToFileURL(path.resolve('index.html')).href);
await page.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
fs.mkdirSync('frames', { recursive: true });
const list = only ? only.split(',').map(Number) : null;
const st = Date.now(); let n = 0;
for (let i = +A; i < +B; i++) {
  if (list && !list.includes(i)) continue;
  await page.evaluate(t => window.seek(t), i / FPS);
  const empty = await page.evaluate(() => [...document.querySelectorAll('#stage > .abs')].every(e => e.style.display === 'none'));
  const f = `frames/f${String(i).padStart(5, '0')}.png`;
  if (empty) { fs.copyFileSync('blank.png', f); continue; }
  await page.screenshot({ path: f, type: 'png', omitBackground: true }); n++;
}
await browser.close();
console.log(`frames ${A}-${B}: ${n} drawn in ${((Date.now() - st) / 1000).toFixed(0)}s`);
