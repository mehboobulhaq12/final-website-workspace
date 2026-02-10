

## Colorful Company Logos + Headline Animation

### What will change

**1. Copy all 9 uploaded logo images to `src/assets/logos/`**
- OpenAI, NVIDIA, Scale, Meta, Microsoft, Anthropic, Tesla, AWS, Google
- These will be imported as ES6 modules for proper bundling

**2. Update `src/components/TrustedBy.tsx`**
- Replace the Simple Icons CDN URLs with imports of the uploaded colorful logo images
- Change heading text from "Built by engineers from" to "Leading by engineers from"
- Add a subtle highlight/glow animation on the heading text (a shimmer or gradient text animation) for visibility
- Increase logo height from `h-6` to `h-10` for better visibility across resolutions
- Remove the `opacity-50` filter so logos appear in full color
- Keep the seamless marquee animation and edge fade gradients
- make logo transparency as 100 for visibility

**3. Update `tailwind.config.ts`**
- Add a `text-shimmer` keyframe animation that sweeps a gradient highlight across the heading text

### Companies (9 logos from uploads)
OpenAI, NVIDIA, Scale, Meta, Microsoft, Anthropic, Tesla, AWS, Google

### Technical Details

- Each logo imported via `import openaiLogo from "@/assets/logos/openai.png"` etc.
- Logo `<img>` tags use `h-10 w-auto` for proper sizing
- Heading gets a CSS gradient text with animated `background-position` shimmer effect
- Marquee animation remains at 30s linear infinite

