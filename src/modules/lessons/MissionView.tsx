'use client';

import { UserProgress } from '@/types';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';

interface MissionViewProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (p: UserProgress) => UserProgress) => void;
}

const missions = [
  {
    id: 'm1',
    icon: '📚',
    title: 'Pelajar Tekun',
    desc: 'Selesaikan 1 pelajaran hari ini',
    target: 1,
    xp: 20,
    key: 'dailyLessons' as keyof UserProgress,
  },
  {
    id: 'm2',
    icon: '⚡',
    title: 'Pengumpul XP',
    desc: 'Kumpulkan 50 XP hari ini',
    target: 50,
    xp: 10,
    key: 'dailyXp' as keyof UserProgress,
  },
  {
    id: 'm3',
    icon: '✅',
    title: 'Jawaban Tepat',
    desc: 'Jawab 10 soal dengan benar',
    target: 10,
    xp: 15,
    key: 'dailyCorrect' as keyof UserProgress,
  },
  {
    id: 'm4',
    icon: '🔥',
    title: 'Menjaga Semangat',
    desc: 'Pertahankan streak belajar',
    target: 1,
    xp: 25,
    key: 'streak' as keyof UserProgress,
  },
];

export default function MissionView({ progress, onUpdateProgress }: MissionViewProps) {
  function claimMission(missionId: string, xp: number) {
    if (progress.claimedMissions[missionId]) return;
    onUpdateProgress(p => ({
      ...p,
      xp: p.xp + xp,
      gems: p.gems + 5,
      claimedMissions: { ...p.claimedMissions, [missionId]: true },
    }));
  }

  return (
    <div className="pt-6 pb-10">
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-[#14304A]">Misi Harian</h1>
        <p className="text-[#56708A] font-bold mt-1">Selesaikan misi untuk mendapat bonus XP & Gem</p>
      </div>

      <div className="flex flex-col gap-4">
        {missions.map(m => {
          const current = Number(progress[m.key]) || 0;
          const pct = Math.min(100, (current / m.target) * 100);
          const done = current >= m.target;
          const claimed = !!progress.claimedMissions[m.id];

          return (
            <Card key={m.id} className={claimed ? 'opacity-60' : ''}>
              <div className="grid items-center gap-4" style={{ gridTemplateColumns: '48px 1fr auto' }}>
                <div className="w-12 h-12 rounded-xl bg-[#EDF6FD] grid place-items-center text-2xl">
                  {claimed ? '✅' : m.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-[17px] text-[#14304A] mb-1">{m.title}</h3>
                  <p className="text-sm text-[#56708A] font-bold mb-2">{m.desc}</p>
                  <ProgressBar
                    value={pct}
                    color={done ? '#3CC48A' : '#5DB8F5'}
                  />
                  <div className="text-xs font-bold text-[#8AA0B4] mt-1 tabular-nums">
                    {Math.min(current, m.target)}/{m.target}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1 font-black text-sm text-[#1273BC]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 2l-6 7 12 13L24 9 18 2H6zm1.5 2h9l3.9 5H3.6L7.5 4zm4.5 12.5L4.1 11h15.8L12 16.5z" />
                    </svg>
                    +{m.xp}
                  </div>
                  {done && !claimed && (
                    <Button size="sm" onClick={() => claimMission(m.id, m.xp)}>
                      Klaim
                    </Button>
                  )}
                  {claimed && (
                    <span className="text-xs font-black text-[#3CC48A] uppercase tracking-wide">Selesai</span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Weekly challenge */}
      <div className="mt-8">
        <h2 className="font-display font-bold text-xl text-[#14304A] mb-4">Tantangan Mingguan</h2>
        <Card>
          <div className="flex items-center gap-4">
            <div className="text-4xl">🏆</div>
            <div className="flex-1">
              <h3 className="font-black text-[#14304A] mb-1">Selesaikan 10 pelajaran minggu ini</h3>
              <ProgressBar value={Math.min(100, (progress.totalLessons / 10) * 100)} color="#9B59B6" />
              <div className="text-xs text-[#56708A] font-bold mt-1">{Math.min(progress.totalLessons, 10)}/10 pelajaran</div>
            </div>
            <div className="text-right">
              <div className="font-black text-[#9B59B6] text-sm">+100 XP</div>
              <div className="font-black text-[#F59A3D] text-sm">+20 💎</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

