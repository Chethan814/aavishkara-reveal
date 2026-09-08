# Aavishkara Reveal — Guidelines

## Components

The design system exports these components — import them from `@ws-6zle45nks2j2ub6tpslk/bf19f7c8-b9d4-4a16-a2d0-5f4038d5d389` and compose them before building anything from scratch:

`Ambience`, `BootSequence`, `CaseStudyDeck`, `CaseStudyPanel`, `CustomCursor`, `MagneticButton`, `PortalTransition`, `ScrollProgress`, `SectionDivider`, `SmoothScroll`, `SoundToggle`, `SparkBurst`, `Sponsors`, `Typewriter`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-6zle45nks2j2ub6tpslk/bf19f7c8-b9d4-4a16-a2d0-5f4038d5d389/styles.css` (source — preferred import)
- `@ws-6zle45nks2j2ub6tpslk/bf19f7c8-b9d4-4a16-a2d0-5f4038d5d389/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

