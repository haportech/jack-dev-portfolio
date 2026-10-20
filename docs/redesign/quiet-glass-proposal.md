# D. Quiet Glass

An interactive portfolio direction proposed after Jack's revised brief. It combines Apple's transparent material depth, OpenAI's spacious hierarchy, and Anthropic's editorial warmth. These are design interpretations, not a claim of matching the companies' implementation or typography.

[Try the working preview](http://127.0.0.1:3000/docs/redesign/quiet-glass.html) · [Light screenshot](previews/quiet-glass-desktop.png) · [Dark screenshot](previews/quiet-glass-dark.png) · [Mobile screenshot](previews/quiet-glass-mobile.png)

## The visual idea

Warm ivory rather than pure white. Dark ink rather than low-contrast grey. Glass layers float over soft sage and peach material planes, giving transparency something to reveal. Clay marks the main actions.

**Bricolage Grotesque** gives the interface and main statements an expressive sans voice. **Newsreader** supplies the editorial display line and project-story titles. Both fonts loaded successfully in the browser. They are public font families, not copied proprietary company fonts.

Reading this as a portfolio for clients assessing end-to-end work, with a warm editorial canvas and an interactive glass project stage. Energy 2 / Rhythm 3 / Motion 2.

## What is alive in the preview

- The title and supporting text enter in one short, coordinated sequence.
- The floating navigation blurs content that passes beneath it.
- Three project controls move a selection indicator and animate the selected project into view. Arrow keys, Home, and End work too.
- Each project can play its actual local demo video, with native playback controls. Playback stops when switching projects; loading/playback failure has a visible fallback.
- Case details open in a native modal with Jack's role, scope, outcome, detailed screenshot, and real links. Escape closes it and restores focus.
- A restrained 24 px scroll range gives the project viewer depth on larger screens with fine pointers.
- The light/dark control changes the complete palette, including glass, selector, dialog, text, and buttons.
- The project archive expands to reveal all fifteen entries.

No backend is needed for these interactions. The existing Vite and Motion stack already supports them. The production contact form remains part of the future selected implementation; this preview uses direct email and public contact links.

## Brand references to look at

| Reference | Specific influence |
| --- | --- |
| [Apple: Liquid Glass introduction](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) | Translucent control layers, rounded physical affordances, content visible behind navigation |
| [Apple: Meet Liquid Glass, WWDC](https://developer.apple.com/videos/play/wwdc2025/219/) | A direct moving reference for the material and its interaction |
| [OpenAI](https://openai.com/) | Generous spacing, direct language, strong hierarchy; interpreted for a developer portfolio |
| [Anthropic](https://www.anthropic.com/) | Editorial reading character and warm neutral atmosphere; interpreted rather than copied |
| [21st Glassmorphism Navigation](https://21st.dev/@akashsingh890901-crypto/components/glassmorphism-navigation) | A browser-based reference for the floating frosted control layer |
| [21st Liquid Glass](https://21st.dev/@paceui/components/liquid-glass) | A reference for glass edge, highlight, and transparency treatment |
| [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) / [Newsreader](https://fonts.google.com/specimen/Newsreader) | The actual proposed font families |

The prototype uses CSS blur, translucent backing, and edge highlights. Apple's native optical refraction is a visual reference, not an implemented browser feature in this proposal.

## Why this differs from A/B/C

The typography sets the mood before visitors reach the projects. The viewer is an interface visitors operate, rather than a row of static thumbnails. The glass layers change appearance with the underlying content and the selected theme. Case details and videos give the movement useful content.

Only navigation and the project shell use the glass material. Body copy remains on a stable reading surface; applying blur to every section would weaken the hierarchy. The warm palette and serif combination follow Jack's explicit Anthropic preference; the transparent controls follow the explicit Apple preference.

## Implementation and limits

Files: `quiet-glass.html`, `quiet-glass.css`, `quiet-glass.js`. Data and media are reused from the production portfolio. No dependencies were added. The existing source snapshot remains intact and production UI files remain unchanged.

Reduced motion disables the entry, selection movement, and scroll parallax. Coarse-pointer/mobile layouts omit the parallax. Reduced transparency and missing-backdrop-filter support use solid surfaces. Theme selection is local to the current preview session; it is not persisted. Public hosting, a full production form, and a faithful native Liquid Glass renderer are outside this proposal.

The reusable browser check is `quiet-glass.check.js`; detailed results and the design gate are in [quiet-glass-verification.md](quiet-glass-verification.md).
