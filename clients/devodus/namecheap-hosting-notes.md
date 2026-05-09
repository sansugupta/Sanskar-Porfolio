# Namecheap Hosting Notes

Portal reference: `https://ap.www.namecheap.com/ProductList/HostingSubscriptions`

## What Namecheap Is

Namecheap is a domain registrar and hosting provider. In this project, it likely controls one or more of:

- Domain registration for `devodus.com`
- DNS records
- WordPress hosting or shared hosting
- cPanel access
- SSL certificates
- Email/domain services

## What The Hosting Subscriptions Page Usually Shows

The Namecheap Hosting Subscriptions area is where the account owner can see hosting products such as:

- Shared hosting
- EasyWP managed WordPress hosting
- VPS or dedicated hosting
- Hosting expiration/renewal status
- Buttons to open cPanel or hosting dashboards
- Server/IP details depending on plan type

## Why It Matters For This Project

Before deployment, confirm:

- Is Devodus currently on EasyWP managed WordPress or shared cPanel hosting?
- Is there cPanel access?
- Where is DNS managed?
- Is `devodus.com` using Namecheap nameservers or external DNS?
- Can static HTML/JS/CSS be uploaded directly, or does the final site need to stay inside WordPress?
- Is there an existing email setup tied to the hosting?

## Deployment Options

### Option A - Keep Namecheap Hosting

Good if the client wants everything inside their current account.

Likely paths:

- Upload static site through cPanel File Manager or FTP/SFTP if shared hosting.
- Convert the rebuild into a WordPress theme/page if EasyWP must remain.
- Keep DNS as-is.

### Option B - Deploy On Lightsail Like Techventive

Good if InfraBuild wants more control and repeatable deployment.

Likely path:

- Build static site in this repo.
- Deploy to the same Lightsail-style stack used by other client sites.
- Point Devodus DNS records to the Lightsail server.

### Option C - Deploy On Vercel/Static Host

Good if the website becomes a modern frontend app.

Likely path:

- Build as static/Next.js.
- Deploy via Vercel.
- Point DNS from Namecheap to Vercel.

## Access Safety

Do not store Namecheap passwords in git. Store only account references here and keep credentials in a password manager or local ignored file.
