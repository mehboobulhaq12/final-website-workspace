

## Trusted By / Logo Carousel Section

### What will be built
A "Built by engineers from" section placed directly below the hero, featuring 10 real company logos scrolling horizontally in an infinite marquee animation. The design matches the reference screenshot: light/neutral background, subtle heading, and smoothly sliding logos.

### Companies (matching the reference)
OpenAI, Apple, AWS, Scale, Microsoft, Capital One, Google, NVIDIA, Tesla, Meta

### Design
- Light gray background section (`bg-gray-50` or similar neutral tone)
- Centered heading: "Built by engineers from" in small, muted text
- Logos displayed as SVGs fetched from a public CDN (e.g., `svgl.app` or inline SVGs) for reliability
- Infinite horizontal scroll animation using pure CSS (`@keyframes marquee`)
- Logos duplicated to create seamless looping
- Proper spacing between logos, grayscale filter with hover color reveal optional

### Technical Details

**1. Create `src/components/TrustedBy.tsx`**
- Contains the heading and a marquee wrapper
- Uses CSS `@keyframes` for smooth infinite horizontal scrolling
- Logos rendered as `<img>` tags using well-known public logo URLs (simple-icons CDN or similar), with company name as alt text
- Two copies of the logo row side-by-side for seamless loop
- Tailwind classes for layout; custom keyframe animation added inline or via Tailwind config

**2. Update `tailwind.config.ts`**
- Add a `marquee` keyframe animation:
  ```
  "marquee": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } }
  ```

**3. Update `src/pages/Index.tsx`**
- Remove `h-screen` constraint from the wrapper div (so content can scroll beyond the hero)
- Import and place `<TrustedBy />` after `<Hero />`

**4. Update `src/index.css`**
- Remove any `overflow: hidden` on body if present, to allow scrolling

