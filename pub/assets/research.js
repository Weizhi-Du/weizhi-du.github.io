const progress = document.querySelector('.reading-progress');
const contents = document.querySelector('.contents details');
const media = window.matchMedia('(max-width:760px)');
function setContents() { if (contents) contents.open = !media.matches; }
setContents();
media.addEventListener('change', setContents);
const headings = [...document.querySelectorAll('.paper-body h2[id], .paper-body h3[id]')];
const links = [...document.querySelectorAll('.contents a')];
let queued = false;
function updateReading() {
  queued = false;
  const range = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0})`;
  let current = headings[0]?.id;
  for (const heading of headings) { if (heading.getBoundingClientRect().top <= 160) current = heading.id; }
  for (const link of links) {
    if (link.hash === '#' + current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
function queueReading() { if (!queued) { queued = true; requestAnimationFrame(updateReading); } }
window.addEventListener('scroll', queueReading, {passive:true});
window.addEventListener('resize', queueReading, {passive:true});
window.addEventListener('load', queueReading);
document.addEventListener('toggle', queueReading, true);
updateReading();
const dialog = document.querySelector('.figure-dialog');
if (dialog?.showModal) {
  const image = dialog.querySelector('img');
  document.querySelectorAll('.figure-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      dialog.showModal();
      dialog.querySelector('.figure-viewport').scrollTo(0, 0);
      document.body.classList.add('figure-open');
    });
  });
  dialog.querySelector('.close-figure').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => document.body.classList.remove('figure-open'));
}
