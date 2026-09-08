const songs = [
  { cn: "纯蓝", en: "Pure Blue", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1z64y1b7H4", "https://www.youtube.com/watch?v=Adg0yYLOjds"],
    ["14周年演唱会", "14th Concert", "https://www.bilibili.com/video/BV1L6Nu6vEgi", "https://www.youtube.com/watch?v=aJsmMT4_4mw"],
  ] },
  { cn: "蝴蝶", en: "Cocoon Broken", versions: [
    ["手书", "Hand-drawn", "https://www.bilibili.com/video/BV1c2Lb6bEmq/", "https://www.youtube.com/watch?v=cC3pIYYjwao"],
  ] },
  { cn: "反乌托邦", en: "Dystopia", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1CVPoeNEq4", "https://www.youtube.com/watch?v=Y6vZ4Ea-H4A"],
  ] },
  { cn: "反乌托邦 Pt.2", en: "Dystopia Pt.2", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1epqZBVEPY", "https://www.youtube.com/watch?v=JSzY7o-QNpo"],
    ["纯洛版", "LTY Solo", "https://www.bilibili.com/video/BV1sDidBpENX/", "https://www.youtube.com/watch?v=CPKAJam4G8g"],
  ] },
  { cn: "世末歌者", en: "End of the World Singer", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1Qs411k7Qv", "https://www.youtube.com/watch?v=Uz42GvdALyg"],
    ["乐正绫 AI", "YZL AI", "https://www.bilibili.com/video/BV1jG4y1C7uv/", "https://www.youtube.com/watch?v=BdCJxwOs6Mw"],
  ] },
  { cn: "人是猫", en: "Humans Are Cats", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1Bfjq6LEDi/", "https://www.youtube.com/watch?v=BLgNIDmk8KI"],
  ] },
  { cn: "一半一半", en: "Half and Half", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1cx411c79i/", "https://www.youtube.com/watch?v=AEumwlozXzw"],
  ] },
  { cn: "拼接遗憾", en: "Montagem Pitty", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1mBwNzUEAX/", "https://www.youtube.com/watch?v=_3KwnHLSAd4"],
    ["拼接乌托邦", "Montagem Utopia", "https://www.bilibili.com/video/BV1ZSLm6MECk/", ""],
  ] },
  { cn: "勾指起誓", en: "Pinky Swear", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1Jb411U7u2/", "https://www.youtube.com/watch?v=SFi0JZUC8VE"],
    ["洛天依 AI", "LTY AI", "https://www.bilibili.com/video/BV1zqJBzgEf3/", "https://www.youtube.com/watch?v=0nN3izptbu8"],
  ] },
  { cn: "我的悲伤是水做的", en: "Bad Bad Water", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1Qc411h7Ys/", "https://www.youtube.com/watch?v=kUbIKWpCn7w"],
  ] },
  { cn: "黑凤梨", en: "Black Pineapple", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV18W411F7fe/", "https://www.youtube.com/watch?v=ljWOEZtJOr8"],
  ] },
  { cn: "上山岗", en: "Up the Hill", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1zJ411479H", "https://www.youtube.com/watch?v=_9dvN74m0oc"],
  ] },
  { cn: "万分之一的光", en: "Your Ray of Light", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1Tp4y1S7cu/", "https://www.youtube.com/watch?v=uWqOifzmtLg"],
  ] },
  { cn: "返夏", en: "Back in the Summer", versions: [
    ["手书", "Hand-drawn", "https://www.bilibili.com/video/BV1jC4y1t7ac/", "https://www.youtube.com/watch?v=JPQqIYL83js"],
  ] },
  { cn: "白石溪", en: "White Stone Creek", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1Ws411X7BJ/", "https://www.youtube.com/watch?v=O2B0MAjloGk"],
    ["2025 重制版", "2025 Version", "https://www.bilibili.com/video/BV1mNbyzfEMu/", "https://www.youtube.com/watch?v=9LhsgllvUx8"],
  ] },
  { cn: "珍珠", en: "Pearl", versions: [
    ["原版", "Original", "https://www.bilibili.com/festival/lty13?bvid=BV1ZuGgzgENF", "https://www.youtube.com/watch?v=aCkZ67S6UyE"],
  ] },
  { cn: "万能诊听器", en: "Universal Stethoscope", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1HV411m76b/", "https://www.youtube.com/watch?v=DluBJ5nq70w"],
  ] },
  { cn: "霜雪千年", en: "Millennium of Frost and Snow", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1es41127Fd/", "https://www.youtube.com/watch?v=QRXMj0JQelk"],
    ["2024 重制版", "2024 Version", "https://www.bilibili.com/video/BV1zM4m1r7JS/", "https://www.youtube.com/watch?v=N0r9Q-7eqqI"],
  ] },
  { cn: "写给我第一个喜欢的女孩的歌", en: "A Song Written for the First Girl I Ever Liked", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1Xs41197Av/", "https://www.youtube.com/watch?v=rLS17_Io0js"],
  ] },
  { cn: "东京不太热", en: "Tokyo Is Not Too Hot", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV17s411D731/", "https://www.youtube.com/watch?v=UBjkRtDKuoM"],
    ["2024 重制版", "2024 Version", "https://www.bilibili.com/video/BV1PgiiYzEfn/", "https://www.youtube.com/watch?v=dkUNUYtCANI"],
  ] },
  { cn: "下等马", en: "Underhorse", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1sy7VzrESV/", "https://www.youtube.com/watch?v=5YUqh6U20AQ"],
  ] },
  { cn: "光与影的对白", en: "Light and Shadow", versions: [
    ["原版", "Original", "https://www.bilibili.com/festival/lty10th?bvid=BV1dZ4y1Y7bt", "https://www.youtube.com/watch?v=tCHvOSBjbs8"],
    ["13周年生日会", "13th Anniversary", "https://www.bilibili.com/festival/lty13?bvid=BV1MCuuz7ENb", "https://www.youtube.com/watch?v=E6pdxpAfjto"],
  ] },
  { cn: "夏虫", en: "Summer Insects", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1Hf4y1L7MF/", "https://www.youtube.com/watch?v=IRONxJZBJ3c"],
  ] },
  { cn: "幹物女", en: "WeiWei", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1fs41117k9/", "https://www.youtube.com/watch?v=-_4qWbgMgl8"],
    ["2025 重制版", "2025 Version", "https://www.bilibili.com/video/BV1TDKwzUEnn/", "https://www.youtube.com/watch?v=1HKswV55jc4"],
  ] },
  { cn: "唱给雅音宫羽", en: "Singing for Yayin Gongyu", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV18ZNe6FErw/", "https://www.youtube.com/watch?v=dSHuoIwJ-Y4"],
    ["四重奏", "Quartet", "https://www.bilibili.com/video/BV18ZNe6FErw", ""],
  ] },
  { cn: "为了你唱下去", en: "Sing for You", versions: [
    ["原版", "Original", "https://www.bilibili.com/video/BV1ts411y7FY", "https://www.youtube.com/watch?v=PoNR-uQl6M0"],
    ["2017 演唱会", "2017 Concert", "https://www.bilibili.com/video/BV1uW42197Dx", "https://www.youtube.com/watch?v=5hem99vO2xo"],
    ["十周年演唱会", "10th Concert", "https://www.bilibili.com/festival/lty10th?bvid=BV1N34y1J7Y9", "https://www.youtube.com/watch?v=uqixHZwXw4I"],
    ["十二周年生日会", "12th Concert", "https://www.bilibili.com/video/BV1xW42197mC/", "https://www.youtube.com/watch?v=JEpQniJXM6I"],
  ] },
];

const palettes = [
  ["#6df6e7", "#4387ff", "#090a0d"], ["#ff8fbc", "#675cff", "#0d0910"],
  ["#b7ff6a", "#00a99d", "#080d0b"], ["#ff725e", "#fbcb58", "#100908"],
  ["#9db6ff", "#5a55e7", "#080a13"], ["#d5ff46", "#5f966c", "#0b0e09"],
  ["#ffc2d8", "#82d7ff", "#0e0a10"], ["#ff4d9d", "#723bff", "#10070c"],
  ["#ff7eaa", "#ffb451", "#10090c"], ["#6be5ff", "#476bff", "#070b10"],
  ["#ffe767", "#ff7246", "#100d08"], ["#a6eb7c", "#459a7b", "#080d0a"],
  ["#fff4b0", "#4dafff", "#0c0c0b"], ["#ef9a78", "#8ac8bd", "#100b09"],
  ["#d9f4ff", "#66a4db", "#080d11"], ["#f3e1c0", "#75e6da", "#0d0c0a"],
  ["#b2f8e9", "#ef9aff", "#090d0c"], ["#d9eeff", "#8a9dff", "#090b11"],
  ["#ffb6cd", "#6d94ff", "#0e0910"], ["#ffab58", "#ff6b77", "#100b07"],
  ["#8ea4ff", "#4f517b", "#090a10"], ["#ffe5a3", "#60d8cb", "#0d0c09"],
  ["#d8f14b", "#59aabd", "#0c0e08"], ["#ff8b64", "#e6d451", "#100a08"],
  ["#62e7ff", "#7f66e8", "#080c10"], ["#77f0dd", "#ffd06a", "#080d0c"],
];

const moods = [
  "luminous", "ballad", "glitch", "glitch", "ballad", "playful", "playful",
  "electro", "playful", "ballad", "playful", "summer", "luminous", "summer",
  "ballad", "luminous", "electro", "frost", "ballad", "playful", "glitch",
  "luminous", "summer", "playful", "ballad", "ballad",
];

const energies = [
  .55, .22, .82, 1.05, .32, 1.42, 1.15, 1.72, .92, .28, 1.28, .68, .48,
  .62, .24, .45, 1.12, .34, .2, 1.2, 1.02, .72, .64, 1.34, .23, .3,
];

const thirdAccents = {
  ballad: "#cf6fff",
  playful: "#ff5ebc",
  glitch: "#ff305f",
  summer: "#ff9f43",
  luminous: "#b881ff",
  frost: "#eaf8ff",
  electro: "#ff38cf",
};

const homeLayouts = [
  ["1 / 4", "1 / 3"], ["4 / 6", "1 / 2"], ["6 / 8", "1 / 3"], ["8 / 11", "1 / 2"], ["11 / 13", "1 / 3"],
  ["4 / 6", "2 / 3"], ["8 / 11", "2 / 3"], ["1 / 3", "3 / 5"], ["3 / 6", "3 / 4"], ["6 / 9", "3 / 5"],
  ["9 / 11", "3 / 4"], ["11 / 13", "3 / 5"], ["3 / 6", "4 / 5"], ["9 / 11", "4 / 5"], ["1 / 4", "5 / 6"],
  ["4 / 6", "5 / 7"], ["6 / 8", "5 / 6"], ["8 / 11", "5 / 7"], ["11 / 13", "5 / 6"], ["1 / 4", "6 / 7"],
  ["6 / 8", "6 / 7"], ["11 / 13", "6 / 7"], ["1 / 3", "7 / 8"], ["3 / 6", "7 / 8"], ["6 / 10", "7 / 8"],
  ["10 / 13", "7 / 8"],
];

const homeTilts = [-2.2, 1.4, -.8, 2.1, -1.7, .7, -1.1, 1.8, -2.5, .4, 1.7, -.6, 2.4, -1.8, .8, -2.1, 1.2, -.4, 2.2, -1.3, .5, -2.4, 1.6, -.7, 1.1, -1.9];
const homeClips = [
  "polygon(2% 1%, 100% 4%, 97% 98%, 0 94%)",
  "polygon(0 5%, 98% 0, 100% 92%, 3% 100%)",
  "polygon(4% 0, 100% 2%, 96% 100%, 0 96%)",
  "polygon(0 0, 96% 4%, 100% 100%, 3% 96%)",
];

const root = document.documentElement;
const body = document.body;
const homeScreen = document.querySelector("#homeScreen");
const homeCatalog = document.querySelector("#homeCatalog");
const homeButton = document.querySelector("#homeButton");
const trackNumber = document.querySelector("#trackNumber");
const previousTitle = document.querySelector("#previousTitle");
const nextTitle = document.querySelector("#nextTitle");
const trackRail = document.querySelector("#trackRail");
const railCurrent = document.querySelector("#railCurrent");
const railNeighbors = document.querySelector("#railNeighbors");
const editionRoom = document.querySelector("#editionRoom");
const editionList = document.querySelector("#editionList");
const activeCover = document.querySelector("#activeCover");
const canvas = document.querySelector("#field");
const context = canvas.getContext("2d");

const initialIndex = indexFromHash();
let current = initialIndex ?? 0;
let switching = false;
let wheelDelta = 0;
let wheelTimer;
let touchStartX = 0;
let touchStartY = 0;
let animationFrame;
let points = [];

function indexFromHash() {
  const raw = window.location.hash.replace("#", "");
  if (!/^\d{1,2}$/.test(raw)) return null;
  const value = Number(raw);
  return value >= 1 && value <= songs.length ? value - 1 : null;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function renderHome() {
  homeCatalog.innerHTML = songs.map((song, index) => {
    const [column, row] = homeLayouts[index];
    const mobileColumn = (index % 3) * 2 + 1;
    const mobileRow = Math.floor(index / 3) + 1;
    const style = `grid-column:${column};grid-row:${row};--mc:${mobileColumn} / span 2;--mr:${mobileRow} / span 1;--tilt:${homeTilts[index]}deg;--clip:${homeClips[index % homeClips.length]}`;
    return `<button class="home-song${[...song.cn].length >= 8 ? " is-long" : ""}" style="${style}" type="button" role="listitem" data-index="${index}" aria-label="${pad(index + 1)} ${song.cn} ${song.en}">
      <img src="covers/${pad(index + 1)}.jpg" alt="" decoding="async" />
      <span>${pad(index + 1)}</span><strong>${song.cn}</strong><small>${song.en}</small>
    </button>`;
  }).join("");
}

function renderRail() {
  railNeighbors.innerHTML = songs.map((song, index) => {
    return `<button class="rail-song${index === current ? " is-active" : ""}" type="button" data-index="${index}"${index === current ? ' aria-current="true"' : ""}>
      <span>${pad(index + 1)}</span><b>${songs[index].cn}</b>
    </button>`;
  }).join("");
}

function centerRail(behavior = "auto") {
  const active = railNeighbors.querySelector(".is-active");
  if (!active) return;
  railNeighbors.scrollTo({
    top: active.offsetTop - railNeighbors.clientHeight / 2 + active.offsetHeight / 2,
    behavior,
  });
}

function applySong(index, updateHistory = true) {
  current = (index + songs.length) % songs.length;
  const song = songs[current];
  const previous = songs[(current - 1 + songs.length) % songs.length];
  const next = songs[(current + 1) % songs.length];
  const palette = palettes[current];
  const mood = moods[current];

  trackNumber.textContent = pad(current + 1);
  previousTitle.textContent = previous.cn;
  nextTitle.textContent = next.cn;
  document.querySelector("#dialogIndex").textContent = `${pad(current + 1)} / ${songs.length}`;
  document.querySelector("#dialogTitle").textContent = song.cn;
  document.querySelector("#dialogEnglish").textContent = song.en;
  activeCover.src = `covers/${pad(current + 1)}.jpg`;
  body.dataset.mood = mood;
  root.style.setProperty("--accent", palette[0]);
  root.style.setProperty("--accent-2", palette[1]);
  root.style.setProperty("--accent-3", thirdAccents[mood]);
  root.style.setProperty("--paper", palette[2]);
  root.style.setProperty("--dialog-title-size", [...song.cn].length >= 12 ? "clamp(2.4rem, 4.8vw, 5.6rem)" : [...song.cn].length >= 7 ? "clamp(2.8rem, 6vw, 6.8rem)" : "clamp(3.2rem, 7.5vw, 8.5rem)");

  editionList.innerHTML = song.versions.map((version, index) => {
    const [cn, en, bili, youtube] = version;
    const links = [
      bili ? `<a class="edition-link" href="${bili}" target="_blank" rel="noopener noreferrer"><span>BILIBILI</span></a>` : "",
      youtube ? `<a class="edition-link" href="${youtube}" target="_blank" rel="noopener noreferrer"><span>YOUTUBE</span></a>` : "",
    ].join("");
    return `<article class="edition">
      <span class="edition-number">${pad(index + 1)}</span>
      <div class="edition-content">
        <h2 class="edition-name">${cn}<span class="edition-en">${en}</span></h2>
        <div class="edition-links">${links}</div>
      </div>
    </article>`;
  }).join("");

  renderRail();
  requestAnimationFrame(() => centerRail());
  seedField();
  if (updateHistory) history.replaceState({ view: "edition", index: current }, "", `#${pad(current + 1)}`);
}

function showHome(updateHistory = true) {
  if (body.dataset.view === "home" && updateHistory) return;
  body.dataset.view = "home";
  body.dataset.mood = "home";
  homeScreen.removeAttribute("aria-hidden");
  editionRoom.setAttribute("aria-hidden", "true");
  trackRail.classList.remove("is-open");
  railCurrent.setAttribute("aria-expanded", "false");
  root.style.setProperty("--accent", "#59c8ff");
  root.style.setProperty("--accent-2", "#7370ff");
  root.style.setProperty("--accent-3", "#ff5ebc");
  root.style.setProperty("--paper", "#070b16");
  seedField();
  if (updateHistory) history.pushState({ view: "home" }, "", `${location.pathname}${location.search}`);
}

function showEdition(index, updateHistory = true) {
  applySong(index, false);
  body.dataset.view = "edition";
  homeScreen.setAttribute("aria-hidden", "true");
  editionRoom.removeAttribute("aria-hidden");
  if (updateHistory) history.pushState({ view: "edition", index: current }, "", `#${pad(current + 1)}`);
}

function goTo(index, updateHistory = true) {
  const target = (index + songs.length) % songs.length;
  if (body.dataset.view === "home") {
    showEdition(target, updateHistory);
    return;
  }
  if (switching || target === current) return;
  switching = true;
  trackRail.classList.remove("is-open");
  railCurrent.setAttribute("aria-expanded", "false");
  editionRoom.classList.add("is-switching");
  window.setTimeout(() => {
    applySong(target, updateHistory);
    editionRoom.classList.remove("is-switching");
    editionRoom.classList.add("is-entering");
    window.setTimeout(() => {
      editionRoom.classList.remove("is-entering");
      switching = false;
    }, 480);
  }, 180);
}

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(window.innerWidth * ratio);
  canvas.height = Math.round(window.innerHeight * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  seedField();
}

function seedField() {
  const count = Math.max(38, Math.min(96, Math.floor(window.innerWidth / 15)));
  let seed = (body.dataset.view === "home" ? 17 : current * 991 + 41);
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  points = Array.from({ length: count }, () => ({
    x: random() * window.innerWidth,
    y: random() * window.innerHeight,
    r: random() * 4 + .5,
    drift: random() * .7 + .12,
    phase: random() * Math.PI * 2,
    length: random() * 110 + 20,
  }));
}

function colors() {
  const styles = getComputedStyle(root);
  return ["--accent", "--accent-2", "--accent-3"].map((name) => styles.getPropertyValue(name).trim());
}

function drawHome(time, width, height, color) {
  context.strokeStyle = color;
  context.fillStyle = color;
  points.forEach((point, index) => {
    const x = (point.x + time * point.drift * .008) % width;
    const y = point.y + Math.sin(time * .001 + point.phase) * 9;
    context.globalAlpha = index % 5 === 0 ? .55 : .18;
    context.fillRect(x, y, index % 5 === 0 ? 8 : 2, index % 5 === 0 ? 2 : 2);
  });
}

function drawBallad(time, width, height, palette, energy) {
  context.strokeStyle = palette[0];
  points.forEach((point, index) => {
    const y = (point.y + time * point.drift * energy * .014) % (height + point.length) - point.length;
    const x = point.x + Math.sin(time * .00025 + point.phase) * 22;
    context.globalAlpha = .08 + (index % 4) * .035;
    context.lineWidth = index % 7 === 0 ? 1.5 : .5;
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(x + 8, y + point.length * .3, x - 8, y + point.length * .7, x, y + point.length);
    context.stroke();
  });
}

function drawPlayful(time, width, height, palette, energy) {
  points.forEach((point, index) => {
    const x = (point.x + Math.sin(time * .0014 * energy + point.phase) * 35 + width) % width;
    const y = (point.y + Math.cos(time * .0011 * energy + point.phase) * 28 + height) % height;
    context.strokeStyle = palette[index % 3];
    context.fillStyle = palette[index % 3];
    context.globalAlpha = .18 + (index % 4) * .08;
    context.lineWidth = 1.5;
    context.beginPath();
    if (index % 3 === 0) context.rect(x - point.r, y - point.r, point.r * 2.6, point.r * 2.6);
    else context.arc(x, y, point.r * 1.6, 0, Math.PI * 2);
    index % 4 === 0 ? context.fill() : context.stroke();
  });
}

function drawGlitch(time, width, height, palette, energy) {
  const beat = Math.floor(time * .006 * energy);
  points.forEach((point, index) => {
    const jump = ((beat + index * 17) % 37 === 0) ? (index % 2 ? 45 : -45) : 0;
    context.fillStyle = palette[index % 3];
    context.globalAlpha = index % 6 === 0 ? .25 : .08;
    context.fillRect(point.x + jump, point.y, point.length, index % 5 === 0 ? 5 : 1);
  });
}

function drawSummer(time, width, height, palette, energy) {
  points.forEach((point, index) => {
    const y = height - ((point.y + time * point.drift * energy * .018) % height);
    const x = point.x + Math.sin(time * .0007 + point.phase) * 28;
    context.fillStyle = palette[index % 3];
    context.globalAlpha = .12 + (Math.sin(time * .004 + point.phase) + 1) * .14;
    context.beginPath();
    context.arc(x, y, point.r * .52, 0, Math.PI * 2);
    context.fill();
  });
}

function drawLuminous(time, width, height, palette, energy) {
  const cx = width / 2;
  const cy = height / 2;
  points.forEach((point, index) => {
    const pulse = (Math.sin(time * .001 * energy + point.phase) + 1) / 2;
    context.strokeStyle = palette[index % 2];
    context.fillStyle = palette[index % 2];
    context.globalAlpha = .04 + pulse * .13;
    context.lineWidth = .5;
    context.beginPath();
    context.moveTo(cx, cy);
    context.lineTo(point.x, point.y);
    context.stroke();
    if (index % 4 === 0) {
      context.globalAlpha = .3 + pulse * .3;
      context.fillRect(point.x - 1, point.y - 5, 2, 10);
      context.fillRect(point.x - 5, point.y - 1, 10, 2);
    }
  });
}

function drawFrost(time, width, height, palette, energy) {
  points.forEach((point, index) => {
    const y = (point.y + time * point.drift * energy * .01) % height;
    const x = point.x + Math.sin(time * .0006 + point.phase) * 18;
    context.strokeStyle = palette[index % 2];
    context.globalAlpha = .12 + (index % 5) * .05;
    context.lineWidth = .7;
    context.beginPath();
    context.moveTo(x, y - point.r * 2);
    context.lineTo(x + point.r, y);
    context.lineTo(x, y + point.r * 2);
    context.lineTo(x - point.r, y);
    context.closePath();
    context.stroke();
  });
}

function drawElectro(time, width, height, palette, energy) {
  const bars = 48;
  const barWidth = width / bars;
  for (let index = 0; index < bars; index += 1) {
    const wave = Math.sin(index * .62 + time * .004 * energy) * .5 + Math.sin(index * .17 - time * .002) * .5;
    const barHeight = Math.abs(wave) * height * .22 + 4;
    context.fillStyle = palette[index % 3];
    context.globalAlpha = .14 + (index % 4) * .04;
    context.fillRect(index * barWidth + 1, height / 2 - barHeight / 2, Math.max(1, barWidth - 3), barHeight);
  }
}

function drawField(time = 0) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const palette = colors();
  context.clearRect(0, 0, width, height);
  context.lineCap = "round";

  if (body.dataset.view === "home") {
    drawHome(time, width, height, palette[0]);
  } else {
    const mood = moods[current];
    const energy = energies[current];
    if (mood === "ballad") drawBallad(time, width, height, palette, energy);
    else if (mood === "playful") drawPlayful(time, width, height, palette, energy);
    else if (mood === "glitch") drawGlitch(time, width, height, palette, energy);
    else if (mood === "summer") drawSummer(time, width, height, palette, energy);
    else if (mood === "frost") drawFrost(time, width, height, palette, energy);
    else if (mood === "electro") drawElectro(time, width, height, palette, energy);
    else drawLuminous(time, width, height, palette, energy);
  }

  context.globalAlpha = 1;
  animationFrame = requestAnimationFrame(drawField);
}

function syncFromLocation() {
  const index = indexFromHash();
  if (index === null) showHome(false);
  else if (body.dataset.view === "home") showEdition(index, false);
  else if (index !== current) {
    applySong(index, false);
    editionRoom.classList.remove("is-switching", "is-entering");
    switching = false;
  }
}

homeCatalog.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (button) showEdition(Number(button.dataset.index), true);
});
homeButton.addEventListener("click", () => showHome(true));
document.querySelector("#previousSong").addEventListener("click", () => goTo(current - 1));
document.querySelector("#nextSong").addEventListener("click", () => goTo(current + 1));
document.querySelectorAll("[data-close-dialog]").forEach((item) => item.addEventListener("click", () => showHome(true)));

railCurrent.addEventListener("click", () => {
  const open = !trackRail.classList.contains("is-open");
  trackRail.classList.toggle("is-open", open);
  railCurrent.setAttribute("aria-expanded", String(open));
  if (open) requestAnimationFrame(() => centerRail("smooth"));
});

trackRail.addEventListener("pointerenter", () => requestAnimationFrame(() => centerRail()));

railNeighbors.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (!button) return;
  const index = Number(button.dataset.index);
  trackRail.classList.remove("is-open");
  railCurrent.setAttribute("aria-expanded", "false");
  if (index !== current) goTo(index);
});

railNeighbors.addEventListener("wheel", (event) => event.stopPropagation(), { passive: true });
editionList.addEventListener("wheel", (event) => event.stopPropagation(), { passive: true });

document.addEventListener("click", (event) => {
  if (!trackRail.contains(event.target)) {
    trackRail.classList.remove("is-open");
    railCurrent.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("popstate", syncFromLocation);
window.addEventListener("hashchange", syncFromLocation);

window.addEventListener("keydown", (event) => {
  if (body.dataset.view !== "edition") return;
  if (event.key === "ArrowLeft") goTo(current - 1);
  if (event.key === "ArrowRight") goTo(current + 1);
  if (event.key === "Escape") showHome(true);
});

window.addEventListener("wheel", (event) => {
  if (body.dataset.view !== "edition") return;
  wheelDelta += event.deltaY || event.deltaX;
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => {
    if (Math.abs(wheelDelta) > 45) goTo(current + Math.sign(wheelDelta));
    wheelDelta = 0;
  }, 70);
}, { passive: true });

window.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

window.addEventListener("touchend", (event) => {
  if (body.dataset.view !== "edition") return;
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) goTo(current - Math.sign(dx));
}, { passive: true });

window.addEventListener("resize", resizeCanvas);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) cancelAnimationFrame(animationFrame);
  else animationFrame = requestAnimationFrame(drawField);
});

renderHome();
applySong(current, false);
if (initialIndex === null) showHome(false);
else showEdition(initialIndex, false);
resizeCanvas();
animationFrame = requestAnimationFrame(drawField);
