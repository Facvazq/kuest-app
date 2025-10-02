# GitHub Pages Deployment Guide

This guide will help you deploy your Kuest app to GitHub Pages so users can access forms from any device.

## Prerequisites

1. **Supabase Setup**: Complete the Supabase setup first (see `SUPABASE_SETUP.md`)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **GitHub Account**: You need a GitHub account with Pages enabled

## Step 1: Configure GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

### Required Secrets:
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
  **Value**: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  **Value**: Your Supabase anon key (starts with `eyJ...`)

## Step 2: Enable GitHub Pages

1. In your GitHub repository, go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

## Step 3: Push Your Code

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

2. The GitHub Action will automatically:
   - Build your Next.js app
   - Export it as static files
   - Deploy to GitHub Pages

## Step 4: Access Your Deployed App

1. Go to your repository **Settings** → **Pages**
2. Find your site URL (usually `https://yourusername.github.io/your-repo-name`)
3. Your app will be available at this URL

## Step 5: Test Cross-Device Access

1. **Create a form** using the form builder
2. **Share the form URL** with others
3. **Test on different devices**:
   - Mobile phones
   - Tablets
   - Different computers
   - Different browsers

## How It Works

### Static Export
- Your Next.js app is built as static files
- No server required - runs entirely in the browser
- Forms are stored in Supabase (cloud database)
- Responses are saved to Supabase

### Cross-Device Access
- Forms are accessible from any device with internet
- Data is synchronized through Supabase
- No local storage dependencies
- Works on mobile, tablet, and desktop

### URL Structure
- **Form Builder**: `https://yourusername.github.io/your-repo-name/form-builder`
- **Form View**: `https://yourusername.github.io/your-repo-name/form/[form-id]`
- **Dashboard**: `https://yourusername.github.io/your-repo-name/dashboard`

## Troubleshooting

### Build Fails
- Check that all environment variables are set in GitHub Secrets
- Verify your Supabase credentials are correct
- Check the Actions tab for detailed error messages

### Forms Not Loading
- Ensure Supabase is properly configured
- Check that the database schema is set up
- Verify RLS policies allow public access

### Static Export Issues
- Make sure all components are client-side compatible
- Check for any server-side code that needs to be removed
- Verify all imports are compatible with static export

## Custom Domain (Optional)

1. In your repository **Settings** → **Pages**
2. Add your custom domain in the **Custom domain** field
3. Configure DNS records with your domain provider
4. Your app will be available at your custom domain

## Performance Tips

- **Optimize images**: Use WebP format when possible
- **Minimize bundle size**: Remove unused dependencies
- **Enable compression**: GitHub Pages automatically compresses files
- **Use CDN**: GitHub Pages serves from a global CDN

## Security Notes

- **Environment variables**: Never commit sensitive keys to your repository
- **RLS policies**: Ensure your Supabase RLS policies are properly configured
- **Public access**: Forms are publicly accessible by default
- **Data privacy**: Consider implementing authentication for sensitive forms

## Monitoring

- **GitHub Actions**: Monitor deployment status in the Actions tab
- **Supabase Dashboard**: Monitor database usage and performance
- **Analytics**: Add Google Analytics or similar for usage tracking

## Updates

To update your deployed app:
1. Make changes to your code
2. Commit and push to the main branch
3. GitHub Actions will automatically rebuild and redeploy
4. Changes will be live within a few minutes

Your Kuest app is now accessible from any device worldwide! 🌍
