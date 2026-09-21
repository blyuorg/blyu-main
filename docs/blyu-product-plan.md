# Blyu website — design and delivery plan

> **Current direction:** Blyu is a B2B digital agency. The website is designed to turn visitors into qualified project enquiries for strategy, design, engineering, and automation—not to present Blyu as a customer-intelligence SaaS.

## Product position

Blyu is a B2B digital agency that makes complex digital products feel clear, useful, and beautiful. The site leads with the existing Blyu promise: “We build what others can’t imagine.”

## First Figma deliverable

Two editable, responsive homepage frames:

- **Desktop — 1440 px:** full marketing page and a large cinematic product canvas.
- **Mobile — 390 px:** the same information hierarchy with touch-first navigation, stacked cards, and a swipeable proof rail.

The Figma file will also contain a lightweight **Blyu Foundations** page: colors, typography, spacing, radii, shadows, buttons, pills, metric cards, testimonial cards, and navigation states.

## Homepage information architecture

1. Compact navigation with the supplied Blyu logo
2. Typographic hero — “We build what others can’t imagine.”, project CTA, and restrained orbit motion
3. Four-part service proof strip — strategy, design, engineering, and automation
4. Reserved showreel/video canvas for the supplied second video
5. Horizontally draggable selected-work card rail
6. Manifesto section and project enquiry CTA
7. Oversized blue footer with grouped links and Blyu wordmark

## Visual direction

- Quiet ivory base, near-black text, electric blue as the Blyu accent, and a restrained sky-blue gradient for motion surfaces.
- Dense but legible typography: an expressive display headline paired with an extremely readable sans-serif UI layer.
- Large rounded product surfaces, thin neutral borders, intentional whitespace, and short, direct copy.
- Original layouts and copy. The supplied sites are used only for the requested interaction patterns and level of polish.

## Motion specification for implementation

- Hero: light, CSS-only orbit and scroll-cue motion, including a `prefers-reduced-motion` fallback.
- Work rail: manual horizontal swipe/drag, with no uncontrollable auto-carousel.
- Video: preserve the reserved visual canvas until Blyu supplies the final asset.
- Footer: static accessible links now; its scroll reveal can be added after final content approval.

## Supabase scope

The marketing site can launch mostly static. Supabase is reserved for the live interactions:

- `project_enquiries`: name, email, brief, created_at

The browser has no direct table privileges. The Next.js server route validates input and writes using a server-only service-role key; Row Level Security remains enabled. Add rate limiting and CAPTCHA before opening the public form to meaningful traffic, and never expose the service-role key to the browser.

## Vercel delivery

- Next.js App Router and TypeScript
- Vercel environment variables for `NEXT_PUBLIC_SUPABASE_URL` and server-only `SUPABASE_SERVICE_ROLE_KEY`
- Preview deployments for each change; production deployment after mobile, performance, and accessibility review
- Static media optimization, metadata/OG image, sitemap, robots, and Web Vitals monitoring

## Delivery sequence

1. Confirm Blyu positioning and create/edit the Figma direction.
2. Build Figma foundations, desktop homepage, and mobile homepage.
3. Review and revise Figma with stakeholder feedback.
4. Scaffold the production site and build responsive components.
5. Add the Supabase-backed forms and database policies.
6. Implement motion and reduced-motion alternatives.
7. Test on mobile viewports, keyboard navigation, accessibility, and performance.
8. Deploy through Vercel and connect the production domain.

## Decisions still needed before production

- Final one-sentence Blyu value proposition and target buyer
- Actual proof metrics, customer logos, testimonials, and the final showreel video
- Any anti-spam provider/rate-limit policy for the project enquiry form
- Supabase project URL and server-only service-role key; Vercel project/domain access for launch
