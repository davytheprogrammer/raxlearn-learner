'use client';

import Link from 'next/link';
import { Code2 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-teal-600">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-foreground">raxlearn</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/paths" className="text-sm text-muted-foreground hover:text-foreground transition">
              Skill Paths
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <button className="rounded-lg bg-gradient-to-r from-cyan-400 to-teal-600 px-4 py-2 text-sm font-medium text-white hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
