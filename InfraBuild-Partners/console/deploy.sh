#!/bin/bash
# InfraBuild Management Console — Lightsail Deploy Script
# Run from repo root: bash InfraBuild-Partners/console/deploy.sh

set -e

SSH_KEY="$HOME/Downloads/Reel-Studio.pem"
SERVER="ubuntu@13.42.254.231"
CONSOLE_DIR="/Users/sanskargupta/Desktop/Freelance Projects/Sanskar-Porfolio/InfraBuild-Partners/console"
REMOTE_DIR="/var/www/infrabuild-partners/console"

echo "=== Deploying InfraBuild Management Console ==="

# 1. Copy console files
echo "[1/5] Copying console files..."
ssh -i "$SSH_KEY" "$SERVER" "sudo mkdir -p $REMOTE_DIR && sudo chown ubuntu:ubuntu $REMOTE_DIR"
scp -i "$SSH_KEY" -r "$CONSOLE_DIR/"* "$SERVER:$REMOTE_DIR/"

# 2. Install Python dependencies
echo "[2/5] Installing Python dependencies..."
ssh -i "$SSH_KEY" "$SERVER" << 'ENDSSH'
    cd /var/www/infrabuild-partners/console/api
    pip3 install -r requirements.txt --quiet 2>&1 | tail -3
ENDSSH

# 3. Stop old service if running
echo "[3/5] Stopping old service..."
ssh -i "$SSH_KEY" "$SERVER" "sudo systemctl stop infrabuild-console 2>/dev/null || true"

# 4. Create systemd service
echo "[4/5] Setting up systemd service..."
ssh -i "$SSH_KEY" "$SERVER" << 'ENDSSH'
    if [ ! -f /etc/infrabuild-console.env ]; then
        sudo tee /etc/infrabuild-console.env > /dev/null << EOF
CONSOLE_PORT=8000
CONSOLE_SECRET_KEY=$(openssl rand -hex 32)
# Set this before starting the service:
# CONSOLE_ADMIN_PASSWORD_HASH=<bcrypt_hash>
EOF
        sudo chmod 600 /etc/infrabuild-console.env
        echo "Created /etc/infrabuild-console.env. Add CONSOLE_ADMIN_PASSWORD_HASH before first production start."
    fi

    sudo tee /etc/systemd/system/infrabuild-console.service > /dev/null << 'EOF'
[Unit]
Description=InfraBuild Management Console API
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/var/www/infrabuild-partners/console/api
EnvironmentFile=/etc/infrabuild-console.env
ExecStart=/usr/bin/python3 /var/www/infrabuild-partners/console/api/main.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable infrabuild-console
    sudo systemctl start infrabuild-console
    sleep 2
    sudo systemctl status infrabuild-console --no-pager | head -15
ENDSSH

# 5. Configure Nginx
echo "[5/5] Configuring Nginx proxy..."
ssh -i "$SSH_KEY" "$SERVER" << 'ENDSSH'
    # Backup current config
    sudo cp /etc/nginx/sites-enabled/infrabuild-partners /etc/nginx/sites-enabled/infrabuild-partners.bak 2>/dev/null || true

    # Check if /console and /api proxy already configured
    if ! grep -q "location /console" /etc/nginx/sites-enabled/infrabuild-partners 2>/dev/null; then
        # Add proxy config before the last closing brace
        sudo sed -i.bak2 '/^}$/i\
    # Management Console + API\
    location /console {\
        try_files $uri $uri/ /console/index.html;\
    }\
\
    location /api/ {\
        proxy_pass http://127.0.0.1:8000;\
        proxy_set_header Host $host;\
        proxy_set_header X-Real-IP $remote_addr;\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\
        proxy_set_header X-Forwarded-Proto $scheme;\
        proxy_read_timeout 120s;\
    }' /etc/nginx/sites-enabled/infrabuild-partners
    fi

    sudo nginx -t && sudo systemctl reload nginx
ENDSSH

echo ""
echo "=== Deploy Complete! ==="
echo "Console: https://infrabuildpartners.com/console"
echo "API:     https://infrabuildpartners.com/api/health"
echo ""
echo "Console secrets live on the server in /etc/infrabuild-console.env"
echo "To set/change the password hash:"
echo "  ssh -i ~/Downloads/Reel-Studio.pem ubuntu@13.42.254.231"
echo "  cd /var/www/infrabuild-partners/console/api"
echo "  python3 - <<'PY'"
echo "from passlib.context import CryptContext"
echo "print(CryptContext(schemes=['bcrypt'], deprecated='auto').hash('PASTE_NEW_PASSWORD_HERE'))"
echo "PY"
echo "  sudo sed -i 's|^# CONSOLE_ADMIN_PASSWORD_HASH=.*|CONSOLE_ADMIN_PASSWORD_HASH=<new_hash>|' /etc/infrabuild-console.env"
echo "  sudo systemctl daemon-reload && sudo systemctl restart infrabuild-console"
