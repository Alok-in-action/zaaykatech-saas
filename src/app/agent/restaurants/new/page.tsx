'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import DashboardNav from '@/components/DashboardNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function NewRestaurantPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError('You must be logged in as an Agent to onboard a restaurant.');
      setLoading(false);
      return;
    }

    const { data: agent } = await supabase.from('agents').select('id').eq('user_id', user.id).single();
    if (!agent) {
      setError('Agent profile not found.');
      setLoading(false);
      return;
    }

    // Generate clean slug from name
    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const slug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

    const { data, error: insertError } = await supabase
      .from('restaurants')
      .insert({
        name,
        address,
        phone,
        instagram,
        city,
        slug,
        agent_id: agent.id,
        status: 'draft',
        owner_user_id: null,
      })
      .select('id')
      .single();

    if (insertError || !data) {
      setError(insertError?.message || 'Failed to create restaurant');
      setLoading(false);
      return;
    }

    // Initialize empty menu record
    await supabase.from('menus').insert({ restaurant_id: data.id, items: [] });

    router.push(`/agent/restaurants/${data.id}/setup`);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav title="Onboarding Wizard" role="agent" />
      <main className="container max-w-2xl mx-auto px-4 py-12">
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Add New Restaurant</CardTitle>
            <CardDescription>
              Step 1: Enter the basic restaurant contact and location details to generate a draft profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Restaurant Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Punjabi Rasoi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City / Area *</Label>
                <Input
                  id="city"
                  placeholder="e.g. Indiranagar, Bengaluru"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Physical Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main Street, Near Metro Station"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Restaurant Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+91 80 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Handle (Optional)</Label>
                  <Input
                    id="instagram"
                    placeholder="@punjabirasoi_official"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6">
                  {loading ? 'Creating Profile...' : 'Create & Proceed to Setup →'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
