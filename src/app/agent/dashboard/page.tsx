'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import DashboardNav from '@/components/DashboardNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Store, DollarSign, Clock, CheckCircle } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  city: string;
  status: 'draft' | 'preview' | 'live';
  slug: string;
  owner_user_id: string | null;
}

export default function AgentDashboardPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [stats, setStats] = useState({
    onboarded: 0,
    totalEarnings: 0,
    payable: 0,
    onHold: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgentData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Find agent record
      const { data: agent } = await supabase.from('agents').select('id').eq('user_id', user.id).single();
      const agentId = agent?.id;

      let myRestaurants: Restaurant[] = [];
      let totalEarnings = 0;
      let payable = 0;
      let onHold = 0;

      if (agentId) {
        const { data: rests } = await supabase
          .from('restaurants')
          .select('*')
          .eq('agent_id', agentId)
          .order('created_at', { ascending: false });
        
        myRestaurants = (rests as Restaurant[]) || [];

        const { data: commissions } = await supabase
          .from('agent_commissions')
          .select('amount, status')
          .eq('agent_id', agentId);

        (commissions || []).forEach((c) => {
          const amt = Number(c.amount) || 500;
          totalEarnings += amt;
          if (c.status === 'approved' || c.status === 'paid') {
            payable += amt;
          } else {
            onHold += amt;
          }
        });
      }

      setRestaurants(myRestaurants);
      setStats({
        onboarded: myRestaurants.length,
        totalEarnings,
        payable,
        onHold,
      });
      setLoading(false);
    }
    loadAgentData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Live</span>;
      case 'preview':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Preview Ready</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">Draft</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav title="Partner Dashboard" role="agent" />
      <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">Agent Workspace</h2>
            <p className="text-muted-foreground mt-1">
              Digitize local restaurants, prepare menu previews, send claim invites, and earn ₹500/sale.
            </p>
          </div>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 gap-2 shrink-0">
            <Link href="/agent/restaurants/new">
              <PlusCircle className="h-4 w-4" /> Add Restaurant
            </Link>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Onboarded</CardTitle>
              <Store className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : stats.onboarded}</div>
              <p className="text-xs text-muted-foreground mt-1">Restaurants added</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : `₹${stats.totalEarnings}`}</div>
              <p className="text-xs text-muted-foreground mt-1">₹500 per live site</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payable Balance</CardTitle>
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : `₹${stats.payable}`}</div>
              <p className="text-xs text-muted-foreground mt-1">Approved & Ready</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Hold</CardTitle>
              <Clock className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : `₹${stats.onHold}`}</div>
              <p className="text-xs text-muted-foreground mt-1">15-day hold period</p>
            </CardContent>
          </Card>
        </div>

        {/* My Restaurants Table */}
        <Card className="shadow-md border">
          <CardHeader>
            <CardTitle>My Onboarded Restaurants</CardTitle>
            <CardDescription>Manage draft setups, upload menu images for OCR parsing, and generate owner invite links.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading restaurants...</div>
            ) : restaurants.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed rounded-lg bg-muted/20">
                <p className="text-muted-foreground mb-4">You have not added any restaurants yet.</p>
                <Button asChild variant="outline">
                  <Link href="/agent/restaurants/new">Start Your First Onboarding</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="border-b bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="p-3">Restaurant Name</th>
                      <th className="p-3">City / Area</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Owner Claimed?</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {restaurants.map((r) => (
                      <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium">{r.name}</td>
                        <td className="p-3 text-muted-foreground">{r.city || '—'}</td>
                        <td className="p-3">{getStatusBadge(r.status)}</td>
                        <td className="p-3">
                          {r.owner_user_id ? (
                            <span className="text-green-600 font-medium">Claimed</span>
                          ) : (
                            <span className="text-amber-600 italic">Pending Invite</span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/agent/restaurants/${r.id}/menu`}>Menu OCR</Link>
                          </Button>
                          <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white">
                            <Link href={`/agent/restaurants/${r.id}/setup`}>Setup & Invite</Link>
                          </Button>
                          {r.slug && (
                            <Button asChild size="sm" variant="ghost">
                              <Link href={`/preview/${r.slug}`} target="_blank">Preview</Link>
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
