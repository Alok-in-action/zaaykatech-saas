'use client';

import React, { useState } from 'react';
import { Search, Crown, Sparkles, UtensilsCrossed, Star } from 'lucide-react';

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

interface BombayDarbarThemeProps {
  sections: MenuSection[];
  restaurantName?: string;
}

export default function BombayDarbarTheme({ sections, restaurantName = "Bombay Darbar Royal Dining" }: BombayDarbarThemeProps) {
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
    <div className="min-h-screen bg-stone-950 text-stone-200 font-serif selection:bg-amber-600/30 selection:text-amber-200 pb-24">
      {/* Royal Header Banner */}
      <header className="relative bg-gradient-to-b from-amber-950/80 via-stone-900 to-stone-950 border-b border-amber-500/20 px-4 py-12 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-sans uppercase tracking-widest border border-amber-500/30">
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" /> Royal Indian Heritage & Hotel Cuisine
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-wide text-amber-300 drop-shadow-md font-serif">
            {restaurantName}
          </h1>
          <p className="text-stone-400 font-sans text-xs sm:text-sm max-w-md mx-auto tracking-wide">
            An opulent celebration of authentic Indian spices, traditional hand-crafted culinary artistry, and regal dining.
          </p>
        </div>
      </header>

      {/* Sticky Search & Navigation Bar */}
      <div className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-amber-500/20 px-4 py-3 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-72 relative font-sans">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search dishes, gravies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center gap-2 font-sans">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold shadow-md shadow-amber-900/50 border border-amber-500/50'
                    : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12 font-sans">
        {filteredSections.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <UtensilsCrossed className="w-12 h-12 mx-auto text-stone-700 mb-3" />
            <p className="text-lg font-serif text-stone-400">No royal dishes match your quest.</p>
            <p className="text-xs mt-1 text-stone-500">Try adjusting your keyword or switching categories.</p>
          </div>
        ) : (
          filteredSections.map((sec) => (
            <section key={sec.id} className="space-y-6">
              <div className="text-center sm:text-left border-b border-amber-500/20 pb-2 flex items-center justify-between">
                <h2 className="text-2xl font-bold font-serif text-amber-300 tracking-wide flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> {sec.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {sec.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-stone-900/90 hover:bg-gradient-to-br hover:from-stone-900 hover:to-amber-950/20 border border-amber-500/20 hover:border-amber-500/60 rounded-xl p-5 transition-all duration-300 shadow-md flex flex-col justify-between"
                  >
                    <div>
                      {item.isMostOrdered && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded mb-2 font-serif tracking-wider">
                          <Crown className="w-3 h-3 text-amber-400" /> Chef&apos;s Signature
                        </span>
                      )}
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors font-serif tracking-wide">
                          {item.name}
                        </h3>
                        {item.price && (
                          <span className="text-sm font-bold text-amber-300 bg-amber-950/80 border border-amber-600/40 px-3 py-1 rounded-md whitespace-nowrap shadow-sm font-sans">
                            {item.price}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-stone-400 mt-2 leading-relaxed font-sans line-clamp-2">
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

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center border-t border-stone-900 text-stone-600 font-sans text-xs">
        Powered by <span className="font-bold text-amber-500">ZaaykaTech</span> &bull; Royal Hotel Digital Dining
      </footer>
    </div>
  );
}
