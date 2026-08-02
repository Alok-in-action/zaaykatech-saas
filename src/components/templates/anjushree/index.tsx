'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Gem, UtensilsCrossed, CheckCircle2 } from 'lucide-react';

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

interface AnjushreeThemeProps {
  sections: MenuSection[];
  restaurantName?: string;
  phone?: string;
  instagram?: string;
  address?: string;
}

export default function AnjushreeTheme({ sections, restaurantName = "Luxury Resort & Dining", phone, instagram, address }: AnjushreeThemeProps) {
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
    <div className="min-h-screen bg-emerald-950/95 text-emerald-100 font-sans selection:bg-emerald-500/30 pb-24">
      {/* Luxury Resort Header */}
      <header className="relative bg-gradient-to-b from-emerald-900 via-emerald-950 to-emerald-950/90 border-b border-emerald-500/20 px-4 py-12 text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold uppercase tracking-widest border border-emerald-500/30">
            <Gem className="w-3.5 h-3.5 text-emerald-400" /> Luxury Resort & Gourmet Dining
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-headline drop-shadow-sm">
            {restaurantName}
          </h1>
          <p className="text-emerald-300/80 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Experience timeless luxury and masterful multi-cuisine creations crafted from organic seasonal harvest.
          </p>
        </div>
      </header>

      {/* Navigation & Filter Bar */}
      <div className="sticky top-0 z-40 bg-emerald-950/90 backdrop-blur-lg border-b border-emerald-500/20 px-4 py-3 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-72 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <input
              type="text"
              placeholder="Search gourmet selections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-700/50 text-xs text-white placeholder:text-emerald-400/60 focus:outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-emerald-950 font-bold shadow-md shadow-emerald-500/20 scale-105'
                    : 'bg-emerald-900/40 text-emerald-300 hover:text-white hover:bg-emerald-900/70 border border-emerald-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gourmet Sections */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        {filteredSections.length === 0 ? (
          <div className="text-center py-20 text-emerald-600">
            <UtensilsCrossed className="w-12 h-12 mx-auto text-emerald-700 mb-3" />
            <p className="text-lg font-semibold text-emerald-300">No gourmet dishes found.</p>
            <p className="text-xs mt-1 text-emerald-500">Please refine your search or explore other courses.</p>
          </div>
        ) : (
          filteredSections.map((sec) => (
            <section key={sec.id} className="space-y-5">
              <div className="border-l-4 border-emerald-400 pl-3.5 py-1 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white tracking-tight font-headline">{sec.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sec.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-500/20 hover:border-emerald-400/50 rounded-2xl p-5 transition-all duration-300 shadow-md flex flex-col justify-between"
                  >
                    <div>
                      {item.isMostOrdered && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-emerald-500 text-emerald-950 px-2 py-0.5 rounded mb-2 shadow-sm">
                          <Sparkles className="w-3 h-3 text-emerald-950" /> Chef&apos;s Recommendation
                        </span>
                      )}
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="text-base font-bold text-emerald-50 group-hover:text-emerald-300 transition-colors">
                          {item.name}
                        </h3>
                        {item.price && (
                          <span className="text-sm font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-lg whitespace-nowrap shadow-sm">
                            {item.price}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-emerald-300/70 mt-2 leading-relaxed line-clamp-2">
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

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center border-t border-emerald-900 text-emerald-600 text-xs">
        Powered by <span className="font-bold text-emerald-400">ZaaykaTech</span> &bull; Luxury Resort Dining
      </footer>
    </div>
  );
}
