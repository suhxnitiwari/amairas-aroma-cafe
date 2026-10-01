# Amaira's Aroma Cafe ☕

A four-page website for a fictional upscale specialty coffee cafe, named after my little sister. It's built with plain HTML, CSS and JavaScript: no frameworks, no build step.

## Pages

| Page | What's on it |
|---|---|
| **Home** | Full-bleed hero, the cafe's origin story, signature drinks and a tour of the space |
| **Menu** | 20 items rendered from a JavaScript array, with category filters, photo cards and a live order builder with tax and tip |
| **Community** | Two image carousels (arrows, dots, swipe, autoplay), event cards and a toggleable monthly calendar |
| **Contact** | Contact form with per-field validation, a character counter and a personalized thank-you message |

## Features

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
| Terracotta | `#944c27` | Nav, footer, buttons |
| Burnt orange | `#bf6739` | Origin section, hover states |
| Sand | `#edd0ab` | Section panels |
| Cream | `#fff6ea` | Page background, cards |
| Espresso | `#421e0b` | Text |

Headings use **Playfair Display** and body text uses **DM Sans** (Google Fonts).

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

This started as a Hacker Day lab for MIS 372T (Full Stack Development) at UT Austin and was later redesigned: new typography, a photo-card menu with a live order builder, working carousels, stronger form validation, accessibility fixes, a mobile layout and image optimization.

## Author

**Suhani Tiwari**
Management Information Systems and Marketing, The University of Texas at Austin
