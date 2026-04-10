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
  title: 'Larissa e Gabriel - 25 de julho de 2026',
  description: 'Celebre conosco este momento especial.',
  keywords: ['casamento', 'Larissa', 'Gabriel', 'wedding', '2026', 'RSVP'],
  authors: [{ name: 'Larissa' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Casamento Larissa e Gabriel 2026',
    title: 'Larissa e Gabriel - 25 de julho de 2026',
    description: 'Celebre conosco este momento especial.',

  },
  icons: {
    icon: '/icon.png',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${meow.variable}`}>
      <head>
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      </head>
      <body className={`${syne.className} antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}