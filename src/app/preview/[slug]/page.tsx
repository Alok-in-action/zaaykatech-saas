'use client';

import { use, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { type MenuItem } from '@/lib/ai/menuParser';
import { Search, MapPin, Phone, Clock, Instagram, Sparkles, UtensilsCrossed } from 'lucide-react';
import Cafe950Theme from '@/components/templates/cafe950';


interface Restaurant {
  name: string;
  address: string;
  phone: string;
  instagram: string;
  hours: string;
  theme_choice: string;
  primary_color: string;
}

export default function PublicMenuPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [rest, setRest] = useState<Restaurant | null>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadPreview() {
      const supabase = createClient();
      const { data: restaurant } = await supabase.from('restaurants').select('*').eq('slug', slug).single();
      if (!restaurant) {
        setLoading(false);
        return;
      }
      setRest(restaurant as Restaurant);

      const { data: menu } = await supabase.from('menus').select('items').eq('restaurant_id', restaurant.id).single();
      if (menu && Array.isArray(menu.items)) {
        setItems(menu.items as MenuItem[]);
      }
      setLoading(false);
    }
    loadPreview();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-sans">Loading Digital Menu...</div>;
  }

  if (!rest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center font-sans">
        <UtensilsCrossed className="h-12 w-12 text-gray-400 mb-3" />
        <h2 className="text-2xl font-bold text-gray-800">Menu Not Found</h2>
        <p className="text-gray-500 mt-1 text-sm">This menu preview may have moved or expired.</p>
      </div>
    );
  }

  if (rest.theme_choice === 'cafe950' || rest.theme_choice === 'cafe') {
    const sectionCats = Array.from(new Set(items.map((i) => i.category || 'Specials')));
    const sections = sectionCats.map((cat, idx) => ({
      id: `sec-${idx}`,
      title: cat,
      items: items.filter((i) => (i.category || 'Specials') === cat).map((i, iIdx) => ({
        name: i.name,
        price: i.price_rupees ? `₹${i.price_rupees}` : '',
        description: i.description,
        isMostOrdered: iIdx === 0,
      })),
    }));
    return <Cafe950Theme sections={sections} />;
  }

  const primaryColor = rest.primary_color || '#f97316';

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category || 'Specials')))];

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100 pb-20">
      {/* Dynamic Header Banner */}
      <header className="relative py-12 px-6 shadow-md text-white text-center overflow-hidden" style={{ backgroundColor: primaryColor }}>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-medium tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5" /> Digital Menu Preview
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight font-headline drop-shadow-sm">{rest.name}</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-white/90 pt-1">
            {rest.address && (
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {rest.address}</span>
            )}
            {rest.phone && (
              <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {rest.phone}</span>
            )}
            {rest.hours && (
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {rest.hours}</span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        {/* Search Bar */}
        <div className="relative shadow-sm rounded-xl overflow-hidden">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search your favorite dishes or spices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-xs ${selectedCategory === cat ? 'text-white shadow-md' : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100'}`}
              style={selectedCategory === cat ? { backgroundColor: primaryColor } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes Grid / List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 text-neutral-400 text-sm">
            No dishes matching your criteria.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((dish, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs hover:shadow-md transition-shadow flex justify-between gap-4 items-start"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${dish.is_veg ? 'text-green-600' : 'text-amber-600'}`}>
                      {dish.is_veg ? '🟢 VEG' : '🔴 NON-VEG'}
                    </span>
                    {dish.category && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                        {dish.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">{dish.name}</h3>
                  {dish.description && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0 font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-white" style={{ color: primaryColor }}>
                  ₹{dish.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center pt-16 pb-8 text-xs text-neutral-400 space-y-2">
        {rest.instagram && (
          <p className="font-medium text-neutral-500 dark:text-neutral-300">
            Follow us on Instagram: <strong>{rest.instagram}</strong>
          </p>
        )}
        <p>Digitally Powered by <span className="font-bold text-orange-600">ZaaykaTech</span> • Digital Menu SaaS</p>
      </footer>
    </div>
  );
}
