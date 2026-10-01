/* =========================================
   script.js: Amaira's Aroma Cafe
   - menuData array drives the menu page
   - Category filter + quantity pickers
   - PriceCalc(): live order total with 9.25% tax + tip
   - Toggle more info / toggle calendar
   - Image carousels with arrows, dots, swipe and autoplay
   - Contact form validation + thank you message
   - Light/dark mode (saved in localStorage)
   - Mobile nav + reveal-on-scroll
========================================= */

const TAX_RATE = 0.0925;

/* MENU DATA */
const menuData = [
  {
    category: "Hot Lattes",
    id: "hot",
    unitPrice: 5,
    items: [
      { name: "Caramel Toffee Latte", desc: "Buttery toffee, caramel drizzle and crushed brittle on velvety foam.", img: "hotcarameltoffeelatte.jpg", tag: "Bestseller" },
      { name: "Hazelnut Latte", desc: "Toasted hazelnut and honey, finished with a nutty crumble.", img: "hothazlenutlatte.jpg" },
      { name: "Pistachio Latte", desc: "Creamy pistachio milk with a dusting of chopped pistachios.", img: "hotpistaciolatte.jpg", tag: "Signature" },
      { name: "Rose Latte", desc: "Floral and gentle, with rose syrup and dried petals.", img: "hotroselatte.jpg" },
      { name: "Vanilla Latte", desc: "The classic, made with real vanilla bean and steamed milk.", img: "hotvanillalatte.jpg" },
    ],
  },
  {
    category: "Iced Lattes",
    id: "iced",
    unitPrice: 5,
    items: [
      { name: "Mango Latte", desc: "Bright mango and coconut cream over cold espresso.", img: "icedmangolatte.jpg", tag: "Seasonal" },
      { name: "Brown Sugar Latte", desc: "Cinnamon brown sugar syrup swirled with oat milk.", img: "icedbrownlatte.jpg" },
      { name: "Caramel Latte", desc: "Salted caramel, espresso and a toffee crunch on top.", img: "icedcaramellatte.jpg" },
      { name: "Sunset Latte", desc: "Layers of berry, citrus and cream that look like golden hour.", img: "icedsunsetlatte.jpg", tag: "Signature" },
      { name: "Tiramisu Latte", desc: "Mascarpone foam, cocoa and ladyfingers. Dessert in a glass.", img: "icedtiramusilatte.jpg", tag: "Bestseller" },
    ],
  },
  {
    category: "Sweet Food",
    id: "sweet",
    unitPrice: 10,
    items: [
      { name: "Chocolate Croissant", desc: "Flaky, buttery, with two bars of dark chocolate inside.", emoji: "🥐" },
      { name: "Blueberry Muffin", desc: "Bursting with berries under a crunchy sugar top.", emoji: "🫐" },
      { name: "Cinnamon Cardamom Roll", desc: "Soft swirls of cinnamon and warm cardamom glaze.", emoji: "🌀", tag: "House favorite" },
      { name: "Almond Biscotti", desc: "Twice-baked and made for dunking.", emoji: "🍪" },
      { name: "Dark Chocolate Brownie", desc: "Fudgy center, crackly top, flaky sea salt.", emoji: "🍫" },
    ],
  },
  {
    category: "Savory Food",
    id: "savory",
    unitPrice: 10,
    items: [
      { name: "Chili Crisp Avocado Toast", desc: "Smashed avocado on sourdough with crunchy chili crisp.", emoji: "🥑", tag: "Spicy" },
      { name: "Grilled Cheese & Tomato Basil Soup", desc: "Golden three-cheese melt with a cup of soup for dipping.", emoji: "🧀" },
      { name: "Tres Leches French Toast", desc: "Brioche soaked in three milks with whipped cream.", emoji: "🍞" },
      { name: "Tiramisu Pancakes", desc: "Espresso-soaked stack with mascarpone and cocoa.", emoji: "🥞" },
      { name: "Caprese Toast with Basil Pesto", desc: "Fresh mozzarella, tomato and house pesto.", emoji: "🍅" },
    ],
  },
];

/* order state: { "Item name": quantity } */
const order = {};

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  wireModeButton();
  wireMobileNav();
  wireDropdown();
  buildMenuIfPresent();
  wireMenuFilters();
  wireToggle("toggleInfoBtn", "moreInfo", "More about our drinks", "Show less");
  wireToggle("toggleCalendarBtn", "calendarBox", "View this month's calendar", "Hide calendar");
  wirePriceEstimatorIfPresent();
  document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
  wireContactForm();
  wireReveal();
  setYear();
});

/* ================= MENU ================= */
function formatMoney(n) {
  return `$${n.toFixed(2)}`;
}

function buildMenuIfPresent() {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  container.innerHTML = "";

  menuData.forEach((cat) => {
    const section = document.createElement("section");
    section.className = "menu-category";
    section.dataset.category = cat.id;
    section.setAttribute("aria-labelledby", `cat-${cat.id}`);

    const heading = document.createElement("h3");
    heading.id = `cat-${cat.id}`;
    heading.textContent = `${cat.category} · ${formatMoney(cat.unitPrice)}`;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "menu-grid";

    cat.items.forEach((item) => {
      grid.appendChild(buildMenuCard(item, cat.unitPrice));
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

function buildMenuCard(item, price) {
  const card = document.createElement("article");
  card.className = "menu-card";

  if (item.img) {
    const img = document.createElement("img");
    img.src = `assets/images/${item.img}`;
    img.alt = item.name;
    img.loading = "lazy";
    card.appendChild(img);
  } else {
    const emoji = document.createElement("div");
    emoji.className = "menu-card-emoji";
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = item.emoji || "☕";
    card.appendChild(emoji);
  }

  const body = document.createElement("div");
  body.className = "menu-card-body";

  if (item.tag) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item.tag;
    body.appendChild(tag);
  }

  const top = document.createElement("div");
  top.className = "menu-card-top";
  const name = document.createElement("h4");
  name.textContent = item.name;
  const priceEl = document.createElement("span");
  priceEl.className = "price";
  priceEl.textContent = formatMoney(price);
  top.append(name, priceEl);

  const desc = document.createElement("p");
  desc.textContent = item.desc;

  const qty = document.createElement("div");
  qty.className = "qty";
  const minus = document.createElement("button");
  minus.type = "button";
  minus.textContent = "−";
  minus.setAttribute("aria-label", `Remove one ${item.name}`);
  const count = document.createElement("output");
  count.textContent = "0";
  count.setAttribute("aria-label", `${item.name} quantity`);
  count.dataset.item = item.name;
  const plus = document.createElement("button");
  plus.type = "button";
  plus.textContent = "+";
  plus.setAttribute("aria-label", `Add one ${item.name}`);

  minus.addEventListener("click", () => changeQty(item.name, price, -1));
  plus.addEventListener("click", () => changeQty(item.name, price, 1));

  qty.append(minus, count, plus);
  body.append(top, desc, qty);
  card.appendChild(body);
  return card;
}

function changeQty(name, price, delta) {
  const current = order[name]?.qty || 0;
  const next = Math.max(0, Math.min(20, current + delta));

  if (next === 0) {
    delete order[name];
  } else {
    order[name] = { qty: next, price };
  }

  document.querySelectorAll(`output[data-item="${CSS.escape(name)}"]`).forEach((el) => {
    el.textContent = String(next);
  });

  PriceCalc();
}

function wireMenuFilters() {
  const tabs = document.querySelectorAll(".menu-tab");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter;
      tabs.forEach((t) => t.setAttribute("aria-pressed", String(t === tab)));
      document.querySelectorAll(".menu-category").forEach((section) => {
        section.classList.toggle("hidden", filter !== "all" && section.dataset.category !== filter);
      });
    });
  });
}

/* ================= PRICE ESTIMATOR ================= */
function wirePriceEstimatorIfPresent() {
  const tipEl = document.getElementById("tipSelect");
  const clearBtn = document.getElementById("clearOrderBtn");
  if (!tipEl) return;

  tipEl.addEventListener("change", PriceCalc);

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      Object.keys(order).forEach((name) => {
        delete order[name];
        document.querySelectorAll(`output[data-item="${CSS.escape(name)}"]`).forEach((el) => {
          el.textContent = "0";
        });
      });
      PriceCalc();
    });
  }

  PriceCalc();
}

function PriceCalc() {
  const linesEl = document.getElementById("orderLines");
  const tipEl = document.getElementById("tipSelect");
  const resultEl = document.getElementById("priceResult");
  const clearBtn = document.getElementById("clearOrderBtn");
  if (!linesEl || !tipEl || !resultEl) return;

  const entries = Object.entries(order);
  linesEl.innerHTML = "";

  if (entries.length === 0) {
    const empty = document.createElement("li");
    empty.className = "order-empty";
    empty.textContent = "Your order is empty. Tap + on anything above to add it.";
    linesEl.appendChild(empty);
  }

  let subtotal = 0;
  entries.forEach(([name, { qty, price }]) => {
    const lineTotal = qty * price;
    subtotal += lineTotal;

    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${qty} × ${name}`;
    const amount = document.createElement("span");
    amount.textContent = formatMoney(lineTotal);
    li.append(label, amount);
    linesEl.appendChild(li);
  });

  if (clearBtn) clearBtn.classList.toggle("hidden", entries.length === 0);

  const tipRate = Number(tipEl.value);
  const tax = subtotal * TAX_RATE;
  const tip = subtotal * tipRate;
  const total = subtotal + tax + tip;

  const rows = [
    ["Subtotal", subtotal],
    ["Tax (9.25%)", tax],
    [`Tip (${Math.round(tipRate * 100)}%)`, tip],
  ];

  resultEl.innerHTML = "";
  rows.forEach(([label, value]) => resultEl.appendChild(receiptRow(label, value)));
  const totalRow = receiptRow("Total", total);
  totalRow.classList.add("receipt-total");
  resultEl.appendChild(totalRow);
}

function receiptRow(label, value) {
  const row = document.createElement("div");
  row.className = "receipt-row";
  const l = document.createElement("span");
  l.textContent = label;
  const v = document.createElement("span");
  v.textContent = formatMoney(value);
  row.append(l, v);
  return row;
}

/* ================= TOGGLES ================= */
function wireToggle(btnId, boxId, showText, hideText) {
  const btn = document.getElementById(btnId);
  const box = document.getElementById(boxId);
  if (!btn || !box) return;

  btn.setAttribute("aria-controls", boxId);
  btn.setAttribute("aria-expanded", "false");

  btn.addEventListener("click", () => {
    const isHidden = box.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", String(!isHidden));
    btn.textContent = isHidden ? showText : hideText;
  });
}

/* ================= CAROUSEL ================= */
function setupCarousel(root) {
  const slides = Array.from(root.querySelectorAll(".carousel-slide"));
  const caption = root.querySelector(".carousel-caption");
  const dotsWrap = root.querySelector(".carousel-dots");
  const prev = root.querySelector(".carousel-arrow.left");
  const next = root.querySelector(".carousel-arrow.right");
  const frame = root.querySelector(".carousel-frame");
  if (slides.length === 0) return;

  let index = slides.findIndex((s) => s.classList.contains("active"));
  if (index < 0) index = 0;
  let timer = null;

  const dots = slides.map((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show slide ${i + 1} of ${slides.length}`);
    dot.addEventListener("click", () => {
      show(i);
      restart();
    });
    dotsWrap?.appendChild(dot);
    return dot;
  });

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      s.classList.toggle("active", n === index);
      s.setAttribute("aria-hidden", String(n !== index));
    });
    dots.forEach((d, n) => d.setAttribute("aria-current", String(n === index)));
    if (caption) caption.textContent = slides[index].dataset.caption || slides[index].alt;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function start() {
    if (reduceMotion) return;
    stop();
    timer = setInterval(() => show(index + 1), 5000);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restart() {
    stop();
    start();
  }

  prev?.addEventListener("click", () => {
    show(index - 1);
    restart();
  });
  next?.addEventListener("click", () => {
    show(index + 1);
    restart();
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  // swipe on touch screens
  let startX = null;
  frame?.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  frame?.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    startX = null;
    restart();
  });

  show(index);
  start();
}

/* ================= CONTACT FORM ================= */
function wireContactForm() {
  const form = document.getElementById("contactForm");
  const thankYou = document.getElementById("thankYou");
  const error = document.getElementById("formError");
  if (!form || !thankYou || !error) return;

  const message = document.getElementById("message");
  const counter = document.getElementById("charCount");
  const maxLen = Number(message?.getAttribute("maxlength")) || 500;

  const updateCount = () => {
    if (counter && message) counter.textContent = `${message.value.length} / ${maxLen}`;
  };
  message?.addEventListener("input", updateCount);
  updateCount();

  const rules = {
    name: (v) => (v.length >= 2 ? "" : "Please enter your name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Please enter a valid email address."),
    message: (v) => (v.length >= 10 ? "" : "Tell us a little more (at least 10 characters)."),
  };

  function validateField(id) {
    const input = document.getElementById(id);
    const msgEl = document.getElementById(`${id}Error`);
    const problem = rules[id](input.value.trim());
    input.setAttribute("aria-invalid", String(Boolean(problem)));
    if (msgEl) msgEl.textContent = problem;
    return !problem;
  }

  Object.keys(rules).forEach((id) => {
    document.getElementById(id)?.addEventListener("blur", () => validateField(id));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const results = Object.keys(rules).map(validateField);
    if (results.includes(false)) {
      error.textContent = "Please fix the highlighted fields.";
      error.classList.remove("hidden");
      thankYou.classList.add("hidden");
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const firstName = document.getElementById("name").value.trim().split(" ")[0];
    error.classList.add("hidden");
    thankYou.textContent = `Thank you, ${firstName}! ✨🤍 We'll get back to you within a day or two.`;
    thankYou.classList.remove("hidden");

    form.reset();
    updateCount();
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  });
}

/* ================= THEME ================= */
function getSavedTheme() {
  try {
    return localStorage.getItem("amairaTheme");
  } catch {
    return null;
  }
}

function setTheme(theme) {
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");

  const btn = document.getElementById("modeBtn");
  if (btn) {
    const isDark = theme === "dark";
    btn.querySelector(".mode-icon").textContent = isDark ? "☀️" : "🌙";
    btn.querySelector(".mode-label").textContent = isDark ? "Light mode" : "Dark mode";
    btn.setAttribute("aria-pressed", String(isDark));
  }
}

function applySavedTheme() {
  const saved = getSavedTheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(saved || (prefersDark ? "dark" : "light"));
}

function wireModeButton() {
  const btn = document.getElementById("modeBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const next = document.body.classList.contains("theme-dark") ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("amairaTheme", next);
    } catch {
      /* storage unavailable: theme still switches for this visit */
    }
  });
}

/* ================= NAV ================= */
function wireMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function wireDropdown() {
  document.querySelectorAll(".dropdown").forEach((dd) => {
    const btn = dd.querySelector(".dropbtn");
    btn?.addEventListener("click", () => {
      const open = dd.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (e) => {
      if (!dd.contains(e.target)) {
        dd.classList.remove("open");
        btn?.setAttribute("aria-expanded", "false");
      }
    });
  });
}

/* ================= REVEAL ON SCROLL ================= */
function wireReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((el) => observer.observe(el));
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}
