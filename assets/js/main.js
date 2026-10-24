const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const hero = document.getElementById('profile');
const scenes = [...document.querySelectorAll('[data-scene]')];
const clamp = (n) => Math.max(0, Math.min(1, n));

function closeMenu() {
  navLinks?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
});
navLinks?.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks?.classList.contains('open')) { closeMenu(); navToggle.focus(); }
});
document.addEventListener('click', (event) => { if (!event.target.closest('.nav-wrap')) closeMenu(); });
window.matchMedia('(min-width:801px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });

const targets = [...document.querySelectorAll('[data-reveal]')];
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .05, rootMargin: '0px 0px -15px 0px' });
targets.forEach((target) => revealObserver.observe(target));
if (!motion.matches) document.documentElement.classList.add('motion-enabled');

const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"], .section-dots a')];
const chapters = [...document.querySelectorAll('.hero, main>.section, .closing-chapter')];
const chapterCue = document.getElementById('chapterCue');
const siteFooter = document.querySelector('.site-footer');
const pageProgress = document.getElementById('pageProgress');
const chapterLabels = {profile: 'Back to top', industry: 'Industry', research: 'Research', work: 'Selected projects', teaching: 'Teaching', human: 'The vibe & contact'};
const graphLayers = [...document.querySelectorAll('.sketch-motion')];
const landingSketch = document.querySelector('.landing-sketch');
const rankingDrawing = document.querySelector('.ranking-drawing');
const boardDrawing = document.querySelector('.board-drawing');
const rankingLink = document.querySelector('.ranking-link');
const feedbackPath = document.querySelector('.feedback-path');
const loopSignal = document.querySelector('.loop-signal');
const feedbackLength = feedbackPath?.getTotalLength() || 0;
const validationRoute = document.querySelector('.validation-route');
const validationLength = validationRoute?.getTotalLength() || 0;
let activeChapter = '';
let scrollQueued = false;
let heroIntroStarted = false;
let heroIntroAnimations = [];

function stopHeroIntro() {
  heroIntroAnimations.forEach((animation) => animation.cancel());
  heroIntroAnimations = [];
  hero?.classList.remove('is-introducing');
}

function startHeroIntro() {
  if (heroIntroStarted || !hero) return;
  heroIntroStarted = true;
  if (motion.matches || scrollY > 8 || !hero.animate) return;
  const art = hero.querySelector('.hero-art');
  if (!art || art.getBoundingClientRect().top >= innerHeight) return;
  hero.classList.add('is-introducing');
  const animate = (element, frames, options) => {
    if (!element) return;
    heroIntroAnimations.push(element.animate(frames, {
      fill: 'backwards', easing: 'cubic-bezier(.22,.68,.25,1)', ...options,
    }));
  };
  // Animate inner opacity and strokes so the scroll transforms stay independent.
  hero.querySelectorAll('.sketch-reveal').forEach((stage, index) => {
    animate(stage, [{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: index * 800 });
    stage.querySelectorAll('.opening-path').forEach((path) => {
      animate(path, [
        { strokeDasharray: '1', strokeDashoffset: '1' },
        { strokeDasharray: '1', strokeDashoffset: '0' },
      ], { duration: 850, delay: index * 800 + 100 });
    });
  });
  animate(rankingLink, [
    { opacity: 0, strokeDasharray: '1', strokeDashoffset: '1' },
    { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0' },
  ], { duration: 750, delay: 650 });
  hero.querySelectorAll('.opening-stone').forEach((stone, index) => {
    animate(stone, [{ opacity: 0 }, { opacity: 1 }], { duration: 220, delay: 1050 + index * 100 });
  });
  animate(hero.querySelector('.validation-gate'), [
    { strokeWidth: '1.5', stroke: '#405b6b' },
    { strokeWidth: '3', stroke: '#386a67', offset: .45 },
    { strokeWidth: '1.5', stroke: '#405b6b' },
  ], { duration: 650, delay: 2300 });
  animate(hero.querySelector('.keep-outline'), [
    { stroke: '#c66d42' }, { stroke: '#386a67', offset: .45 }, { stroke: '#c66d42' },
  ], { duration: 650, delay: 2650 });
  Promise.all(heroIntroAnimations.map((animation) => animation.finished)).then(() => {
    heroIntroAnimations = [];
    hero.classList.remove('is-introducing');
  }).catch(() => { /* Scrolling or reduced-motion preference cancels the introduction. */ });
}

function updateSketchLink() {
  if (!landingSketch || !rankingDrawing || !boardDrawing || !rankingLink) return;
  // Keep the connector in the SVG's coordinate system as each drawing moves.
  const rootMatrix = landingSketch.getCTM();
  const fromMatrix = rankingDrawing.getCTM();
  const toMatrix = boardDrawing.getCTM();
  if (!rootMatrix || !fromMatrix || !toMatrix) return;
  const inverse = rootMatrix.inverse();
  const start = new DOMPoint(277, 124).matrixTransform(fromMatrix).matrixTransform(inverse);
  const end = new DOMPoint(369, 116).matrixTransform(toMatrix).matrixTransform(inverse);
  const bend = Math.max(28, (end.x - start.x) * .45);
  rankingLink.setAttribute('d', `M${start.x} ${start.y}C${start.x + bend} ${start.y} ${end.x - bend} ${end.y} ${end.x} ${end.y}`);
}

function setActiveChapter(id) {
  if (activeChapter === id) return;
  activeChapter = id;
  const next = chapters[(chapters.findIndex((chapter) => chapter.id === id) + 1) % chapters.length];
  if (chapterCue && next) {
    chapterCue.href = '#' + next.id;
    chapterCue.querySelector('span').textContent = chapterLabels[next.id];
    chapterCue.setAttribute('aria-label', next.id === 'profile' ? 'Back to top' : 'Next section: ' + chapterLabels[next.id]);
    chapterCue.classList.toggle('is-last', next.id === 'profile');
    chapterCue.classList.toggle('on-dark', id === 'human');
  }
  navAnchors.forEach((anchor) => {
    if (anchor.hash === '#' + id || (id === 'human' && anchor.hash === '#contact')) anchor.setAttribute('aria-current', 'location');
    else anchor.removeAttribute('aria-current');
  });
}

// A single frame updates page progress, drawings, and the persistent chapter cue.
function updateScroll() {
  scrollQueued = false;
  if (pageProgress) {
    const scrollRange = document.documentElement.scrollHeight - innerHeight;
    const fraction = scrollRange > 0 ? clamp(scrollY / scrollRange) : 0;
    pageProgress.style.transform = `scaleX(${fraction.toFixed(5)})`;
  }
  let current = chapters[0]?.id;
  chapters.forEach((chapter) => {
    const bounds = chapter.getBoundingClientRect();
    const near = bounds.top < innerHeight + 80 && bounds.bottom > -80;
    chapter.classList.toggle('is-near', near);
    if (bounds.top <= innerHeight * .4) current = chapter.id;
    if (!chapter.classList.contains('section')) return;
    const enter = motion.matches ? 1 : clamp((innerHeight - bounds.top) / (innerHeight * .65));
    chapter.style.setProperty('--section-shift', ((1 - enter) * 24).toFixed(2) + 'px');
    chapter.style.setProperty('--section-opacity', (.86 + enter * .14).toFixed(3));
  });
  if (scrollY + innerHeight >= document.documentElement.scrollHeight - 8) current = chapters.at(-1)?.id;
  if (current) setActiveChapter(current);
  if (chapterCue && siteFooter) {
    const footer = siteFooter.getBoundingClientRect();
    const visibleFooter = Math.max(0, Math.min(footer.height, innerHeight - footer.top));
    chapterCue.style.setProperty('--footer-clearance', visibleFooter.toFixed(2) + 'px');
  }

  if (hero) {
    const bounds = hero.getBoundingClientRect();
    const progress = motion.matches ? 0 : clamp(-bounds.top / Math.min(bounds.height, innerHeight * .82));
    hero.style.setProperty('--hero-progress', progress.toFixed(3));
    hero.style.setProperty('--rank-signal', motion.matches ? '1' : (.65 + progress * .9).toFixed(3));
    hero.style.setProperty('--play-progress', (motion.matches ? 0 : clamp(progress * 2.5)).toFixed(3));
    hero.style.setProperty('--stone-scale', motion.matches ? '1' : (1 + progress * .7).toFixed(3));
    const flowProgress = clamp(progress * 2);
    const travelled = validationLength * flowProgress;
    const returnProgress = feedbackLength ? clamp(travelled / feedbackLength) : 0;
    hero.style.setProperty('--loop-progress', returnProgress.toFixed(3));
    hero.style.setProperty('--flow-progress', flowProgress.toFixed(3));
    hero.style.setProperty('--loop-visible', !motion.matches && flowProgress > 0 && flowProgress < .98 ? '1' : '0');
    hero.style.setProperty('--gate-active', (motion.matches ? 0 : 1 - Math.abs(flowProgress * 2 - 1)).toFixed(3));
    hero.style.setProperty('--check-reveal', motion.matches ? '1' : clamp((flowProgress - .88) / .12).toFixed(3));
    hero.classList.toggle('is-kept', !motion.matches && flowProgress >= 1);
    if (validationRoute && loopSignal) {
      const point = validationRoute.getPointAtLength(travelled);
      loopSignal.setAttribute('cx', point.x.toFixed(2));
      loopSignal.setAttribute('cy', point.y.toFixed(2));
    }
    const paths = [
      {x: -210, y: -115, turn: -17, scale: .28},
      {x: 220, y: 100, turn: 24, scale: .58},
      {x: -90, y: 240, turn: -11, scale: .4},
    ];
    const spread = progress * progress * (3 - 2 * progress);
    const mobileScale = innerWidth <= 600 ? .55 : 1;
    graphLayers.forEach((layer, index) => {
      const path = paths[index];
      layer.style.transform = motion.matches ? 'none' :
        `translate(${((spread * path.x) * mobileScale).toFixed(2)}px, ${((spread * path.y) * mobileScale).toFixed(2)}px) rotate(${(spread * path.turn).toFixed(2)}deg) scale(${(1 + spread * path.scale).toFixed(3)})`;
    });
    updateSketchLink();
  }
  scenes.forEach((scene) => {
    const bounds = scene.getBoundingClientRect();
    const progress = motion.matches ? 1 : clamp((innerHeight * .94 - bounds.top) / Math.min(bounds.height, innerHeight * .62));
    scene.style.setProperty('--scene', progress.toFixed(3));
  });
}
function queueScroll() {
  if (scrollY > 8 && heroIntroAnimations.length) stopHeroIntro();
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); }
}
window.addEventListener('scroll', queueScroll, { passive: true });
window.addEventListener('resize', queueScroll, { passive: true });
window.addEventListener('load', queueScroll, { passive: true });
document.addEventListener('toggle', queueScroll, true);
motion.addEventListener('change', () => {
  if (motion.matches) stopHeroIntro();
  document.documentElement.classList.toggle('motion-enabled', !motion.matches);
  if (motion.matches) targets.forEach((target) => target.classList.add('is-visible'));
  updateScroll();
});
window.addEventListener('beforeprint', stopHeroIntro);
window.addEventListener('pagehide', stopHeroIntro);
updateScroll();
startHeroIntro();

const copyButton = document.getElementById('copyBtn');
let copyTimer;
copyButton?.addEventListener('click', async () => {
  clearTimeout(copyTimer);
  try { await navigator.clipboard.writeText('d.weizhi@wustl.edu'); copyButton.textContent = 'Copied'; }
  catch { copyButton.textContent = 'Use email link'; }
  copyTimer = setTimeout(() => { copyButton.textContent = 'Copy'; }, 2500);
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
