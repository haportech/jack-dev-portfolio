# Proposal verification

Date: 2026-10-20. Scope: the static comparison board and recoverable current-site snapshot. This report does not certify an unimplemented production redesign.

## Evidence

- Source archive: 25 application files compared byte for byte with the checkout; zero changes. macOS AppleDouble resource-fork entries excluded from the comparison.
- Source SHA-256: `bbaaf743a858e6c9d53614081cffc7469ac755f8adf05c00c503aacc7e2bb287`.
- Git bundle: `git bundle verify` returned success; history SHA-256 `6964de62f5194c95e4feb4f41d70f6385e5bfebf8bd286b64f60ff44060e3fd6`.
- Baseline HEAD: `41dfc5fccf7863e6fdf071e1ef5ab5d160c3e5a9`; `git diff --stat` empty after the work.
- `npm run build` passed, Vite 8.0.16. Proposal files are separate from Vite's production entry and are viewed through the local dev server.
- Board tested at 1440, 1024, 768, 390, and 320 px. Document scroll width equaled viewport width at every size; all three frames also fit.
- All six project images loaded. Six desktop/mobile frame screenshots saved in `previews/` and visually reviewed. Board navigation was hidden for the screenshots so it did not obscure the concept frames.
- All 33 links reached in DOM order with Tab. All 33 activated with Enter while destination navigation was intercepted to avoid opening mail apps/external tabs. Zero missing in-page anchor targets. This checks activation and target wiring, not the availability of every external project.
- Local proposal and original-site links returned HTTP 200. 21st reference pages for Portfolio Showcase Grid, Project Showcase, and Editorial Hero were opened through web browsing; Motion's scroll-fade page was also opened.
- Reduced-motion emulation produced `scroll-behavior: auto`. The skip link receives visible focus. The mobile B-direction anchor lands below the board navigation.
- Fresh board run: zero JavaScript page errors and zero console errors. An earlier missing-favicon request was fixed with an empty data favicon.
- Existing-site spot checks: menu expanded then closed on navigation; capability tab click and ArrowRight selection worked; empty contact submission marked three invalid fields. No enquiry sent.
- Palette calculations using WCAG relative luminance: sixteen body-text/action combinations passed 4.5:1. Lowest tested ratio: muted plum on pale orchid, 4.70:1. Embedded screenshot pixels were not treated as newly authored UI text.

## Anti-slop delivery gate

All PASS statuses below apply to the proposal scope, with inapplicable product states identified explicitly.

### Hard gate

- R-02 PASS: board copy uses ordinary punctuation; no em dash in authored visible text.
- R-03 PASS: five measured viewport widths and six visually reviewed screenshots show no document or frame overflow.
- R-17 PASS: no new statistics; project facts come from the existing source data and screenshot assets.
- R-18 PASS: no testimonials or invented endorsements.
- R-23 PASS: existing project imagery only; no invented personal photo, logo, client, or brand asset.
- R-24 PASS: every local fragment resolves to an element; navigation remains real links.
- R-25 PASS: sixteen authored foreground/background combinations meet 4.5:1; minimum 4.70:1.
- R-26 PASS: all 33 links activate and have concrete destinations; no dummy buttons or forms.
- R-27 PASS: no stateful or asynchronous application controls in this static board; production form states remain explicitly future work.
- R-28 PASS: no filler FAQ.
- R-32 PASS: all 33 links appear in sequential Tab order and activate with Enter; visible focus is present.
- R-33 PASS: HTML/CSS authored directly in source through a patch; no external source-rewriting script.
- R-34 PASS: each concept is a declared fixed palette with no theme toggle; no untested alternate theme advertised.
- R-35 PASS: board run in a real browser; six screenshots reviewed; links exercised; current production build passed. Intercepted external navigation is disclosed above.
- R-36 PASS: no new security, compliance, performance, or customer claims.
- R-37 PASS: three named directions explicitly proposed for selection, with Design Reads and dials recorded in `DESIGN.md`.
- R-38 PASS: names, project images, public links, and contact details come from the existing portfolio.

### Purpose gate

- R-01 PASS: no decorative gradient or glow.
- R-04 PASS: no new icon set or decorative generic icons.
- R-06 PASS: Archivo, Space Grotesk, and Instrument Serif/DM Sans each have written role and audience reasons in `DESIGN.md`.
- R-07 PASS: no decorative page grid or dot pattern.
- R-08 PASS: no repeated decorative arrows.
- R-09 PASS: no capsule marketing badges.
- R-10 PASS: no glass treatment.
- R-12 PASS: no large component shadows.
- R-13 PASS: no component glow.
- R-14 PASS: image rows, an inspection panel/index, and an editorial image/story composition serve different content jobs.
- R-19 PASS: static concept previews are labeled; proposed motion is described separately and does not claim to be running.
- R-22 PASS: no unrelated stock illustration.

### Liveliness

- Dials PASS: A 2/2/1, B 1/2/1, C 3/3/2 declared for the proposed full directions; C's motion remains a specification.
- Consistency PASS: A uses moderate studio hierarchy; B uses a compact rail/index; C uses offset display type and image/story composition.
- Focal point PASS: A product screenshot/statement, B featured inspection, C editorial title/project image.
- Whitespace PASS: spacing separates hero from work in A, rail from main in B, title from story in C.
- Accent PASS: A uses teal actions, B warm inspection links, C plum actions; screenshot colors remain source content.
- Identity motif PASS: product frames in A, inspection rows in B, whole serif titles in C.
- Design Read PASS: audience, visual language, and dials are recorded for each concept in `DESIGN.md`.

### Craftsmanship and quality locks

- C-1 PASS: palette, type, media grouping, and layout reasons are documented per direction.
- C-2 PASS: no inactive controls; real destination links only.
- C-3 PASS: every preview section contains real project evidence or decision support for Jack.
- C-4 PASS: checked five widths, keyboard access, and reduced motion; complete production-state verification is not claimed.
- C-5 PASS: no new invented metrics or testimonials.
- R-05 PASS: three composition and navigation models; no repeated capability-card template.
- R-11 PASS: buttons/media/rows have deliberate differences; no universal pill treatment.
- R-15 PASS: actions identify work, source, contact, or the named project.
- R-16 PASS: no generic marketing superlatives in authored preview copy.
- R-20 PASS: Jack's existing finance, security, and hospitality work determines the content and imagery.
- R-21 PASS: B's dark inspection surface is an explicitly selectable direction, not a forced production decision.
- R-29 PASS: each concept uses a small coordinated palette; screenshot colors are original content.
- R-30 PASS: named references inform specific layout ideas; previews use Jack's real content and a separately documented composition.
- R-31 PASS: major decisions and their reasons are in `DESIGN.md`.

## Outstanding by design

Choose a direction before production implementation. Full case-study content, all fifteen archive entries, the production contact form, final animations, public deployment, external project availability, a full accessibility audit, and message delivery are not certified by these concept checks.
