# Larped

**Carbon compliance, automated — for the importers who can't afford to get it wrong.**

Larped is a client-side demo of a B2B carbon-compliance and green-credit
marketplace. It models the CBAM (Carbon Border Adjustment Mechanism)
liability an EU importer faces on a shipment, then lets them browse and
"purchase" high-integrity offset credits to retire that liability.

This repository is a **working prototype**, not a product..

---

## Explanation

The EU's CBAM went into partial effect in 2023 and phases in fully through
2026. Every importer of steel, cement, aluminum, fertilizer, hydrogen, and
electricity into the EU now has to report — and soon pay for — the embedded
carbon in what they bring in. Most mid-sized importers have no in-house
carbon accountant, no tooling, and no idea what their 2026 exposure looks
like. Consultancies charge ₹15–40L for a single assessment.

Larped's bet:

1. **Calculation is commoditizable.** A CBAM liability is arithmetic:
   `tonnage × emission factor × grid intensity × carbon price`. That
   doesn't need a McKinsey engagement. It needs a form and a table.
2. **The offset market is fragmented and opaque.** High-integrity credits
   (Verra, Gold Standard, Puro.earth, India's GCP) trade on spreadsheets
   and WhatsApp. A marketplace that aggregates them, surfaces the
   verification standard and SDG alignment up front, and lets an importer
   retire liability in three clicks is a real wedge.
3. **The buyer is captive and time-pressured.** Compliance deadlines are
   not negotiable. If you're the tool that's already open when the
   reminder lands, you win the renewal.

**Business model (aspirational):** 1–2% take rate on credit transactions,
plus a SaaS tier for the calculation and reporting layer. Freemium
calculator as the top of funnel.

---

## What's Built

A complete front-end application:

- **Marketing landing** (`/`) — hero, value props, CTAs.
- **CBAM Liability Calculator** — select commodity, origin country, and
  tonnage; get live EUR and INR liability with a free-allowance credit.
- **User Dashboard** (`/dashboard`) — liability stat cards, 6-month
  emissions trend (Recharts), recent listings.
- **My Listings** (`/listings`) — grid of the current user's projects,
  with a working "New Project" form (react-hook-form + zod).
- **Admin Dashboard** (`/admin`) — approve, reject, or delete listings.
- **Mock auth** — login/signup, role-based routing (buyer / seller / admin).
- **Dark mode by default**, light mode toggle, glassmorphism + aurora
  background, Outfit typeface.

Everything runs in the browser. No server, no API calls, no accounts,
no telemetry.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Build | Vite 5 | Fast HMR, zero-config TS |
| Framework | React 18 + TypeScript | Boring, hireable |
| Styling | Tailwind 3 + shadcn-ui | Fast iteration, no design debt |
| Routing | React Router v6 | Standard |
| Charts | Recharts | Good enough, no D3 tax |
| Forms | react-hook-form + zod | Runtime validation that actually works |
| State | React Context + localStorage | See "Downsides" |
| Icons | lucide-react | Consistent, tree-shakeable |
| Notifications | sonner | Best toasts in the ecosystem |

---

## Setup

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173
