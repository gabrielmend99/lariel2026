'use client';

import { useState, useEffect } from 'react';
import { RSVPModal } from '@/components/RSVPModal';
import { Button } from './ui/Button';


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 flex flex-col md:flex md:flex-row items-center justify-between px-4 md:px-12 py-3 gap-2 md:py-4 transition-all duration-300 ${
      scrolled ? 'bg-orange/75 backdrop-blur-sm' : 'bg-orange'
    }`}>
      <span className="font-syne text-cream text-2xl uppercase">25 jul 2026</span>
      <div className="flex gap-2 md:gap-4">
        <RSVPModal variant='primary' className="w-full md:w-auto"/>
        <Button variant='primary' className="w-full md:w-auto" href="/gifts">Lista de presentes</Button>
      </div>
    </nav>
  );
}