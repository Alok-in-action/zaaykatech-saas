'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import DashboardNav from '@/components/DashboardNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, CheckCircle, XCircle } from 'lucide-react';

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgents() {
      const supabase = createClient();
      const { data } = await supabase.from('agents').select('*').order('created_at', { ascending: false });
      setAgents(data || []);
      setLoading(false);
    }
    loadAgents();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'approved' ? 'suspended' : 'approved';
    const supabase = createClient();
    await supabase.from('agents').update({ status: nextStatus }).eq('id', id);
    setAgents((prev) => prev.map((a) => a.id === id ? { ...a, status: nextStatus } : a));
  };

  const navLinks = [
    { label: 'Agents', href: '/admin/agents' },
    { label: 'Restaurants', href: '/admin/restaurants' },
    { label: 'Subscriptions', href: '/admin/subscriptions' },
    { label: 'Payouts', href: '/admin/payouts' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav title="Agent Partner Roster" role="admin" links={navLinks} />
      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold font-headline flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" /> Registered Agent Partners
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Review student partners, inspect UPI IDs for commission payouts, and manage account authorization.</p>
        </div>

        <Card className="shadow-md border">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading agent partners...</div>
            ) : agents.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">No agent partners registered yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="border-b bg-muted/60 text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-4">Agent Name</th>
                      <th className="p-4">Email & Phone</th>
                      <th className="p-4">College / Institution</th>
                      <th className="p-4">UPI ID</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {agents.map((agent) => (
                      <tr key={agent.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-bold text-foreground">{agent.name}</td>
                        <td className="p-4">
                          <div className="font-medium">{agent.email}</div>
                          <div className="text-xs text-muted-foreground">{agent.phone || 'No phone'}</div>
                        </td>
                        <td className="p-4 text-muted-foreground">{agent.college || '—'}</td>
                        <td className="p-4 font-mono text-xs bg-muted/30 py-1 rounded w-fit">{agent.upi_id}</td>
                        <td className="p-4">
                          {agent.status === 'approved' ? (
                            <span className="inline-flex items-center gap-1 text-green-700 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-950/40 px-2.5 py-1 rounded-full text-xs">
                              <CheckCircle className="h-3 w-3" /> Approved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-600 font-semibold bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-full text-xs">
                              <XCircle className="h-3 w-3" /> Suspended
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleStatus(agent.id, agent.status)}
                            className={agent.status === 'approved' ? 'text-red-600 border-red-200 hover:bg-red-50' : 'text-green-600 border-green-200 hover:bg-green-50'}
                          >
                            {agent.status === 'approved' ? 'Suspend Account' : 'Reactivate'}
                          </Button>
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
