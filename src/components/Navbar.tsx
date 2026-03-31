'use client';

import { useState, useEffect } from 'react';
import { RSVPModal } from '@/components/RSVPModal';
import { Button } from './ui/Button';


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`sticky top-0 z-50 flex flex-col md:flex md:flex-row items-center justify-between px-4 md:px-12 py-3 gap-2 md:py-4 transition-all duration-500 md:translate-y-0 ${
      scrolled ? 'bg-orange/75 backdrop-blur-sm' : 'bg-orange'
    } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <span className="font-syne text-cream text-2xl uppercase">25 jul 2026</span>
      <div className="flex gap-2 md:gap-4">
        <RSVPModal variant='primary' className="w-full md:w-auto"/>
        <Button variant='primary' className="w-full md:w-auto" href="/gifts">Lista de presentes</Button>
      </div>
    </nav>
  );
}