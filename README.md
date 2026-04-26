# Anna Leonard - Design Portfolio

Static portfolio site for Anna Leonard, featuring UX/UI case studies and graphic design projects.

## Overview

- Built with vanilla HTML, CSS, and JavaScript (no framework/build step)
- Responsive layout with desktop navigation and hamburger menu
- Home page project filtering for UX/UI vs Graphic Design work
- Long-form project pages with image and video sections

## Site Pages

- `index.html` - home page and filterable project grid
- `about.html` - about page
- `contact.html` - contact page

### UX/UI pages

- `designs/uxui/breakstigma.html`
- `designs/uxui/creativitymap.html`
- `designs/uxui/gooddog.html`
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

## Filtering Behavior (Home Page)

Filtering logic lives in `scripts/filter.js` and targets `.works` items in `index.html`.

- Each card has a `data-groups` attribute (for example `"UX/UI DESIGN"` or `"GRAPHIC DESIGN"`)
- Nav links for those two categories pass `?filter=...` to `index.html`
- On load, `filterWorks(...)` reads the query value and shows/hides cards by group
- Non-filter nav links (About, Contact) behave as normal page navigation

## Media Guidelines

- Prefer `.webp` for homepage and project imagery when possible
- Keep file paths relative to each page location (for nested pages this is usually `../../...`)
- Keep `alt` text meaningful for accessibility
- Reuse existing section wrappers in `styles/content.css` for consistency:
  - `.text_section_container`
  - `.image_section_container`
  - `.image_section_container_captions`
  - `.two-col-media` (used by longer case-study layouts)

### Common Image Commands (ImageMagick)

```bash
# Resize existing WEBP to exact dimensions (may distort)
magick images/home/gooddog.webp -resize 591x370! images/home/gooddog.webp

# Convert PNG to WEBP with exact dimensions
magick images/home/narniacovers.png -resize 591x370! images/home/narniacovers.webp

# Confirm dimensions
magick identify images/home/gooddog.webp
```

## Footer Notes

Shared footer structure appears across pages and uses:

- `.ftr_container` as the main footer flex wrapper
- `.ftr_logo_container` for logo + signature
- `.ftr_navbar` for social/contact links
- `.ftr_copyright` for legal text when present

If footer links appear clipped/hidden, check `styles/layout.css` and `styles/nav.css` for `flex`, `overflow`, and wrapping rules.

## Editing Notes

- Keep nav and footer structures consistent across pages
- Avoid inline styles when a shared class exists
- Preserve accessibility attributes (`lang`, `alt`, link labels)
- Validate relative paths whenever moving or renaming media files

## Author

Anna Leonard - Visual Communicator, UX/UI and Web Designer, Illustrator
