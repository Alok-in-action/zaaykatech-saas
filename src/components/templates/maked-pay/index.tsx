'use client';

import React, { useState } from 'react';
import { Search, Flame, Sparkles, ShoppingBag, Utensils } from 'lucide-react';

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

interface MakedPayThemeProps {
  sections: MenuSection[];
  restaurantName?: string;
  phone?: string;
  instagram?: string;
  address?: string;
}

export default function MakedPayTheme({ sections, restaurantName = "Fast Casual Dining", phone, instagram, address }: MakedPayThemeProps) {
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
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-amber-500/30 selection:text-amber-200 pb-24">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20 mb-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" /> Fast Casual & Combos
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-headline">{restaurantName}</h1>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search menu items, combos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Category Pill Navigation */}
        <div className="max-w-4xl mx-auto px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Menu Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {filteredSections.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <Utensils className="w-12 h-12 mx-auto text-zinc-700 mb-3" />
            <p className="text-lg font-medium text-zinc-400">No items match your search.</p>
            <p className="text-sm mt-1">Try checking another category or clearing your query.</p>
          </div>
        ) : (
          filteredSections.map((sec) => (
            <section key={sec.id} className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-3 py-1">
                <h2 className="text-2xl font-bold text-white tracking-tight">{sec.title}</h2>
                {sec.subtitle && <p className="text-xs text-zinc-400">{sec.subtitle}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sec.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-4 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-amber-500/5 flex flex-col justify-between"
                  >
                    <div>
                      {item.isMostOrdered && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-md mb-2">
                          <Sparkles className="w-3 h-3" /> Bestseller
                        </span>
                      )}
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </h3>
                        {item.price && (
                          <span className="text-sm font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full whitespace-nowrap">
                            {item.price}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
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

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center border-t border-zinc-900 text-zinc-600 text-xs">
        Powered by <span className="font-bold text-amber-500">ZaaykaTech</span> &bull; Digital Menu Experience
      </footer>
    </div>
  );
}
