# Quiet Glass production verification

Date: 2026-10-20. Owner review: Jarvis. Approved direction: `docs/redesign/quiet-glass.html`.

## Verified behavior

`npm run build` passes. `BASE_URL=http://127.0.0.1:8787 node scripts/verify-portfolio.mjs` passes against the built Cloudflare Worker, not only Vite development output. The browser check uses the already-installed Playwright in the sibling SupplyTrace checkout; no production dependency was added.

- Three project tabs: click, repeated rapid switching, ArrowLeft/Right wrapping, Home/End, one selected tab and exposed panel.
- Every case study: correct title, description, role, scope, outcome, detailed screenshot and links; Close and Escape dismiss; focus returns to opener; modal background cannot receive focus.
- Theme button: complete light/dark change. Five widths in both themes: 320, 390, 768, 1024 and 1440 px; no horizontal overflow.
- Mobile menu: open, toggle closed, close after following a section link, Escape and focus restoration.
- Archive: expansion reveals all 15 projects. Four authenticated private repositories display text instead of public 404 links. The local Minecraft project has no invented URL.
- SupplyTrace: its workers.dev route is disabled and no alternative domain/route exists in the account. The card and case study use the public source branch, avoiding a known dead preview link.
- Form: empty/invalid input displays field errors and focuses the invalid field. Intercepted successful delivery resets inputs and displays success; intercepted failure preserves the message and restores the enabled submit button. Two EmailJS requests were fulfilled locally; no real mail was sent.
- Original `initContactForm()` is byte-identical to the baseline, SHA-256 `031afb97ca5cc7324ba9fa4aa1fc04cc2575f4b447832fe456291c059cff5cff`.
- Reduced-motion mode: no running animations after interactions and no project parallax. Normal mode uses the approved entrance, selector transition, modal reveal and desktop scroll depth.
- All project screenshots load; no video elements or video requests. Non-editable text selection and drag gestures are disabled; fields remain editable/selectable.
- Metadata: title, description, canonical URL, truthful ProfilePage/Person data, six compressed 1440×1000 WebPs, supplied-logo favicon assets, 1200×630 real-page social image, web manifest, robots and sitemap.
- Built Worker: `/` and `/privacy/` return 200; an unknown path returns the custom page with HTTP 404. Privacy/404 layouts fit 320 and 1440 px. Source-bearing images load; no JavaScript or CSP errors.
- Public link audit: 13 project/social destinations return 200; four private repo 404s are removed; SupplyTrace's disabled preview is removed. Exchange and Vangdy were previously verified 200, with later timeout checks treated as indeterminate.

Machine report: `docs/checks/portfolio-verification.json`. Reviewed captures: 390/1440 px in both themes, contact section, three project home images. Original nine project PNGs: `/Users/jack/Documents/Coding/jack-dev-portfolio-screenshots/2026-10-20/`.

## Public deployment and analytics

Deployed to `https://hapordev.com/`, Worker version `7143207b-3073-4afe-9ce7-6041780ec8a3`. All nine grouped checks also pass against the public domain. Live JS/CSS bytes match the build. Home, privacy, robots, sitemap, favicon, social image and manifest return 200; a missing URL and excluded `.DS_Store` return 404.

The live browser revealed an existing, automatically injected Cloudflare Web Analytics script with a real configured site token. The old CSP blocked it. The final policy permits only the official `https://static.cloudflareinsights.com` script origin in addition to self; automatic beacon delivery uses the already-allowed same-origin `/cdn-cgi/rum`. No token was invented or duplicated in source. Privacy copy now describes this analytics service. Official CSP guidance is linked in `seo-research.md`.

Two browser delivery attempts could not confirm a RUM response because the script request returned `net::ERR_CONNECTION_REFUSED`. A separate curl/DNS check confirmed the local resolver maps `static.cloudflareinsights.com` to `0.0.0.0` / `::`. The environment blocks this vendor script; no DNS/network setting was changed to bypass it. Do not claim dashboard receipt or successful beacon delivery. Account management also remains unavailable through the current OAuth scope.

Cloudflare separately injects its inline JavaScript Detection wrapper. It logs a CSP violation because this static site has no dynamic nonce; Cloudflare documents this behavior. Existing inline-script protections were retained instead of adding unsafe-inline, a fixed nonce or changing bot-protection settings. This provider console message is distinct from the zero application page errors in the interaction report.

## Anti-slop delivery gate

Design Read: personal developer portfolio for clients assessing end-to-end work; warm editorial typography and an operated glass project stage. ENERGY 2 / RHYTHM 3 / MOTION 2. The approved concept established these before production integration. The owner explicitly requested Apple/OpenAI/Anthropic influences, glass and distinctive typography.

### Hard gate

- R-02 PASS: production HTML/data and auxiliary page copy contain no em dash.
- R-03 PASS: ten theme/viewport combinations fit without horizontal overflow; auxiliary pages fit 320/1440 px.
- R-17 PASS: no invented statistics; changing currency/source counts removed from portfolio prose.
- R-18 PASS: no testimonials.
- R-23 PASS: supplied logo, real project captures and existing guest-house photography; no invented identity assets.
- R-24 PASS: every local navigation target exists; private/dead public links corrected after HTTP/account checks.
- R-25 PASS: approved text/action palette retained; eleven conservative contrast pairs previously calculated at minimum 5.43:1. Form text uses the same ink/canvas roles.
- R-26 PASS: tabs, case controls, theme, archive, menu, anchors, contacts and submit have verified behavior.
- R-27 PASS: inline field errors, sending/disabled state, success and preserved-input failure state exercised through intercepted EmailJS.
- R-28 PASS: no filler FAQ.
- R-32 PASS: keyboard tab selection, native modal, Escape, focus restoration and authored focus outlines checked.
- R-33 PASS: implementation is authored in source HTML/CSS/JS; no external source rewriting script.
- R-34 PASS: both complete palettes exercised at five widths.
- R-35 PASS: production build, built Worker browser interaction report and screenshot review recorded above.
- R-36 PASS: no fabricated security, customer or compliance claims added.
- R-37 PASS: explicit approved direction, Design Read and 2/3/2 dials precede production work.
- R-38 PASS: biography, contacts and project details reuse Jack's actual portfolio content; SupplyTrace report capture is labeled as an example in its alt text.

### Purpose gate

- R-01 PASS: sage/peach plane gives glass an underlying material to reveal; no decorative glow.
- R-04 PASS: authored logo and a moon outline for the theme action; no decorative icon collection.
- R-06 PASS: Bricolage supplies expressive interface letterforms; Newsreader provides whole editorial display lines. Local licensed font files are included.
- R-07 PASS: no decorative grid or dot background.
- R-08 PASS: no repeated decorative arrows.
- R-09 PASS: no marketing badges.
- R-10 PASS: frosted material limited to navigation and the selected-project viewer.
- R-12 PASS: shadows identify those overlapping planes; reading sections remain flat.
- R-13 PASS: no component glow.
- R-14 PASS: one operated viewer and a compact archive replace repeated generic cards.
- R-19 PASS: one coordinated introduction, user-driven changes and restrained desktop depth follow MOTION 2; reduce preference is respected.
- R-22 PASS: imagery demonstrates actual projects; no unrelated illustrations.

### Liveliness

- Dials PASS: ENERGY 2 / RHYTHM 3 / MOTION 2 match quiet surfaces, varied composition and working transitions.
- Focal point PASS: type-led opening, selected product and contact statement each have a distinct reading focus.
- Whitespace PASS: section pauses separate introduction, operated project, biography, compact archive and enquiry.
- Accent PASS: clay identifies actions; sage/peach stay behind media.
- Motif PASS: sans/serif voice repeats in whole editorial statements and case titles.
- Design Read PASS: audience and visual intent were recorded before the approved concept was built.

### Craftsmanship and consistency

- C-1 PASS: type, palette, spacing, imagery and material roles have written reasons.
- C-2 PASS: every authored control has a verified destination or state change.
- C-3 PASS: selected work, biography, archive and contact serve actual portfolio content.
- C-4 PASS: both themes, five widths, reduced motion, form failure and keyboard/dialog behavior pass; browser/device limits are recorded separately.
- C-5 PASS: no fictional clients, testimonials or impact metrics.
- R-05 PASS: typographic opening, operated viewer, offset biography, index and enquiry have different content-driven compositions.
- R-11 PASS: round controls, gently rounded media, rectangular inputs and plain archive rows use different geometry.
- R-15 PASS: actions identify work, project inspection, source, enquiry, navigation or message delivery.
- R-16 PASS: no AI marketing slogans added.
- R-20 PASS: real project interfaces, Jack's voice, Vientiane identity and authored mark carry the page.
- R-21 PASS: warm light default and an exercised full dark alternative follow the approved design.
- R-29 PASS: ivory/ink neutrals and clay action color; sage/peach have one supporting material role.
- R-30 PASS: original composition interprets the requested references without copying a company's page.
- R-31 PASS: major visual choices are justified in the approved proposal and this gate.

## Limits

No physical-device, Safari or Firefox run. Email delivery was intercepted rather than sent. Selection/drag restrictions affect ordinary UI gestures; public browser assets remain retrievable. Analytics receipt and Search Console verification are unverified; see `docs/seo-research.md` and `limits.md`.
