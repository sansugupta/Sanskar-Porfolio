# Infrabuild Partners — Theme Handoff

## What this is
A full redesign of `infrabuildpartners.com`, themed to match the logo and banner (monochrome, near-black background, white shield + wordmark, wide-tracked tagline).

## Drop-in instructions for Codex / Claude Code
The file layout in this project mirrors the existing repo structure (`InfraBuild-Partners/`). To deploy, **replace these 4 files** in the repo and push:

| Repo path | This project path |
|---|---|
| `InfraBuild-Partners/index.html` | `index.html` |
| `InfraBuild-Partners/styles.css` | `styles.css` |
| `InfraBuild-Partners/app.js` | `app.js` |
| `InfraBuild-Partners/data/services.json` | `data/services.json` (unchanged schema, badge text cleaned) |
| `InfraBuild-Partners/data/content.json` | `data/content.json` (unchanged) |

`Dockerfile`, `nginx.conf`, marketing-ops folder, deploy pipeline — **untouched**. No new build step. Same plain static site.

## Design system (what changed)
- **Palette**: near-black `#070708 → #0d0d0f`, white `#fafafa`, greys `#a1a1a8`, `#6e6e76`. **Zero colored accents.** The old blue/purple/cyan/green/pink scheme is gone.
- **Type**: Inter only (removed Space Grotesk). Matches the logo wordmark. Wide-tracked uppercase for labels matches `BUILDING THE FOUNDATION FOR YOUR GROWTH`.
- **Logo**: reconstructed as an inline SVG `<symbol id="ibp-shield">` — used in nav, hero watermark, guarantee banner, footer. Swap in your own SVG file if you prefer vector-perfect match.
- **Removed**: particle canvas (perf + noise), rainbow gradient hero text, per-service accent colors, colorful CTA glows.
- **Added**: ambient grid + grain backdrop, trust marquee of tech names, numbered section labels (`01 · Engineering services`), sharper card hovers with cursor-aware spotlight, monochrome PDF booklet redesign.

## Content
All copy, pricing, services, testimonials, case studies preserved verbatim from `data/services.json` and `data/content.json`. The cards and select options still render dynamically from JSON — edit the JSON to update pricing, push, redeploy.

## What I did NOT change
- Contact form `mailto:` behavior
- Analytics localStorage tracker
- PDF booklet generator (restyled monochrome but same jsPDF flow)
- Modal service-overview pattern
- `data-service-id` clickability for service/premium cards
- All section IDs (`#services`, `#projects`, `#testimonials`, `#career`, `#contact`) — anchor links keep working

## Known follow-ups
1. The SVG shield is a reconstruction — if you want the exact logo, drop `assets/logo-full.png` or a vector version into `/public` and replace the `<symbol>` in `index.html` with an `<image href="…">`.
2. Testimonial avatars still point to the Supabase URLs. Works, but consider self-hosting.
3. LinkedIn footer link is still `#` (placeholder).
