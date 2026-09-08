# Aavishkara Reveal

Build a single-page cinematic "case study reveal" website for "Aavishkara '26" — a national-level hackathon by Soundarya Institute of Management and Science, sponsored by IBM. This is a ONE-TIME viewing experience shown to students during the event to dramatically reveal the hackathon's problem statement/case study.

THEME & VISUAL STYLE

- Dark, premium, sci-fi tech aesthetic

- Background: deep black/navy (#0A0A0F) with a subtle animated particle or faint circuit-line texture (low opacity, never distracting)

- Primary accent: gold/amber (#F5B800) — headlines, key reveal moment, glowing highlights

- Secondary accent: violet/purple neon (#8B5CF6) — glows, dividers, ambient light

- Typography: bold condensed uppercase sans-serif for headlines, clean readable sans-serif for the case study body text

- Mood: cinematic, tense build-up, then a satisfying premium reveal — minimal, not cluttered

SCROLL BEHAVIOR

- Vertical scroll only, full-page smooth/inertia scrolling (use Lenis for buttery scroll feel — no default jumpy browser scroll)

- Student controls pace by scrolling down through the sequence

- Each screen should feel like a distinct "beat" — use scroll-triggered animations (GSAP ScrollTrigger or Framer Motion whileInView) so content animates in as it enters view, not all at once

- Sections can be full-viewport-height (100vh) each, so one screen = one story beat, with smooth transition into the next as the user scrolls

- Add a subtle scroll progress indicator (thin vertical line or dot on the side) so students know how far through the reveal they are

FLOW (this is a linear scroll sequence — not a normal multi-section scroll page)

1. OPENING SCREEN (100vh)

   - Full black screen, "AAVISHKARA '26" logo/wordmark fades in slowly in gold

   - Tagline "IDEATE. INNOVATE. IMPACT." types on below it

   - Small prompt at bottom: "Scroll to reveal the case study" with a gentle bouncing down-arrow

2. SPONSOR CREDIT MOMENT (100vh)

   - IBM logo fades in center-screen as it scrolls into view, clean and respectful (sponsor-credit beat, no gimmicks)

   - Text below: "Case Study Presented By"

3. BUILD-UP / SUSPENSE SCREEN (100vh)

   - Dark screen with a pulsing glow or a "locked" icon/envelope/file graphic in the center

   - Text: "The Challenge Awaits" with a subtle pulsing glow animation building tension as it enters view

4. THE REVEAL (100vh, the centerpiece animation — pick ONE strong effect)

   - Option A: a glowing file/envelope "unlocks" and opens, case study title emerges from it

   - Option B: particles assemble into the case study title text

   - Option C: a gold light sweep/wipe reveals the title from left to right

   - Case study TITLE appears large and bold in gold, with a glow pulse, triggered precisely as this section reaches center of viewport

5. CASE STUDY CONTENT (auto height, can scroll normally within this section)

   - Animation settles down here — readability is priority

   - Case study description text fades in cleanly as it scrolls into view (simple fade/slide, no distracting motion)

   - Clear typographic hierarchy: title, problem statement, constraints/requirements, evaluation focus

   - Subtle purple glow border or divider lines for premium feel without motion noise

6. CLOSING SCREEN (100vh)

   - "Now Build the Future." or similar closing line, gold text, fades in

   - Small footer: event branding, IBM + HackCulture logos, subtle fade

TECHNICAL

- Lenis for smooth inertia-based vertical scrolling across the whole page

- Framer Motion (whileInView) or GSAP ScrollTrigger for scroll-triggered section animations, smooth easing curves (easeOut/easeInOut, never linear)

- Prioritize the reveal moment (step 4) as the most polished, highest-effort animation in the whole site

- Fully responsive (will be viewed on a projector screen AND on phones)

- Keep total scroll length short — should feel complete within 2-3 minutes of scrolling

- No navigation, no other pages, no unrelated sections — this is a single focused scroll sequence

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://aavishkara-reveal.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bf19f7c8-b9d4-4a16-a2d0-5f4038d5d389).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
