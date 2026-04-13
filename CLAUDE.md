# CLAUDE.md — Petovia MVP Build Instructions

> This file is for Claude Code. Read it fully before writing any code. The companion file `DESIGN.md` defines the visual system — treat it as the source of truth for colors, typography, spacing, and screen layouts.

---

## 1. What You're Building

A **non-production MVP web app** for **Petovia** (`petovia.org.uk`) — a UK pet service discovery and comparison platform. This MVP exists to be shown to investors, partners and early providers in pitch conversations. It does not need real auth, real payments, or real backend infra. **It does need to look like a real, polished product.**

**Two MVP features only — do not scope-creep:**

1. **Marketplace tab** — a functional directory of **100 West London vets** scraped from Google Business Listings via Apify, displayed as beautifully-styled cards with list view + map view + working filters.
2. **Community tab** — a hybrid feed: blog articles on top, a simulated live community discussion below each article (fake but feels real — typing indicators, messages fading in, reactions, threaded replies).

Everything else from the proposal (payments, real auth, comparison tool, full provider profiles for non-vet categories, mobile app) is **out of scope**. Show "Coming soon" placeholder tiles on the homepage for future categories.

---

## 2. Non-negotiables

- **Visual quality is the #1 priority.** This is the rule that overrides everything else. If a tradeoff appears between shipping a feature fast and shipping it beautiful, ship beautiful. Read `DESIGN.md` and follow it precisely.
- **Mobile-first.** Design and build at 375px first, then scale up to 1440px. Every screen must be excellent on a phone.
- **Use the exact brand colors** from `DESIGN.md`. No off-palette colors anywhere.
- **No pure white backgrounds** — page background is always `--cream` (`#FFFBF5`).
- **Rounded, friendly, generous whitespace.** Pill buttons (radius 999px), 16px card radius, soft tinted shadows, never harsh.
- **The vet card and the community feed are the two hero components.** Spend disproportionate effort on these — they are what the client will demo.

---

## 3. Tech Stack

Use this stack — it's optimal for "looks great fast, easy to demo, easy to hand off":

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS, configured with the brand tokens from `DESIGN.md` mapped into `tailwind.config.ts` (custom colors, custom font family, custom shadow tokens, custom border radius scale)
- **UI primitives:** shadcn/ui (Button, Input, Dialog, Sheet, Tabs, Toggle, Slider) — but restyle every component to match the brand. No default shadcn look.
- **Icons:** `lucide-react`
- **Map:** `react-leaflet` with OpenStreetMap tiles styled via a custom Leaflet style to match the brand (avoid the Google Maps API for the MVP — costs money and adds an API key dependency the client doesn't need yet). Custom teal map pins as inline SVG.
- **Animations:** `framer-motion` for the community feed liveness (message fade-ins, typing indicator), card hover lifts, page transitions.
- **Fonts:** Load `Plus Jakarta Sans` (400, 500, 600, 700, 800) from Google Fonts via `next/font`.
- **Data fetching:** All data is local JSON for the MVP. No backend.
- **Deploy target:** Vercel (zero-config). Add a `vercel.json` if needed.

Do **not** add: Redux, tRPC, Prisma, NextAuth, Stripe, any database, any CMS. None of it is needed for an MVP.

---

## 4. Project Structure

```
petovia-mvp/
├── app/
│   ├── layout.tsx              # Root layout, fonts, top nav, mobile bottom nav
│   ├── page.tsx                # Homepage
│   ├── marketplace/
│   │   ├── page.tsx            # Vet directory (the headline screen)
│   │   └── [slug]/page.tsx     # Vet profile page
│   ├── community/
│   │   ├── page.tsx            # Community hub (article feed)
│   │   └── [slug]/page.tsx     # Article + live discussion
│   └── globals.css             # Tailwind base + custom CSS variables
├── components/
│   ├── nav/
│   │   ├── TopNav.tsx
│   │   └── MobileBottomNav.tsx
│   ├── marketplace/
│   │   ├── VetCard.tsx         # ⭐ hero component — design with love
│   │   ├── VetMap.tsx          # react-leaflet map with custom pins
│   │   ├── FilterSidebar.tsx   # desktop sidebar
│   │   ├── FilterBottomSheet.tsx  # mobile bottom sheet version
│   │   └── SortDropdown.tsx
│   ├── community/
│   │   ├── ArticleCard.tsx
│   │   ├── DiscussionFeed.tsx  # ⭐ hero component — simulate liveness here
│   │   ├── MessageBubble.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── ReactionRow.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── CategoryTiles.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── FeaturedPosts.tsx
│   │   └── EarlyAccessCTA.tsx
│   └── ui/                     # shadcn primitives, restyled
├── lib/
│   ├── data/
│   │   ├── vets.json           # 100 vets (see §5)
│   │   ├── articles.json       # 6–8 blog articles
│   │   └── messages.json       # ~30 seed community messages
│   ├── types.ts                # TS interfaces for Vet, Article, Message
│   └── utils.ts                # cn(), formatDistance(), formatTime()
├── public/
│   ├── illustrations/          # spot illustrations of pets
│   └── clinic-photos/          # placeholder clinic photos
├── scripts/
│   └── apify-import.ts         # script to convert Apify export → vets.json
├── tailwind.config.ts          # brand tokens
├── DESIGN.md                   # visual brief (already provided)
└── CLAUDE.md                   # this file
```

---

## 5. Data Layer

### Vets (`lib/data/vets.json`)

Source: Run an Apify Google Maps Scraper actor over West London with the search term `"veterinary clinic"`. Bounding box approximately: Hammersmith, Notting Hill, Kensington, Chelsea, Fulham, Shepherd's Bush, Ealing, Acton, Chiswick. Cap at 100 results.

Each vet record:

```ts
type Vet = {
  id: string;                      // slug, e.g. "the-mayow-vets-w11"
  name: string;
  photo: string;                   // /clinic-photos/[id].jpg or stock fallback
  rating: number;                  // 1–5, one decimal
  reviewCount: number;
  priceTier: 1 | 2 | 3;            // £ / ££ / £££
  services: string[];              // from a fixed enum: Microchipping, Emergency, Surgery, Vaccinations, Dental, Behaviour, Grooming, Boarding
  openingHours: { day: string; open: string; close: string }[];
  address: string;
  postcode: string;
  borough: string;                 // e.g. "Notting Hill"
  lat: number;
  lng: number;
  phone: string;
  verified: boolean;               // ~30% true
  distanceMi?: number;             // computed at render time from user postcode
};
```

**Apify import script** (`scripts/apify-import.ts`):
- Reads the raw Apify JSON export.
- Maps fields to the `Vet` shape above.
- Generates a slug from the name + postcode area.
- Infers `priceTier` and `services` from the Apify category/about fields where possible; otherwise random-but-sensible defaults seeded by the vet ID for stability.
- Sets `verified: true` for ~30% of records (highest-rated first).
- Writes to `lib/data/vets.json`.

If real clinic photos aren't available, fall back to a small set of warm, well-lit, slightly desaturated stock clinic photos from `/public/clinic-photos/fallback-1.jpg` through `fallback-8.jpg`. Round-robin assign by vet ID hash so the same vet always gets the same photo.

### Articles (`lib/data/articles.json`)

6–8 blog articles. Each:

```ts
type Article = {
  id: string;                    // slug
  title: string;
  category: "Vets & Health" | "Grooming" | "Insurance" | "Training" | "Travel" | "Food";
  heroImage: string;
  excerpt: string;               // ~140 chars
  body: string;                  // markdown, ~600–900 words
  author: { name: string; avatar: string; petBadge: string };
  publishedAt: string;           // ISO date
  readingTimeMin: number;
  commentCount: number;          // matches messages.json
};
```

Topics: "How to choose your first London vet", "What pet insurance actually covers (and what it doesn't)", "Microchipping is now law — here's what to do", "5 signs your dog needs a groomer this week", "Travelling to the EU with your pet post-Brexit", "Raw vs kibble: a UK vet's honest take", "Crate training a rescue: a 7-day plan", "Emergency vet bills: what to do when you can't pay".

### Messages (`lib/data/messages.json`)

For each article ID, ~20–40 seed messages forming a believable thread, including some replies (parent_id field). Each:

```ts
type Message = {
  id: string;
  articleId: string;
  parentId?: string;             // for threaded replies
  author: { name: string; avatar: string; petBadge: string };
  body: string;
  postedAt: string;              // ISO date, scattered across last 7 days
  reactions: { paw: number; heart: number };
  reactors: string[];            // small list of avatar URLs for the reactor stack
};
```

---

## 6. The Two Hero Components — Build These First, Build Them Best

### `VetCard.tsx`

Follow the spec in `DESIGN.md` §7 Screen 2 exactly. The card has:
- 96×96 (mobile) / 120×120 (desktop) clinic photo, 12px radius, 1px teal ring, verified badge top-right.
- Clinic name (H3), rating row (amber star, bold rating, review count in soft).
- Open-now indicator (colored dot + status text, computed from current time vs opening hours).
- Service chips (3 visible, "+N more" if longer), pill-shaped, `--teal-soft` background.
- Bottom row: distance + borough on left, save heart + "View clinic →" on right, separated by hairline border.
- Hover (desktop only): card lifts with teal-tinted shadow, photo subtly zooms 1.02, arrow slides 4px right. Use `framer-motion`.
- Skeleton variant for loading.

### `DiscussionFeed.tsx`

This is what makes the community tab feel alive. Implementation:
- Mount with seed messages from `messages.json` for the article.
- Show "23 pet parents online" header (number is randomized per page load between 18–34).
- Every 6–12 seconds, "deliver" a new message: pick a pre-written one from a small simulated queue and animate it in at the top of the feed with a fade + subtle teal glow that fades out over 1.5s. Add a "1 new" pill chip at the top of the scroll area that scrolls smoothly when tapped.
- Every 15–25 seconds, show a "Sarah is typing…" indicator (animated three-dot bounce) at the bottom, lasting 2–4 seconds, then either resolve into a new message or quietly disappear.
- The composer at the top accepts input; pressing "Post" prepends the user's message instantly with the same animation.
- Threaded replies indent under their parent with a 2px teal vertical guide line on the left.
- Reactions: tapping a paw or heart increments locally and pops a small avatar onto the reactor stack.
- All "real-time" state lives in component state — no backend, no websockets.

Build a small simulated-message queue file `lib/data/sim-queue.json` with 30 short pre-written messages tagged by article category, so the simulation feels topically relevant.

---

## 7. Build Order

Follow this sequence — don't skip ahead:

1. **Foundations:** Set up Next.js, Tailwind config with brand tokens (colors, fonts, radius, shadows from `DESIGN.md`), global CSS variables, Plus Jakarta Sans via `next/font`, base layout with cream background.
2. **Nav shells:** `TopNav` (desktop + tablet) and `MobileBottomNav`. Wire up routing to placeholder pages.
3. **Apify import script + seed data:** Get `vets.json`, `articles.json`, `messages.json`, `sim-queue.json` populated. If Apify access isn't available at build time, generate 100 plausible mock vets with realistic West London postcodes and clinic-name patterns, clearly flagged in code as `MOCK_DATA = true` so it's swappable later.
4. **Homepage:** All 6 sections per `DESIGN.md` §7 Screen 1. Get this looking great before moving on — it's the first impression.
5. **VetCard component:** Build it perfectly in isolation. Check it at mobile and desktop. Polish hover states.
6. **Marketplace page:** Filter sidebar (desktop) + bottom sheet (mobile), sort dropdown, results list using VetCard, react-leaflet map with custom teal SVG pins, list↔map interaction (hover card → highlight pin, click pin → open mini-card).
7. **Vet profile page:** Photo gallery, sticky contact card (desktop), tabs, reviews list, map embed. Reviews can be generated faker-style from the rating count.
8. **Community hub page:** Featured article + grid of recent articles, category pill tabs.
9. **Article page + DiscussionFeed:** This is where you spend extra time on the simulated liveness. Make it feel magical.
10. **Polish pass:** Empty states, loading skeletons, focus rings, 404 page (cute pet illustration), tiny micro-interactions (button press scale, heart-save bounce, pill-chip select feedback).

---

## 8. Quality Bar Checks Before Declaring Done

Run through this list. Every box must be honestly checked.

- [ ] Open the homepage on a 375px viewport. Does it look like a real, funded product? Or does it look like a developer's first draft?
- [ ] Open the marketplace on a 375px viewport. Are the vet cards beautiful and scannable?
- [ ] Tap into a vet card. Does the profile feel substantial, or empty?
- [ ] Open the community tab and load an article. Within 30 seconds, does at least one new message appear with a smooth animation? Does a typing indicator show up?
- [ ] Are all colors from the brand palette? Search the codebase for any hex value not in `DESIGN.md`.
- [ ] Is every page background `--cream`, never pure white?
- [ ] Are all corners rounded — no sharp 4px-radius corners anywhere?
- [ ] Every interactive element ≥44×44px on mobile?
- [ ] Lighthouse mobile performance ≥85, accessibility ≥95.
- [ ] No console errors. No hydration warnings.
- [ ] Deploys clean to Vercel.

---

## 9. Things to Explicitly NOT Do

- Don't add user accounts, login, signup, or any auth.
- Don't integrate Stripe, Polar, or any payment provider.
- Don't add real backend storage — all data is local JSON.
- Don't add the comparison tool (that's Phase 3 in the proposal).
- Don't add a real CMS — articles are flat JSON files.
- Don't add analytics (no GA4, no Plausible) — adds GDPR complexity unnecessarily for an MVP.
- Don't use Material UI, Ant Design, Chakra, or any other component library besides shadcn/ui (and even shadcn must be restyled to brand).
- Don't use stock pet-photo cliches (golden retriever in a field). Use either real-feeling clinic interiors or friendly line-art illustrations.
- Don't write more than 5–10 lines of inline styling — everything goes through Tailwind tokens.

---

## 10. Handover

When the MVP is complete:
- Write a short `README.md` with: how to run locally, how to swap mock vet data for real Apify data, how to deploy to Vercel, and a one-paragraph "what's next" pointing at the proposal phases.
- Include a `data-pipeline.md` documenting the Apify actor used, the field mapping, and how to refresh the dataset.
- Tag the repo `v0.1.0-mvp`.

---

## 11. North Star Reminder

The client is a passionate founder pitching this to investors and early providers. Every screen they show needs to make the viewer think *"oh — this is real, and this is good."* Visual quality, mobile polish, and the two hero components (vet card + live discussion feed) are the things that earn that reaction.

When in doubt, re-read `DESIGN.md`. Build slow, build beautiful, build mobile-first.