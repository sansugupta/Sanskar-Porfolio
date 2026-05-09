# Devodus Static Site Draft

This is the first static rebuild draft for Devodus.

## Run Locally

From this folder:

```bash
python3 -m http.server 4177
```

Open:

```text
http://localhost:4177
```

## Structure

- `index.html` - static website shell
- `styles.css` - responsive visual design
- `app.js` - renders service/pricing cards from JSON
- `data/services.json` - Devodus public services plus powered delivery services

## Deployment Notes

This draft can be uploaded to Namecheap shared hosting/cPanel as static files if the hosting plan supports normal file upload.

If Devodus is on EasyWP managed WordPress, either convert this into a WordPress theme/page or deploy elsewhere and point DNS.
