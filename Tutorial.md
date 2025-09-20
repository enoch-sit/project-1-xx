# Tutorial Guide: Customizing Your Project Web Page

This guide will walk you through changing the default "It works! Nginx with SSL is running." message to "This is one of the best project, I have done - group name" on your project server.

## Overview

This repository contains multiple chatbot implementations using different technologies. The `deploy_ssl.sh` script sets up Nginx with SSL certificates and creates a default web page that displays "It works! Nginx with SSL is running." We'll customize this default page.

## Understanding the Infrastructure

### Current Setup
- **Server**: `project-1-xx.eduhk.hk` (where xx is your project number)
- **Nginx Configuration**: Located at `/etc/nginx/sites-available/$(hostname)`
- **Web Root**: `/var/www/html/`
- **Default Page**: `/var/www/html/index.html`
- **SSL**: Configured with wildcard certificate for `*.eduhk.hk`

### Project Structure
This repository contains 5 different chatbot implementations:
1. `chatbot_01_MVP/` - Basic Node.js/Express chatbot
2. `chatbot_02_MVPEnvSet/` - Environment variable setup
3. `chatbot_03_MVPCORS/` - CORS configured version
4. `chatbot_04_MVPPython/` - Python FastAPI backend
5. `chatbot_05_MVPPythonTypescriptReact/` - Full React TypeScript frontend

## Step-by-Step Guide

### Step 1: Connect to Your Server

1. Open your terminal/command prompt
2. SSH into your server:
   ```bash
   ssh projxx@project-1-xx.eduhk.hk
   ```
   Replace `xx` with your actual project number.

**Important Note About `sudo`**: Throughout this tutorial, you'll see commands that start with `sudo` (which stands for "superuser do"). When you run a `sudo` command, you'll be prompted to enter your password - this is the same password you use to SSH into the server. For security reasons, you won't see the password characters as you type them, but they are being entered. Just type your password and press Enter.

### Step 2: Locate the Web Root Directory

The web files are served from `/var/www/html/`. This is where the default `index.html` file is located.

```bash
cd /var/www/html
ls -la
```

You should see an `index.html` file that was created by the `deploy_ssl.sh` script.

### Step 3: Backup the Original File (Recommended)

Always backup before making changes:

```bash
sudo cp index.html index.html.backup
```

**Note**: When you use `sudo` (which means "superuser do"), you'll be prompted to enter your password. This is the same password you used to SSH into the server. Type your password and press Enter. For security reasons, you won't see the password characters as you type them - this is normal!

### Step 4: Edit the Default Web Page

Option A: **Simple Text Editor (nano)**
```bash
sudo nano index.html
```

Option B: **Vi/Vim Editor**
```bash
sudo vi index.html
```

### Step 5: Replace the Content

The current content should look like this:
```html
<!DOCTYPE html>
<html><head><title>Test Page</title></head><body><h1>It works! Nginx with SSL is running.</h1></body></html>
```

Replace it with your custom message:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Project Success - [Your Group Name]</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: white;
        }
        .container {
            text-align: center;
            padding: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .group-name {
            font-style: italic;
            color: #ffd700;
        }
        .server-info {
            margin-top: 30px;
            font-size: 0.9em;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>This is one of the best project, I have done</h1>
        <p class="group-name">- [Replace with Your Group Name]</p>
        <div class="server-info">
            <p>Server: project-1-xx.eduhk.hk</p>
            <p>Nginx with SSL ✅</p>
        </div>
    </div>
</body>
</html>
```

**Important**: Replace `[Replace with Your Group Name]` with your actual group name!

### Step 6: Save the File

**For nano**: Press `Ctrl + X`, then `Y`, then `Enter`

**For vi/vim**: Press `Esc`, type `:wq`, press `Enter`

### Step 7: Set Correct Permissions

Ensure the file has the correct permissions:

```bash
sudo chown www-data:www-data index.html
sudo chmod 644 index.html
```

**🔐 File Permissions Explained:**

**`sudo chown www-data:www-data index.html`**:
- **`chown`** = **Ch**ange **Own**ership command
- **`www-data:www-data`** = Set owner to `www-data` user and `www-data` group
  - `www-data` is the standard web server user in Ubuntu/Debian
  - Nginx runs as this user, so it needs to own web files to serve them
- **Why needed**: Nginx must be able to read files to serve them to visitors

**`sudo chmod 644 index.html`**:
- **`chmod`** = **Ch**ange file **Mod**e (permissions) command
- **`644`** = Permission numbers (octal notation):
  - **`6`** (Owner: www-data) = Read(4) + Write(2) = Can read and edit file
  - **`4`** (Group: www-data) = Read(4) only = Can read file
  - **`4`** (Everyone else) = Read(4) only = Can read file
- **Why 644**: Web files should be readable by everyone but only writable by owner

**Security Note**: These permissions ensure files are accessible to the web server but protected from unauthorized changes.

### Step 8: Test Nginx Configuration

Before reloading, test the Nginx configuration:

```bash
sudo nginx -t
```

If the test passes, reload Nginx:

```bash
sudo systemctl reload nginx
```

### Step 9: Verify the Changes

1. Open your web browser
2. Navigate to: `https://project-1-xx.eduhk.hk` (replace xx with your project number)
3. You should see your custom message instead of the default one

## Alternative: Quick Single Chatbot Deployment

If you want to deploy just one chatbot project instead of going through the full progressive deployment:

### Recommended: Use Part 2 for Complete Guide

Part 2 provides step-by-step instructions for deploying each chatbot with proper process management, Docker containerization (for Python projects), and comprehensive testing.

### Quick Docker Deployment (Python Projects - chatbot_04/05):

If you specifically want to deploy a Python chatbot quickly:

1. **Install Docker and Docker Compose**:
   ```bash
   # Install Docker (method)
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Install Docker Compose
   sudo apt install docker-compose-plugin -y
   
   # Logout and login again, then verify
   docker --version
   docker compose version
   ```

2. **Clone and configure**:
   ```bash
   cd ~
   git clone https://github.com/enoch-sit/project-1-xx.git
   cd project-1-xx/chatbot_04_MVPPython  # or chatbot_05_...
   
   # Configure environment
   cp .env.example .env
   nano .env  # Add your EDUHK_API_KEY
   ```

3. **Deploy with Docker**:
   ```bash
   # Check port availability first
   ss -tuln | grep ':8000'
   # No output = port is free, any output = port is busy
   
   # Start with Docker Compose
   docker compose up -d
   
   # Verify it's running
   docker compose ps
   ```

   **ℹ️ Port Check**: The `ss -tuln | grep` command checks if a port is already in use. See detailed explanation in Part 2.

**Why Docker?** Docker eliminates Python version conflicts, dependency issues, and environment setup problems. It's much more reliable than manual Python installation.

### Quick Node.js Deployment (chatbot_02/03):

For Node.js projects, see the detailed NVM installation and PM2 setup in Part 2, which provides process management.

## Troubleshooting

### Common Issues:

1. **Permission Denied**:
   ```bash
   sudo chown -R www-data:www-data /var/www/html
   sudo chmod -R 755 /var/www/html
   ```

   **🔐 Recursive Permissions Explained:**
   - **`-R`** = **R**ecursive flag (applies to all files and folders inside)
   - **`755`** for directories = Owner: read/write/execute(7), Others: read/execute(5)
   - **Why 755**: Directories need execute permission for users to "enter" them
   - **Use when**: Fixing permission problems across multiple files/folders

   ℹ️ **See detailed permission explanation in Step 7 above for more details.**

2. **Nginx Configuration Error**:
   ```bash
   sudo nginx -t
   # Check error logs:
   sudo tail -f /var/log/nginx/error.log
   ```

3. **SSL Certificate Issues**:
   - Ensure the SSL files exist in `/etc/nginx/ssl/dept-wildcard.eduhk/`
   - Check certificate validity

4. **Page Not Loading**:
   - Verify Nginx is running: `sudo systemctl status nginx`
   - Check if port 443 is accessible
   - Verify DNS resolution

### Restore Original File:
If you need to go back to the original:

```bash
sudo cp index.html.backup index.html
sudo systemctl reload nginx
```

## Advanced Customization

### Adding Interactive Elements

You can enhance your page by:

1. **Adding JavaScript** for dynamic content
2. **Including CSS animations** for better visual appeal
3. **Adding links** to your chatbot projects
4. **Including project documentation** or screenshots

### Example Enhanced Version:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Project Portfolio - [Group Name]</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Add your enhanced CSS here */
    </style>
</head>
<body>
    <div class="container">
        <h1>This is one of the best project, I have done</h1>
        <p class="group-name">- [Your Group Name]</p>
        
        <div class="projects">
            <h2>Our Chatbot Implementations:</h2>
            <ul>
                <li><a href="/chatbot01">Basic MVP Chatbot</a></li>
                <li><a href="/chatbot02">Environment Configured</a></li>
                <li><a href="/chatbot03">CORS Enabled</a></li>
                <li><a href="/chatbot04">Python FastAPI</a></li>
                <li><a href="/chatbot05">React TypeScript</a></li>
            </ul>
        </div>
        
        <div class="tech-stack">
            <h3>Technologies Used:</h3>
            <p>Node.js • Python • React • TypeScript • FastAPI • Express • Nginx</p>
        </div>
    </div>
</body>
</html>
```

## Security Notes

- Always backup files before making changes
- Use `sudo` only when necessary
- Keep your API keys secure in environment variables
- Regularly update your server packages
- Monitor server logs for unusual activity

## Summary

You have successfully learned how to:
1. ✅ Connect to your EDUHK project server
2. ✅ Locate and edit the default web page
3. ✅ Customize the message with proper HTML/CSS
4. ✅ Set correct file permissions
5. ✅ Reload Nginx configuration
6. ✅ Verify your changes
7. ✅ (Optional) Deploy your chatbot projects

Your custom message should now be displayed when visitors access `https://project-1-xx.eduhk.hk`!

## Next Steps

Consider:
- Deploying one of your chatbot implementations
- Adding more interactive features to your page
- Setting up automated deployment with GitHub Actions
- Monitoring your server with logging and analytics

---

## Part 2: Progressive Chatbot Deployment (02 → 03 → 04 → 05)

Now let's deploy each chatbot implementation in order, building upon each previous deployment to understand the evolution of the technology stack.

## Prerequisites for Chatbot Deployment

Before starting, ensure you have:
1. ✅ SSH access to your server (`projxx@project-1-xx.eduhk.hk`)
2. ✅ Your EDUHK API key
3. ✅ Git repository cloned to the server
4. ✅ Basic understanding of the custom page deployment from Part 1

### Initial Server Setup (One-Time Only)

Connect to your server and install required tools:

```bash
ssh projxx@project-1-xx.eduhk.hk
```

Update system packages:
```bash
sudo apt update && sudo apt upgrade -y
```

Install Git (if not already installed):
```bash
sudo apt install git -y
```

Clone your repository:
```bash
cd ~
git clone https://github.com/enoch-sit/project-1-xx.git
```

---

## Deployment 1: Chatbot 02 - Environment Variables Setup

**Learning Goal**: Understand Node.js deployment and environment variable management.

### Step 1: Install Node.js and npm

Install Node Version Manager (NVM) for better Node.js management:

```bash
# Install the latest NVM (v0.40.3 as of September 2025)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Reload your shell configuration
source ~/.bashrc

# Install latest Node.js LTS (Long Term Support)
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

**Why NVM?** NVM is the standard way to install Node.js. It's easier, more reliable, and allows you to switch Node.js versions if needed.

### Step 2: Navigate to Chatbot 02 Directory

```bash
cd ~/project-1-xx/chatbot_02_MVPEnvSet
ls -la  # You should see package.json, server.js, public/, etc.
```

### Step 3: Install Dependencies

```bash
npm install
```

This installs:
- Express (web server)
- CORS (cross-origin requests)
- dotenv (environment variables)
- axios (HTTP client)
- nodemon (development auto-restart)

### Step 4: Configure Environment Variables

```bash
cp .env.example .env
nano .env
```

Edit the `.env` file:
```bash
# Replace 'your_api_key_here' with your actual EDUHK API key
EDUHK_API_KEY=your_actual_api_key_here
PORT=3001
```

**Save and exit**: `Ctrl + X`, then `Y`, then `Enter`

**Port Check**: Before proceeding, verify port 3001 is available:
```bash
# Check if port 3001 is free
ss -tuln | grep ':3001'
# If output shows the port is in use, change PORT=3001 to a different port (e.g., 3003) in .env
```

**🔍 Command Explanation**: 
- `ss -tuln` = **S**ocket **S**tatistics command that shows all listening ports
  - `-t` = Show TCP connections
  - `-u` = Show UDP connections  
  - `-l` = Show only listening ports (services waiting for connections)
  - `-n` = Show numerical addresses/ports (don't resolve hostnames)
- `grep ':3001'` = Filter results to show only lines containing ':3001'
- **Expected result**: If port is free, you'll see no output. If port is busy, you'll see something like `tcp LISTEN 0.0.0.0:3001`

### Step 5: Update Nginx Configuration for Chatbot 02

Create a new location block for chatbot 02:

```bash
sudo nano /etc/nginx/sites-available/$(hostname)
```

Add this location block inside the existing server block (replace the default location):

```nginx
    # Chatbot 02 - Environment Variables Demo (replaces default site)
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }
```

Test and reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: Start Chatbot 02 (Test Run)

First, let's test if everything works:

```bash
# Test run first (this will occupy your terminal)
npm start

# If it works, you should see:
# 🚀 Chatbot MVP server running on http://localhost:3001
```

### Step 7: Test Chatbot 02

**Keep the npm start process running** and open a new browser window:
`https://project-1-xx.eduhk.hk`

You should see the chatbot interface. Test it by sending a message.

### Step 8: Set Up Process Management (PM2)

Now let's set up PM2 for proper process management. 

**First, stop the test process:**
- Go back to the terminal where `npm start` is running
- Press `Ctrl + C` to stop the process

Install PM2 for process management:
```bash
sudo npm install -g pm2
```

Now start the application with PM2:

```bash
cd ~/project-1-xx/chatbot_02_MVPEnvSet
pm2 start server.js --name "chatbot02"
pm2 save
pm2 startup
```

Follow the PM2 startup command it shows you (copy and run the `sudo` command).

**Test again** to make sure it's still working: `https://project-1-xx.eduhk.hk`

### 🛑 How to Stop Chatbot 02

When you're ready to move to the next deployment or need to stop the service:

```bash
# Stop the specific chatbot process
pm2 stop chatbot02

# Or delete it completely (removes from PM2 list)
pm2 delete chatbot02

# Check PM2 status to verify it's stopped
pm2 status
```

**When to stop:** Before deploying the next chatbot to avoid port conflicts and resource usage.

---

## Deployment 2: Chatbot 03 - CORS Configuration

**Learning Goal**: Understand Cross-Origin Resource Sharing and security improvements.

### Step 1: Navigate to Chatbot 03

```bash
cd ~/project-1-xx/chatbot_03_MVPCORS
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env
nano .env
```

Set the environment variables:
```bash
EDUHK_API_KEY=your_actual_api_key_here
PORT=3002
```

**Port Check**: Verify port 3002 is available:
```bash
# Check if port 3002 is free  
ss -tuln | grep ':3002'
# If output shows the port is in use, change PORT=3002 to a different port (e.g., 3004) in .env
```

**ℹ️ Note**: See the detailed explanation of the `ss -tuln | grep` command in Chatbot 02 section above.

### Step 3: Update Nginx for Chatbot 03

```bash
sudo nano /etc/nginx/sites-available/$(hostname)
```

Replace the location block with:

```nginx
    # Chatbot 03 - CORS Configuration Demo (replaces current site)
    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }
```

Test and reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 4: Start Chatbot 03 (Test Run)

First, test if everything works:

```bash
# Test run first (this will occupy your terminal)
npm start

# If it works, you should see:
# 🚀 Chatbot MVP server running on http://localhost:3002
```

### Step 5: Test Chatbot 03

**Keep the npm start process running** and open a new browser window:
Visit: `https://project-1-xx.eduhk.hk`

**Key Difference**: This version has proper CORS configuration for production security.

### Step 6: Set Up Process Management (PM2)

Now let's set up PM2 for Chatbot 03.

**First, stop the test process:**
- Go back to the terminal where `npm start` is running
- Press `Ctrl + C` to stop the process

Start with PM2:
```bash
pm2 start server.js --name "chatbot03"
pm2 save
```

**Test again** to make sure it's still working: `https://project-1-xx.eduhk.hk`

### 🛑 How to Stop Chatbot 03

When you're ready to move to the next deployment or need to stop the service:

```bash
# Stop the specific chatbot process
pm2 stop chatbot03

# Or delete it completely (removes from PM2 list)
pm2 delete chatbot03

# Check PM2 status to verify it's stopped
pm2 status
```

**When to stop:** Before deploying the next chatbot to avoid port conflicts and resource usage.

---

## Deployment 3: Chatbot 04 - Python FastAPI

**Learning Goal**: Transition to Python backend with modern async capabilities using Docker.

### Step 1: Navigate to Chatbot 04 Directory

```bash
cd ~/project-1-xx/chatbot_04_MVPPython
ls -la  # You should see docker-compose.yml, Dockerfile, main.py, etc.
```

### Step 2: Configure Environment Variables

```bash
cp .env.example .env
nano .env
```

Set the variables:
```bash
EDUHK_API_KEY=your_actual_api_key_here
APP_HOST=0.0.0.0
APP_PORT=8000
```

### Step 3: Update Nginx for Chatbot 04

```bash
sudo nano /etc/nginx/sites-available/$(hostname)
```

Replace the location block with:

```nginx
    # Chatbot 04 - Python FastAPI Demo (replaces current site)
    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        # Important for streaming responses
        proxy_buffering off;
        proxy_cache off;
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
    }
```

### Step 4: Update Docker Compose Port

We need to change the port in docker-compose.yml to avoid conflicts:

```bash
nano docker-compose.yml
```

**First, check if port 8001 is available:**
```bash
# Check if port 8001 is free
ss -tuln | grep ':8001'
# If output shows the port is in use, choose a different port (e.g., 8003)
```

**ℹ️ Port Command**: See detailed explanation of `ss -tuln | grep` in the Chatbot 02 section.

Change the ports section from `"8000:8000"` to `"8001:8000"` (or your chosen free port):

```yaml
    ports:
      - "8001:8000"
```

### Step 5: Test Nginx Configuration First

Test and reload Nginx before starting Docker:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: Start Chatbot 04 with Docker

```bash
# Build and start the container
docker compose up -d

# Check if it's running
docker compose ps

# View logs if needed
docker compose logs -f
```

**Why Docker?** Docker eliminates Python environment setup issues and ensures consistent deployment across different systems.

### Step 7: Test Chatbot 04

Visit: `https://project-1-xx.eduhk.hk`

**Key Features**:
- Real-time streaming responses
- Better error handling
- Modern Python async architecture
- FastAPI automatic documentation at `/docs`
- Containerized deployment

### 🛑 How to Stop Chatbot 04

When you're ready to move to the next deployment or need to stop the service:

```bash
# Navigate to the chatbot 04 directory
cd ~/project-1-xx/chatbot_04_MVPPython

# Stop and remove the Docker containers
docker compose down

# Verify containers are stopped
docker compose ps

# Optional: Remove Docker images to free space
docker compose down --rmi all
```

**When to stop:** Before deploying the next chatbot to free up ports (8001) and system resources.

---

## Deployment 4: Chatbot 05 - React TypeScript Frontend

**Learning Goal**: Full-stack modern web application with TypeScript and React using Docker.

### Step 1: Set Up Backend with Docker

```bash
cd ~/project-1-xx/chatbot_05_MVPPythonTypescriptReact/chatbot_05_MVPPythonTypescriptReact\ -\ Copy

# Configure environment
cp .env.example .env
nano .env
```

Backend environment:
```bash
EDUHK_API_KEY=your_actual_api_key_here
APP_HOST=0.0.0.0
APP_PORT=8000
```

### Step 2: Update Docker Compose Port

Edit the docker-compose.yml to use port 8002:

```bash
nano docker-compose.yml
```

**First, check if port 8002 is available:**
```bash
# Check if port 8002 is free
ss -tuln | grep ':8002'  
# If output shows the port is in use, choose a different port (e.g., 8004)
```

**ℹ️ Port Command**: Refer to the detailed `ss -tuln | grep` explanation in Chatbot 02 section.

Change the ports section from `"8000:8000"` to `"8002:8000"` (or your chosen free port):

```yaml
    ports:
      - "8002:8000"
```

### Step 3: Start Backend with Docker

```bash
# Build and start the backend container
docker compose up -d

# Check if it's running
docker compose ps
```

### Step 4: Set Up Frontend (React TypeScript)

```bash
cd frontend

# Install dependencies (NVM is already installed from earlier)
npm install

# Build for production
npm run build
```

### Step 5: Deploy Frontend to Nginx

```bash
# Create directory for chatbot05
sudo mkdir -p /var/www/html/chatbot05

# Copy built files
sudo cp -r dist/* /var/www/html/chatbot05/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/chatbot05
sudo chmod -R 755 /var/www/html/chatbot05
```

**ℹ️ Permissions Note**: These commands set the proper ownership and permissions for web files. See the detailed explanation in Step 7 of Part 1 for what `chown` and `chmod` do.

### Step 6: Update Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/$(hostname)
```

Replace the nginx configuration with:

```nginx
    # Chatbot 05 - Full-Stack React TypeScript (replaces current site)
    location / {
        root /var/www/html/chatbot05;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # API routes for chatbot 05 backend
    location /api/v2/ {
        proxy_pass http://127.0.0.1:8002/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        # Enable streaming
        proxy_buffering off;
        proxy_cache off;
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
    }
```

Test and reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7: Test Full-Stack Application

Visit: `https://project-1-xx.eduhk.hk`

**Key Features**:
- Modern React TypeScript frontend
- Real-time streaming with TypeScript types
- Professional UI with components
- Markdown support for responses
- Settings and customization options
- Containerized backend deployment

### 🛑 How to Stop Chatbot 05

When you need to stop the full-stack application:

```bash
# Navigate to the chatbot 05 directory
cd ~/project-1-xx/chatbot_05_MVPPythonTypescriptReact/chatbot_05_MVPPythonTypescriptReact\ -\ Copy

# Stop and remove the Docker backend
docker compose down

# Verify backend containers are stopped
docker compose ps

# The frontend files are static in nginx, but you can restore the original page:
sudo cp /var/www/html/index.html.backup /var/www/html/index.html 2>/dev/null || echo "No backup found"

# Reload nginx to serve the restored content
sudo systemctl reload nginx
```

**When to stop:** When you're done testing or want to deploy a different chatbot configuration.

---

## Optional: Create a Portfolio Landing Page

**Note**: Since each chatbot deployment replaces the main site, this landing page is optional and would only be visible if you restore it after testing the individual chatbots.

If you want to create a portfolio page showcasing your completed deployments, you can create this after completing all the chatbot deployments:

```bash
sudo nano /var/www/html/index.html
```

Replace the content with:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Chatbot Portfolio - [Your Group Name]</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            color: white;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 50px;
        }
        h1 {
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .group-name {
            font-size: 1.2em;
            font-style: italic;
            color: #ffd700;
            margin-bottom: 10px;
        }
        .subtitle {
            opacity: 0.9;
            font-size: 1.1em;
        }
        .chatbots-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .chatbot-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            color: white;
            display: block;
        }
        .chatbot-number {
            font-size: 2em;
            font-weight: bold;
            color: #ffd700;
            margin-bottom: 15px;
        }
        .chatbot-title {
            font-size: 1.3em;
            margin-bottom: 15px;
            font-weight: 600;
        }
        .chatbot-tech {
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.85em;
            display: inline-block;
            margin: 5px 5px 5px 0;
        }
        .chatbot-description {
            margin-top: 15px;
            opacity: 0.9;
            line-height: 1.5;
        }
        .progress-indicator {
            text-align: center;
            margin: 40px 0;
        }
        .progress-bar {
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            margin: 20px 0;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #ffd700, #ffed4e);
            border-radius: 3px;
            animation: progressAnimation 2s ease-out;
        }
        @keyframes progressAnimation {
            from { width: 0%; }
            to { width: 100%; }
        }
        .footer {
            text-align: center;
            margin-top: 60px;
            opacity: 0.8;
        }
        .server-info {
            margin-top: 20px;
            font-size: 0.9em;
        }
        .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #4CAF50;
            border-radius: 50%;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>This is one of the best project, I have done</h1>
            <p class="group-name">- [Your Group Name Here]</p>
            <p class="subtitle">Progressive Chatbot Implementation Portfolio</p>
        </div>

        <div class="progress-indicator">
            <h2>Deployment Progress</h2>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 100%;"></div>
            </div>
            <p>4/4 Chatbot Implementations Deployed Successfully</p>
        </div>

        <div class="chatbots-grid">
            <div class="chatbot-card">
                <div class="chatbot-number">02</div>
                <div class="chatbot-title">Environment Variables ✅</div>
                <div>
                    <span class="chatbot-tech">Node.js</span>
                    <span class="chatbot-tech">Express</span>
                    <span class="chatbot-tech">dotenv</span>
                </div>
                <div class="chatbot-description">
                    Foundation chatbot with proper environment variable management and basic Express server setup.
                </div>
            </div>

            <div class="chatbot-card">
                <div class="chatbot-number">03</div>
                <div class="chatbot-title">CORS Configuration ✅</div>
                <div>
                    <span class="chatbot-tech">Node.js</span>
                    <span class="chatbot-tech">CORS</span>
                    <span class="chatbot-tech">Security</span>
                </div>
                <div class="chatbot-description">
                    Enhanced security with Cross-Origin Resource Sharing policies and production-ready configuration.
                </div>
            </div>

            <div class="chatbot-card">
                <div class="chatbot-number">04</div>
                <div class="chatbot-title">Python FastAPI ✅</div>
                <div>
                    <span class="chatbot-tech">Python</span>
                    <span class="chatbot-tech">FastAPI</span>
                    <span class="chatbot-tech">Async</span>
                </div>
                <div class="chatbot-description">
                    Modern Python backend with async capabilities, real-time streaming, and automatic API documentation.
                </div>
            </div>

            <div class="chatbot-card">
                <div class="chatbot-number">05</div>
                <div class="chatbot-title">React TypeScript ✅</div>
                <div>
                    <span class="chatbot-tech">React</span>
                    <span class="chatbot-tech">TypeScript</span>
                    <span class="chatbot-tech">Vite</span>
                </div>
                <div class="chatbot-description">
                    Full-stack application with React TypeScript frontend, component architecture, and modern tooling.
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="server-info">
                <p><span class="status-indicator"></span>Server: project-1-xx.eduhk.hk</p>
                <p><span class="status-indicator"></span>Nginx with SSL Certificate</p>
                <p><span class="status-indicator"></span>All Services Running</p>
            </div>
            <p style="margin-top: 30px; opacity: 0.7;">
                Technologies: Node.js • Python • React • TypeScript • FastAPI • Express • Nginx
            </p>
        </div>
    </div>
</body>
</html>
```

Remember to replace `[Your Group Name Here]` with your actual group name!

## Process Management Commands

### Monitor Your Services

**For Node.js chatbots (02, 03):**
```bash
# Check status of all PM2 processes
pm2 status

# View logs for all processes
pm2 logs

# View logs for specific chatbot
pm2 logs chatbot02

# Restart all PM2 processes
pm2 restart all

# Restart specific chatbot
pm2 restart chatbot02
```

**For Docker chatbots (04, 05):**
```bash
# Check running containers (run from chatbot directory)
docker compose ps

# View logs
docker compose logs -f

# Restart services
docker compose restart

# Check container resource usage
docker stats
```

### Stop/Start Individual Services

**Node.js Chatbots (PM2):**
```bash
# Stop specific service
pm2 stop chatbot02
pm2 stop chatbot03

# Start specific service
pm2 start chatbot02
pm2 start chatbot03

# Delete service completely (remove from PM2 list)
pm2 delete chatbot02
pm2 delete chatbot03

# Stop all PM2 processes
pm2 stop all

# Delete all PM2 processes
pm2 delete all
```

**Docker Chatbots:**
```bash
# Stop services (from chatbot directory)
cd ~/project-1-xx/chatbot_04_MVPPython
docker compose down

cd ~/project-1-xx/chatbot_05_MVPPythonTypescriptReact/chatbot_05_MVPPythonTypescriptReact\ -\ Copy
docker compose down

# Start services
docker compose up -d

# Stop and remove everything (containers, networks, images)
docker compose down --rmi all --volumes
```

### Complete System Cleanup

**Stop all services and free resources:**
```bash
# Stop all PM2 processes
pm2 delete all

# Stop all Docker containers
docker stop $(docker ps -aq) 2>/dev/null || echo "No containers running"

# Remove all Docker containers
docker rm $(docker ps -aq) 2>/dev/null || echo "No containers to remove"

# Check what's still running on ports
sudo netstat -tlnp | grep :300  # Node.js ports
sudo netstat -tlnp | grep :800  # Docker ports
```

### Quick Reference: When to Stop Services

**🔄 Moving between chatbots (recommended workflow):**
1. Stop current service using the 🛑 section in each deployment
2. Update nginx configuration for next chatbot
3. Start next service

**🧹 Troubleshooting port conflicts:**
1. Use `pm2 status` and `docker compose ps` to see what's running
2. Stop conflicting services with `pm2 stop <name>` or `docker compose down`
3. Use `ss -tuln | grep :<port>` to verify ports are free

**💾 Saving resources:**
- Use `pm2 stop` to pause services without removing them
- Use `docker compose down` to stop and remove containers
- Use complete cleanup commands when starting fresh

**🚨 Emergency stop everything:**
```bash
pm2 delete all && docker stop $(docker ps -aq) 2>/dev/null
```

# View logs
docker compose logs -f

# Restart services
docker compose restart

# Stop services
docker compose down

# Start services
docker compose up -d
```

## Testing All Deployments

Test your deployed chatbot:
- **Current Deployment**: `https://project-1-xx.eduhk.hk`

**Note**: Each chatbot deployment replaces the main site. Only one chatbot can be active at a time. See the "Understanding Nginx Routing" section below for more details.

## Troubleshooting Progressive Deployment

### Common Issues:

1. **Port Conflicts**: Each chatbot uses different ports (3001, 3002, 8001, 8002)
2. **PM2 Process Management**: Use `pm2 delete <name>` to remove stuck processes
3. **Docker vs PM2 Conflicts**: Never run the same service with both PM2 and Docker simultaneously
4. **Nginx Configuration**: Always test with `sudo nginx -t` before reloading
5. **Environment Variables**: Double-check `.env` files in each directory
6. **Python Virtual Environments**: Always activate with `source venv/bin/activate`
7. **Frontend Build Issues**: Rebuild with `npm run build` if assets are missing

### Port Troubleshooting Guide:

**Understanding `ss -tuln | grep` command output:**

✅ **Port is FREE** (safe to use):
```bash
ss -tuln | grep ':3001'
# No output shown = Port 3001 is available
```

❌ **Port is BUSY** (choose different port):
```bash
ss -tuln | grep ':3001'
tcp   LISTEN   0.0.0.0:3001   *:*
# Output shown = Port 3001 is already in use
```

**What to do if port is busy:**
1. Change the port number in your `.env` file (e.g., 3001 → 3003)
2. Update the corresponding nginx configuration 
3. Test the new port: `ss -tuln | grep ':3003'`

**Find what's using a port:**
```bash
# Show which process is using port 3001
sudo lsof -i :3001
# or
sudo netstat -tlnp | grep :3001
```

### File Permissions Troubleshooting Guide:

**Common Permission Error Signs:**
- "403 Forbidden" errors in browser
- "Permission denied" when editing files  
- Web server can't access files

**Quick Permission Fix:**
```bash
# Fix ownership (make www-data own the files)
sudo chown -R www-data:www-data /var/www/html

# Fix permissions (set proper read/write/execute permissions)
sudo chmod -R 755 /var/www/html

# For individual files (like index.html)
sudo chmod 644 /var/www/html/index.html
```

**Permission Numbers Quick Reference:**
- **`644`** (files) = Owner: read/write, Others: read-only
- **`755`** (directories) = Owner: full access, Others: read/execute
- **`www-data`** = Ubuntu's web server user (nginx runs as this user)

**Check Current Permissions:**
```bash
# See file ownership and permissions
ls -la /var/www/html/
# Look for: -rw-r--r-- (644) and drwxr-xr-x (755)
```

### Quick Diagnosis:
```bash
# Check all running processes
pm2 status

# Check nginx status
sudo systemctl status nginx

# Check logs
pm2 logs
sudo tail -f /var/log/nginx/error.log
```

## Summary: Progressive Learning Journey

You have successfully deployed:

✅ **Chatbot 02**: Learned Node.js deployment and environment management
✅ **Chatbot 03**: Understood CORS security and production configurations  
✅ **Chatbot 04**: Mastered Python FastAPI and async programming
✅ **Chatbot 05**: Built full-stack React TypeScript application

Each deployment builds upon the previous one, demonstrating the evolution from simple Node.js servers to modern full-stack applications with proper security, real-time features, and professional frontend frameworks.

**Congratulations!** You now have a complete portfolio showcasing multiple technology stacks and deployment strategies.

---

---

## Understanding Nginx Routing: Individual vs Multi-App Deployments

### Current Approach: Individual Deployment (Recommended for Learning)

**What we're doing in this tutorial:**
- Each chatbot deployment **replaces** the main website at `https://project-1-xx.eduhk.hk`
- Only **one chatbot is active** at any given time
- Each deployment uses the nginx `location /` block (root path)

**Benefits for students:**
✅ **Simple routing** - no path conflicts between nginx and Node.js/Python  
✅ **Clean URLs** - just `project-1-xx.eduhk.hk` instead of `project-1-xx.eduhk.hk/chatbot02`  
✅ **Real production experience** - mimics how most apps are actually deployed  
✅ **No routing confusion** - eliminates conflicts between nginx paths and app routing  

**How it works:**
```nginx
# This replaces whatever was at the root path before
location / {
    proxy_pass http://127.0.0.1:3001;  # Your chatbot
    # ... proxy headers
}
```

### Alternative Approach: Multi-App Deployment (Advanced)

**What some tutorials do (but we avoid):**
- Multiple chatbots running simultaneously on different nginx paths
- `/chatbot02`, `/chatbot03`, `/chatbot04`, etc.

**Why this can be problematic:**
❌ **Routing conflicts** - Node.js apps expect to be at root `/`, not `/chatbot02`  
❌ **Complex configuration** - requires modifying app code for sub-paths  
❌ **Resource usage** - multiple apps running simultaneously  
❌ **Port management** - more ports to manage and potential conflicts  

**Example of the complex approach we avoid:**
```nginx
# Multiple simultaneous apps (more complex)
location /chatbot02 {
    proxy_pass http://127.0.0.1:3001;
    # Apps need to handle sub-path routing internally
}
location /chatbot03 {
    proxy_pass http://127.0.0.1:3002;
    # More complexity, more things that can break
}
```

### Progressive Deployment Workflow

**Our recommended approach:**

1. **Start with custom static page** (Part 1)
2. **Deploy Chatbot 02** - replaces static page with Node.js app
3. **Deploy Chatbot 03** - replaces Chatbot 02 with CORS-configured app  
4. **Deploy Chatbot 04** - replaces Node.js with Python FastAPI
5. **Deploy Chatbot 05** - replaces backend-only with full React frontend

**Each deployment:**
- Stops the previous service (PM2 or Docker)
- Updates the nginx `location /` block
- Starts the new service
- Tests at `https://project-1-xx.eduhk.hk`

### Key Learning Points

**Why this approach teaches better practices:**

🎓 **Real-world deployment patterns** - Most production apps deploy to root domains  
🎓 **Service management** - Learn to properly stop/start services  
🎓 **Configuration management** - Understand how nginx routing actually works  
🎓 **Resource optimization** - Only run what you need  

**Production deployment patterns:**
- **Development**: `dev.company.com` → latest development version
- **Staging**: `staging.company.com` → test version before production  
- **Production**: `company.com` → live application
- **NOT**: `company.com/dev`, `company.com/staging` (anti-pattern)

### Troubleshooting Routing Issues

**Common nginx routing problems:**

1. **404 errors on refresh**: React apps need `try_files $uri /index.html`
2. **API paths not found**: Ensure API routes are defined before `/` catch-all
3. **Static assets 404**: Check file permissions and paths
4. **Proxy errors**: Verify backend is actually running on expected port

**Quick diagnosis:**
```bash
# Check what's actually running
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# Check nginx is serving the right content
curl -I https://project-1-xx.eduhk.hk

# Check backend is responding
curl -I http://127.0.0.1:3001  # or whatever port
```

---
