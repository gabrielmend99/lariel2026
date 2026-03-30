'use client';

import { RSVPModal } from '@/components/RSVPModal';
import { Button } from './ui/Button';


export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-12 py-4 bg-orange w-full" data-name="nav" data-node-id="1:227">
      <span className="font-syne text-cream text-2xl uppercase tracking-wide">25 jul 2026</span>
      <div className="flex gap-4">
        <RSVPModal />
        <Button href="/gifts">Lista de presentes</Button>
      </div>
    </nav>
  );
}