# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## Critical Requirements

### 1. UI Components — shadcn/ui First (HIGHEST PRIORITY)

Before implementing any UI component:

1. Check if shadcn/ui has a suitable primitive for the task
2. If yes — install and extend it via `className` and `cva` variants,
   never rewrite its internals
3. If no suitable shadcn/ui component exists — implement a custom
   component following the same patterns and conventions
4. When choosing between approaches, always prefer the one with better
   accessibility and Web Vitals characteristics

### 2. Visual Fidelity (HIGHEST PRIORITY)

- UI must be **pixel-accurate** — match Figma designs exactly
- Before implementing any UI — inspect spacing, typography, colors,
  border radius, and states in Figma via MCP
- Never approximate visual details
- No layout hacks or magic pixel values — use Grid, Flexbox, `clamp()`
- No `box-shadow` — use backdrop blur effects only (per design tokens)

### 3. Core Web Vitals (HIGHEST PRIORITY)

- **LCP** < 2.5s — preload hero images, use `next/image` with `priority`
  for above-the-fold assets
- **CLS** < 0.1 — always define explicit `width`/`height` on all images
  and embeds; never load content that causes layout shift
- **INP** < 200ms — avoid long tasks on main thread; defer non-critical JS
- Use `next/image` for all images without exception
- Lazy-load below-the-fold images; eager-load above-the-fold
- Minimize render-blocking resources
- Mentally run a Lighthouse audit before marking any page task complete

### 4. SEO (HIGHEST PRIORITY)

- Semantic HTML5 throughout: `<main>`, `<article>`, `<section>`,
  `<nav>`, `<header>`, `<footer>`, `<aside>`
- Every page requires via Next.js `metadata` export:
  - Unique `<title>` and `<meta name="description">`
  - Canonical URLs
  - Open Graph and Twitter Card tags
  - `hreflang` alternate links for all locales (next-intl)
- All images must have descriptive, keyword-rich `alt` attributes
- URLs must be human-readable and keyword-rich
- Use `next/link` for all internal navigation (no `<a>` tags)
