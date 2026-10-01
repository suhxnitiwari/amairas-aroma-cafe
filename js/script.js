/* =========================================
   script.js: Amaira's Aroma Cafe
   - menuData array drives the menu page and the home gallery
   - Category filter + quantity pickers
   - PriceCalc(): live order total with 9.25% tax + tip
   - Toggle more info / toggle calendar
   - Image carousels with arrows, dots, swipe and autoplay
   - Contact form validation + thank you message
   - Light/dark mode (saved in localStorage)
   - Nav scroll state, mobile menu, reveal-on-scroll, parallax
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
      { name: "Chocolate Croissant", desc: "Flaky and buttery, with two bars of dark chocolate inside." },
      { name: "Blueberry Muffin", desc: "Bursting with berries under a crunchy sugar top." },
      { name: "Cinnamon Cardamom Roll", desc: "Soft swirls of cinnamon and a warm cardamom glaze.", tag: "House favorite" },
      { name: "Almond Biscotti", desc: "Twice-baked and made for dunking." },
      { name: "Dark Chocolate Brownie", desc: "Fudgy center, crackly top, flaky sea salt." },
    ],
  },
  {
    category: "Savory Food",
    id: "savory",
    unitPrice: 10,
    items: [
      { name: "Chili Crisp Avocado Toast", desc: "Smashed avocado on sourdough with crunchy chili crisp.", tag: "Spicy" },
      { name: "Grilled Cheese & Tomato Basil Soup", desc: "A golden three-cheese melt with soup for dipping." },
      { name: "Tres Leches French Toast", desc: "Brioche soaked in three milks with whipped cream." },
      { name: "Tiramisu Pancakes", desc: "An espresso-soaked stack with mascarpone and cocoa." },
      { name: "Caprese Toast with Basil Pesto", desc: "Fresh mozzarella, tomato and house pesto." },
    ],
  },
];

/* RECIPES: tasting notes, quiz profile and a make-it-at-home recipe (1 serving) */
const recipes = {
  "Caramel Toffee Latte": {
    notes: ["Burnt sugar", "Butterscotch", "Toasted milk"],
    caffeine: 150, mood: "indulgent", sweet: 3,
    ingredients: [[2, "shots", "espresso"], [8, "oz", "whole milk"], [2, "tbsp", "toffee syrup"], [1, "tbsp", "caramel sauce"], [1, "tbsp", "crushed toffee brittle"]],
    steps: ["Drizzle caramel sauce around the inside of your mug.", "Pull the espresso over the toffee syrup and stir.", "Steam the milk to about 140°F and pour it in slowly.", "Top with foam, another ribbon of caramel and the brittle."],
  },
  "Hazelnut Latte": {
    notes: ["Toasted hazelnut", "Wildflower honey", "Cocoa"],
    caffeine: 150, mood: "cozy", sweet: 2,
    ingredients: [[2, "shots", "espresso"], [8, "oz", "whole milk"], [1.5, "tbsp", "hazelnut syrup"], [1, "tsp", "honey"], [1, "tbsp", "hazelnut crumble"]],
    steps: ["Stir the hazelnut syrup and honey into the espresso.", "Steam the milk until glossy and pour.", "Finish with a spoon of foam and the hazelnut crumble."],
  },
  "Pistachio Latte": {
    notes: ["Pistachio cream", "Sweet almond", "Vanilla"],
    caffeine: 150, mood: "cozy", sweet: 2,
    ingredients: [[2, "shots", "espresso"], [8, "oz", "whole milk"], [2, "tbsp", "pistachio cream"], [0.5, "tsp", "vanilla extract"], [1, "tbsp", "chopped pistachios"]],
    steps: ["Warm the pistachio cream with a splash of the milk until smooth.", "Add the espresso and vanilla and stir.", "Steam the rest of the milk and pour.", "Dust with chopped pistachios."],
  },
  "Rose Latte": {
    notes: ["Rose petal", "Honey", "Soft vanilla"],
    caffeine: 150, mood: "floral", sweet: 2,
    ingredients: [[2, "shots", "espresso"], [8, "oz", "oat milk"], [1.5, "tbsp", "rose syrup"], [1, "tsp", "honey"], [1, "pinch", "dried rose petals"]],
    steps: ["Stir the rose syrup and honey into the espresso.", "Steam the oat milk and pour gently.", "Scatter dried petals over the foam."],
  },
  "Vanilla Latte": {
    notes: ["Vanilla bean", "Milk chocolate", "Caramelized sugar"],
    caffeine: 150, mood: "cozy", sweet: 1,
    ingredients: [[2, "shots", "espresso"], [8, "oz", "whole milk"], [1, "tbsp", "vanilla bean syrup"]],
    steps: ["Add the vanilla syrup to your mug.", "Pull the espresso on top and stir.", "Steam the milk to a silky microfoam and pour."],
  },
  "Mango Latte": {
    notes: ["Ripe mango", "Coconut cream", "Citrus zest"],
    caffeine: 150, mood: "bright", sweet: 3,
    ingredients: [[2, "shots", "espresso, cooled"], [6, "oz", "coconut milk"], [3, "tbsp", "mango purée"], [2, "tbsp", "coconut cream"], [1, "cup", "ice"]],
    steps: ["Spoon the mango purée into the bottom of a tall glass.", "Fill with ice and pour in the coconut milk.", "Float the cooled espresso on top.", "Crown with whipped coconut cream."],
  },
  "Brown Sugar Latte": {
    notes: ["Molasses", "Cinnamon", "Oat"],
    caffeine: 150, mood: "cozy", sweet: 2,
    ingredients: [[2, "shots", "espresso"], [6, "oz", "oat milk"], [2, "tbsp", "brown sugar syrup"], [0.25, "tsp", "cinnamon"], [1, "cup", "ice"]],
    steps: ["Shake the espresso, brown sugar syrup and cinnamon with ice.", "Strain into a glass of fresh ice.", "Top with oat milk and watch it swirl."],
  },
  "Caramel Latte": {
    notes: ["Salted caramel", "Toffee", "Dark chocolate"],
    caffeine: 150, mood: "indulgent", sweet: 3,
    ingredients: [[2, "shots", "espresso"], [6, "oz", "whole milk"], [2, "tbsp", "salted caramel sauce"], [1, "tbsp", "toffee bits"], [1, "cup", "ice"]],
    steps: ["Line the glass with caramel sauce.", "Add ice and milk.", "Pour the espresso over the top.", "Finish with toffee bits."],
  },
  "Sunset Latte": {
    notes: ["Mixed berry", "Blood orange", "Sweet cream"],
    caffeine: 150, mood: "bright", sweet: 2,
    ingredients: [[2, "shots", "espresso, cooled"], [6, "oz", "whole milk"], [2, "tbsp", "berry compote"], [1, "tbsp", "orange syrup"], [1, "cup", "ice"]],
    steps: ["Spoon the berry compote into the glass.", "Add ice, then the milk mixed with orange syrup.", "Slowly float the espresso to create the sunset layers.", "Garnish with fresh berries."],
  },
  "Tiramisu Latte": {
    notes: ["Mascarpone", "Cocoa", "Ladyfinger"],
    caffeine: 150, mood: "indulgent", sweet: 3,
    ingredients: [[2, "shots", "espresso"], [6, "oz", "whole milk"], [3, "tbsp", "mascarpone cold foam"], [1, "tbsp", "vanilla syrup"], [1, "tsp", "cocoa powder"], [2, "", "ladyfinger cookies"], [1, "cup", "ice"]],
    steps: ["Stir the vanilla syrup into the espresso.", "Fill a glass with ice and milk, then add the espresso.", "Spoon mascarpone cold foam on top.", "Dust with cocoa and tuck in the ladyfingers."],
  },
};

/* order state: { "Item name": { qty, price } } */
const order = {};

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  wireModeButton();
  wireNavScroll();
  wireMobileNav();
  wireDropdown();
  buildSignatureGallery();
  buildMenuIfPresent();
  wireMenuFilters();
  wireToggle("toggleInfoBtn", "moreInfo", "Our drink philosophy", "Show less");
  wireToggle("toggleCalendarBtn", "calendarBox", "View this month's calendar", "Hide calendar");
  wirePriceEstimatorIfPresent();
  addFromQuery();
  wireQuiz();
  document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
  wireContactForm();
  wireStagger();
  wireReveal();
  wireParallax();
  setYear();
});

/* ================= HELPERS ================= */
function formatMoney(n) {
  return `$${n.toFixed(2)}`;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= HOME: SIGNATURE GALLERY ================= */
function buildSignatureGallery() {
  const track = document.getElementById("signatureTrack");
  if (!track) return;

  const drinks = menuData
    .filter((cat) => cat.id === "hot" || cat.id === "iced")
    .flatMap((cat) => cat.items.map((item) => ({ ...item, price: cat.unitPrice, kind: cat.id })));

  drinks.forEach((drink, i) => {
    const fig = el("figure", "drink");

    const media = el("div", "drink-media");
    const img = document.createElement("img");
    img.src = `assets/images/${drink.img}`;
    img.alt = `${drink.kind === "iced" ? "Iced" : "Hot"} ${drink.name}`;
    img.loading = "lazy";
    img.draggable = false;
    media.appendChild(img);
    media.appendChild(el("span", "drink-num", String(i + 1).padStart(2, "0")));
    if (drink.tag) media.appendChild(el("span", "drink-tag", drink.tag));
    const open = el("button", "drink-open");
    open.type = "button";
    open.setAttribute("aria-label", `View ${drink.name} tasting notes and recipe`);
    open.appendChild(el("span", "", "View recipe"));
    open.addEventListener("click", () => {
      if (track.dataset.dragged === "1") return;
      openDrinkModal(drink.name);
    });
    media.appendChild(open);

    const cap = document.createElement("figcaption");
    const row = el("div", "drink-row");
    row.append(el("h3", "", drink.name), el("span", "price", formatMoney(drink.price)));
    cap.append(row, el("p", "", drink.desc));

    fig.append(media, cap);
    track.appendChild(fig);
  });

  const step = () => (track.querySelector(".drink")?.offsetWidth || 300) + 28;
  document.getElementById("galleryPrev")?.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });
  document.getElementById("galleryNext")?.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });

  // click-and-drag to scroll on desktop
  let down = false;
  let startX = 0;
  let startScroll = 0;
  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    down = true;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.dataset.dragged = "0";
  });
  window.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 6) {
      track.dataset.dragged = "1";
      track.classList.add("dragging");
    }
    if (track.dataset.dragged === "1") track.scrollLeft = startScroll - dx;
  });
  window.addEventListener("pointerup", () => {
    down = false;
    track.classList.remove("dragging");
    setTimeout(() => {
      track.dataset.dragged = "0";
    }, 0);
  });
}

/* ================= DRINK DETAIL MODAL ================= */
function findDrink(name) {
  for (const cat of menuData) {
    const item = cat.items.find((i) => i.name === name);
    if (item) return { ...item, price: cat.unitPrice, kind: cat.id };
  }
  return null;
}

function formatAmount(n) {
  const whole = Math.floor(n);
  const frac = Math.round((n - whole) * 4) / 4;
  const fracText = { 0.25: "¼", 0.5: "½", 0.75: "¾" }[frac] || "";
  if (frac === 1) return String(whole + 1);
  return whole === 0 && fracText ? fracText : `${whole}${fracText}`;
}

let modal = null;

function buildModal() {
  if (modal) return modal;
  modal = document.createElement("dialog");
  modal.className = "drink-modal";
  modal.setAttribute("aria-labelledby", "dmTitle");
  modal.innerHTML = `
    <div class="dm-media"><img id="dmImg" alt="" /></div>
    <div class="dm-body">
      <button class="dm-close icon-btn" type="button" aria-label="Close">✕</button>
      <span class="eyebrow" id="dmKind"></span>
      <h2 id="dmTitle"></h2>
      <p class="dm-desc" id="dmDesc"></p>
      <div class="dm-meta" id="dmMeta"></div>
      <h3 class="dm-label">Tasting notes</h3>
      <ul class="dm-notes" id="dmNotes"></ul>
      <div class="dm-recipe-head">
        <h3 class="dm-label">Make it at home</h3>
        <div class="servings" aria-label="Servings">
          <span>Servings</span>
          <button type="button" data-serv="-1" aria-label="Fewer servings">−</button>
          <output id="dmServings">1</output>
          <button type="button" data-serv="1" aria-label="More servings">+</button>
        </div>
      </div>
      <ul class="dm-ingredients" id="dmIngredients"></ul>
      <h3 class="dm-label">How we make it</h3>
      <ol class="dm-steps" id="dmSteps"></ol>
      <div class="dm-footer">
        <span class="price" id="dmPrice"></span>
        <a class="btn btn-gold" id="dmAdd" href="#">Add to order <span class="arrow" aria-hidden="true">→</span></a>
      </div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelector(".dm-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
  });
  modal.querySelectorAll("[data-serv]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const out = modal.querySelector("#dmServings");
      const next = Math.max(1, Math.min(8, Number(out.value || out.textContent) + Number(btn.dataset.serv)));
      out.textContent = String(next);
      renderIngredients(modal.dataset.drink, next);
    });
  });
  return modal;
}

function renderIngredients(name, servings) {
  const list = modal.querySelector("#dmIngredients");
  list.innerHTML = "";
  (recipes[name]?.ingredients || []).forEach(([amt, unit, item]) => {
    const li = document.createElement("li");
    li.append(el("strong", "", `${formatAmount(amt * servings)}${unit ? " " + unit : ""}`), el("span", "", item));
    list.appendChild(li);
  });
}

function openDrinkModal(name) {
  const drink = findDrink(name);
  const recipe = recipes[name];
  if (!drink || !recipe) return;

  const m = buildModal();
  m.dataset.drink = name;
  m.querySelector("#dmImg").src = `assets/images/${drink.img}`;
  m.querySelector("#dmImg").alt = name;
  m.querySelector("#dmKind").textContent = drink.kind === "iced" ? "Iced latte" : "Hot latte";
  m.querySelector("#dmTitle").textContent = name;
  m.querySelector("#dmDesc").textContent = drink.desc;
  m.querySelector("#dmPrice").textContent = formatMoney(drink.price);

  const meta = m.querySelector("#dmMeta");
  meta.innerHTML = "";
  [drink.tag, drink.kind === "iced" ? "16 oz · over ice" : "12 oz · served hot", `${recipe.caffeine} mg caffeine`, "Oat or almond milk available"]
    .filter(Boolean)
    .forEach((text) => meta.appendChild(el("span", "", text)));

  const notes = m.querySelector("#dmNotes");
  notes.innerHTML = "";
  recipe.notes.forEach((n) => notes.appendChild(el("li", "", n)));

  const steps = m.querySelector("#dmSteps");
  steps.innerHTML = "";
  recipe.steps.forEach((s) => steps.appendChild(el("li", "", s)));

  m.querySelector("#dmServings").textContent = "1";
  renderIngredients(name, 1);

  const add = m.querySelector("#dmAdd");
  const onMenu = Boolean(document.getElementById("menuContainer"));
  add.href = onMenu ? "#order" : `menu.html?add=${encodeURIComponent(name)}#order`;
  add.onclick = onMenu
    ? (e) => {
        e.preventDefault();
        changeQty(name, drink.price, 1);
        m.close();
        document.getElementById("order")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
    : null;

  document.body.style.overflow = "hidden";
  m.showModal();
  m.querySelector(".dm-body").scrollTop = 0;
}

function addFromQuery() {
  if (!document.getElementById("menuContainer")) return;
  const name = new URLSearchParams(location.search).get("add");
  const drink = name && findDrink(name);
  if (!drink) return;

  changeQty(drink.name, drink.price, 1);
  // drop ?add= so a refresh doesn't add it twice
  history.replaceState(null, "", `${location.pathname}#order`);
  const jump = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "instant" });
    window.dispatchEvent(new Event("scroll"));
  };
  if (document.readyState === "complete") jump();
  else window.addEventListener("load", jump, { once: true });
}

/* ================= HOME: FIND YOUR SIGNATURE QUIZ ================= */
function wireQuiz() {
  const form = document.getElementById("quizForm");
  const result = document.getElementById("quizResult");
  if (!form || !result) return;

  form.addEventListener("change", () => {
    const data = new FormData(form);
    const temp = data.get("temp");
    const mood = data.get("mood");
    const sweet = Number(data.get("sweet"));
    if (!temp || !mood || !sweet) return;

    const candidates = menuData
      .filter((cat) => cat.id === temp)
      .flatMap((cat) => cat.items)
      .map((item) => {
        const r = recipes[item.name];
        const score = (r.mood === mood ? 3 : 0) + (3 - Math.abs(r.sweet - sweet));
        return { item, score };
      })
      .sort((a, b) => b.score - a.score);

    const pick = candidates[0].item;
    result.innerHTML = "";
    const img = document.createElement("img");
    img.src = `assets/images/${pick.img}`;
    img.alt = pick.name;
    const body = el("div", "quiz-result-body");
    const open = el("button", "btn btn-gold", "See the recipe ");
    open.type = "button";
    open.appendChild(el("span", "arrow", "→"));
    open.addEventListener("click", () => openDrinkModal(pick.name));
    body.append(
      el("span", "eyebrow", "Your signature"),
      el("h3", "", pick.name),
      el("p", "", `${recipes[pick.name].notes.join(" · ")}. ${pick.desc}`),
      open
    );
    result.append(img, body);
    result.classList.add("show");
  });
}

/* ================= MENU ================= */
function buildMenuIfPresent() {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  container.innerHTML = "";

  menuData.forEach((cat) => {
    const section = el("section", "menu-category");
    section.dataset.category = cat.id;
    section.setAttribute("aria-labelledby", `cat-${cat.id}`);

    const head = el("div", "menu-category-head");
    const h2 = el("h2", "", cat.category);
    h2.id = `cat-${cat.id}`;
    head.append(h2, el("span", "", formatMoney(cat.unitPrice)));
    section.appendChild(head);

    const hasPhotos = cat.items.some((item) => item.img);
    const list = el("div", hasPhotos ? "menu-grid" : "food-list");
    cat.items.forEach((item) => {
      list.appendChild(hasPhotos ? buildMenuCard(item, cat.unitPrice) : buildFoodItem(item, cat.unitPrice));
    });

    section.appendChild(list);
    container.appendChild(section);
  });
}

function buildQty(item, price) {
  const qty = el("div", "qty");
  const minus = el("button", "", "−");
  minus.type = "button";
  minus.setAttribute("aria-label", `Remove one ${item.name}`);
  const count = el("output", "", "0");
  count.dataset.item = item.name;
  count.setAttribute("aria-label", `${item.name} quantity`);
  const plus = el("button", "", "+");
  plus.type = "button";
  plus.setAttribute("aria-label", `Add one ${item.name}`);

  minus.addEventListener("click", () => changeQty(item.name, price, -1));
  plus.addEventListener("click", () => changeQty(item.name, price, 1));

  qty.append(minus, count, plus);
  return qty;
}

function buildMenuCard(item, price) {
  const card = el("article", "menu-card");

  const media = el("div", "menu-card-media");
  const img = document.createElement("img");
  img.src = `assets/images/${item.img}`;
  img.alt = item.name;
  img.loading = "lazy";
  media.appendChild(img);
  if (item.tag) media.appendChild(el("span", "drink-tag", item.tag));
  if (recipes[item.name]) {
    const open = el("button", "drink-open");
    open.type = "button";
    open.setAttribute("aria-label", `View ${item.name} tasting notes and recipe`);
    open.appendChild(el("span", "", "View recipe"));
    open.addEventListener("click", () => openDrinkModal(item.name));
    media.appendChild(open);
  }

  const top = el("div", "menu-card-top");
  top.append(el("h3", "", item.name), el("span", "price", formatMoney(price)));

  card.append(media, top, el("p", "", item.desc), buildQty(item, price));
  return card;
}

function buildFoodItem(item, price) {
  const row = el("article", "food-item");
  const h3 = el("h3", "", item.name);
  if (item.tag) h3.appendChild(el("span", "tag-inline", item.tag));
  row.append(h3, buildQty(item, price), el("p", "", item.desc));
  return row;
}

function changeQty(name, price, delta) {
  const current = order[name]?.qty || 0;
  const next = Math.max(0, Math.min(20, current + delta));

  if (next === 0) {
    delete order[name];
  } else {
    order[name] = { qty: next, price };
  }

  syncQtyDisplay(name, next);
  PriceCalc();
}

function syncQtyDisplay(name, value) {
  document.querySelectorAll(`output[data-item="${CSS.escape(name)}"]`).forEach((out) => {
    out.textContent = String(value);
    out.parentElement.classList.toggle("has-items", value > 0);
  });
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
      const bar = document.querySelector(".menu-bar");
      if (bar && window.scrollY > bar.offsetTop) {
        window.scrollTo({ top: bar.offsetTop - 70, behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  });
}

/* ================= PRICE ESTIMATOR ================= */
function wirePriceEstimatorIfPresent() {
  const tipEl = document.getElementById("tipSelect");
  const clearBtn = document.getElementById("clearOrderBtn");
  if (!tipEl) return;

  tipEl.addEventListener("change", PriceCalc);

  clearBtn?.addEventListener("click", () => {
    Object.keys(order).forEach((name) => {
      delete order[name];
      syncQtyDisplay(name, 0);
    });
    PriceCalc();
  });

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
    linesEl.appendChild(el("li", "order-empty", "Nothing here yet. Tap + on anything above."));
  }

  let subtotal = 0;
  let count = 0;
  entries.forEach(([name, { qty, price }]) => {
    const lineTotal = qty * price;
    subtotal += lineTotal;
    count += qty;
    const li = document.createElement("li");
    li.append(el("span", "", `${qty} × ${name}`), el("span", "", formatMoney(lineTotal)));
    linesEl.appendChild(li);
  });

  clearBtn?.classList.toggle("hidden", entries.length === 0);

  const tipRate = Number(tipEl.value);
  const tax = subtotal * TAX_RATE;
  const tip = subtotal * tipRate;
  const total = subtotal + tax + tip;

  resultEl.innerHTML = "";
  [
    ["Subtotal", subtotal],
    ["Tax (9.25%)", tax],
    [`Tip (${Math.round(tipRate * 100)}%)`, tip],
  ].forEach(([label, value]) => resultEl.appendChild(receiptRow(label, value)));
  const totalRow = receiptRow("Total", total);
  totalRow.classList.add("receipt-total");
  resultEl.appendChild(totalRow);

  updateOrderPill(count, total);
}

function receiptRow(label, value) {
  const row = el("div", "receipt-row");
  row.append(el("span", "", label), el("span", "", formatMoney(value)));
  return row;
}

function updateOrderPill(count, total) {
  const pill = document.getElementById("orderPill");
  const orderSection = document.getElementById("order");
  if (!pill || !orderSection) return;

  pill.querySelector("[data-count]").textContent = `${count} item${count === 1 ? "" : "s"}`;
  pill.querySelector("b").textContent = formatMoney(total);

  const orderVisible = orderSection.getBoundingClientRect().top < window.innerHeight * 0.8;
  pill.classList.toggle("show", count > 0 && !orderVisible);

  if (!pill.dataset.wired) {
    pill.dataset.wired = "1";
    window.addEventListener("scroll", () => {
      const n = Object.values(order).reduce((sum, o) => sum + o.qty, 0);
      const visible = orderSection.getBoundingClientRect().top < window.innerHeight * 0.8;
      pill.classList.toggle("show", n > 0 && !visible);
    }, { passive: true });
  }
}

/* ================= TOGGLES ================= */
function wireToggle(btnId, boxId, showText, hideText) {
  const btn = document.getElementById(btnId);
  const box = document.getElementById(boxId);
  if (!btn || !box) return;

  const label = btn.querySelector("[data-label]") || btn;
  btn.setAttribute("aria-controls", boxId);
  btn.setAttribute("aria-expanded", "false");

  btn.addEventListener("click", () => {
    const isHidden = box.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", String(!isHidden));
    label.textContent = isHidden ? showText : hideText;
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

  let index = Math.max(0, slides.findIndex((s) => s.classList.contains("active")));
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

  function start() {
    if (reduceMotion) return;
    stop();
    timer = setInterval(() => show(index + 1), 5500);
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

  let touchX = null;
  frame?.addEventListener("touchstart", (e) => {
    touchX = e.touches[0].clientX;
  }, { passive: true });
  frame?.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
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
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const firstName = document.getElementById("name").value.trim().split(" ")[0];
    error.classList.add("hidden");
    thankYou.textContent = `Thank you, ${firstName}. ✨ We'll be in touch within a day or two.`;
    thankYou.classList.remove("hidden");
    form.classList.add("hidden");
    form.reset();
    updateCount();
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
  const isDark = theme === "dark";
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(isDark ? "theme-dark" : "theme-light");

  const btn = document.getElementById("modeBtn");
  if (btn) {
    btn.querySelector(".mode-icon").textContent = isDark ? "☀" : "☾";
    btn.querySelector(".mode-label").textContent = isDark ? "Switch to light mode" : "Switch to dark mode";
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
function wireNavScroll() {
  const bar = document.querySelector(".topbar");
  if (!bar) return;
  const update = () => bar.classList.toggle("scrolled", window.scrollY > 40);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function wireMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  const setOpen = (open) => {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.querySelector(".mode-icon, span").textContent = open ? "✕" : "☰";
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
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

/* ================= MOTION ================= */
function wireStagger() {
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.classList.add("reveal");
      child.style.setProperty("--i", String(i));
    });
  });
}

function wireReveal() {
  const items = document.querySelectorAll(".reveal, .reveal-img");
  if (!("IntersectionObserver" in window)) {
    items.forEach((node) => node.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach((node) => observer.observe(node));
}

function wireParallax() {
  const layers = document.querySelectorAll("[data-parallax]");
  if (!layers.length || reduceMotion) return;

  let ticking = false;
  const update = () => {
    layers.forEach((layer) => {
      const box = layer.parentElement.getBoundingClientRect();
      const progress = (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight;
      layer.style.transform = `translate3d(0, ${progress * -60}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}
