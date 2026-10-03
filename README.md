# Amaira's Aroma Cafe ☕

*A luxury specialty coffee cafe that only exists online, named after my little sister.*

**Live:** https://suhxnitiwari.github.io/amairas-aroma-cafe/

## What it is

A four-page website for a fictional upscale cafe, built with plain HTML, CSS and JavaScript: no frameworks, no build step. You can browse the menu, take a quiz to find your drink, open its recipe and make it at home, or build an order and watch the receipt total itself.

| Page | What's on it |
|---|---|
| **Home** | Full-screen hero, scrolling ticker, a draggable signature-drink gallery, a "Find your signature" quiz, the origin story, the four spaces, events and an order-ahead call to action |
| **Menu** | 20 items rendered from a JavaScript array, with category filters, photo cards and a live order builder with tax and tip |
| **Community** | Two image carousels (arrows, dots, swipe, autoplay), event cards and a toggleable monthly calendar |
| **Contact** | Contact form with per-field validation, a character counter and a personalized thank-you message |

## How it's built

- **Data-driven menu.** Every card comes from the `menuData` array in `js/script.js`, so adding a drink is a one-line change. A separate `recipes` object holds each latte's tasting notes, quiz profile and a one-serving recipe.
- **Find-your-signature quiz.** Three questions (hot or iced, mood, sweetness) score every latte in that temperature: +3 for a mood match, plus up to 3 more for how close its sweetness is to yours. The top score wins and links straight to its recipe.
- **Recipes that rescale.** A servings stepper multiplies every ingredient and rounds to the nearest quarter, so amounts read like a real recipe (¼, ½, ¾) instead of decimals.
- **Live order builder.** Tapping + or − updates an itemized receipt with subtotal, 9.25% Texas sales tax and a selectable tip. "Add to order" from a drink page deep-links to the menu with `?add=`, then clears it with `history.replaceState` so a refresh doesn't add it twice.
- **Draggable gallery.** Click-and-drag scrolling on desktop with pointer events, with a guard so a drag never counts as a click.
- **Light and dark mode** that follows the system setting by default and remembers your choice in `localStorage` (and still works when storage is blocked).
- **Accessible:** semantic landmarks, a skip link, `aria-current` / `aria-pressed` / `aria-expanded` states, live regions for the receipt and carousel captions, visible focus rings, keyboard-controllable carousels and `prefers-reduced-motion` support.
- **Fast:** images resized and compressed from 65 MB to about 5 MB, with lazy loading below the fold. Scroll reveals use `IntersectionObserver`, with a fallback for browsers without it.

## Design choices

A warm palette inspired by upscale cafe interiors, defined once as CSS custom properties and swapped for dark mode:

| Token | Hex | Used for |
|---|---|---|
| Espresso | `#1c0e07` | Nav, footer, dark sections |
| Terracotta | `#944c27` | Accents, ticker |
| Clay | `#b8693e` | Buttons, call-to-action band |
| Gold | `#c99a5b` | Italic accents, dark-mode highlights |
| Cream | `#f7efe4` | Page background |
| Linen | `#efe3d3` | Alternate sections |

Headings use **Cormorant Garamond** with gold italic accents, and body text uses **Jost**. Motion is editorial and slow: a hero zoom, staggered scroll reveals, image wipes, parallax and a rotating badge, all turned off for visitors who prefer reduced motion.

## Tech stack

HTML, CSS (custom properties, no framework), vanilla JavaScript, GitHub Pages.

## Project structure

```
amairas-aroma-cafe/
├── index.html        Home
├── menu.html         Menu + order builder
├── community.html    Carousels + events
├── contact.html      Contact form
├── css/styles.css    All styles (design tokens, layout, dark mode, responsive)
├── js/script.js      Menu data, recipes, quiz, order math, carousels, validation, theme
└── assets/images/    Drink, space and community photos
```

## Run it locally

No install needed. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Background

This started as a Hacker Day lab for MIS 372T (Full Stack Development) at UT Austin and was later redesigned as a luxury editorial site: new typography and motion, a photo-card menu with a live order builder, drink recipes, a quiz, working carousels, stronger form validation, accessibility fixes, a mobile layout and image optimization.

---

Built by [Suhani Tiwari](https://suhanitiwari.com).
