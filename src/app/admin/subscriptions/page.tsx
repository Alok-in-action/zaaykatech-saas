'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import DashboardNav from '@/components/DashboardNav';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubscriptions() {
      const supabase = createClient();
      const { data: subs } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false });
      
      if (subs) {
        // Fetch restaurant names for display
        const restIds = subs.map((s) => s.restaurant_id);
        const { data: rests } = await supabase.from('restaurants').select('id, name').in('id', restIds);
        const restMap = new Map((rests || []).map((r) => [r.id, r.name]));

        const enriched = subs.map((s) => ({ ...s, restaurantName: restMap.get(s.restaurant_id) || 'Unknown' }));
        setSubscriptions(enriched);
      }
      setLoading(false);
    }
    loadSubscriptions();
  }, []);

  const navLinks = [
    { label: 'Agents', href: '/admin/agents' },
    { label: 'Restaurants', href: '/admin/restaurants' },
    { label: 'Subscriptions', href: '/admin/subscriptions' },
    { label: 'Payouts', href: '/admin/payouts' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav title="Subscription Ledger" role="admin" links={navLinks} />
      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold font-headline flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-green-600" /> Active Annual Subscriptions
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Audit ₹2,499 yearly plans activated by restaurant owners via Razorpay.</p>
        </div>

        <Card className="shadow-md border">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading subscription ledger...</div>
            ) : subscriptions.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">No paid annual subscriptions registered yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="border-b bg-muted/60 text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-4">Restaurant</th>
                      <th className="p-4">Plan Description</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Activation Date</th>
                      <th className="p-4">Valid Until</th>
                      <th className="p-4">Razorpay Order ID</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-bold text-foreground">{sub.restaurantName}</td>
                        <td className="p-4 text-muted-foreground">{sub.plan_name}</td>
                        <td className="p-4 font-bold text-green-600">₹{sub.amount}</td>
                        <td className="p-4 text-muted-foreground">{new Date(sub.start_date).toLocaleDateString()}</td>
                        <td className="p-4 font-semibold">{new Date(sub.end_date).toLocaleDateString()}</td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">{sub.razorpay_order_id || 'simulated'}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase">
                            {sub.status}
                          </span>
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
