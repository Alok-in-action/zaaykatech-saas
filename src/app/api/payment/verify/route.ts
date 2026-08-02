import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, restaurantId } = await request.json();

    if (!restaurantId) {
      return NextResponse.json({ error: 'Missing restaurantId' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qtmzyytzfcruxsktkqzl.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bXp5eXR6ZmNydXhza3RrcXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MjIzNDAsImV4cCI6MjEwMTA5ODM0MH0.KB41CdrCaNfbec3lN72_rkIBX6l58u-3Gt943J-Od-c',
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {},
        },
      }
    );

    // 1. Create active 1-year subscription record
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000);

    await supabase.from('subscriptions').insert({
      restaurant_id: restaurantId,
      plan_name: 'Annual Digital Menu Plan',
      amount: 2499,
      status: 'active',
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      razorpay_order_id: razorpay_order_id || 'simulated_order',
      razorpay_payment_id: razorpay_payment_id || 'simulated_payment',
    });

    // 2. Mark restaurant status as 'live'
    const { data: rest } = await supabase
      .from('restaurants')
      .update({ status: 'live' })
      .eq('id', restaurantId)
      .select('agent_id')
      .single();

    // 3. If onboarding agent exists, generate ₹500 commission with 15-day hold
    if (rest && rest.agent_id) {
      const holdUntil = new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000);
      await supabase.from('agent_commissions').insert({
        agent_id: rest.agent_id,
        restaurant_id: restaurantId,
        amount: 500,
        status: 'pending',
        hold_until: holdUntil.toISOString(),
      });
    }

    return NextResponse.json({ success: true, status: 'live' });
  } catch (error: any) {
    console.error('Payment verification & go-live error:', error);
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 500 });
  }
}
