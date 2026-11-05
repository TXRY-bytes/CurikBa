'use client';

import Image from 'next/image';
import { UserProgress } from '@/types';
import StatsBar from '@/components/ui/StatsBar';
import { cn } from '@/lib/utils';

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

interface TopBarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  progress: UserProgress;
}

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const BookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
  </svg>
);

const TargetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM7 10.82C5.84 10.4 5 9.3 5 8V7h2v3.82zM19 8c0 1.3-.84 2.4-2 2.82V7h2v1z" />
  </svg>
);

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const mobileNavItems: NavItem[] = [
  { id: 'belajar', label: 'Belajar', icon: <HomeIcon /> },
  { id: 'aksara', label: 'Aksara', icon: <BookIcon /> },
  { id: 'misi', label: 'Misi', icon: <TargetIcon /> },
  { id: 'papan-skor', label: 'Skor', icon: <TrophyIcon /> },
  { id: 'profil', label: 'Profil', icon: <UserIcon /> },
];

export default function TopBar({ activeView, onNavigate, progress }: TopBarProps) {
  return (
    <>
      {/* Top bar - visible on tablet and below (< 1080px) */}
      <div className="hidden md:flex lg:hidden sticky top-0 z-20 h-14 bg-[#F6F9FC] items-center justify-between gap-3 px-4 border-b-2 border-[#DAE5EF]">
        <div className="flex items-center gap-2">
          <Image
            src="/images/curik1.jpeg"
            width={34}
            height={34}
            alt="CurikBA Logo"
            className="rounded-full object-cover"
          />
          <span className="font-display font-bold text-xl text-[#1273BC]">CurikBA</span>
        </div>
        <StatsBar progress={progress} />
      </div>

      {/* Top bar - visible on mobile (< 820px) */}
      <div className="flex md:hidden sticky top-0 z-20 h-14 bg-[#F6F9FC] items-center justify-between gap-3 px-4 border-b-2 border-[#DAE5EF]">
        <div className="flex items-center gap-2">
          <Image
            src="/images/curik1.jpeg"
            width={30}
            height={30}
            alt="CurikBA Logo"
            className="rounded-full object-cover"
          />
          <span className="font-display font-bold text-lg text-[#1273BC]">CurikBA</span>
        </div>
        <StatsBar progress={progress} />
      </div>

      {/* Bottom navigation - visible on mobile only */}
      <nav
        className="flex md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t-2 border-[#DAE5EF] px-2 pb-safe"
        aria-label="Navigasi bawah"
      >
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            aria-current={activeView === item.id ? 'page' : undefined}
            className={cn(
              'flex flex-col items-center justify-center gap-1 flex-1 py-2.5 rounded-xl transition-colors',
              activeView === item.id ? 'text-[#1273BC]' : 'text-[#8AA0B4]'
            )}
          >
            {item.icon}
            <span className="text-[10px] font-black tracking-wide uppercase">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}

