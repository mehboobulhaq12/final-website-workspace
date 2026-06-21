---
version: beta
name: Effect3 AEO Scanner
description: Public AEO scanner page implemented from the Claude Design Homepage.dc.html handoff.
colors:
  canvas: "#050208"
  surface: "rgba(15,12,22,0.82)"
  surfaceRaised: "rgba(255,255,255,0.06)"
  border: "rgba(255,255,255,0.10)"
  textPrimary: "#FFFFFF"
  textMuted: "rgba(255,255,255,0.55)"
  purple: "#A78BFA"
  orange: "#F96443"
  orangeSoft: "#FBAF90"
typography:
  display:
    fontFamily: "Inter"
    fontSize: "86px"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: 0
  body:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0
rounded:
  card: "26px"
  control: "14px"
spacing:
  sectionY: "140px"
  gutter: "24px"
---

# Overview

The page reproduces the supplied Claude Design handoff as a production React route. It uses a full-screen purple WebGL shader, a slim glass announcement marquee, a centered static headline, a dark glass lead form, a full-screen orange scanning state, an animated report, an AEO education band, and an oversized Effect3 footer wordmark.

# Colors

- Canvas: near-black plum `#050208`.
- Shader: purple, indigo, and magenta noise fields.
- Action and running state: Effect3 orange `#F96443` with peach `#FBAF90`.
- Surfaces: black-plum translucent glass with restrained white borders.
- Score states: green for good, amber for average, coral for poor.

# Typography

- Inter is used throughout.
- Hero: 86px desktop, 64px tablet, 46px mobile; 700 weight.
- Result headline: 94px desktop, 68px tablet, 48px mobile.
- Body: 16-19px, 300 weight, high-contrast words at 400.
- Letter spacing remains zero across the route.

# Layout

- Announcement bar: 46px full width, seamless marquee, fixed right controls.
- Header: logo-only, 1280px maximum width.
- Hero: centered 760px content column with a 560px scanner card.
- Results: centered report headline, 560px score card, 1040px accordion.
- Guide: two-column 1280px layout collapsing to one column below 900px.
- Footer: newsletter, three link columns, metadata row, oversized wordmark.

# Elevation & Depth

- Depth comes from the animated shader, glass blur, one-pixel highlight lines, and deep black shadows.
- Orange and violet blooms are reserved for interaction and motion states.

# Shapes

- Scanner card: 26px radius.
- Inputs and primary button: 14px radius.
- Result score card: 24px radius.
- Announcement actions remain pills because they are compact utility controls.

# Components

- Immediate static hero headline with no blocking loading screen.
- WebGL shader with reduced-motion support.
- Dismissible announcement marquee.
- Website, first name, last name, and business email form.
- Ten-second scanning overlay with progress and rotating facts.
- Real API-backed score report with local preview fallback.
- Copy and PNG-download report actions.
- Animated score bars and accessible category accordions.
- AEO guide and Effect3 footer.

# Do's and Don'ts

- Do preserve the supplied shader, spacing, form geometry, and report hierarchy.
- Do keep the existing `/api/aeo-scan` integration.
- Do keep all controls keyboard accessible and preserve reduced-motion behavior.
- Do not replace the shader with a static gradient.
- Do not introduce unrelated cards or marketing sections.
- Do not deploy without explicit approval.

# Motion

- The hero renders immediately without an artificial loading screen.
- The hero headline is static to avoid delayed readability and layout churn.
- Announcement copy moves continuously and pauses on hover.
- Scanner ring rotates while progress and facts update.
- Report score counts up and the page fades upward into view.

# Responsive Behavior

- Tablet reduces display scale and stacks the guide and footer.
- Mobile uses a single-column form, compact score card, and smaller accordion labels.
- The static hero word keeps the headline stable during initial rendering.
- WebGL DPR is capped on mobile for performance.

# Implementation Notes

- Source handoff: `Homepage.dc.html` from `Announcement bar design request-handoff.zip`.
- Route: `/aeo-scanner`.
- React page: `src/pages/AeoScanner.tsx`.
- Page styles: `src/pages/AeoScanner.css`.
- Shader: `src/components/AeoShader.tsx`.
- Live endpoint: `/api/aeo-scan`.
