# Deployment Guide - Vercel

## Prerequisites
- GitHub account
- Vercel account (free tier available)
- Football Data API key (free tier at https://www.football-data.org/)

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `family-world-cup-pool`
3. Copy the repository URL (e.g., `https://github.com/yourusername/family-world-cup-pool.git`)

### 2. Push Code to GitHub

```bash
cd c:\Users\gldel\Documents\Automation\family-world-cup-pool

# Add GitHub remote
git remote add origin https://github.com/yourusername/family-world-cup-pool.git

# Rename branch to main (Vercel default)
git branch -M main

# Push code
git push -u origin main
```

### 3. Get Football Data API Key

1. Go to https://www.football-data.org/
2. Sign up for free account
3. Copy your API key from the dashboard

### 4. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Easiest)
1. Go to https://vercel.com/import
2. Click "Import Git Repository"
3. Paste your GitHub repo URL
4. Click "Import"
5. In Environment Variables section, add:
   - Key: `FOOTBALL_DATA_API_KEY`
   - Value: Your API key from football-data.org
6. Click "Deploy"

#### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd c:\Users\gldel\Documents\Automation\family-world-cup-pool
vercel

# Follow the prompts
# When asked about environment variables, add FOOTBALL_DATA_API_KEY
```

## Post-Deployment

Once deployed:
1. You'll get a live URL (e.g., `https://family-world-cup-pool.vercel.app`)
2. Share this URL with family members
3. They can access the pool from any device via this URL

## Updating the Live Site

After deployment, any changes pushed to GitHub will automatically trigger a new deployment:

```bash
# Make changes locally
git add -A
git commit -m "Your message"
git push origin main
# Vercel automatically redeploys!
```

## Syncing Match Data

Once deployed:
1. Click the "Sync Results" button on the Matches tab
2. This fetches the latest match data from the API
3. Scores update in real-time

## Troubleshooting

**"API key not found" error:**
- Make sure you added `FOOTBALL_DATA_API_KEY` in Vercel's Environment Variables
- Redeploy after adding the variable

**Matches not updating:**
- Check that you have a valid football-data.org API key
- Ensure the key is configured in Vercel Environment Variables

**Need help?**
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
