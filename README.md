# Fathima & Amalakar — Wedding Invitation

A premium, cinematic, interactive Muslim wedding invitation website.

## Live Preview

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
# Then visit http://localhost:8080
```

## Structure

```
wedding-invite/
├── index.html    — Complete HTML structure
├── styles.css    — All styles, responsive breakpoints, animations
├── script.js     — Interactions, scroll animations, scratch card, confetti
└── README.md     — This file
```

## Replacing Photos

All placeholder images are sourced from Unsplash. To replace them with actual couple photographs, edit the `PHOTOS` object at the top of `script.js`:

```js
const PHOTOS = {
  heroLeft:   'path/to/hero-left.jpg',
  heroRight:  'path/to/hero-right.jpg',
  bride:      'path/to/bride-portrait.jpg',
  groom:      'path/to/groom-portrait.jpg',
  story1:     'path/to/story-photo-1.jpg',
  story2:     'path/to/story-photo-2.jpg',
  story3:     'path/to/story-photo-3.jpg',
  story4:     'path/to/story-photo-4.jpg',
  rings:      'path/to/hands-rings.jpg',
};
```

Also update the `src` attributes in `index.html` for the corresponding `<img>` tags. Every image tag has a descriptive `alt` attribute to help you find it.

## Features

- **Sealed envelope** with wax seal, Islamic geometric pattern, and gold ribbons
- **Curtain reveal** animation after envelope opens
- **Hero section** with couple names, floating polaroid photos, parallax
- **"Two Stories, One Journey"** couple portrait section
- **Scratch-the-heart** interactive date reveal with canvas
- **Confetti celebration** after scratching
- **Event timeline** with animated connecting line
- **Venue card** with Google Maps link
- **Parallax photo story** — editorial-style layered photos
- **Family details** with Islamic arch decoration
- **Ring journey** — two rings converge as you scroll
- **Final wedding message** with arch framing
- **Live countdown** to the Nikah
- **RSVP form** — "Leave a little love"
- **Ambient music toggle** (minimal drone; replace with actual audio)
- **Film grain overlay** for premium texture
- **Floating petals** throughout the page
- **Scroll progress bar**
- **Reduced motion** support
- **Mobile optimized** (360px–430px)

## Wedding Details

- **Bride:** Fathima Ibrahim
- **Groom:** Amalakar Zulfikar
- **Reception:** Saturday, 28 November 2026 — 5:00 PM onwards
- **Nikah:** Sunday, 29 November 2026 — 12:00 Noon & 12:30 PM
- **Venue:** Sneha Auditorium, Kadappayil Jn., Thevalakara

## Fonts Used

- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) — Body serif
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — Display headings
- [Great Vibes](https://fonts.google.com/specimen/Great+Vibes) — Script/romantic accents
- [Cinzel](https://fonts.google.com/specimen/Cinzel) — Small ceremonial labels

## Browser Support

Tested for modern browsers (Chrome, Safari, Firefox, Edge). Uses:
- CSS custom properties
- `clip-path`
- `backdrop-filter`
- Canvas 2D API
- Pointer Events API
- Intersection Observer API
- Web Audio API (for ambient sound)

## License

This is a custom wedding invitation. All code is provided as-is for personal use.

