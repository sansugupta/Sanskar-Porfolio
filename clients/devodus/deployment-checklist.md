# Devodus Deployment Checklist

## Current Draft

Static site draft lives in:

```text
clients/devodus/site/
```

Local preview:

```bash
cd "clients/devodus/site"
python3 -m http.server 4177
```

Open:

```text
http://localhost:4177
```

## Before Deploying To devodus.com

1. Log in to Namecheap manually because Cloudflare/security verification blocks automated login.
2. Open Hosting Subscriptions.
3. Identify the hosting type:
   - Shared hosting with cPanel
   - EasyWP managed WordPress
   - VPS/dedicated hosting
4. Check where DNS is managed:
   - Namecheap BasicDNS
   - Namecheap Web Hosting DNS
   - Cloudflare or another DNS provider
5. Export/backup the current WordPress site before replacing anything.
6. Confirm whether email uses the same hosting account.
7. Confirm final contact form destination.

## Deployment Path A - Shared Hosting / cPanel

Use this if Namecheap shows a normal cPanel hosting account.

1. Open cPanel from Namecheap.
2. Go to File Manager.
3. Open `public_html`.
4. Create a backup folder, such as `backup-wordpress-YYYY-MM-DD`.
5. Move existing WordPress files into the backup folder only after backup/export is confirmed.
6. Upload all files from `clients/devodus/site/` into `public_html`.
7. Confirm these paths load:
   - `https://devodus.com/`
   - `https://devodus.com/data/services.json`
8. Test contact links and responsive layout.

## Deployment Path B - EasyWP Managed WordPress

Use this if Namecheap shows EasyWP instead of cPanel.

Options:

- Convert the static draft into a WordPress page/theme.
- Keep WordPress and rebuild page-by-page using Elementor/blocks.
- Deploy the static site elsewhere and point DNS to the new host.

## Deployment Path C - Lightsail / Vercel

Use this if InfraBuild wants Git-based deployment control.

1. Deploy static site to Lightsail, Vercel, or another static host.
2. Update Namecheap DNS records for `devodus.com`.
3. Keep Namecheap as registrar only.
4. Verify SSL and redirects.

## Security

- Do not commit Namecheap, WordPress, cPanel, FTP, or email passwords.
- Rotate any credential pasted into chat.
- Store only references in `clients/devodus/access-inventory.md`.
