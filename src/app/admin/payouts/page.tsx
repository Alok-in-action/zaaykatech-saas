'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import DashboardNav from '@/components/DashboardNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, CheckCircle, Clock } from 'lucide-react';

export default function AdminPayoutsPage() {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayoutData() {
      const supabase = createClient();
      const { data: comms } = await supabase.from('agent_commissions').select('*').order('created_at', { ascending: false });
      
      if (comms) {
        // Enrich with agent and restaurant info
        const agentIds = Array.from(new Set(comms.map((c) => c.agent_id)));
        const restIds = Array.from(new Set(comms.map((c) => c.restaurant_id)));

        const { data: agents } = await supabase.from('agents').select('id, name, upi_id').in('id', agentIds);
        const { data: rests } = await supabase.from('restaurants').select('id, name').in('id', restIds);

        const agentMap = new Map((agents || []).map((a) => [a.id, a]));
        const restMap = new Map((rests || []).map((r) => [r.id, r.name]));

        const enriched = comms.map((c) => ({
          ...c,
          agentName: agentMap.get(c.agent_id)?.name || 'Unknown Agent',
          upiId: agentMap.get(c.agent_id)?.upi_id || 'N/A',
          restaurantName: restMap.get(c.restaurant_id) || 'Unknown Restaurant',
        }));
        setCommissions(enriched);
      }
      setLoading(false);
    }
    loadPayoutData();
  }, []);

  const updateStatus = async (id: string, nextStatus: 'approved' | 'paid', agentId: string, amount: number) => {
    const supabase = createClient();
    await supabase.from('agent_commissions').update({ status: nextStatus }).eq('id', id);

    if (nextStatus === 'paid') {
      // Record in payouts table
      await supabase.from('payouts').insert({
        agent_id: agentId,
        amount: amount,
        status: 'completed',
      });
      alert(`₹${amount} payout completed and logged in ledger!`);
    }

    setCommissions((prev) => prev.map((c) => c.id === id ? { ...c, status: nextStatus } : c));
  };

  const navLinks = [
    { label: 'Agents', href: '/admin/agents' },
    { label: 'Restaurants', href: '/admin/restaurants' },
    { label: 'Subscriptions', href: '/admin/subscriptions' },
    { label: 'Payouts', href: '/admin/payouts' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav title="Partner Commissions & Payouts" role="admin" links={navLinks} />
      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold font-headline flex items-center gap-2">
            <DollarSign className="h-7 w-7 text-green-600" /> Agent Commission Payouts
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Manage ₹500 partner commissions, oversee the 15-day hold window, and initiate direct UPI transfers.</p>
        </div>

        <Card className="shadow-md border">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading commission payouts...</div>
            ) : commissions.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">No agent commissions generated yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="border-b bg-muted/60 text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-4">Agent Partner</th>
                      <th className="p-4">UPI ID</th>
                      <th className="p-4">Restaurant</th>
                      <th className="p-4">Commission</th>
                      <th className="p-4">Hold Until</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {commissions.map((c) => (
                      <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-bold text-foreground">{c.agentName}</td>
                        <td className="p-4 font-mono text-xs bg-muted/30 py-1 rounded w-fit">{c.upiId}</td>
                        <td className="p-4 text-muted-foreground">{c.restaurantName}</td>
                        <td className="p-4 font-bold text-green-600">₹{c.amount}</td>
                        <td className="p-4 text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3 text-amber-500" /> {new Date(c.hold_until).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${c.status === 'paid' ? 'bg-green-100 text-green-800' : c.status === 'approved' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {c.status === 'pending' && (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(c.id, 'approved', c.agent_id, c.amount)} className="text-blue-600 border-blue-200 hover:bg-blue-50">
                              Approve Hold
                            </Button>
                          )}
                          {c.status !== 'paid' && (
                            <Button size="sm" onClick={() => updateStatus(c.id, 'paid', c.agent_id, c.amount)} className="bg-green-600 hover:bg-green-700 text-white font-medium">
                              Pay to UPI & Complete
                            </Button>
                          )}
                          {c.status === 'paid' && (
                            <span className="text-muted-foreground text-xs italic">Paid via UPI</span>
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
