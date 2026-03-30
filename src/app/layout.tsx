import type { Metadata } from 'next';
import './globals.css';
import { Syne, Meow_Script } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
});

const meow = Meow_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-meow',
})

export const metadata: Metadata = {
  title: 'Casamento 2026',
  description: 'Celebre conosco este momento especial',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${meow.variable}`}>
      <body className={`${syne.className} antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}