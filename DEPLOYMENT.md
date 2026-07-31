# ZaaykaTech – Localhost to Production Deployment Guide

This document provides step-by-step instructions for transitioning the newly implemented role-based architecture from your local prototyping environment (`localhost:3000`) to your production domain (`zaaykatech.com`).

---

## 1. Localhost E2E Testing Verification Walkthrough

Before deploying, test the full closed-loop workflow locally:

1. **Start Development Server**:
   ```bash
   npm run dev
   ```
2. **Step A: Student / Onboarding Agent Flow**:
   - Go to `http://localhost:3000/signup`. Notice only **Agent Partner** registration is shown (Owner direct signup is hidden!).
   - Register as an Agent (e.g., `agent@zaayka.com` / college: `IIT Delhi` / UPI: `agent@okhdfcbank`).
   - You are routed directly to `/agent/dashboard`. Click **Add New Restaurant**.
   - Create a draft restaurant (e.g., *Punjabi Rasoi*, Connaught Place).
   - In **Menu Studio** (`/agent/restaurants/[id]/menu`), try uploading any image or clicking **Test AI Scan (Stub OCR)**. Notice how it populates category cards with prices. Add or customize items as needed.
   - Go to **Setup Studio** (`/agent/restaurants/[id]/setup`). Select a theme layout and accent color (*Orange Spice*).
   - Enter an Owner WhatsApp Number and click **Generate Claim Invite Token**. Copy the generated URL (`http://localhost:3000/owner/claim/zk-...`) or test the WhatsApp dispatch button.
3. **Step B: Restaurant Owner Claim Flow**:
   - Open a private / incognito tab and paste the claim URL.
   - Inspect the visual summary (dishes count, branding, and preview link).
   - Fill in the inline registration form (`owner@rasoi.com`). Upon submitting:
     - Your account is automatically created as an `owner`.
     - The restaurant is permanently linked to your profile.
     - The claim link token is marked as `used_at` to prevent dual claims.
   - On the `/owner/dashboard`, inspect the promotional QR packages and click **Activate Live Menu (₹2,499/yr)**.
   - Since localhost uses dummy test keys, the simulation handler confirms the order, activates the 1-year subscription, switches status to `LIVE`, and logs a ₹500 partner commission!
4. **Step C: Admin Audit & Payouts**:
   - Log into `/admin/dashboard`.
   - Review **Agents** (`/admin/agents`) and verify their status.
   - Open **Subscriptions** (`/admin/subscriptions`) to audit the newly created ₹2,499 ledger entry.
   - Open **Payouts** (`/admin/payouts`) to view the pending ₹500 commission for `agent@zaayka.com`. Notice the 15-day hold window date and execute **Pay to UPI & Complete**.

---

## 2. Supabase Production Schema & Security Checklist

When pointing to your production Supabase database:

1. **Run `schema.sql`**: Open your Supabase SQL Editor and run the included `schema.sql` script to generate all 8 tables (`profiles`, `agents`, `restaurants`, `menus`, `restaurant_claims`, `subscriptions`, `agent_commissions`, `payouts`).
2. **Production Row Level Security (RLS)**:
   In development, policies permit public reads/writes for rapid testing. Before launching `zaaykatech.com`, replace the placeholder policies with role-restricted rules in SQL Editor:
   ```sql
   -- Restrict Profiles to self and admins
   DROP POLICY IF EXISTS "Public access profiles" ON profiles;
   CREATE POLICY "Self access profiles" ON profiles FOR ALL USING (auth.uid() = id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

   -- Restrict Restaurants modification to assigned agents and owners
   DROP POLICY IF EXISTS "Public access restaurants" ON restaurants;
   CREATE POLICY "Read public restaurants" ON restaurants FOR SELECT USING (status = 'preview' OR status = 'live' OR auth.role() = 'authenticated');
   CREATE POLICY "Agent edit restaurants" ON restaurants FOR UPDATE USING (agent_id = auth.uid());
   CREATE POLICY "Owner edit restaurants" ON restaurants FOR UPDATE USING (owner_user_id = auth.uid());

   -- Restrict Commissions & Payouts to Admins and specific agent owners
   DROP POLICY IF EXISTS "Public access agent_commissions" ON agent_commissions;
   CREATE POLICY "Read own commissions" ON agent_commissions FOR SELECT USING (agent_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
   ```

---

## 3. Razorpay Production Activation

1. Log into your [Razorpay Dashboard](https://dashboard.razorpay.com/) and switch from **Test Mode** to **Live Mode**.
2. Go to **Settings > API Keys** and generate a new Live Key Pair.
3. In your hosting platform (e.g., Vercel Environment Variables for `zaaykatech.com`), set:
   - `NEXT_PUBLIC_SUPABASE_URL` = `<your_prod_supabase_url>`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<your_prod_supabase_anon_key>`
   - `RAZORPAY_KEY_ID` = `rzp_live_xxxxxxxxxx`
   - `RAZORPAY_KEY_SECRET` = `<your_secret_here>`
4. Once real keys are provided, `/api/payment` will automatically switch from simulated test orders to live RBI-compliant INR ₹2,499 UPI / Card payment workflows!

---

## 4. Final Deployment to zaaykatech.com

1. Push your changes to your Git repository (main/master branch).
2. Trigger deployment on Vercel (or your Next.js host).
3. Verify Domain custom domains routing to `https://zaaykatech.com`.
4. Test one live onboarding cycle on staging/production to confirm zero-friction agent acquisition!
