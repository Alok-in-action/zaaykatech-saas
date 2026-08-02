'use client';

import React, { useState } from 'react';
import { Search, Coffee, Sparkles, Utensils, Award } from 'lucide-react';

interface MenuItem {
  name: string;
  price?: number | string;
  description?: string;
  isMostOrdered?: boolean;
  customTag?: string;
}

interface MenuSection {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

interface MontoMenuThemeProps {
  sections: MenuSection[];
  restaurantName?: string;
  phone?: string;
  instagram?: string;
  address?: string;
}

export default function MontoMenuTheme({ sections, restaurantName = "Artisan Cafe & Bistro", phone, instagram, address }: MontoMenuThemeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const allCategories = ['All', ...sections.map(s => s.title)];

  const filteredSections = sections.map(sec => ({
    ...sec,
    items: sec.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(sec => 
    (activeCategory === 'All' || sec.title === activeCategory) && sec.items.length > 0
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24">
      {/* Sleek Modern Bistro Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-8 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
              <Coffee className="w-4 h-4" /> Artisan Cafe & Bistro Menu
            </div>
            <h1 className="text-3xl font-black tracking-tight font-headline text-slate-900 dark:text-white">
              {restaurantName}
            </h1>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search handcrafted items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-primary text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all"
            />
          </div>
        </div>
      </header>

      {/* Sticky Category Navbar */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 shadow-sm">
        <div className="max-w-4xl mx-auto overflow-x-auto no-scrollbar flex items-center gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {filteredSections.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Utensils className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">No delicious items found.</p>
            <p className="text-sm mt-1 text-slate-500">Try searching for a different dish or beverage.</p>
          </div>
        ) : (
          filteredSections.map((sec) => (
            <section key={sec.id} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="w-2 h-6 bg-primary rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{sec.title}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sec.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-primary/50 rounded-2xl p-4 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      {item.isMostOrdered && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-md mb-2">
                          <Award className="w-3 h-3 text-orange-500" /> Popular Choice
                        </span>
                      )}
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        {item.price && (
                          <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                            {item.price}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center border-t border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
        Powered by <span className="font-bold text-primary">ZaaykaTech</span> &bull; Smart Bistro Digital Ordering
      </footer>
    </div>
  );
}
