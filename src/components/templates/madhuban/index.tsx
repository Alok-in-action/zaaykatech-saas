'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Leaf, Utensils, Heart } from 'lucide-react';

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

interface MadhubanThemeProps {
  sections: MenuSection[];
  restaurantName?: string;
}

export default function MadhubanTheme({ sections, restaurantName = "Madhuban Garden & Authentic Dining" }: MadhubanThemeProps) {
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
    <div className="min-h-screen bg-[#1c2e24] text-[#e8f0eb] font-serif selection:bg-[#d97706]/30 selection:text-[#fde68a] pb-24">
      {/* Heritage Garden Header */}
      <header className="relative bg-gradient-to-b from-[#14221b] to-[#1c2e24] border-b border-[#2d4a3b] px-4 py-12 text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d4a3b]/80 text-[#86efac] text-xs font-sans uppercase tracking-widest border border-[#48705a]">
            <Leaf className="w-3.5 h-3.5 text-[#86efac]" /> Heritage Garden & Traditional Dining
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-wide text-[#fde68a] font-serif drop-shadow">
            {restaurantName}
          </h1>
          <p className="text-[#a7c4b5] font-sans text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Savor the soul of authentic garden culinary traditions, enriched with rustic flavours and heartfelt hospitality.
          </p>
        </div>
      </header>

      {/* Navigation & Filter Bar */}
      <div className="sticky top-0 z-40 bg-[#14221b]/95 backdrop-blur-md border-b border-[#2d4a3b] px-4 py-3 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
          <div className="w-full sm:w-72 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#739985]" />
            <input
              type="text"
              placeholder="Search garden delicacies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#23382c] border border-[#345341] text-xs text-white placeholder:text-[#698d7a] focus:outline-none focus:border-[#fde68a] transition-all"
            />
          </div>

          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#d97706] text-white font-bold shadow-md shadow-amber-900/40'
                    : 'bg-[#23382c] text-[#a7c4b5] hover:text-white hover:bg-[#2e4738] border border-[#345341]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Heritage Sections */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12 font-sans">
        {filteredSections.length === 0 ? (
          <div className="text-center py-20 text-[#698d7a]">
            <Utensils className="w-12 h-12 mx-auto text-[#446654] mb-3" />
            <p className="text-lg font-serif text-[#a7c4b5]">No traditional specialties found.</p>
            <p className="text-xs mt-1 text-[#698d7a]">Try switching categories to uncover more dishes.</p>
          </div>
        ) : (
          filteredSections.map((sec) => (
            <section key={sec.id} className="space-y-5">
              <div className="border-b border-[#2d4a3b] pb-2 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#fde68a] tracking-wide font-serif flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#d97706] fill-[#d97706]" /> {sec.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {sec.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group bg-[#21352a] hover:bg-[#273e31] border border-[#345341] hover:border-[#fde68a]/40 rounded-2xl p-5 transition-all duration-300 shadow-md flex flex-col justify-between"
                  >
                    <div>
                      {item.isMostOrdered && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-[#d97706]/20 text-[#fde68a] border border-[#d97706]/40 px-2 py-0.5 rounded mb-2 tracking-wide font-serif">
                          <Sparkles className="w-3 h-3 text-[#fde68a]" /> Traditional Favorite
                        </span>
                      )}
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="text-base font-bold text-white group-hover:text-[#fde68a] transition-colors font-serif tracking-wide">
                          {item.name}
                        </h3>
                        {item.price && (
                          <span className="text-sm font-bold text-[#fde68a] bg-[#14221b] border border-[#345341] px-3 py-1 rounded-lg whitespace-nowrap shadow-sm font-sans">
                            {item.price}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-[#a7c4b5] mt-2 leading-relaxed font-sans line-clamp-2">
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

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center border-t border-[#23382c] text-[#698d7a] font-sans text-xs">
        Powered by <span className="font-bold text-[#d97706]">ZaaykaTech</span> &bull; Authentic Heritage Dining
      </footer>
    </div>
  );
}
