-- ZaaykaTech Supabase SQL Schema
-- Copy and paste this into the Supabase SQL Editor and execute it once.

-- 1. Profiles Table (Extends auth.users to track role and general user details)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'agent', 'owner')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Agents Table (Detailed agent profile info)
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    college TEXT,
    upi_id TEXT NOT NULL,
    status TEXT DEFAULT 'approved' CHECK (status IN ('approved', 'suspended')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Restaurants Table
CREATE TABLE IF NOT EXISTS public.restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    address TEXT,
    phone TEXT,
    instagram TEXT,
    city TEXT,
    hours TEXT DEFAULT '10:00 AM - 10:00 PM',
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'preview', 'live')),
    agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    owner_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    logo_url TEXT,
    theme_choice TEXT DEFAULT 'modern',
    primary_color TEXT DEFAULT '#f97316',
    font_style TEXT DEFAULT 'Inter',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Menus Table (Stores items as JSONB array for easy dynamic edits and OCR parsing)
CREATE TABLE IF NOT EXISTS public.menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 5. Restaurant Claims Table (For sending onboarding invites to owners)
CREATE TABLE IF NOT EXISTS public.restaurant_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    token TEXT UNIQUE NOT NULL,
    owner_phone TEXT,
    owner_email TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    used_at TIMESTAMPTZ NULL
);

-- 6. Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    plan_name TEXT DEFAULT 'Annual Plan',
    amount NUMERIC DEFAULT 2499,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
    start_date TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    end_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 year'),
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 7. Agent Commissions Table
CREATE TABLE IF NOT EXISTS public.agent_commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    amount NUMERIC DEFAULT 500,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
    hold_until TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '15 days'),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 8. Payouts Table
CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'completed',
    payout_date TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS across all tables and create open development policies to ease testing
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow All for Development - profiles" ON public.profiles USING (true) WITH CHECK (true);
CREATE POLICY "Allow All for Development - agents" ON public.agents USING (true) WITH CHECK (true);
CREATE POLICY "Allow All for Development - restaurants" ON public.restaurants USING (true) WITH CHECK (true);
CREATE POLICY "Allow All for Development - menus" ON public.menus USING (true) WITH CHECK (true);
CREATE POLICY "Allow All for Development - restaurant_claims" ON public.restaurant_claims USING (true) WITH CHECK (true);
CREATE POLICY "Allow All for Development - subscriptions" ON public.subscriptions USING (true) WITH CHECK (true);
CREATE POLICY "Allow All for Development - agent_commissions" ON public.agent_commissions USING (true) WITH CHECK (true);
CREATE POLICY "Allow All for Development - payouts" ON public.payouts USING (true) WITH CHECK (true);
