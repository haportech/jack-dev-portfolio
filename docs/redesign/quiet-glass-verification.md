# Quiet Glass verification

Date: 2026-10-20. Scope: the interactive proposal at `docs/redesign/quiet-glass.html`. Production implementation and deployment are not claimed.

## Checks run

- Reusable browser integration check: `quiet-glass.check.js`, executed through Playwright's file runner. Final result: PASS.
- Both light and dark themes fit 1440, 1024, 768, 390, and 320 px. At all ten combinations the document scroll width equals the viewport width.
- Three featured project controls render; repeated rapid changes leave one exposed panel with the right selected state. ArrowLeft wraps and Home returns to the first project.
- All three actual local demo videos play after a user click. Screenshot controls pause playback. Selecting another project pauses the previous video.
- Network-aborted video request restores the screenshot and displays the media error state. No JavaScript errors in this deliberately failed-media check.
- Case study content changes with the selected project. Close and Escape work. Escape restores focus to the opener. The native modal makes background controls unfocusable while permitting focus to browser chrome.
- The archive expansion reveals all fifteen original archive entries. Entries without public links remain text rather than dead actions.
- Reduced-motion initial load has zero running animations and native instant anchor scroll. Changing the preference during a running session also stops movement.
- All project screenshots loaded. Bricolage Grotesque and Newsreader loaded successfully. Computed navigation material is `blur(24px) saturate(1.3)`.
- Fresh final browser run: zero console errors and zero missing internal fragment targets.
- Screenshots saved for light desktop, dark desktop, mobile, opening viewport, and an open case study. Full-page light/dark/mobile views and the updated opening were visually reviewed.
- Eleven contrast pairs calculated with WCAG relative luminance, including conservative glass overlays over black/white content. Minimum tested ratio is 5.43:1. This is a targeted palette check, not a full accessibility audit of the original embedded screenshot pixels.
- Original production build: `npm run build` passed. This checks the unchanged production entry; the proposal's JavaScript is covered by the browser integration check.
- All 25 application files in the original snapshot still match the checkout byte for byte. No production source edits or new dependencies.

## Implementation refinements

- The first selector version measured its highlight in JavaScript. A resize assertion exposed transient stale dimensions; a later settled inspection did not reproduce lasting overflow. The final version uses responsive CSS geometry, removing the observer and width synchronization. The complete ten-layout check then passed.
- A strict test assumed focus could never move to browser chrome from a native modal. Browser state showed a real modal with body as the active element at that boundary. The corrected check verifies the useful guarantee: background page controls cannot receive focus. No custom focus-trap code was added.

## Design delivery gate

### Hard gate

- R-02 PASS: authored visible preview copy has no em dash.
- R-03 PASS: ten theme/viewport combinations measured without horizontal overflow.
- R-17 PASS: project scope/date facts come from existing portfolio data; no invented statistics.
- R-18 PASS: no testimonials.
- R-23 PASS: existing project images/videos and Jack's name; no invented personal photo or client assets.
- R-24 PASS: internal navigation targets exist and public links reuse source data or researched references.
- R-25 PASS: eleven authored text/action palette combinations pass 4.5:1, including conservative glass backgrounds.
- R-26 PASS: project tabs, video controls, theme control, case dialog, archive expansion, and navigation have actual behavior.
- R-27 PASS: native video controls provide playback/loading behavior; a forced network failure verifies the visible screenshot/error fallback.
- R-28 PASS: no filler FAQ.
- R-32 PASS: visible focus, keyboard project navigation, native modal behavior, Escape dismissal, and focus restoration checked.
- R-33 PASS: HTML, CSS, and JavaScript authored directly in source; no external rewriting script.
- R-34 PASS: complete light/dark palettes exercised at five widths each.
- R-35 PASS: actual browser run, repeatable interactive checks, screenshot review, and production baseline build recorded above.
- R-36 PASS: no new compliance, performance, customer, or security claims.
- R-37 PASS: explicit user direction, Design Read, and 2/3/2 dials in the plan.
- R-38 PASS: factual content reuses real portfolio projects, media, links, and contact details.

### Purpose gate

- R-01 PASS: sage/peach rear plane exists to reveal glass edges; no decorative glowing layers.
- R-04 PASS: one moon outline communicates the theme control; no generic decorative icon set.
- R-06 PASS: font roles and reasons are documented; no unnecessary monospace or tracked all-caps labels.
- R-07 PASS: no decorative background grid or dots.
- R-08 PASS: no repeated decorative arrows.
- R-09 PASS: no marketing badges.
- R-10 PASS: glass limited to floating navigation and project viewer, matching the explicit brief.
- R-12 PASS: shadows distinguish overlapping material planes; archive/body sections remain flat.
- R-13 PASS: no component glow.
- R-14 PASS: one operated project stage rather than repeated capability cards.
- R-19 PASS: a single introductory sequence, user-driven state changes, and small scroll depth follow the declared motion dial.
- R-22 PASS: no unrelated illustration.

### Liveliness

- Dials PASS: Energy 2 / Rhythm 3 / Motion 2 declared and visible in typography, mixed compositions, and working motion.
- Focal point PASS: typographic opening leads to one operated project viewer.
- Whitespace PASS: deliberate pauses between introduction, viewer, biography, archive, and contact.
- Accent PASS: clay marks actions; supporting material colors stay behind media.
- Motif PASS: sans/serif statement pairing recurs at the opening, biography, case story, and contact.
- Design Read PASS: audience and intended visual experience recorded before implementation.

### Craftsmanship and consistency

- C-1 PASS: type, palette, material, spacing, and layout choices have written reasons.
- C-2 PASS: every authored control has a real state change or destination.
- C-3 PASS: project evidence, biography, full archive, and direct contact serve the existing portfolio.
- C-4 PASS: both themes, five sizes, reduced motion, video failure, and keyboard/modal behavior checked. Other browsers/devices remain unverified.
- C-5 PASS: no invented impact metrics, clients, or testimonials.
- R-05 PASS: type opening, project viewer, offset biography, compact index, and editorial close have distinct content roles.
- R-11 PASS: round controls, rounded media, and plain index rows use different geometry for different jobs.
- R-15 PASS: actions name work, project details, playback, theme, or contact intent.
- R-16 PASS: authored copy explains the work without generic technology superlatives.
- R-20 PASS: actual finance, security, and hospitality products anchor the identity.
- R-21 PASS: working light/dark choice included.
- R-29 PASS: warm neutral base and one clay action accent; sage/peach are confined to a supporting material plane.
- R-30 PASS: Apple/OpenAI/Anthropic are explicitly requested references; company logos and proprietary typefaces are not copied.
- R-31 PASS: major decisions are explained in the plan and proposal.

## Remaining limits

CSS transparency is a web interpretation of the requested material, not Apple's native optical renderer. Solid-surface fallback rules are present; unsupported-filter and reduced-transparency behavior have not been checked in separate browsers. No Safari, Firefox, physical-device battery profile, public deployment, message sending, or complete accessibility audit was performed. Theme choice resets on reload. Production contact-form integration follows selection of the direction.
