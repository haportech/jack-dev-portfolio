# D. Quiet Glass: design plan

Request: a new proposal with expressive typography, glassmorphism, transparent modern surfaces, and meaningful animation. Preference order: Apple, OpenAI, Anthropic. "Topography" is interpreted as typography because Jack explicitly requests unique fonts.

Reading this as a personal developer portfolio for clients assessing end-to-end work, with warm editorial typography and a transparent interactive project stage. Energy 2 / Rhythm 3 / Motion 2.

## Design contract

- Apple influence: floating frosted navigation, a segmented work selector, edge highlights, and responsive transitions. Glass is a material for controls and the project viewer, with solid text surfaces underneath.
- OpenAI influence: generous negative space, plain language, strong type scale, and content that is easy to inspect.
- Anthropic influence: a warm ivory reading canvas, Newsreader for editorial display text, and a restrained clay action accent.
- Personal identity: Bricolage Grotesque provides a distinctive, slightly irregular sans voice; actual finance, security, and hospitality products supply the visuals.
- Keep Vite, vanilla JavaScript, the installed free Motion package, existing portfolio data, project media, and links. No React migration or new dependency.

## Palette and geometry

| Token | Value | Reason |
| --- | --- | --- |
| Canvas | `#F4F2ED` | Warm reading surface, explicitly aligned with the requested Anthropic influence |
| Ink | `#242723` | Strong text contrast on light material |
| Muted ink | `#596057` | Secondary descriptions without excessive faint text |
| Clay | `#9E4933` | A single action accent connecting the warm palette to contact intent |
| Glass | `rgba(255,255,255,.68)` | Lets underlying content show through while blur and backing preserve legibility |
| Sage | `#D9E3D5` | A quiet rear plane makes the glass edges visible around real product media |

Use rounded glass controls for physical affordance, softer 26 px project media, simple inline links for secondary actions. Shadows express overlapping planes only. No moving decorative orb or full-page blur.

## Composition

```text
       floating glass navigation / working light-dark toggle
             sans statement / editorial serif line
            short introduction / work and contact actions
       frosted project stage / switch among 3 real projects
                   image / video / case detail
       editorial about statement / compact project archive
                  direct contact / reference links
```

The stage is the focal point. Unlike A/B/C, visitors can change the project, play the existing demo, open case details, and switch theme. Animation responds to those actions, with a short introductory sequence and subtle desktop media parallax to establish depth.

## Motion and accessibility

Use the installed `motion` APIs documented for vanilla JavaScript. Animate transforms and opacity, not blur, shadows, or layout dimensions. Project content remains fully readable without movement. Respect reduced motion, coarse pointers, touch, keyboard tabs, Escape, native dialog focus management, and lower-transparency fallback. No automatic carousel rotation or autoplay video.

## Scope

Create `quiet-glass.html`, its stylesheet and JavaScript beside the prior proposal. Reuse featured project and archive data. Include working project selection, theme toggle, click-to-play video, native case-study dialog, archive expansion, and direct contact links. Keep production UI files unchanged. Verify both themes, mobile/desktop reflow, rapid selection, keyboard focus, reduced motion, media controls, and browser errors.

## Plan review

The ivory/serif/clay combination follows Jack's explicit Anthropic preference; it is not an assumed default. The glass control layer follows the explicit Apple preference. Real project interactions replace the previous static study, while the content stays focused on Jack's existing work. Do not copy company wordmarks or promise Apple's native refraction in a CSS preview.
