# Lotus Lounge Bar & Kitchen — Website

A modern, premium static website for Lotus Lounge Bar & Kitchen, Mysore Road, Bengaluru.

---

## File Structure

```
lotus-lounge/
├── index.html           ← Homepage (hero, about, pillars, dishes, reviews, CTA)
├── menu.html            ← Full menu with tab navigation
├── reservations.html    ← Reservation page (form + EazyDiner/Zomato links)
├── vercel.json          ← Vercel deployment config (headers, caching, clean URLs)
│
├── css/
│   ├── main.css         ← Design tokens, reset, typography, nav, footer, responsive
│   ├── components.css   ← All section-specific styles (hero, cards, reviews, etc.)
│   └── animations.css   ← Keyframes, scroll reveals, microinteractions
│
├── js/
│   ├── main.js          ← Nav scroll, mobile menu, Intersection Observer reveals, parallax
│   └── menu.js          ← Menu tab switching
│
└── assets/
    ├── favicon.svg      ← SVG favicon (lotus motif)
    └── images/          ← Place actual restaurant photos here
        ├── hero.jpg     (replace Unsplash URL in index.html hero__bg)
        ├── about.jpg    (replace Unsplash URL in about section)
        ├── dish-1.jpg
        ├── dish-2.jpg
        ├── dish-3.jpg
        └── ambiance.jpg (replace Unsplash URL in ambiance section)
```

---

## Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm i -g vercel
cd lotus-lounge
vercel
```

### Option 2 — Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to vercel.com → Import Project → select repo
3. Framework: **Other** (static HTML)
4. Deploy — done

### Option 3 — Drag & Drop
Zip the `lotus-lounge/` folder and drag into vercel.com/new

---

## Customization Checklist

### Replace placeholder images
The current site uses Unsplash URLs. Replace with real restaurant photos:
- `index.html` → `.hero__bg` background-image (inline style or CSS)
- `index.html` → `about__img` src
- `index.html` → three `dish-card__img` src attributes
- `index.html` → `.ambiance__bg` background-image
- `components.css` → `.hero__bg` and `.ambiance__bg` background-image properties

### Add real contact details
- Phone number → `reservations.html` info sidebar
- Instagram handle → footer social links (both pages)
- Facebook page → footer social links

### Connect the reservation form
Replace the JS `handleFormSubmit` in `reservations.html` with one of:
- **Formspree**: add `action="https://formspree.io/f/YOUR_ID"` and remove the JS handler
- **EmailJS**: add their SDK and wire up the fields
- **WhatsApp redirect**: send form data to `https://wa.me/91XXXXXXXXXX?text=...`

### Google Maps embed
In `reservations.html`, the Maps embed uses a placeholder API key.
Replace with your own: [console.cloud.google.com](https://console.cloud.google.com)

### Menu prices
All prices in `menu.html` are illustrative. Update to match the actual menu.

### Custom domain
In Vercel dashboard → Settings → Domains → add your domain.

---

## Design System

| Token        | Value        |
|---|---|
| Background   | `#07060a`    |
| Gold accent  | `#c8a45a`    |
| Cream text   | `#f0ead8`    |
| Muted text   | `#7b7466`    |
| Display font | Cormorant Garamond |
| Body font    | DM Sans      |

---

Built by **Antigravity** · Bengaluru
