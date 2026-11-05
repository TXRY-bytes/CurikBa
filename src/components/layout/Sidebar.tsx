'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { UserProgress } from '@/types';

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

interface SidebarProps {
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

const navItems: NavItem[] = [
  { id: 'belajar', label: 'Belajar', icon: <HomeIcon /> },
  { id: 'aksara', label: 'Aksara', icon: <BookIcon /> },
  { id: 'misi', label: 'Misi', icon: <TargetIcon /> },
  { id: 'papan-skor', label: 'Papan Skor', icon: <TrophyIcon /> },
  { id: 'profil', label: 'Profil', icon: <UserIcon /> },
];

export default function Sidebar({ activeView, onNavigate, progress }: SidebarProps) {
  return (
    <nav
      className="sticky top-0 self-start h-dvh flex flex-col gap-1.5 py-6 px-3.5 border-r-2 border-[#DAE5EF] w-[248px]"
      aria-label="Navigasi utama"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 pb-5">
        <Image
          src="/images/curik1.jpeg"
          width={40}
          height={40}
          alt="CurikBA Logo"
          className="rounded-full object-cover"
        />
        <span className="font-display font-bold text-3xl text-[#1273BC] tracking-tight leading-none">
          CurikBA
        </span>
      </div>

      {/* Nav Items */}
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          aria-current={activeView === item.id ? 'page' : undefined}
          className={cn(
            'flex items-center gap-4 px-3.5 py-3 rounded-xl border-2 font-black text-[13.5px] tracking-widest uppercase transition-colors',
            'hover:bg-[#EDF3F9]',
            activeView === item.id
              ? 'bg-[#EDF6FD] border-[#5DB8F5] text-[#1273BC]'
              : 'border-transparent text-[#56708A]'
          )}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}

      {/* Bottom spacer and XP */}
      <div className="mt-auto px-2 py-3 bg-[#EDF3F9] rounded-xl">
        <div className="text-xs font-black uppercase tracking-wider text-[#8AA0B4] mb-1">Total XP</div>
        <div className="text-2xl font-display font-bold text-[#1273BC]">{progress.xp}</div>
      </div>
    </nav>
  );
}

