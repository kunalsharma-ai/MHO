# Reference server (`server/index.mjs`)

This is a Node.js server with no dependencies (Node 18 or newer). It does two jobs:

1. It serves the prerendered site from `dist/`, with clean URLs, real 404 pages and long-lived caching for files in `/assets`.
2. It runs the **live reviews → testimonials** pipeline.

```bash
npm ci && npm run build
ADMIN_TOKEN=change-me npm run serve         # http://localhost:8080
```

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8080` | Port to listen on |
| `DIST_DIR` | `../dist` | The built site |
| `DATA_DIR` | `./data` | Where `reviews.json` is stored. Keep it outside the public folder and back it up. |
| `REVIEWS_AUTO_PUBLISH` | `true` | `true` publishes reviews that pass the spam checks immediately. Set it to `false` to hold every review for moderation. |
| `ADMIN_TOKEN` | — | Bearer token for the moderation endpoints. Required to moderate. |
| `ALLOWED_ORIGIN` | — | Set it when the website and the API are on different domains (CORS). |
| `TRUST_PROXY` | `false` | Set it to `true` behind Nginx or Cloudflare so the rate limit sees the real visitor IP. |
| `IP_SALT` | `change-me` | A secret used to hash IP addresses. Raw IPs are never stored. |

## Endpoints

- `POST /api/reviews` checks every review before it is saved:
  - **Validation:** rating 1–5, text 20–600 characters, first name, ISO country code, a valid email, and `consentPublish: true`.
  - **Abuse limits:** at most 3 reviews per IP per hour, and 1 review per email every 30 days.
  - **Screening:** reviews containing links, emails or phone numbers in the text, words from the blocklist, repeated characters or text that is mostly capitals are held for moderation instead of being published.
- `GET /api/reviews` returns the published reviews, newest first, with public fields only. Email addresses are never included.
- `GET /api/admin/reviews` lists every review, including pending ones. It needs the header `Authorization: Bearer <ADMIN_TOKEN>`.
- `POST /api/admin/reviews/:id` takes `{ "action": "publish" | "reject" | "delete" }`.

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:8080/api/admin/reviews
curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" \
     -d '{"action":"publish"}' http://localhost:8080/api/admin/reviews/<id>
```

## Still to connect

`/api/login`, `/api/register` and `/api/contact` return **501** until you connect them to the member system. The request formats are described in the main README, section 5.

## Compliance notes

- **Publish negative reviews too.** Hiding reviews because of their star rating is "review gating", which consumer-protection rules prohibit (for instance the US FTC rule on fake reviews and India's CCPA guidelines on online reviews). Moderate only for spam, abuse or personal data.
- **Respect the reviewer's consent.** The popup asks permission to publish the first name, country, company, rating and review. Delete a review when the person asks you to (GDPR / DPDP Act).
- **Never add star-rating search markup.** Do not add `Review` or `AggregateRating` structured data for your own reviews: Google ignores self-published reviews, and the markup can count against the site.

## Hosting

- **Node hosting:** use any Node host (VPS, Render, Railway, or Hostinger's Node.js plan) and run it with PM2 or systemd.
- **Static-only hosting:** you can still upload `dist/` on its own. Without the API, the site shows the supplied testimonials from `public/data/reviews.json`, and new reviews are not published.
