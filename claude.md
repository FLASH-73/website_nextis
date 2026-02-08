# claude.md — Nextis Website

## What Nextis Is

Nextis is building the universal constructor. We are a robotics startup focused on autonomous assembly automation. The immediate product is a dual-arm robotic assembly system that can learn new tasks with 1-2 days of setup. The long-term vision is a machine in every factory, every workshop, every home that can assemble anything given the right instructions.

The intellectual lineage: Turing proved universal computation, and we built the PC. Von Neumann proved universal construction. We are building that machine.

The founder is Roberto, 24, physicist turned robotics engineer, based in Hamburg, building toward San Francisco. This is not a cautious company. This is a company that intends to compete at the highest level.

## Brand Voice

Think Steve Jobs circa 1984. Confident, clear, no hedging. We state what we believe and what we are building. No corporate speak, no startup jargon inflation, no "leveraging synergies" or "disrupting paradigms."

Rules:
- Write in short, direct sentences. When a sentence can be split in two, split it.
- Never use "cutting-edge," "innovative," "revolutionary," "next-generation," "state-of-the-art," or "world-class." These words say nothing. Describe what the thing actually does instead.
- Never use "we believe" or "we think" before a strong claim. Just state it.
- No exclamation marks. Confidence is quiet.
- Contractions are fine. "We're" not "We are" in casual copy. But the manifesto and mission sections stay formal.
- The word "universal" is sacred. It refers specifically to von Neumann's universal constructor concept. Don't dilute it.
- Em dashes are banned. Use commas, periods, or restructure the sentence.

## Tone Spectrum

- Landing page hero: Bold, visionary, short. Think manifesto energy.
- Product/technical sections: Clear, precise, no-nonsense. An engineer should feel respected reading this.
- About/team: Human, warm, but not cute. No "passionate team of dreamers" language.
- Blog/updates: Conversational, direct, like a smart founder talking to smart people.

## Design Philosophy

The website should feel like the product: precise, engineered, purposeful. Nothing decorative. Every element earns its place.

- Clean, lots of whitespace. Let the content breathe.
- Dark mode as default. Light mode as option. The dark theme should feel like a workshop at night, not a gaming site.
- Typography matters more than graphics. Pick one excellent sans-serif (Inter, Söhne, or similar) and use size and weight for hierarchy, not color.
- Color palette: Near-black backgrounds (#0a0a0a or similar), white text, one accent color used very sparingly. The accent should feel industrial, not playful. Think deep blue, warm amber, or steel grey. Not purple, not gradient, not neon.
- Motion should be minimal and purposeful. Subtle fade-ins, no parallax scrolling, no animated backgrounds, no particle effects. If something moves, it should communicate information.
- Images and video of the actual hardware and demos are more powerful than any illustration. Real footage over renders whenever possible.
- No stock photos. Ever. If we don't have a photo for something, use typography or whitespace instead.
- No AI-generated images on the site. We build real things. The site should reflect that.

## Layout Principles

- Mobile-first. Most visitors from Twitter/X, LinkedIn, YC will be on phones.
- Navigation should be minimal. Home, About, Blog/Updates, Contact. Maybe a Manifesto page. That's it for now.
- The landing page should communicate three things above the fold: what we build, why it matters, and one clear call to action.
- Sections should be generous in height. Don't cram. One idea per viewport.
- Footer: minimal. Links, contact email, maybe social links. No newsletter signup unless we actually have a newsletter.

## Technical Preferences

- Framework: Next.js with TypeScript preferred. Static generation where possible.
- Styling: Tailwind CSS. No CSS-in-JS libraries.
- Hosting: Vercel.
- Keep dependencies minimal. Every npm package is a liability.
- Performance is non-negotiable. Lighthouse score above 95 on all metrics. No layout shift. Lazy load images. Optimize everything.
- Semantic HTML. Proper heading hierarchy. Accessible by default.
- No cookie banners unless legally required. No tracking pixels. If analytics are needed, use something privacy-respecting like Plausible or Fathom.
- No chatbots, popups, or modals on the marketing site.

## Content That Should Exist

- **Hero section**: One line about what we build. One line about why. A demo video or hardware image.
- **The vision**: The von Neumann/Turing framing. PC fulfilled Turing, we fulfill von Neumann. Keep it tight, 3-4 sentences max on the main page. Link to full manifesto.
- **The problem**: Assembly is still manual, expensive, inflexible. Make the pain concrete with real numbers if we have them.
- **The product**: What the system actually does. Dual-arm assembly, learns from demonstration, 1-2 days setup for new tasks. Show it, don't just describe it.
- **About/Team**: Roberto's background. Physics, TUM robotics, chose to build instead of study. Keep it honest and short.
- **Contact**: Email. Maybe a simple form. No "schedule a demo" flow unless we can actually handle inbound.

## Content That Should Not Exist

- No "trusted by" logos section (unless we actually have notable customers).
- No fake testimonials or placeholder quotes.
- No "our values" grid with icons. The manifesto IS our values.
- No "How it works" in three cute illustrated steps. If we explain the tech, explain it properly.
- No pricing page until we have pricing.
- No job listings page until we are actively hiring publicly.

## Writing Things to Watch For

These are AI writing tells. The site copy must avoid all of them:
- Em dashes (use commas or periods)
- Excessive bold text for emphasis
- "In today's rapidly evolving landscape..."
- "At Nextis, we..."  starting sentences with "At [Company]"
- Lists where prose would work better
- The word "delve"
- The word "landscape" used metaphorically
- The word "journey" used metaphorically
- "It's not just X, it's Y" constructions
- Ending sections with rhetorical questions

## Key References

- The full manifesto is titled "The Universal Constructor" and exists in both English and German.
- The Jobs/Apple II analogy is central to how we talk about the vision. The Apple II was "universal enough" without being a supercomputer. Our assembly system follows the same logic.
- David Deutsch's concept of universal explanation and constructor theory is a philosophical influence but should stay in the background. The von Neumann framing is more concrete and more useful for communication.

## One Last Thing

When in doubt about any design or copy decision, ask: would this feel at home on Apple's website circa 2007? Clean, confident, focused, human. That is the bar.
