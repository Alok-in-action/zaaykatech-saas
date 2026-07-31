'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { parseMenuStub, type MenuItem } from '@/lib/ai/menuParser';
import DashboardNav from '@/components/DashboardNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Sparkles, Plus, Trash2, Save, ArrowLeft, Check } from 'lucide-react';

export default function MenuParsingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [loading, setLoading] = useState(true);
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadMenu() {
      const supabase = createClient();
      const { data: rest } = await supabase.from('restaurants').select('name').eq('id', id).single();
      if (rest) setRestaurantName(rest.name);

      const { data: menu } = await supabase.from('menus').select('items').eq('restaurant_id', id).single();
      if (menu && Array.isArray(menu.items)) {
        setItems(menu.items as MenuItem[]);
      }
      setLoading(false);
    }
    loadMenu();
  }, [id]);

  const handleTriggerOCR = async () => {
    setParsing(true);
    const mockFiles = ['menu-page-1.jpg', 'menu-page-2.jpg'];
    const parsed = await parseMenuStub(mockFiles);
    setItems((prev) => [...prev, ...parsed]);
    setParsing(false);
    setSaved(false);
  };

  const handleItemChange = (index: number, field: keyof MenuItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
    setSaved(false);
  };

  const handleAddItem = () => {
    const newItem: MenuItem = {
      id: Math.random().toString(36).substring(7),
      name: 'New Item Name',
      price: 150,
      category: 'Main Course',
      is_veg: true,
      description: '',
    };
    setItems([newItem, ...items]);
    setSaved(false);
  };

  const handleDeleteItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
    setSaved(false);
  };

  const handleSaveMenu = async () => {
    setSaving(true);
    const supabase = createClient();
    
    // Upsert items into menu table
    await supabase.from('menus').update({ items, updated_at: new Date().toISOString() }).eq('restaurant_id', id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <DashboardNav title={`Menu Studio: ${restaurantName}`} role="agent" />
      <main className="container max-w-5xl mx-auto px-4 pt-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Button variant="ghost" size="sm" onClick={() => router.push(`/agent/restaurants/${id}/setup`)} className="gap-1 pl-0 mb-1 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to Restaurant Setup
            </Button>
            <h2 className="text-3xl font-bold font-headline">AI Menu Scanner & Editor</h2>
            <p className="text-muted-foreground text-sm">Upload paper menu images or PDFs to auto-extract items via OCR + AI.</p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAddItem} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" /> Add Manual Item
            </Button>
            <Button onClick={handleSaveMenu} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white gap-2 font-medium">
              {saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Menu Details</>}
            </Button>
          </div>
        </div>

        {/* OCR Upload Zone */}
        <Card className="border-dashed border-2 border-orange-400/60 bg-orange-50/20 shadow-sm">
          <CardHeader className="pb-3 text-center sm:text-left">
            <CardTitle className="text-lg flex items-center justify-center sm:justify-start gap-2 text-orange-800 dark:text-orange-300">
              <Sparkles className="h-5 w-5 text-orange-500" /> Automated OCR & LLM Parsing
            </CardTitle>
            <CardDescription>
              Select menu photographs (JPG, PNG) or PDF files. Our AI classifies food items, veg/non-veg tags, and prices instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="w-full sm:w-auto flex-1">
              <Input type="file" multiple accept="image/*,.pdf" className="cursor-pointer bg-background" />
            </div>
            <Button
              onClick={handleTriggerOCR}
              disabled={parsing}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-6 font-semibold shadow"
            >
              {parsing ? 'Extracting with AI...' : 'Run AI Menu Parser →'}
            </Button>
          </CardContent>
        </Card>

        {/* Menu Review & Edit Table */}
        <Card className="shadow-md border">
          <CardHeader>
            <CardTitle className="text-xl">Parsed Menu Items ({items.length})</CardTitle>
            <CardDescription>Review extracted dishes below. Click any field to edit pricing, categories, or descriptions before generating the owner preview.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading menu data...</div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed rounded-lg text-muted-foreground">
                <p>No menu items available yet. Upload menu pictures above or add items manually!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id || index} className="p-4 border rounded-lg hover:border-primary/40 bg-muted/10 transition-all space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-2">
                        <Label className="text-xs text-muted-foreground">Dish Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                          className="font-medium mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Category</Label>
                        <Input
                          value={item.category}
                          onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                          className="mt-1"
                          placeholder="e.g. Starters"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Price (₹)</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteItem(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1 border-t border-dashed">
                      <div className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          id={`veg-${index}`}
                          checked={item.is_veg}
                          onChange={(e) => handleItemChange(index, 'is_veg', e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <Label htmlFor={`veg-${index}`} className={`font-medium cursor-pointer ${item.is_veg ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                          {item.is_veg ? '● 100% Vegetarian' : '▲ Non-Vegetarian / Egg'}
                        </Label>
                      </div>

                      <div className="flex-1 w-full">
                        <Input
                          placeholder="Short dish description or spices..."
                          value={item.description || ''}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="text-xs text-muted-foreground h-8"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
