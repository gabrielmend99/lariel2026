import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}

export function Button({ children, href, variant = 'primary', className = '', onClick }: ButtonProps) {
  const baseStyles = "font-syne uppercase px-4 py-3 rounded-full font-medium transition-all hover:scale-105 active:scale-95 flex items-center justify-center";
  
  const variants = {
    primary: "bg-cream text-orange text-lg hover:bg-white",
    secondary: "bg-blue text-cream text-lg",
    outline: "border-2 border-blue text-blue text-lg",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}