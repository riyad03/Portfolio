# Vercel Deployment Setup Guide

This guide will help you deploy your portfolio to Vercel with environment variables properly configured.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Cloudinary account (sign up at [cloudinary.com](https://cloudinary.com))
- OpenAI API key (get from [platform.openai.com](https://platform.openai.com))

## Step 1: Prepare Your Cloudinary Account

### 1.1 Get Your Cloud Name

1. Log in to [Cloudinary Console](https://cloudinary.com/console)
2. On the Dashboard, you'll see your **Cloud Name**
3. Copy this value - you'll need it later

### 1.2 Create an Upload Preset

1. In Cloudinary Console, go to **Settings** (gear icon)
2. Click **Upload** tab
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Configure:
   - **Preset name**: Choose a name (e.g., `portfolio_uploads`)
   - **Signing Mode**: Select **Unsigned** (IMPORTANT!)
   - **Folder**: Optionally specify a folder (e.g., `portfolio`)
6. Click **Save**
7. Copy the preset name - you'll need it later

## Step 2: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Click **Create new secret key**
3. Give it a name (e.g., "Portfolio Chatbot")
4. Copy the key immediately (you won't see it again!)
5. Keep it safe - you'll need it for Vercel

## Step 3: Push to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 4: Deploy to Vercel

### 4.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Select **Import Git Repository**
4. Choose your GitHub repository
5. Click **Import**

### 4.2 Configure Project

1. **Framework Preset**: Should auto-detect as **Vite**
2. **Root Directory**: Leave as `./`
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `dist` (default)

### 4.3 Add Environment Variables

Before clicking "Deploy", add these environment variables:

Click **Environment Variables** section and add:

| Name | Value | Notes |
|------|-------|-------|
| `CLOUDINARY_CLOUD_NAME` | Your cloud name from Step 1.1 | Required for uploads |
| `CLOUDINARY_UPLOAD_PRESET` | Your preset name from Step 1.2 | Must be unsigned |
| `OPENAI_API_KEY` | Your API key from Step 2 | Required for chatbot |

**Important**: 
- Make sure to add these for **Production**, **Preview**, and **Development** environments
- Double-check spelling - environment variables are case-sensitive

### 4.4 Deploy

1. Click **Deploy**
2. Wait for the build to complete (usually 1-2 minutes)
3. Click **Visit** to see your live site

## Step 5: Test Your Setup

### 5.1 Test Image Uploads

1. Go to your deployed site
2. Press `Ctrl + Shift + E` to open admin panel
3. Enter your admin password (default: "admin")
4. Edit a project
5. Try uploading a thumbnail image
6. If successful, you'll see "✓ Thumbnail uploaded successfully!"

### 5.2 Test Chatbot

1. On your site, click the **AI Assistant** button
2. Try asking a question
3. The bot should respond based on your portfolio content

## Troubleshooting

### Upload Fails with "Cloudinary config missing"

**Solution**: 
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_UPLOAD_PRESET` are set correctly
3. Redeploy: Go to Deployments → Click ⋯ on latest → Redeploy

### Upload Fails with "Upload failed: Invalid signature"

**Solution**:
- Your upload preset must be **Unsigned**
- Go to Cloudinary → Settings → Upload → Upload presets
- Edit your preset and change Signing Mode to "Unsigned"

### Chatbot Doesn't Respond

**Solution**:
1. Check that `OPENAI_API_KEY` is set in Vercel
2. Go to [OpenAI Usage](https://platform.openai.com/usage) to verify you have credits
3. Check Vercel function logs: Project → Settings → Functions → View logs

### Environment Variables Not Working

**Solution**:
- After adding/changing environment variables, you MUST redeploy
- Vercel doesn't automatically pick up env var changes
- Go to Deployments tab → Redeploy latest deployment

## Updating Environment Variables

If you need to change environment variables after deployment:

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Environment Variables**
3. Find the variable you want to change
4. Click **Edit** or **Delete** then add new one
5. **Important**: Go to **Deployments** tab
6. Click ⋯ on the latest deployment
7. Click **Redeploy** → **Use existing Build Cache** → **Redeploy**

## Custom Domain (Optional)

To add a custom domain:

1. Go to Project Settings → **Domains**
2. Enter your domain
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (can take 24-48 hours)

## Maintenance

### Updating Your Site

```bash
git add .
git commit -m "Update content"
git push
```

Vercel will automatically deploy on every push to main branch.

### Monitoring

- View deployment status: Vercel Dashboard → Your Project → Deployments
- View function logs: Settings → Functions
- Check analytics: Analytics tab

## Security Notes

1. **Never commit** `.env` files to Git
2. The `.gitignore` file already excludes these
3. Rotate your OpenAI API key regularly
4. Change default admin password in the admin panel
5. Keep your Cloudinary upload preset unsigned for uploads to work
6. Consider adding rate limiting for production

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Cloudinary Docs: [cloudinary.com/documentation](https://cloudinary.com/documentation)
- OpenAI Docs: [platform.openai.com/docs](https://platform.openai.com/docs)

---

## Quick Reference

### Vercel Environment Variables

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_preset_name
OPENAI_API_KEY=sk-...
```

### Useful Commands

```bash
# Run locally
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```
