# Publication and free SEO plan

Researched 2026-10-20. Canonical site: https://hapordev.com/. Verified it serves Jack's portfolio and the Cloudflare zone is active. `jack-dev-portfolio` is the Worker name.

## What belongs in this portfolio

- Use one clear name: **Jack / Hapur Dev**. Put the brand naturally in the title, primary biography, structured profile data, and footer. Do not repeat search phrases unnaturally or invent a legal name.
- Preserve real first-person background, Vientiane location, project roles, live/source links, and working contacts. Real case details are stronger evidence than a generic "human built" badge.
- Serve a useful HTML introduction and project links before JavaScript; add canonical tags, a descriptive title/meta description, Open Graph image, the supplied logo favicon, robots.txt, and sitemap.xml.
- Give actual supporting pages unique titles and descriptions. A short factual privacy page fits the enquiry form; a custom 404 with a real 404 status fits a small static site. Do not turn missing URLs into successful homepages.
- Reuse and compress real project screenshots. Keep alt text, image dimensions, keyboard focus, mobile layouts, and reduced-motion behavior.
- Keep visible email/social links and actual form error/success messages. No invented response-time promise, reviews, guarantees, opening hours, blog posts, service pages, payment policies, or filler FAQ.
- Do not add maps/local business markup to a personal software portfolio merely because a checklist mentions them. The guest-house site already has its real business contacts/location/schema.

## Free analytics

**Cloudflare Web Analytics** is the first choice: an existing Cloudflare account, free privacy-focused analytics, and a small beacon. It measures browser pageviews and performance; Cloudflare request analytics include bots/API traffic and are not the same measure.

- Official [overview](https://developers.cloudflare.com/web-analytics/about/) and [setup](https://developers.cloudflare.com/web-analytics/get-started/).
- The initial HTTP inspection found no beacon. Final browser inspection found Cloudflare already automatically injecting its real configured Web Analytics script. The original CSP blocked it; the final policy permits the official script origin, with same-origin `/cdn-cgi/rum` already covered by `connect-src 'self'`. No duplicate manual token/embed was added.
- Two final browser delivery checks encountered `net::ERR_CONNECTION_REFUSED`; local DNS maps the vendor script host to `0.0.0.0` / `::`. Successful beacon receipt/dashboard data cannot be claimed from this filtered environment. No DNS/network setting was changed; see the official FAQ on ad-blocker limitations.
- Wrangler OAuth refreshed successfully. Account/zone read works, but `GET /accounts/{account_id}/rum/site_info/list` returns HTTP 403 (permission scope). Account configuration and dashboard receipt remain unverified through this token.
- Account metrics are available through [Cloudflare Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics) with owner access. Automatic injection is present; do not create a duplicate site as an unverified workaround.
- Google Analytics is unnecessary for the requested small portfolio while this free, simpler option fits. Do not add a cookie banner without an actual consent-requiring tracker or storage purpose.

## Search visibility

**Google Search Console** is free and is the appropriate place to measure indexing, search terms, clicks, and impressions. Verify `hapordev.com` as a domain property with the real account/DNS authorization, then submit `https://hapordev.com/sitemap.xml`. Request indexing after the deployed pages are checked. Domain verification and submission cannot be claimed without authenticated Google property access.

Technical SEO can improve crawlability and clarity. Google explicitly states there is no mechanism that automatically ranks a site first, and inclusion is not guaranteed. Ranking for "Hapur Dev" should be measured after indexing rather than promised on launch day.

## Sources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): meaningful titles, useful content, crawlability, canonical URLs, sitemap, and ranking limits.
- [Google profile-page structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page): a truthful profile/entity identity, not a fabricated organization or reviews.
- [Google Search Console](https://search.google.com/search-console/about): free search measurement and indexing tools.
- [Cloudflare Web Analytics overview](https://developers.cloudflare.com/web-analytics/about/): free privacy-focused measurement.
- [Cloudflare Web Analytics setup](https://developers.cloudflare.com/web-analytics/get-started/): automatic/manual beacon options and CSP considerations.
- [Cloudflare Web Analytics FAQ](https://developers.cloudflare.com/web-analytics/faq/): official CSP script permission, same-origin automatic collection endpoint, and ad-blocker limitations.
- [Cloudflare JavaScript Detections](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/): the separate edge-injected inline detection script can log a CSP block without a dynamic nonce. No security setting was changed to suppress that message.
- [Cloudflare Web Analytics API](https://developers.cloudflare.com/api/resources/rum/subresources/site_info/): site configuration and real site tokens.
- [Workers custom 404 handling](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/#custom-404-pages): nearest 404.html and HTTP 404 with `not_found_handling: 404-page`.

No paid SEO tool, paid analytics subscription, or ranking service is needed for this scope.
