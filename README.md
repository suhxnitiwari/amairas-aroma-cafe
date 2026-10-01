# Amaira's Aroma Cafe ☕

A four-page website for a fictional luxury specialty coffee cafe, named after my little sister. It's built with plain HTML, CSS and JavaScript: no frameworks, no build step.

**Live site:** https://suhxnitiwari.github.io/amairas-aroma-cafe/

## Pages

| Page | What's on it |
|---|---|
| **Home** | Full-screen hero, scrolling ticker, a draggable signature-drink gallery, a "Find your signature" quiz, the origin story with stats, the four spaces, a quote band, events and an order-ahead call to action |
| **Menu** | 20 items rendered from a JavaScript array, with category filters, photo cards and a live order builder with tax and tip |
| **Community** | Two image carousels (arrows, dots, swipe, autoplay), event cards and a toggleable monthly calendar |
| **Contact** | Contact form with per-field validation, a character counter and a personalized thank-you message |

## Features

- **Drink detail pages:** tap any latte for tasting notes, size and caffeine, a make-it-at-home recipe with a servings stepper that rescales every ingredient, step-by-step method, and "Add to order".
- **Find your signature quiz:** three questions (hot or iced, mood, sweetness) score all ten lattes and recommend a match.
- **Order builder:** tap + or − on any menu item and the receipt updates instantly with an itemized subtotal, 9.25% Texas sales tax and a selectable tip.
- **Data-driven menu:** every card is generated from the `menuData` array in `js/script.js`, so adding a drink is a one-line change.
- **Light and dark mode:** follows the visitor's system setting by default and remembers their choice with `localStorage`.
- **Responsive:** collapsible mobile nav, plus two-column menu cards and no sideways scrolling on phones.
- **Accessible:** semantic landmarks, skip link, `aria-current` / `aria-pressed` / `aria-expanded` states, live regions for the receipt and carousel captions, visible focus rings, keyboard-controllable carousels, and `prefers-reduced-motion` support.
- **Fast:** images resized and compressed from 65 MB to about 5 MB, with lazy loading below the fold.

## Design

A warm palette inspired by upscale cafe interiors, defined once as CSS custom properties and swapped for dark mode:

| Token | Hex | Used for |
|---|---|---|
| Espresso | `#1c0e07` | Nav, footer, dark sections |
| Terracotta | `#944c27` | Accents, ticker |
| Clay | `#b8693e` | Buttons, call-to-action band |
| Gold | `#c99a5b` | Italic accents, dark-mode highlights |
| Cream | `#f7efe4` | Page background |
| Linen | `#efe3d3` | Alternate sections |

Headings use **Cormorant Garamond** (with gold italic accents) and body text uses **Jost** (Google Fonts). Motion includes a slow hero zoom, staggered scroll reveals, image wipes, parallax and a rotating badge, all disabled for visitors who prefer reduced motion.

## Project structure

```
amairas-aroma-cafe/
├── index.html        Home
├── menu.html         Menu + order builder
├── community.html    Carousels + events
├── contact.html      Contact form
├── css/styles.css    All styles (design tokens, layout, dark mode, responsive)
├── js/script.js      Menu data, order math, carousels, validation, theme
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

## Author

**Suhani Tiwari**
Management Information Systems and Marketing, The University of Texas at Austin
