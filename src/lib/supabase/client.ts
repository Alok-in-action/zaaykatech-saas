import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qtmzyytzfcruxsktkqzl.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bXp5eXR6ZmNydXhza3RrcXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MjIzNDAsImV4cCI6MjEwMTA5ODM0MH0.KB41CdrCaNfbec3lN72_rkIBX6l58u-3Gt943J-Od-c'
  );
}
