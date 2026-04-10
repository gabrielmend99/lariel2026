'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RSVPModal } from '@/components/RSVPModal';
import { Button } from './ui/Button';
import larielLogo from '/assets/larielLogo_horizontal.svg';


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
    <nav className={`sticky top-0 z-50 flex flex-col md:flex md:flex-row items-center justify-between px-4 md:px-12 py-4 gap-4 md:py-3 transition-all duration-500 md:translate-y-0 ${
      scrolled ? 'bg-orange/75 backdrop-blur-sm' : 'bg-orange'
    } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <a href="/" className="hover:opacity-80 transition-opacity -rotate-6">
        <Image src={larielLogo} alt="Lariel Logo" height={48} />
      </a>
      <div className="flex gap-2 md:gap-4">
        <RSVPModal variant='primary' className="w-full md:w-auto"/>
        <Button variant='primary' className="w-full md:w-auto" href="/gifts">Lista de presentes</Button>
      </div>
    </nav>
  );
}