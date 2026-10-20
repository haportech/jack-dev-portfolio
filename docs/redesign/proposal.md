# Portfolio redesign proposal

Status: three concept directions, awaiting Jack's selection. Date: 2026-10-20.

Update: Jack's revised material, typography, and interaction requirements supersede this recommendation. See [D. Quiet Glass](quiet-glass-proposal.md) and its [interactive prototype](http://127.0.0.1:3000/docs/redesign/quiet-glass.html). A/B/C remain comparison studies.

[Open the comparison board](http://127.0.0.1:3000/docs/redesign/index.html).

Saved previews: A [desktop](previews/studio-desktop.png) / [mobile](previews/studio-mobile.png); B [desktop](previews/engineering-desktop.png) / [mobile](previews/engineering-mobile.png); C [desktop](previews/editorial-desktop.png) / [mobile](previews/editorial-mobile.png).

## Recommendation

Choose **A. Product Studio** if the main audience is prospective freelance clients. It puts real work in the first screen, communicates end-to-end ownership, and makes contacting Jack straightforward. This audience is a proposal based on the current freelance availability and project-enquiry CTA; it is not a confirmed business requirement.

Choose **B. Engineering Index** for technical collaborators or hiring reviewers who want to scan a broad project history and inspect implementation. Choose **C. Field Notes** for a more expressive personal brand built around project stories and photography.

## Snapshot

Recoverable snapshot: `/Users/jack/Documents/Coding/jack-dev-portfolio-snapshots/2026-10-20-pre-redesign/`.

It contains the source archive, all-ref Git bundle, desktop screenshot, mobile screenshot, hashes, and restore instructions. Dependencies and generated output can be rebuilt with `npm ci` and `npm run build`.

## Existing website

- Stack: Vite 8, vanilla JavaScript/CSS, Motion 13, EmailJS, Cloudflare Workers Static Assets. Retain this stack for any of the directions.
- Content: three featured projects, fifteen archive entries, four capability groups, biography, principles, contact form and direct contact links.
- Hero: oversized JACK/DEV lettering, GitHub mark, blue orbital lines, availability, location, and experience date. The GitHub mark dominates the opening screen despite being a third-party identity asset rather than Jack's work.
- Sequence: hero, ticker, about, selected work, archive, capabilities, principles, contact. Visitors must pass the introduction before reaching the products.
- Featured desktop scenes reserve 230 viewport heights each. The desktop page measured 19,958 CSS pixels at 1440 × 1000; mobile measured 16,286 at 390 × 844. These are viewport-specific observations, not performance scores.
- Archive: scroll-linked horizontal track on desktop, long vertical list on mobile. It showcases breadth but makes quickly comparing projects harder.
- Existing accessibility foundations include a skip link, responsive menu, capability tabs, reduced-motion handling, form labels, field errors, and live form status. Preserve and verify these in the eventual redesign.

## Direction comparison

| | A. Product Studio | B. Engineering Index | C. Field Notes |
| --- | --- | --- | --- |
| Primary job | Help a client assess and enquire | Help a technical reader inspect breadth | Build a memorable personal presence |
| First screen | Value statement and actual product screenshot | Short introduction, navigation rail, security project | Editorial headline and hospitality imagery |
| Navigation | Small horizontal header | Desktop side rail; mobile header | Small horizontal header |
| Work | Three substantial vertical case studies | Featured case plus compact project index | Alternating large image/story compositions |
| Archive | Compact list after the featured work | Compact project index | Short list after the stories |
| Density | Moderate | Compact | Spacious |
| Motion | User-triggered feedback and one initial reveal | Panel/selection feedback only | Image reveals and optional restrained desktop parallax |
| Tradeoff | Less theatrical; stronger work discovery | Less visual drama; stronger technical scanning | More art direction and image care; slower scanning |

The local previews show above-the-fold hierarchy plus a representative work treatment. They are not complete production sites. They share actual project names, images, contact details, working links, keyboard access, and responsive layout. No fabricated clients, quotes, outcome measurements, or profile photography are included.

## Proposed content and behavior changes

1. Replace the large GitHub mark with existing project screenshots. Keep GitHub as a useful external link.
2. Move selected work directly after the hero. Put the biography after the projects.
3. Give each featured project a consistent factual story: problem, Jack's role, implementation, outcome already stated in the portfolio, screenshot or optional video, and live/source links. Do not invent numerical impact.
4. Replace the long horizontal archive traversal with a scannable list. Retain every project and existing link; entries without public links remain text.
5. Turn capabilities into short, readable groups. Remove the need to switch tabs merely to discover the full skill set, unless Jack prefers the current interaction.
6. Integrate the useful principles into the biography or case-study descriptions to shorten the page without discarding their meaning.
7. Keep direct email, GitHub, Telegram, and the existing enquiry form. Preserve pending, error, and success states; verify message delivery separately with explicit authorization.
8. Use native scrolling throughout. A and B remove pinned project scenes. C may use image movement on larger screens while keeping all text in normal flow.

## Motion plan

Use the installed free `motion` package. No new animation library or paid Motion+ component is needed.

- A: one 350–450 ms first-screen reveal; small image/selection feedback when activated. The work remains visible without animation.
- B: 150–200 ms selection and expansion transitions where the eventual UI has such controls. Do not move the whole page while scanning.
- C: one 500–650 ms opening reveal; image movement limited to 16–24 px on large screens. Use the [Motion scroll-fade example](https://examples.motion.dev/js/scroll-fade) as a visual reference, not a requirement to fade readable text away.
- All directions: transform/opacity where animation is needed; respect `prefers-reduced-motion`, touch interaction, keyboard focus, and interrupted transitions. Avoid scroll interception, loading intros, custom cursors, physics badges, autoplay carousels, and continuously moving decoration.

The concept board deliberately uses static layouts and native anchor navigation. It previews composition; the motion plan above remains unimplemented.

## Visual reference links

| Reference | What to look at | Proposed use |
| --- | --- | --- |
| [21st Portfolio Showcase Grid](https://21st.dev/@uiable/components/block-portfolio-9) | Project screenshots, title/summary hierarchy, varied image sizes | A's emphasis on real products; adapted to rows rather than copied as a grid |
| [21st Project Showcase](https://21st.dev/@jatin-yadav05/components/project-showcase) | Compact project index and image preview | B's project browsing; all content must also work without hover |
| [21st Editorial Hero](https://21st.dev/@felipemenezes098/components/hero-05) | Asymmetric title/copy arrangement and wide visual | C's opening composition |
| [21st Editorial Collage Hero](https://21st.dev/@felipemenezes098/components/hero-04) | Paired project images and depth | Optional alternate visual treatment for A; no extra decorative assets |
| [Motion scroll fade](https://examples.motion.dev/js/scroll-fade) | Scroll-linked image opacity | C's optional image treatment |
| [Motion parallax](https://examples.motion.dev/js/parallax) | Relative movement between image layers | C only, restrained and disabled for reduced motion |

These are reference designs, not a promise to reproduce their exact effects. The 21st catalog primarily supplies React components; this portfolio remains vanilla JavaScript. No React migration is needed to adapt a layout idea.

## Skills selected

- **21st UI Explore and catalog:** researched multiple compositions, then made three previews that differ in hierarchy, navigation, density, and emphasis.
- **UI UX Pro Max:** ran `developer portfolio project showcase --design-system`, `editorial portfolio --domain typography`, and `prefers reduced motion --domain ux`. Retained applicable contrast, portfolio typography, and static reading-order guidance. Its suggested brutalist presentation is an option, not a mandate; the previews use deliberately different compositions.
- **Motion:** inspected the installed package version and searched current vanilla JavaScript examples. Proposed free-package motion, with reduced-motion behavior.
- **frontend-design:** grounded every layout in existing products; avoided generic capability cards and ornamental hero assets.
- **design-md:** used its atmosphere, palette roles, typography, component, and layout document structure in `DESIGN.md`. No Stitch extraction is claimed because no Stitch project/server was provided.
- **Anti-slop core, UI, human, and layoutmobile:** checked content honesty, useful controls, keyboard focus, mobile reflow, contrast, and motion restraint.
- **Brainstorming, megacave, lean-orchestrator, ponytail:** kept this stage focused on inspection, recoverability, evidence, and a reviewable proposal.

The available skill catalog was reviewed. UI build/generation, Sites, image generation, video production, and design publishing were not needed for this proposal. Existing screenshots provide the most relevant visual evidence.

## Implementation boundary after selection

Expected production files: `index.html`, `src/style.css`, `src/main.js`, and `src/effects/kinetic-reel.js`. Reuse `featuredProjects`, `projectArchive`, and `capabilityGroups` from `src/data/portfolio.js`; only alter content there if Jack requests it. Reuse `public/media/` assets and the existing contact integration.

Verify the selected implementation with the production build; desktop/tablet/mobile layouts; the menu; every project/contact link; capabilities or their replacement; form validation and feedback; keyboard navigation; reduced motion; and browser console/network errors. A preview alone cannot establish those production checks.

## Review gate

See `verification.md` for the actual proposal checks and their evidence. The production redesign remains unimplemented until a direction is selected.
