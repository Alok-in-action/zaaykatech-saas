"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LucideIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface MobileTopNavProps {
  items: NavItem[];
}

export function MobileTopNav({ items }: MobileTopNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-3 left-3 right-3 z-50 md:hidden">
      {/* Top Bar Header */}
      <div className="bg-background/85 backdrop-blur-xl border border-border/80 rounded-2xl px-4 py-3 shadow-lg flex items-center justify-between transition-all duration-300">
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)} 
          className="flex items-center gap-2"
        >
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent font-headline">
            ZaaykaTech
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-xl bg-muted/60 hover:bg-muted text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {isOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mt-2 bg-background/95 backdrop-blur-2xl border border-border/80 rounded-2xl shadow-xl overflow-hidden p-3 origin-top"
          >
            <nav className="flex flex-col gap-1.5">
              {items.map((item) => {
                const Icon = item.icon;
                const isLogin = item.name === "Login" || item.url === "/login";

                if (isLogin) {
                  return (
                    <Link
                      key={item.name}
                      href={item.url}
                      onClick={() => setIsOpen(false)}
                      className="mt-2 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-orange-600 text-primary-foreground font-bold text-base shadow-md shadow-primary/20 hover:opacity-95 active:scale-95 transition-all"
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3.5 py-3 px-4 rounded-xl text-foreground/80 hover:text-primary hover:bg-primary/10 active:bg-primary/15 transition-all text-base font-semibold"
                  >
                    <div className="p-1.5 rounded-lg bg-muted text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
