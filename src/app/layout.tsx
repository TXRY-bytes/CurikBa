import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CurikBA - Belajar Bahasa Bali & Aksara Bali',
  description: 'Platform belajar Bahasa Bali dan Aksara Bali interaktif bergaya Duolingo',
  icons: {
    icon: '/images/curik1.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-[#F6F9FC] text-[#14304A]">
        {children}
      </body>
    </html>
  );
}
