Commerce projects swell. A catalogue becomes a platform. A platform becomes a replatform. Eighteen months later the merchant still cannot change a price without a ticket.

Velo is the other shape: a storefront you can walk through on a call. TypeScript, Next.js, Tailwind, Sanity. Dummy merchandising data on purpose — so the architecture is the case, not a private product dump. Live at [velostores.vercel.app](/projects/velo-e-commerce). Source on [GitHub](https://github.com/xheenkhalil/velostore).

This is how I build headless commerce when the brief is “sell the thing,” not “reenact Shopify in public.”

## What a storefront has to do

A merchant cares about four screens.

1. Home — what we sell, and why it is worth a click.
2. Catalogue — browse, filter, not get lost.
3. Product — image, price, variant, add to cart.
4. Cart — the line items, the total, the next step.

Everything else is optional until those four are fast, true, and editable.

I have watched teams spend a quarter on a personalization engine before the product page shows the correct size. That is theatre. Velo is the four screens, a headless catalogue, and SEO that does not need a plugin zoo.

## Sanity is the merchandising desk

Headless means the merchandiser does not wait on a deploy to change a title. Sanity is the desk:

- Products with title, slug, images, price, and portable text for the story.
- Variants as records, not a JSON blob someone has to remember to validate.
- Categories that the catalogue can query without a recursive CTE in the frontend.

The schema is the product. If the schema cannot express a bundle or a sale price, the merchandiser will invent a workaround in the title field, and you will spend a year cleaning it.

I keep the Studio boring. Custom inputs only when a default would let them break the storefront (a price with a comma, a missing slug). Preview the product page from the desk. If they cannot see the live card, they will over-edit.

Dummy data is honest. Velo ships with prepared content so you can judge the information architecture without a real SKU list. Swapping in a merchant’s catalogue is a content job, not a rewrite.

## Next.js is the storefront, not the CMS

The app reads Sanity, renders pages, and stays fast.

- Static where the catalogue is stable. Revalidate when a document publishes.
- Metadata on every product route. Title, description, canonical. Commerce SEO is still just pages.
- Images with real dimensions. Layout shift on a product grid is how you lose a thumb on a phone.

Tailwind is the layout system. I do not hide a 12-column mystery in a theme. Cards, type scale, and tap targets (44px on add-to-cart) are the whole visual conversation.

Motion is allowed when it helps a scan — a cart count that does not jump, a panel that does not pop from zero. Framer Motion on Velo is for that, not a hero that takes a second to arrive. A storefront that animates before it paints is a storefront that lost the click.

## Cart without a platform religion

You can put a cart in local state, in a cookie, in a commerce API. Pick one and write it down.

For a catalogue of this size I want:

- Line items with product id, variant id, quantity, and the price *at add time* so a later merchandising edit does not silently rewrite a cart.
- A total the customer can reconcile to the lines.
- A checkout path the merchant actually has: Stripe, WhatsApp, or “email us the order.” Lying about checkout is worse than a simple checkout.

I will not pretend a headless cart is Magento. I will make the four screens true and the next step obvious.

Stock is a policy. If you do not have a stock system, do not show a stock number. “Available” / “made to order” is enough. Inventing a quantity of 17 is how you oversell a drop.

## Filters that tell the truth

Faceted navigation is where storefronts start lying. A filter that returns zero because the tag was typed `Blue` in one product and `blue` in another is a schema bug, not a UX bug.

Rules:

- Facets come from fields, not from free text.
- Empty facets hide or disable. A click that returns zero is a defect.
- The URL holds the filter. Shareable catalogue states are a gift to merchandising and to SEO.

Do not ship seven sliders because a template had seven sliders. Ship the two the merchant uses (category, price) and add the third when they ask twice.

## SEO is a page problem

Standard practice, done:

- One URL per product, stable.
- Canonical tags.
- Structured data for Product when the price is real.
- A sitemap that is the catalogue, not the Studio.

Speed is SEO. I treat Core Web Vitals as a merchandising constraint: if the hero image is 4MB, the merchandiser needs a pipeline, not a lecture. Sanity’s image pipeline exists. Use it.

I used dummy data on Velo, so I do not fake review stars or stock. Schema.org lies get you in trouble you cannot debug from a dashboard.

## What I cut

- Wishlists before cart.
- Accounts before checkout.
- Personalization before a working grid.
- A design system that needs a Storybook tour to change a button.

Those features are real on large programmes. They are delay on a storefront that does not yet sell.

## Handoff for a merchant

On Friday they get:

- Studio login and a one-page “how to add a product.”
- The schema, with the fields that must never be empty.
- The storefront URL, the preview URL, and how revalidation runs.
- Where the cart lives and what checkout does next.
- The repo. They should not need me to change a price.

Headless commerce without the theatre is a desk, four screens, and a cart that adds. Velo is that, in TypeScript, on a live URL. If you want a replatform programme, there are firms for that. If you want a store that a customer can use this month, this is the work.
