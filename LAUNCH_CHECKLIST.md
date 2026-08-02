# Launch Checklist

## Environment
- [ ] DATABASE_URL set on Vercel (Production, Preview, Development)
- [ ] AUTH_SECRET set on Vercel
- [ ] BLOB_READ_WRITE_TOKEN set on Vercel
- [ ] SITE_URL set on Vercel, matching the real production domain

## Database
- [ ] All migrations applied to the production database
- [ ] At least one account promoted to ADMIN

## Core flows (test on the live URL, not just localhost)
- [ ] Register a new account
- [ ] Log in / log out
- [ ] Create a listing with photos
- [ ] Edit a listing
- [ ] Mark a listing as sold, then relist it
- [ ] Delete a listing
- [ ] Save and unsave a listing
- [ ] Search, filter by category, filter by location, sort, and paginate
- [ ] Report a listing
- [ ] Log in as the admin account and resolve/dismiss that report
- [ ] Remove and re-approve a listing from the admin panel
- [ ] Leave a seller review and confirm the average updates
- [ ] Toggle dark mode and re-check the pages above

## SEO and sharing
- [ ] /sitemap.xml loads and lists real listings
- [ ] /robots.txt loads and excludes private routes
- [ ] Paste a real listing URL into WhatsApp or Telegram and confirm the preview shows a photo, title, and price

## Performance and accessibility
- [ ] Run the live URL through PageSpeed Insights
- [ ] Every image has meaningful alt text
- [ ] Every icon-only button has an aria-label
- [ ] Text is readable in both light and dark mode

## Trust and safety
- [ ] Footer's "no payments, no deliveries" disclaimer is visible
- [ ] Contact phone numbers are tappable (tel: links) on an actual phone
