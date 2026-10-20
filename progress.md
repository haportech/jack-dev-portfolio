# Quiet Glass rollout

Updated: 2026-10-20 (Asia/Tokyo). Jack resumed the quota pause and authorized autonomous completion.

## Current result

The approved portfolio is deployed at https://hapordev.com/. Worker `jack-dev-portfolio`, version `7143207b-3073-4afe-9ce7-6041780ec8a3`. Production source is on `main`; see Git history for the rollout commit.

- Approved typography, ivory/ink/clay palette, frosted navigation/project viewer, light/dark, meaningful Motion transitions and reduced motion.
- Three image-only featured projects, keyboard project selector, native case studies, full 15-project archive, mobile menu and preserved EmailJS form.
- Supplied logo/favicon, local licensed fonts, real 1200×630 social image, factual biography, metadata/canonical/ProfilePage data, robots, sitemap, privacy and HTTP 404.
- Non-editable text selection and dragging disabled; fields remain editable. No filler reviews, blogs, guarantees, policies or other irrelevant checklist features.
- Four private repository links now render text. SupplyTrace's disabled public Worker is replaced by its available source branch.
- Cloudflare's automatic analytics beacon was detected; its CSP permission is corrected. Local DNS blocks the script host at `0.0.0.0` / `::`, so receipt cannot be verified from this machine. Details are in the production report.

## Three projects completed and pushed first

| Checkout | Branch | UI commit | Verification |
| --- | --- | --- | --- |
| `/Users/jack/Documents/Coding/jack-exchange` | `main` | `2d322f0` | 22 tests, build/static routes and five-width browser checks |
| `/Users/jack/Documents/Coding/supplytrace` | `codex/local-full-scan` | `0a22959` | Typecheck/lint/build, 117 unit + 14 worker + 13 E2E |
| `/Users/jack/Documents/Coding/vangdy-guesthouse` | `redesign-audit` | `55249ec` | Static smoke, five-width menu/form checks |

All three HEADs match GitHub upstream. Protected files match pre-task snapshots: 15 Exchange, 23 SupplyTrace and Vangdy `js/main.js`. Three applications were pushed, not deployed. Vangdy now has its own private GitHub repository.

Pre-existing frontend work was preserved in baseline commits `0e398c1` / `6e43ae8`. Exchange's unrelated original lockfile modification and untracked `.serena/` remain untouched; the other two trees are clean. Unrelated Zygon on port 4173 was preserved.

## Media and recovery

- Nine original PNGs: `/Users/jack/Documents/Coding/jack-dev-portfolio-screenshots/2026-10-20/`. Six desktop home/detail captures: 1440×1000; three mobile homes: 390×844. No manual recapture required.
- Six compressed WebPs in `public/media/`, each 44–85 KB. SupplyTrace detail is an explicitly labeled example report.
- Three old MP4s preserved in `/Users/jack/Documents/Coding/jack-dev-portfolio-media-archive/2026-10-20/`.
- Original snapshot: `/Users/jack/Documents/Coding/jack-dev-portfolio-snapshots/2026-10-20-pre-redesign/`.
- Four pre-rollout archives/bundles and original dirty patches: `/Users/jack/Documents/Coding/quiet-glass-rollout-snapshots/2026-10-20-approval/`.
- Historical design studies remain in `docs/redesign/`. The prototype's video version is historical; production uses images.

## Final checks

`npm run deploy` passes. `BASE_URL=https://hapordev.com node scripts/verify-portfolio.mjs` passes nine grouped checks: both themes/five widths, project/dialog/menu controls, archive, invalid/success/failure forms, reduced motion, selection/drag and SEO assets. Two EmailJS calls were intercepted; no real mail. Zero browser page errors or video requests.

Built Worker home/privacy return 200; unknown URLs return the custom page with 404. Auxiliary pages fit 320/1440 px with loaded images. Live JS/CSS bytes match the build; `.DS_Store` is excluded and returns 404. Cloudflare's edge-injected JavaScript Detection can log a CSP block separately from application code; inline execution protections remain intact.

Evidence and design gate: `docs/production-verification.md`. Machine report and reviewed stills: `docs/checks/`. Free SEO/analytics research and current account limits: `docs/seo-research.md`, `limits.md`.
