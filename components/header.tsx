import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Droplet } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Droplet className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">BlobCraft</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/gallery" className="text-sm font-medium hover:text-primary transition-colors">
            Gallery
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Button asChild>
            <Link href="/create">Create Blob</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
