// fit big lines to their column once fonts are in, then signal ready
document.fonts.ready.then(() => {
  for (const [b, maxW] of FIT) {
    const host = b.closest('.abs'); const prev = host.style.display; host.style.display = 'block'; host.style.opacity = 0;
    let fs = parseFloat(getComputedStyle(b).fontSize);
    while (b.scrollWidth > maxW && fs > 40) { fs -= 4; b.style.fontSize = fs + 'px'; }
    host.style.display = prev;
  }
  return Promise.all([...document.images].map(i => i.decode().catch(() => {})));
}).then(() => { window.READY = true; });
})();
