# Vercel Deployment Guide

This guide will help you deploy your Kuest app to Vercel so users can access forms from any device.

## Prerequisites

1. **Supabase Setup**: Complete the Supabase setup first (see `SUPABASE_SETUP.md`)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Vercel Account**: Create a free account at [vercel.com](https://vercel.com)

## Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. **Import Git Repository**: Connect your GitHub account
4. Select your repository (e.g., `kuest-app`)
5. Click **"Import"**

## Step 2: Configure Environment Variables

1. In the Vercel project setup, expand **"Environment Variables"**
2. Add these variables:

### Required Environment Variables:
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
  **Value**: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  **Value**: Your Supabase anon key (starts with `eyJ...`)

3. Click **"Deploy"**

## Step 3: Wait for Deployment

1. Vercel will automatically:
   - Install dependencies
   - Build your Next.js app
   - Deploy to a global CDN
   - Provide you with a live URL

2. Deployment usually takes 1-3 minutes

## Step 4: Access Your Deployed App

1. Once deployed, you'll get a URL like: `https://your-app-name.vercel.app`
2. Your app will be available at this URL immediately
3. Vercel also provides a custom domain option

## Step 5: Test Cross-Device Access

1. **Create a form** using the form builder
2. **Share the form URL** with others
3. **Test on different devices**:
   - Mobile phones
   - Tablets
   - Different computers
   - Different browsers

## How It Works

### Vercel Advantages
- **Automatic deployments**: Every push to main branch triggers a new deployment
- **Global CDN**: Fast loading worldwide
- **Serverless functions**: Perfect for Next.js
- **Custom domains**: Free SSL certificates
- **Preview deployments**: Every PR gets a preview URL

### Cross-Device Access
- Forms are accessible from any device with internet
- Data is synchronized through Supabase
- Real-time updates across devices
- Works on mobile, tablet, and desktop

### URL Structure
- **Homepage**: `https://your-app-name.vercel.app`
- **Form Builder**: `https://your-app-name.vercel.app/form-builder`
- **Form View**: `https://your-app-name.vercel.app/form/[form-id]`
- **Dashboard**: `https://your-app-name.vercel.app/dashboard`

## Automatic Deployments

Every time you push to your main branch:
1. Vercel automatically detects the changes
2. Builds your app with the latest code
3. Deploys to production
4. Your app is updated within minutes

## Custom Domain (Optional)

1. In your Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records with your domain provider
4. Vercel provides free SSL certificates

## Environment Variables Management

### Adding New Variables
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add new variables as needed
4. Redeploy to apply changes

### Local Development
Keep your `.env.local` file with the same variables for local development:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Monitoring and Analytics

### Vercel Analytics
1. Go to your project dashboard
2. Click **Analytics** to see:
   - Page views
   - Performance metrics
   - User locations
   - Device types

### Supabase Monitoring
1. Monitor database usage in Supabase dashboard
2. View real-time form submissions
3. Check API usage and performance

## Troubleshooting

### Build Fails
- Check that all environment variables are set correctly
- Verify your Supabase credentials
- Check the build logs in Vercel dashboard

### Forms Not Loading
- Ensure Supabase is properly configured
- Check that the database schema is set up
- Verify RLS policies allow public access

### Slow Loading
- Check Supabase region (should be close to your users)
- Optimize images and assets
- Use Vercel Analytics to identify bottlenecks

## Performance Optimization

### Vercel Features
- **Edge Functions**: Run code closer to users
- **Image Optimization**: Automatic image compression
- **Caching**: Intelligent caching strategies
- **Compression**: Automatic gzip/brotli compression

### Best Practices
- Minimize bundle size
- Use dynamic imports for large components
- Optimize database queries
- Enable Supabase connection pooling

## Security

### Environment Variables
- Never commit sensitive keys to your repository
- Use Vercel's environment variable system
- Different variables for preview/production

### Database Security
- Ensure RLS policies are properly configured
- Use Supabase's built-in security features
- Monitor for unusual activity

## Scaling

### Vercel Limits (Free Tier)
- 100GB bandwidth per month
- 100 serverless function invocations per day
- 6,000 build minutes per month

### Supabase Limits (Free Tier)
- 500MB database storage
- 2GB bandwidth per month
- 50,000 monthly active users

### Upgrading
Both platforms offer paid plans for higher limits and additional features.

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)

Your Kuest app is now deployed on Vercel and accessible worldwide! 🌍

## Next Steps

1. **Custom Domain**: Set up your own domain
2. **Analytics**: Monitor usage and performance
3. **Authentication**: Add user sign-up/sign-in
4. **Advanced Features**: Implement real-time updates
5. **Monitoring**: Set up alerts for errors or high usage
