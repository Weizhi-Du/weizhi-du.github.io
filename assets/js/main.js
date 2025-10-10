

/* ---------- STARFIELD ---------- */
const starCanvas=document.getElementById('stars');const sctx=starCanvas.getContext('2d');let stars=[],W,H;
function resizeStars(){W=starCanvas.width=innerWidth;H=starCanvas.height=innerHeight;stars=Array.from({length:Math.floor((W*H)/4000)},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*1.2+.2,a:Math.random()*0.5+0.15}))}
function drawStars(){sctx.clearRect(0,0,W,H);for(const st of stars){sctx.beginPath();sctx.arc(st.x,st.y,st.z*1.2,0,Math.PI*2);sctx.fillStyle=`rgba(${180+Math.floor(Math.random()*40)},${200+Math.floor(Math.random()*40)},255,${st.a})`;sctx.fill();st.y+=st.z*.25;if(st.y>H){st.y=-4;st.x=Math.random()*W}}requestAnimationFrame(drawStars)}
addEventListener('resize',resizeStars);resizeStars();drawStars();

/* ---------- SCROLL BAR ---------- */
const bar=document.getElementById('scrollbar');
addEventListener('scroll',()=>{const p=100*(scrollY)/(document.body.scrollHeight-innerHeight);bar.style.width=p+'%';},{passive:true});

/* ---------- NAV responsive toggle ---------- */
const navToggle=document.getElementById('navToggle');
const navLinks=document.getElementById('navLinks');
navToggle.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

/* ---------- COUNT-UP ---------- */
const counters=document.querySelectorAll('[data-count]');
const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){const el=e.target;const target=+el.dataset.count;let cur=0;const step=Math.max(1,Math.round(target/60));const t=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(t)}el.textContent=cur},18);io.unobserve(el)}})},{threshold:.5});
counters.forEach(c=>io.observe(c));

/* ---------- CURSOR TRAIL ---------- */
document.addEventListener('mousemove',(e)=>{const t=document.createElement('div');t.className='trail';t.style.left=(e.clientX-5)+'px';t.style.top=(e.clientY-5)+'px';document.body.appendChild(t);setTimeout(()=>t.remove(),900)},{passive:true});

/* ---------- MUSIC ---------- */
const musicBtn=document.getElementById('music-button');
const musicCard=document.getElementById('music-card');
const audio=document.getElementById('audio-player');
const songStatus=document.getElementById('song-status');
audio.volume=.32;
musicBtn.addEventListener('click',()=>{
  if(audio.paused){audio.play();musicBtn.classList.add('playing');musicCard.classList.add('show');songStatus.textContent='Now Playing “Tori no Uta”'}
  else{audio.pause();musicBtn.classList.remove('playing');setTimeout(()=>musicCard.classList.remove('show'),800);songStatus.textContent='Paused “Tori no Uta”'}
});
audio.addEventListener('play',()=>musicBtn.classList.add('playing'));
audio.addEventListener('pause',()=>musicBtn.classList.remove('playing'));

/* ---------- HERO SLIDESHOW (crossfade, no reset) ---------- */
(function(){
  const images = [
    'assets/images/img1.webp',
    'assets/images/img4.webp',
    'assets/images/img5.webp',
    'assets/images/img6.webp',
    'assets/images/img7.webp'
  ];
  const A = document.getElementById('heroA');
  const B = document.getElementById('heroB');

  document.documentElement.style.setProperty('--kenburns', '10s');

  // Preload
  images.forEach(src => { const im = new Image(); im.src = src; });

  let idx = 0;
  let front = A;
  let back  = B;

  function setBG(el, src){ el.style.backgroundImage = `url('${src}')`; }

  setBG(front, images[idx % images.length]); front.classList.add('active');
  setBG(back,  images[(idx+1) % images.length]);

  const SLIDE_MS = 7000;
  const FADE_MS  = 1200;

  function step(){
    idx = (idx + 1) % images.length;
    setBG(back, images[idx]);
    back.classList.add('active');

    setTimeout(() => {
      front.classList.remove('active');
      const tmp = front; front = back; back = tmp;
      const nextIdx = (idx + 1) % images.length;
      setBG(back, images[nextIdx]);
    }, FADE_MS + 20);
  }

  setInterval(step, SLIDE_MS);
})();

/* ---------- SKILLS HOVER LOGIC ---------- */
document.querySelectorAll('.orbit').forEach((orbit)=>{
  const ring=orbit.querySelector('.ring');
  const label=orbit.querySelector('.label');
  const percent=orbit.querySelector('.percent');
  const defaultName=orbit.dataset.defaultName;
  const defaultP=orbit.dataset.defaultP;

  function setDisplay(name,p){
    ring.style.setProperty('--p', p);
    label.textContent = name;
    percent.textContent = p + '%';
    ring.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:260});
  }
  function reset(){ setDisplay(defaultName, defaultP); }

  orbit.querySelectorAll('.skill').forEach(tag=>{
    const p=tag.dataset.p; const name=tag.dataset.name;
    tag.addEventListener('mouseenter',()=> setDisplay(name,p));
    tag.addEventListener('focus',()=> setDisplay(name,p));
    tag.addEventListener('mouseleave', reset);
    tag.addEventListener('blur', reset);
  });
});

/* ---------- TIMELINE SPOTLIGHT ---------- */
const milestones=[...document.querySelectorAll('.ms')];
const tio=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('active'); }});
},{threshold:.6, rootMargin:'-10% 0px -10% 0px'});
milestones.forEach(m=>{
  tio.observe(m);
  m.addEventListener('mouseenter',()=> m.classList.add('active'));
});

/* ---------- Teaching filters UX ---------- */
const chips=[...document.querySelectorAll('.chip')];
const tgrid=document.getElementById('teachingGrid');
chips.forEach(ch=>{
  ch.addEventListener('click',()=>{
    chips.forEach(c=>c.classList.remove('active'));
    ch.classList.add('active');
    const f=ch.dataset.filter;
    tgrid.querySelectorAll('.card').forEach(card=>{
      const isCurrent=card.classList.contains('current');
      const isPrev=card.classList.contains('prev');
      card.style.display =
        (f==='all') ? '' :
        (f==='current' && isCurrent) ? '' :
        (f==='prev' && isPrev) ? '' : 'none';
    });
  });
});

/* ---------- Contact: copy email ---------- */
document.getElementById('copyBtn').addEventListener('click', async ()=>{
  try{
    await navigator.clipboard.writeText('duwz730@gmail.com');
    const btn=document.getElementById('copyBtn');
    const old=btn.textContent; btn.textContent='Copied!';
    setTimeout(()=>btn.textContent=old,1000);
  }catch(e){ alert('Copy failed. Please copy manually: duwz730@gmail.com'); }
});

/* ---------- Resume button dialog ---------- */
document.getElementById('resumeBtn')?.addEventListener('click', function (e) {
  e.preventDefault();
  alert(
    "I’d love to share my latest resume.\n\n" +
    "Please email me at duwz730@gmail.com and I’ll send a copy. Thanks!"
  );
});

/* ---------- Command Palette (⌘/Ctrl + K) ---------- */
const kbar=document.getElementById('kbar');
const kinput=document.getElementById('kbar-input');
const klist=document.getElementById('kbar-list');
const ITEMS=[
  {label:'About', hash:'#about'},
  {label:'Skills', hash:'#skills'},
  {label:'Timeline', hash:'#timeline'},
  {label:'Teaching', hash:'#teaching'},
  {label:'Awards', hash:'#awards'},
  {label:'Contact', hash:'#contact'},
  {label:'Vibes', hash:'#vibes'},
];
function openK(){ kbar.classList.add('show'); kinput.value=''; renderK(''); kinput.focus(); }
function closeK(){ kbar.classList.remove('show'); }
function renderK(q){
  klist.innerHTML='';
  ITEMS.filter(i=>i.label.toLowerCase().includes(q.toLowerCase())).forEach(i=>{
    const div=document.createElement('div'); div.className='item'; div.textContent=i.label;
    div.onclick=()=>{ closeK(); scrollToHash(i.hash,true); };
    klist.appendChild(div);
  });
}
document.addEventListener('keydown',(e)=>{
  if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openK(); }
  if(e.key==='Escape'){ closeK(); }
});
kinput.addEventListener('input',(e)=>renderK(e.target.value));
kbar.addEventListener('click',(e)=>{ if(e.target===kbar) closeK(); });

/* ---------- Smooth scroll with flourish + rail active ---------- */
function scrollToHash(hash, pulse=false){
  const el=document.querySelector(hash);
  if(!el) return;
  el.scrollIntoView({behavior:'smooth', block:'start'});
  if(pulse){ el.classList.add('pulse'); setTimeout(()=>el.classList.remove('pulse'),1200); }
}

// Intercept internal links marked data-scroll
document.querySelectorAll('a[data-scroll]').forEach(a=>{
  a.addEventListener('click',(e)=>{
    const href=a.getAttribute('href');
    if(href && href.startsWith('#')){ e.preventDefault(); scrollToHash(href,true); }
    if(navLinks.classList.contains('open')) navLinks.classList.remove('open');
  });
});

// Right rail active state
const railLinks=[...document.querySelectorAll('.rail a')];
const sections=['#about','#skills','#timeline','#teaching','#awards','#contact','#vibes'].map(s=>document.querySelector(s));
const ro=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const id='#'+en.target.id;
      railLinks.forEach(l=>l.classList.toggle('active', l.getAttribute('href')===id));
    }
  });
},{root:null, rootMargin:'-40% 0px -40% 0px', threshold:0});
sections.forEach(s=>s && ro.observe(s));
railLinks.forEach(l=>l.addEventListener('click',(e)=>{ e.preventDefault(); scrollToHash(l.getAttribute('href'),true); }));

/* ---------- Scroll reveal ---------- */
const revealObs=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('show'); revealObs.unobserve(en.target); }});
},{threshold:.2});
document.querySelectorAll('[data-reveal]').forEach(el=>revealObs.observe(el));

/* ---------- Magnetic buttons ---------- */
document.querySelectorAll('.magnet').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const r=btn.getBoundingClientRect();
    const x=e.clientX - (r.left+r.width/2);
    const y=e.clientY - (r.top+r.height/2);
    btn.style.transform=`translate(${x*.08}px, ${y*.08}px)`;
  });
  btn.addEventListener('mouseleave', ()=>{ btn.style.transform='translate(0,0)'; });
});
