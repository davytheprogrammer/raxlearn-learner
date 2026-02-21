'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">raxlearn</h3>
            <p className="text-sm text-muted-foreground">
              Master modern programming through hands-on project-based learning.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Learning</h4>
            <ul className="space-y-2">
              <li><Link href="/paths" className="text-sm text-muted-foreground hover:text-foreground transition">Skill Paths</Link></li>
              <li><Link href="/paths" className="text-sm text-muted-foreground hover:text-foreground transition">Projects</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Discord</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">GitHub</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">About</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 raxlearn. Built with <Heart className="inline h-4 w-4 text-red-500" /> by raxcore.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
