# Supabase Setup Guide for Kuest

This guide will help you set up Supabase to make your forms accessible across all devices.

## Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `kuest-forms` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to your users
5. Click "Create new project"
6. Wait for the project to be created (takes 1-2 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Click "Run" to execute the SQL
5. You should see success messages for tables, indexes, and policies

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual project URL and anon key.

## Step 5: Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Create a new form in the form builder
3. Check your Supabase dashboard → **Table Editor** → **forms** table
4. You should see your form data there

## Step 6: Enable Authentication (Optional)

If you want users to be able to sign up and manage their own forms:

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Configure your site URL (e.g., `http://localhost:3000` for development)
3. Enable email authentication or other providers
4. Update the form builder to include authentication

## Features Enabled

With Supabase configured, you get:

- ✅ **Cross-device access**: Forms are stored in the cloud
- ✅ **Real-time sync**: Changes appear instantly across devices
- ✅ **Backup**: Your forms are safely stored in the database
- ✅ **Sharing**: Forms can be accessed by anyone with the link
- ✅ **Analytics**: View form responses in the Supabase dashboard
- ✅ **Scalability**: Handle thousands of forms and responses

## Troubleshooting

### Forms not appearing in database
- Check that your environment variables are correct
- Verify the database schema was created successfully
- Check the browser console for any error messages

### Permission errors
- Make sure Row Level Security (RLS) policies are set up correctly
- Check that the anon key has the right permissions

### Connection issues
- Verify your project URL is correct
- Check that your Supabase project is not paused
- Ensure you're using the correct region

## Security Notes

- The `anon` key is safe to use in client-side code
- Never expose your `service_role` key in client-side code
- RLS policies ensure users can only access their own data
- Public forms can be accessed by anyone with the link

## Next Steps

1. **Deploy to production**: Update your environment variables for your production domain
2. **Add authentication**: Implement user sign-up/sign-in for form creators
3. **Add analytics**: Create dashboards to view form performance
4. **Set up backups**: Configure automated database backups

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Supabase GitHub](https://github.com/supabase/supabase)
