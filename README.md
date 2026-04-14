# Anna Leonard - Design Portfolio

This repository contains Anna Leonard's portfolio website, including UX/UI case studies and graphic design project pages.

## Overview

The site is a static frontend project built with vanilla HTML, CSS, and JavaScript.

- Responsive layout and navigation (desktop + hamburger menu)
- Project filtering on the home page
- Long-form case study pages with image/video galleries

## Site Pages

- `index.html` - home / project index
- `about.html` - about page
- `contact.html` - contact form

### UX/UI pages

- `designs/uxui/breakstigma.html`
- `designs/uxui/creativitymap.html`
- `designs/uxui/luminousdepths.html`
- `designs/uxui/mesozoic.html`
- `designs/uxui/netflix.html`
- `designs/uxui/sipstir.html`
- `designs/uxui/terravita.html`

### Graphic design pages

- `designs/graphic/celestial.html`
- `designs/graphic/cheesychums.html`
- `designs/graphic/narnia.html`
- `designs/graphic/new_student.html`
- `designs/graphic/racoon.html`

## Project Structure

```text
.
├── index.html
├── about.html
├── contact.html
├── designs/
│   ├── graphic/
│   └── uxui/
├── scripts/
│   ├── contact.js
│   ├── filter.js
│   └── nav.js
├── styles/
│   ├── content.css
│   ├── layout.css
│   └── nav.css
├── images/
└── icons/
```

## Maintenance Notes

- Keep media and image references relative to each page location.
- Use shared CSS utilities (for example in `styles/content.css`) instead of inline styles when possible.
- Keep accessibility attributes in place (`lang` on `html`, `alt` on `img`).
- Most page imagery is now served as `.webp` for performance.

## Author

Anna Leonard - Visual Communicator, UX/UI and Web Designer, Illustrator
