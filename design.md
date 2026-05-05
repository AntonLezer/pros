# Design System: Modern Medical Aesthetic (V2)

## 1. Visual Identity (Refined from Screenshot)
- **Concept:** "Trust & Innovation". Keep the warm, professional vibe of the medical center but elevate it to a premium digital experience.
- **Core Palette:** 
  - Base: Soft Pearl White (#F9F8F6) and Pure White for cards.
  - Primary Accent: Burnt Orange / Terracotta (#D17A39) — from the logo. Use for CTA and key highlights.
  - Secondary: Deep Navy or Charcoal for text to ensure high readability.
- **Typography:**
  - Headings: Serif or High-Contrast Sans-serif (e.g., "Cormorant Garamond" for a premium feel or "Geist Sans" for a modern tech look).
  - Body: Clean Sans-serif (Inter) with generous line-height (1.6).
- **Styling Elements:**
  - Use "Soft Shadows" instead of borders for cards (blur: 30px, opacity: 0.05).
  - Large, high-quality photography with removed backgrounds (cutouts) overlapping sections to create depth (as seen with the doctors on the hero).

## 2. Updated Layout Patterns
- **Bento-Grid Services:** Instead of simple icons, use a bento-grid for "Our Services" where key services (Implantation, Veneers) take more space and have image backgrounds.
- **Before/After Interactive:** Replace static images with a "Comparison Slider" (Framer Motion) that users can drag.
- **Modern Doctor Profiles:** Instead of small thumbnails, use large vertical cards with "Glassmorphism" overlays for their names and specialties.

## 3. Technical Constraints (Next.js + Tailwind)
- **Animations:** 
  - Smooth parallax on scroll for medical equipment images.
  - Staggered entrance for list items (Why choose us).
- **Interactivity:** 
  - Sticky "Quick Appointment" bar on mobile.
  - Floating WhatsApp/Phone button that expands on hover.

## 4. Specific Context: Medical/Stomatology
- **Tone of Voice:** Professional, calm, reassuring.
- **UX Goal:** Conversion to "Online Booking". The booking button should always be the most visible element.
- **Trust Factors:** Prominent display of "10+ years experience" and "Guarantees" using elegant, minimal icons.