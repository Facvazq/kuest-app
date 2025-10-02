// Debug the hybrid storage configuration
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Environment Variables:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set (hidden)' : 'Not set');

// Check if Supabase is configured (same logic as hybrid-storage.ts)
const isSupabaseConfigured = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project-ref.supabase.co' &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your-anon-key-here');
};

console.log('🔧 Supabase configured:', isSupabaseConfigured());

if (isSupabaseConfigured()) {
  console.log('✅ Hybrid storage should use Supabase');
} else {
  console.log('❌ Hybrid storage will fall back to local storage');
  console.log('   This explains why forms aren\'t saved to Supabase!');
}
