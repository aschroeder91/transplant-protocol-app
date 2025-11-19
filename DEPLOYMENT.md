# Deployment Guide (DigitalOcean)

Since you have a DigitalOcean account, the easiest way to host this React application is using **DigitalOcean App Platform**. It handles building, SSL (HTTPS), and CDN for you automatically.

## Option 1: App Platform (Recommended)

### 1. Push your code to GitHub
First, ensure your code is in a GitHub repository.
```bash
git init
git add .
git commit -m "Initial commit"
# Create a repo on GitHub, then:
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Create App in DigitalOcean
1. Log in to your DigitalOcean dashboard.
2. Click **Create** -> **Apps**.
3. Choose **GitHub** as the source.
4. Select your repository and branch (e.g., `main`).

### 3. Configure Build Settings
DigitalOcean should auto-detect that this is a Node.js/static site, but verify these settings:
- **Resource Type**: Static Site (cheapest/free tier options available).
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 4. Configure Routes (Important for React Router)
Since this is a Single Page Application (SPA) using `react-router-dom`, you need to ensure all routes point to `index.html`.
- In the App Platform settings, look for **Catchall Document** or **Error Document**.
- Set the **Catchall Document** to `index.html`.
- OR, if configuring via UI:
    - Go to **Settings** -> **Component** (your static site).
    - Scroll to **Custom Pages**.
    - Set **Catchall** to `index.html`.

### 5. Deploy
Click **Next** and **Create Resources**. Your app will be live in a few minutes with a secure URL (e.g., `...digitalocean.app`).

---

## Option 2: Droplet (Virtual Machine)

If you prefer managing a server yourself (e.g., using Nginx):

1. **Build Locally**:
   ```bash
   npm run build
   ```
   This creates a `dist` folder.

2. **Transfer Files**:
   Use `scp` or an FTP client to upload the contents of `dist` to your Droplet (e.g., `/var/www/html`).

3. **Configure Nginx**:
   Ensure your Nginx config handles the SPA routing (redirecting 404s to index.html).
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```

## Troubleshooting

### Error: "failed to launch: determine start command"
If you see this error, DigitalOcean is trying to run your app as a **Web Service** (Node.js server) instead of a **Static Site**.

**Fix:**
1. Go to your App settings in DigitalOcean.
2. Find the component (usually named after your repo).
3. Look for **Resource Type** or **Type**.
4. Change it from **Web Service** to **Static Site**.
5. Save and re-deploy.

If you *must* run it as a Web Service, you need to add a start script to `package.json` and use a static file server, but switching to **Static Site** is the correct and cheaper solution.
