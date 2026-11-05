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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#F6F9FC] text-[#14304A]">
        {children}
      </body>
    </html>
  );
}
