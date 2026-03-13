#!/bin/bash
# ============================================
# AKS System - Deploy Script untuk VM Proxmox
# ============================================
# Jalankan sebagai root: sudo bash deploy/deploy.sh
# ============================================

set -e
APP_DIR="/var/www/aks"
REPO_DIR=$(pwd)

echo "🚀 AKS System Deployment"
echo "========================"

# 1. Install Node.js 18 LTS (jika belum ada)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js 18..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi
echo "✅ Node.js $(node -v)"

# 2. Install PM2 (jika belum ada)
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# 3. Install Nginx (jika belum ada)
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    apt-get install -y nginx
fi

# 4. Setup MySQL database
echo "🗄️  Setting up database..."
if command -v mysql &> /dev/null; then
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS aks_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || true
else
    echo "⚠️  MySQL not found. Please install MySQL and create 'aks_db' database manually."
fi

# 5. Copy files
echo "📁 Deploying to $APP_DIR..."
mkdir -p $APP_DIR
cp -r $REPO_DIR/* $APP_DIR/ 2>/dev/null || true
cp -r $REPO_DIR/.env $APP_DIR/ 2>/dev/null || true
cd $APP_DIR

# 6. Install dependencies
echo "📦 Installing dependencies..."
npm install --production=false

# 7. Build frontend
echo "🔨 Building frontend..."
npm run build

# 8. Seed database
echo "🌱 Seeding database..."
node server/seed.js

# 9. Configure Nginx
echo "🌐 Configuring Nginx..."
cp deploy/nginx.conf /etc/nginx/sites-available/aks
ln -sf /etc/nginx/sites-available/aks /etc/nginx/sites-enabled/aks
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# 10. Start with PM2
echo "🚀 Starting backend with PM2..."
pm2 delete aks-backend 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup 2>/dev/null || true

echo ""
echo "✅ AKS System deployed successfully!"
echo "🌐 Frontend: http://$(hostname -I | awk '{print $1}')"
echo "📡 API: http://$(hostname -I | awk '{print $1}')/api/health"
echo ""
echo "📋 Useful commands:"
echo "   pm2 logs aks-backend    - View logs"
echo "   pm2 restart aks-backend - Restart server"
echo "   pm2 status              - Check status"
