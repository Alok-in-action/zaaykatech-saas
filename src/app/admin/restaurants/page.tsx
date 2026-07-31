'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import DashboardNav from '@/components/DashboardNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Utensils, ExternalLink } from 'lucide-react';

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRestaurants() {
      const supabase = createClient();
      const { data } = await supabase.from('restaurants').select('*').order('created_at', { ascending: false });
      setRestaurants(data || []);
      setLoading(false);
    }
    loadRestaurants();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Live</span>;
      case 'preview':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Preview</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold">Draft</span>;
    }
  };

  const navLinks = [
    { label: 'Agents', href: '/admin/agents' },
    { label: 'Restaurants', href: '/admin/restaurants' },
    { label: 'Subscriptions', href: '/admin/subscriptions' },
    { label: 'Payouts', href: '/admin/payouts' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav title="Platform Restaurants" role="admin" links={navLinks} />
      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold font-headline flex items-center gap-2">
            <Utensils className="h-7 w-7 text-orange-600" /> All Onboarded Restaurants
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Global registry of draft setups, preview sites, and live operational digital menus.</p>
        </div>

        <Card className="shadow-md border">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading platform restaurants...</div>
            ) : restaurants.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">No restaurants in the system yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="border-b bg-muted/60 text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-4">Restaurant Name</th>
                      <th className="p-4">City / Location</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Agent ID</th>
                      <th className="p-4">Owner Account</th>
                      <th className="p-4 text-right">Site Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {restaurants.map((r) => (
                      <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-bold text-foreground">{r.name}</td>
                        <td className="p-4 text-muted-foreground">{r.city || '—'}</td>
                        <td className="p-4">{getStatusBadge(r.status)}</td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">{r.agent_id ? `${r.agent_id.substring(0, 8)}...` : 'N/A'}</td>
                        <td className="p-4">
                          {r.owner_user_id ? (
                            <span className="text-green-600 font-semibold">Claimed & Linked</span>
                          ) : (
                            <span className="text-amber-600 italic">Unclaimed</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {r.slug && (
                            <Button asChild size="sm" variant="outline" className="gap-1.5 text-xs">
                              <Link href={`/preview/${r.slug}`} target="_blank">
                                View Menu <ExternalLink className="h-3 w-3" />
                              </Link>
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
