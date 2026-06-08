const sections = [
  { id: "profile", label: "Profile" },
  { id: "industry", label: "Industry" },
  { id: "research", label: "Research" },
  { id: "teaching", label: "Teaching" },
  { id: "honors", label: "Honors" },
  { id: "work", label: "Impact" },
  { id: "human", label: "Human" },
  { id: "contact", label: "Contact" },
];

const scrollbar = document.getElementById("scrollbar");
const topBtn = document.getElementById("topBtn");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = [...document.querySelectorAll(".nav-links a[href^='#']")];
const railAnchors = [...document.querySelectorAll(".rail a[href^='#']")];
const scrollCue = document.querySelector(".scroll-cue");

function updateScrollUI() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (scrollbar) scrollbar.style.width = `${progress}%`;
  if (topBtn) topBtn.classList.toggle("show", window.scrollY > 500);
}

function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI, { passive: true });
updateScrollUI();

topBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.classList.toggle("nav-open", open);
});

document.querySelectorAll("[data-scroll]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    event.preventDefault();
    scrollToHash(href);
    navLinks?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  });
});

function setActiveSection(id) {
  const hash = `#${id}`;
  navAnchors.forEach((anchor) => {
    const active = anchor.getAttribute("href") === hash;
    if (active) {
      anchor.setAttribute("aria-current", "page");
    } else {
      anchor.removeAttribute("aria-current");
    }
  });
  railAnchors.forEach((anchor) => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === hash);
  });
  if (scrollCue) {
    const activeIndex = sections.findIndex((section) => section.id === id);
    const nextSection = sections[activeIndex + 1];
    scrollCue.classList.toggle("is-hidden", id === "contact");
    scrollCue.classList.toggle("show-word", id === "profile");
    if (nextSection) {
      scrollCue.setAttribute("href", `#${nextSection.id}`);
      scrollCue.setAttribute("aria-label", `Scroll to ${nextSection.label.toLowerCase()}`);
    }
  }
}

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveSection(entry.target.id);
    });
  },
  { rootMargin: "-42% 0px -48% 0px", threshold: 0 }
);

sections.forEach(({ id }) => {
  const el = document.getElementById(id);
  if (el) activeObserver.observe(el);
});
setActiveSection("profile");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--ry", `${x * 4}deg`);
    card.style.setProperty("--rx", `${-y * 4}deg`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
  });
});

const rankStack = document.getElementById("rankStack");
const rerankBtn = document.getElementById("rerankBtn");
const queryCard = document.getElementById("queryCard");
const queryText = document.getElementById("queryText");

const prompts = [
  {
    text: "high-signal ML engineer",
    order: [
      ["tiktok", 99],
      ["meituan", 96],
      ["pet", 92],
      ["teaching", 89],
      ["systems", 87],
    ],
  },
  {
    text: "core search ranking intern",
    order: [
      ["tiktok", 99],
      ["meituan", 94],
      ["systems", 90],
      ["pet", 86],
      ["teaching", 84],
    ],
  },
  {
    text: "LLM post-training builder",
    order: [
      ["meituan", 99],
      ["tiktok", 93],
      ["systems", 89],
      ["pet", 86],
      ["teaching", 83],
    ],
  },
  {
    text: "safety-aware medical AI researcher",
    order: [
      ["pet", 99],
      ["meituan", 91],
      ["tiktok", 89],
      ["systems", 86],
      ["teaching", 84],
    ],
  },
  {
    text: "algorithms head TA mentor",
    order: [
      ["teaching", 99],
      ["systems", 94],
      ["tiktok", 90],
      ["meituan", 88],
      ["pet", 85],
    ],
  },
  {
    text: "cloud systems engineer",
    order: [
      ["systems", 99],
      ["teaching", 93],
      ["meituan", 90],
      ["tiktok", 88],
      ["pet", 84],
    ],
  },
  {
    text: "quant-minded AI systems builder",
    order: [
      ["systems", 99],
      ["tiktok", 94],
      ["meituan", 92],
      ["pet", 87],
      ["teaching", 85],
    ],
  },
];

let promptIndex = 0;

function formatScore(score) {
  return `0.${String(score).padStart(2, "0")}`;
}

function applyPrompt(prompt, animate = true) {
  if (!rankStack) return;
  if (queryText) queryText.textContent = prompt.text;
  if (queryCard && animate) {
    queryCard.classList.remove("is-changing");
    void queryCard.offsetWidth;
    queryCard.classList.add("is-changing");
  }

  const cards = [...rankStack.querySelectorAll(".rank-card")];
  const cardByKey = new Map(cards.map((card) => [card.dataset.key, card]));
  prompt.order.forEach(([key, score], index) => {
    const card = cardByKey.get(key);
    if (!card) return;
    if (animate) card.style.transform = "translateX(10px)";
    rankStack.appendChild(card);
    requestAnimationFrame(() => {
      card.querySelector(".rank-index").textContent = String(index + 1).padStart(2, "0");
      card.querySelector("b").textContent = formatScore(score);
      card.style.transform = "";
    });
  });
}

function rerankCards() {
  promptIndex = (promptIndex + 1) % prompts.length;
  applyPrompt(prompts[promptIndex]);
}

applyPrompt(prompts[promptIndex], false);
rerankBtn?.addEventListener("click", rerankCards);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canvas = document.getElementById("rankerCanvas");
const ctx = canvas?.getContext("2d");
let particles = [];
let pointer = { x: 0.5, y: 0.5 };
let canvasW = 0;
let canvasH = 0;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvasW = rect.width;
  canvasH = rect.height;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  particles = Array.from({ length: 32 }, (_, i) => ({
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: 2 + (i % 4),
  }));
}

function drawCanvas(loop = true) {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvasW, canvasH);
  const px = pointer.x * canvasW;
  const py = pointer.y * canvasH;

  particles.forEach((p, index) => {
    p.x += p.vx + (px - p.x) * 0.0009;
    p.y += p.vy + (py - p.y) * 0.0009;
    if (p.x < 0 || p.x > canvasW) p.vx *= -1;
    if (p.y < 0 || p.y > canvasH) p.vy *= -1;

    for (let j = index + 1; j < particles.length; j += 1) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 112) {
        ctx.strokeStyle = `rgba(49, 87, 255, ${0.16 * (1 - dist / 112)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }

    const hot = Math.max(0, 1 - Math.hypot(p.x - px, p.y - py) / 210);
    ctx.fillStyle = hot > 0.2 ? "rgba(0, 242, 234, 0.68)" : "rgba(17, 17, 17, 0.52)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r + hot * 3, 0, Math.PI * 2);
    ctx.fill();
  });

  if (loop) requestAnimationFrame(drawCanvas);
}

if (canvas && ctx) {
  resizeCanvas();
  drawCanvas(!prefersReducedMotion);
  window.addEventListener(
    "resize",
    () => {
      resizeCanvas();
      if (prefersReducedMotion) drawCanvas(false);
    },
    { passive: true }
  );
  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  });
}

const copyBtn = document.getElementById("copyBtn");
copyBtn?.addEventListener("click", async () => {
  const email = "d.weizhi@wustl.edu";
  try {
    await navigator.clipboard.writeText(email);
    const oldText = copyBtn.textContent;
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = oldText;
    }, 1200);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const kbar = document.getElementById("kbar");
const kbarInput = document.getElementById("kbarInput");
const kbarList = document.getElementById("kbarList");

function renderKbar(query = "") {
  if (!kbarList) return;
  const q = query.trim().toLowerCase();
  kbarList.innerHTML = "";
  sections
    .filter((item) => item.label.toLowerCase().includes(q))
    .forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "kbar-item";
      button.textContent = item.label;
      button.addEventListener("click", () => {
        closeKbar();
        scrollToHash(`#${item.id}`);
      });
      kbarList.appendChild(button);
    });
}

function openKbar() {
  kbar?.classList.add("show");
  renderKbar("");
  if (kbarInput) {
    kbarInput.value = "";
    kbarInput.focus();
  }
}

function closeKbar() {
  kbar?.classList.remove("show");
}

document.addEventListener("keydown", (event) => {
  const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
  if (isShortcut) {
    event.preventDefault();
    openKbar();
  }
  if (event.key === "Escape") closeKbar();
});

kbarInput?.addEventListener("input", (event) => renderKbar(event.target.value));
kbar?.addEventListener("click", (event) => {
  if (event.target === kbar) closeKbar();
});
