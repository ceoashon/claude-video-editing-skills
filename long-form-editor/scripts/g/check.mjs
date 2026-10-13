// node check.mjs -> loads the page, reports errors and READY
import { createRequire } from 'module'; import path from 'path'; import { pathToFileURL } from 'url';
const require = createRequire(import.meta.url);
const pw = require('playwright');
const b = await pw.chromium.launch({ args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto(pathToFileURL(path.resolve('index.html')).href);
try { await p.waitForFunction(() => window.READY === true, null, { timeout: 20000 }); console.log('READY, duration', await p.evaluate(() => window.DURATION)); console.log(JSON.stringify(await p.evaluate(() => window.BLOCKS))); require('fs').writeFileSync('../qa/cues.json', JSON.stringify(await p.evaluate(() => ({ blocks: window.BLOCKS, kids: window.KIDS, duration: window.DURATION })))); }
catch { console.log('not ready'); }
console.log(errs.join('\n') || 'no errors'); await b.close();
