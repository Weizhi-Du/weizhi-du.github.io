/* ---------- STARFIELD ---------- */
const starCanvas=document.getElementById('stars');const sctx=starCanvas.getContext('2d');let stars=[],W,H;
function resizeStars(){
  W=starCanvas.width=innerWidth;H=starCanvas.height=innerHeight;
  stars=Array.from({length:Math.floor((W*H)/4000)},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*1.2+.2,a:Math.random()*0.5+0.15}))
}
function drawStars(){
  sctx.clearRect(0,0,W,H);
  for(const st of stars){
    sctx.beginPath();
    sctx.arc(st.x,st.y,st.z*1.2,0,Math.PI*2);
    sctx.fillStyle=`rgba(${180+Math.floor(Math.random()*40)},${200+Math.floor(Math.random()*40)},255,${st.a})`;
    sctx.fill();
    st.y+=st.z*.25;
    if(st.y>H){st.y=-4;st.x=Math.random()*W}
  }
  requestAnimationFrame(drawStars)
}
addEventListener('resize',resizeStars);resizeStars();drawStars();

/* ---------- Set --nav-offset so hero overlays never get blocked ---------- */
function updateNavOffset(){
  const nav = document.querySelector('nav');
  if(!nav) return;
  const r = nav.getBoundingClientRect();
  const bottom = Math.ceil(r.bottom);
  // a little breathing room
  document.documentElement.style.setProperty('--nav-offset', (bottom + 10) + 'px');
}
addEventListener('resize', updateNavOffset, {passive:true});
addEventListener('load', updateNavOffset);
setTimeout(updateNavOffset, 50);

/* ---------- SCROLL BAR + Top button ---------- */
const bar=document.getElementById('scrollbar');
const topBtn=document.getElementById('topBtn');
function onScroll(){
  const p=100*(scrollY)/(document.body.scrollHeight-innerHeight);
  bar.style.width=p+'%';
  if(scrollY > 120){
    topBtn.classList.add('show');
  }else{
    topBtn.classList.remove('show');
  }
}
addEventListener('scroll', onScroll, {passive:true});
onScroll();

topBtn.addEventListener('click', ()=>{
  window.scrollTo({top:0, behavior:'smooth'});
});

/* ---------- NAV responsive toggle ---------- */
const navToggle=document.getElementById('navToggle');
const navLinks=document.getElementById('navLinks');
navToggle.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

/* ---------- CURSOR TRAIL ---------- */
document.addEventListener('mousemove',(e)=>{
  const t=document.createElement('div');
  t.className='trail';
  t.style.left=(e.clientX-5)+'px';
  t.style.top=(e.clientY-5)+'px';
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),900)
},{passive:true});

/* ---------- MUSIC ---------- */
const musicBtn=document.getElementById('music-button');
const musicCard=document.getElementById('music-card');
const audio=document.getElementById('audio-player');
const songStatus=document.getElementById('song-status');
audio.volume=.32;
musicBtn.addEventListener('click',()=>{
  if(audio.paused){
    audio.play();
    musicBtn.classList.add('playing');
    musicCard.classList.add('show');
    songStatus.textContent='Now Playing “Tori no Uta”'
  }else{
    audio.pause();
    musicBtn.classList.remove('playing');
    setTimeout(()=>musicCard.classList.remove('show'),800);
    songStatus.textContent='Paused “Tori no Uta”'
  }
});
audio.addEventListener('play',()=>musicBtn.classList.add('playing'));
audio.addEventListener('pause',()=>musicBtn.classList.remove('playing'));

/* ---------- HERO SLIDESHOW (crossfade) ---------- */
(function(){
  const images = [
    'assets/images/img1.webp',
    'assets/images/img4.webp',
    'assets/images/img5.webp'
  ];
  const A = document.getElementById('heroA');
  const B = document.getElementById('heroB');

  document.documentElement.style.setProperty('--kenburns', '10s');

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
    await navigator.clipboard.writeText('d.weizhi@wustl.edu');
    const btn=document.getElementById('copyBtn');
    const old=btn.textContent; btn.textContent='Copied!';
    setTimeout(()=>btn.textContent=old,1000);
  }catch(e){
    alert('Copy failed. Please copy manually: d.weizhi@wustl.edu');
  }
});

/* ---------- Resume button dialog ---------- */
document.getElementById('resumeBtn')?.addEventListener('click', function (e) {
  e.preventDefault();
  alert(
    "I’d love to share my latest resume.\n\n" +
    "Please email me at d.weizhi@wustl.edu and I’ll send a copy. Thanks!"
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
];
function openK(){ kbar.classList.add('show'); kinput.value=''; renderK(''); kinput.focus(); }
function closeK(){ kbar.classList.remove('show'); }
function renderK(q){
  klist.innerHTML='';
  ITEMS
    .filter(i=>i.label.toLowerCase().includes(q.toLowerCase()))
    .forEach(i=>{
      const div=document.createElement('div');
      div.className='item';
      div.textContent=i.label;
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

document.querySelectorAll('a[data-scroll]').forEach(a=>{
  a.addEventListener('click',(e)=>{
    const href=a.getAttribute('href');
    if(href && href.startsWith('#')){ e.preventDefault(); scrollToHash(href,true); }
    if(navLinks.classList.contains('open')) navLinks.classList.remove('open');
  });
});

const railLinks=[...document.querySelectorAll('.rail a')];
const sections=['#about','#skills','#timeline','#teaching','#awards','#contact'].map(s=>document.querySelector(s));

/* ---------- Active pill slider (desktop) ---------- */
const activePill = document.getElementById('activePill');
const navAnchors = [...document.querySelectorAll('#navLinks a[href^="#"]')];

function movePillTo(anchor){
  if(!activePill || !anchor) return;
  if(window.matchMedia('(max-width:900px)').matches) return;

  const parent = document.getElementById('navLinks');
  const pr = parent.getBoundingClientRect();
  const ar = anchor.getBoundingClientRect();

  const x = Math.max(0, ar.left - pr.left);
  activePill.style.setProperty('--pill-x', x + 'px');
  activePill.style.width = ar.width + 'px';
}

function setNavActive(id){
  navAnchors.forEach(a=>{
    const isActive = a.getAttribute('href') === id;
    if(isActive){
      a.setAttribute('aria-current','page');
      movePillTo(a);
    }else{
      a.removeAttribute('aria-current');
    }
  });
}

const ro=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const id='#'+en.target.id;

      /* rail */
      railLinks.forEach(l=>l.classList.toggle('active', l.getAttribute('href')===id));

      /* nav pill */
      setNavActive(id);
    }
  });
},{root:null, rootMargin:'-40% 0px -40% 0px', threshold:0});
sections.forEach(s=>s && ro.observe(s));

/* initial pill position */
setTimeout(()=>{ setNavActive('#about'); }, 60);

addEventListener('resize', ()=>{
  // keep pill aligned after resize
  const cur = navAnchors.find(a=>a.getAttribute('aria-current')==='page') || navAnchors[0];
  movePillTo(cur);
  updateNavOffset();
}, {passive:true});

railLinks.forEach(l=>l.addEventListener('click',(e)=>{ e.preventDefault(); scrollToHash(l.getAttribute('href'),true); }));

/* ---------- Scroll reveal (subtle, one-time) ---------- */
const revealObs=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add('show');
      revealObs.unobserve(en.target);
    }
  });
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

/* ---------- DevTools welcome ---------- */
(function () {
  const ART = String.raw`
 _   _      _ _         __        __         _     _ 
| | | | ___| | | ___    \ \      / /__  _ __| | __| |
| |_| |/ _ \ | |/ _ \    \ \ /\ / / _ \| '__| |/ _\ |
|  _  |  __/ | | (_) |    \ V  V / (_) | |  | | (_| |
|_| |_|\___|_|_|\___/      \_/\_/ \___/|_|  |_|\__,_|

                     Welcome to Weizhi's lobby
`;

  let commentNode = null;
  let lastPrint = 0;

  function showEgg() {
    // small cooldown
    const now = Date.now();
    if (now - lastPrint < 600) return;
    lastPrint = now;

    // print to Console
    try {
      console.log(
        "%c" + ART,
        [
          "color:#eaf2ff",
          "font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          "font-size:12px",
          "line-height:1.15",
          "text-shadow:0 0 10px rgba(0,234,255,.22)",
        ].join(";")
      );
    } catch (_) {}

    // in Elements
    try {
      if (!commentNode) {
        commentNode = document.createComment("\n" + ART + "\n");
        document.documentElement.appendChild(commentNode);
      } else {
        commentNode.data = "\n" + ART + "\n";
      }
    } catch (_) {}
  }

  document.addEventListener(
    "keydown",
    (e) => {
      const k = (e.key || "").toLowerCase();

      const isF12 = e.key === "F12";
      const isWinDevtools =
        e.ctrlKey && e.shiftKey && (k === "i" || k === "j" || k === "c");
      const isMacDevtools =
        e.metaKey && e.altKey && (k === "i" || k === "j" || k === "c");

      if (isF12 || isWinDevtools || isMacDevtools) {
        setTimeout(showEgg, 250);
      }
    },
    true
  );

  function devtoolsProbablyOpen() {
    const w = window.outerWidth - window.innerWidth;
    const h = window.outerHeight - window.innerHeight;
    return w > 160 || h > 160;
  }

  let wasOpen = false;
  setInterval(() => {
    const open = devtoolsProbablyOpen();
    if (open && !wasOpen) showEgg();
    wasOpen = open;
  }, 500);
})();
