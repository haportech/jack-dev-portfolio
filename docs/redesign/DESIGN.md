# Design System: Jack Portfolio study

Project: existing Vite portfolio. Status: D. Quiet Glass approved and implemented; A/B/C retained as historical studies. Source: local portfolio inspection and linked 21st references, not a Stitch project.

## A. Product Studio

Reading this as a developer portfolio for freelance clients, with a clear product studio visual language. Energy 2 / Rhythm 2 / Motion 1.

### Visual theme and atmosphere

Quiet confidence, product screenshots, moderate density, and a direct contact path. The work is the memorable visual element.

### Color palette and roles

| Name | Hex | Role / reason |
| --- | --- | --- |
| Cool paper | `#F1F6F9` | Light canvas keeps a screenshot-heavy page easy to read |
| Deep teal | `#193E49` | Headings and primary actions connect interface work to a calm studio identity |
| Slate | `#4C646E` | Secondary copy remains readable without competing with project titles |
| Mist | `#D7E4EB` | Media support distinguishes the product interface from portfolio chrome |
| White | `#FFFFFF` | Work rows and contrast on primary actions |

### Typography rules

Archivo at 400–600. Large plain-language headings create hierarchy without repeating the existing giant name treatment. Body copy stays near 60 characters per line. Sentence case; no decorative tracked labels.

### Component styling

Buttons: 5 px corners and solid teal, for an unmistakable action. Media: 6–12 px corners distinguish screenshots from document content. Project rows: lightly divided, not individually boxed, so the three featured products remain a coherent set. Form: visible labels, solid field borders, inline errors, and preserved status feedback.

### Layout principles

Split hero and project screenshot on desktop, one column on mobile. Selected work comes before biography. Use 24–48 px internal gaps and larger section separation to distinguish reading levels. No pinned scrolling.

## B. Engineering Index

Reading this as a developer portfolio for technical reviewers, with an index and project inspection visual language. Energy 1 / Rhythm 2 / Motion 1.

### Visual theme and atmosphere

Compact, inspectable, task focused. A permanent desktop rail makes the archive and source links easy to reach.

### Color palette and roles

| Name | Hex | Role / reason |
| --- | --- | --- |
| Ink blue | `#152641` | An alternate inspection surface separates this direction from the current light folio |
| Panel blue | `#203856` | One featured project has useful grouping without giving every row a card |
| Light slate | `#EEF4FC` | Main text contrast |
| Soft slate | `#B8C9E1` | Secondary descriptions and metadata contrast |
| Warm link | `#F9D67A` | Marks the live/source actions to inspect a project |

### Typography rules

Space Grotesk at 400–500. Its compact headings and legible short labels suit an index of tools and systems; no fake terminal or code display is introduced.

### Component styling

Project rows: compact, explicit links, clear focus/hover surface. Featured media panel: 8 px radius to group an image and inspection links. Navigation: text links with 44 px targets. In the final design, expansion controls, if selected, use actual buttons with state and keyboard behavior.

### Layout principles

235 px desktop rail, flexible main content, single-column mobile flow. Preserve headings, project descriptions, and live/source links at all sizes. Dark presentation is a direction to choose, not a claim that the current site needs dark mode. Theme switching is outside this static study.

## C. Field Notes

Reading this as a personal developer portfolio for clients who value visual craft, with a project publication visual language. Energy 3 / Rhythm 3 / Motion 2.

### Visual theme and atmosphere

Expressive project titles, wide imagery, and alternating story composition. Vangdy's existing photography provides a concrete starting point rather than invented artwork.

### Color palette and roles

| Name | Hex | Role / reason |
| --- | --- | --- |
| Lavender paper | `#F4F0F6` | Gives the dark project screenshots a distinct, light frame |
| Deep plum | `#46204D` | Display text and actions provide a strong editorial voice |
| Muted plum | `#705676` | Descriptions retain contrast and a clear hierarchy |
| Pale orchid | `#E5D9E9` | Unifies photography and project narration in one composition |
| White | `#FFFFFF` | Text on primary actions |

### Typography rules

Instrument Serif for display, DM Sans for navigation and body. The serif is used for whole titles rather than isolated italic accent words. Keep body text small enough to support imagery but at least 14–16 px.

### Component styling

Wide image/story compositions use squared edges like a published project sheet. Buttons remain simple solid blocks; external links say which project opens. Keep public project photography and interface captures unaltered.

### Layout principles

Offset title/copy on desktop, stacked on mobile. Alternate the image/story proportions between the three case studies in a full implementation. Spacing opens around the title and tightens around project facts. Proposed motion is confined to image presentation; static reduced-motion content remains complete.

## D. Quiet Glass (revised brief)

The revised material and motion requirements supersede the earlier A/B/C recommendation. Jack selected this direction for production. Detailed plan: `quiet-glass-plan.md`; rationale and references: `quiet-glass-proposal.md`; production evidence: `../production-verification.md`.

Reading this as a client-facing personal developer portfolio, with warm editorial typography and an interactive glass project stage. Energy 2 / Rhythm 3 / Motion 2.

- Atmosphere: warm, transparent, tactile, responsive to the visitor's actions.
- Palette: ivory `#F4F2ED`, ink `#242723`, secondary ink `#596057`, clay `#9E4933`, sage `#D9E3D5`, and peach `#E9D8CB`. Sage/peach form one supporting media plane; clay remains the action accent.
- Dark palette: canvas `#191C1A`, ink `#F1F0E8`, secondary `#B4BCB0`, action `#E6A187`, glass `rgba(43,48,44,.79)`.
- Typography: Bricolage Grotesque for interface and sans statements; Newsreader for whole editorial lines and story titles. Distinctiveness comes from the actual letterforms, not forced spacing or decorative all-caps labels.
- Controls: floating rounded navigation and one glass project viewer; other content remains on a stable reading surface. A sliding project selector communicates changed selection.
- Motion: one coordinated introduction, project transitions, native dialog reveal, and small desktop scroll depth. Production uses fresh screenshots; videos were archived outside the site at Jack's request.
- Composition: centered type opening, interactive project stage, offset biography, expandable index, editorial contact close.
- Layout: fluid at 320 px and up, with native scrolling. Media remains inspectable on touch, all core controls work with a keyboard, and reduced-motion/transparency alternatives are defined.

## Shared constraints

- Use the existing stack, data, screenshots, project links, and contact integration.
- Do not invent testimonials, clients, statistics, personal photography, or performance claims.
- One clear focal point per composition, readable text contrast, visible keyboard focus, and comfortable tap targets.
- Native scroll, mobile reflow, and complete readable content without animation.
- The comparison board remains a historical study. Production interaction, form states, full archive and responsive checks are recorded in `../production-verification.md`.
