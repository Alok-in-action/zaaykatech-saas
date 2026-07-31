'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import DashboardNav from '@/components/DashboardNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Utensils, CreditCard, DollarSign, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    agentsCount: 0,
    restaurantsCount: 0,
    activeSubscriptions: 0,
    totalCommissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      const supabase = createClient();

      const { count: agents } = await supabase.from('agents').select('*', { count: 'exact', head: true });
      const { count: restaurants } = await supabase.from('restaurants').select('*', { count: 'exact', head: true });
      const { count: subs } = await supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active');
      const { data: commissions } = await supabase.from('agent_commissions').select('amount');

      const totalComm = (commissions || []).reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

      setStats({
        agentsCount: agents || 0,
        restaurantsCount: restaurants || 0,
        activeSubscriptions: subs || 0,
        totalCommissions: totalComm,
      });
      setLoading(false);
    }
    loadAdminData();
  }, []);

  const navLinks = [
    { label: 'Agents', href: '/admin/agents' },
    { label: 'Restaurants', href: '/admin/restaurants' },
    { label: 'Subscriptions', href: '/admin/subscriptions' },
    { label: 'Payouts', href: '/admin/payouts' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav title="Admin Control Center" role="admin" links={navLinks} />
      <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h2 className="text-3xl font-bold font-headline tracking-tight">System Overview</h2>
          <p className="text-muted-foreground mt-1">
            Monitor partner growth, onboardings, live subscriptions, and commission payouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-orange-500/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
              <Users className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : stats.agentsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered Partners</p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Onboarded Restaurants</CardTitle>
              <Utensils className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : stats.restaurantsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Draft, Preview & Live</p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <CreditCard className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : stats.activeSubscriptions}</div>
              <p className="text-xs text-muted-foreground mt-1">₹2,499 / year plans</p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
              <DollarSign className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : `₹${stats.totalCommissions}`}</div>
              <p className="text-xs text-muted-foreground mt-1">Generated for Partners</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>Manage Agent Partners</CardTitle>
              <CardDescription>Review onboarded students and individuals, inspect UPI IDs, or approve status.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link href="/admin/agents">
                  View Agents Table <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>Commissions & Payouts</CardTitle>
              <CardDescription>Approve commissions after the 15-day hold window and trigger payouts to UPI IDs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link href="/admin/payouts">
                  Process Payouts <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
