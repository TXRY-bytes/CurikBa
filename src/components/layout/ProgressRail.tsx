'use client';

import { UserProgress } from '@/types';
import { CURRICULUM } from '@/modules/curriculum/data';
import { getLevel, getXpInLevel } from '@/lib/store';
import ProgressBar from '@/components/ui/ProgressBar';
import Card from '@/components/ui/Card';

interface ProgressRailProps {
  progress: UserProgress;
}

const leaderboardData = [
  { name: 'Made Sukma', xp: 450, avatar: 'M', color: '#5DB8F5' },
  { name: 'Ni Luh Ayu', xp: 380, avatar: 'N', color: '#9ED8FB' },
  { name: 'Kamu', xp: 0, avatar: '?', color: '#2E8FD6', isMe: true },
  { name: 'Wayan Putra', xp: 290, avatar: 'W', color: '#B9CFE2' },
  { name: 'Kadek Dani', xp: 210, avatar: 'K', color: '#5DB8F5' },
];

const dailyMissions = [
  { id: 'm1', label: 'Selesaikan 1 pelajaran', icon: '📚', xp: 20, target: 1, key: 'dailyLessons' as keyof UserProgress },
  { id: 'm2', label: 'Kumpulkan 50 XP hari ini', icon: '⚡', xp: 10, target: 50, key: 'dailyXp' as keyof UserProgress },
  { id: 'm3', label: 'Jawab 10 soal dengan benar', icon: '✅', xp: 15, target: 10, key: 'dailyCorrect' as keyof UserProgress },
];

export default function ProgressRail({ progress }: ProgressRailProps) {
  const xp = progress?.xp || 0;
  const level = getLevel(xp);
  const xpInLevel = getXpInLevel(xp);
  const totalLessons = CURRICULUM.flatMap(u => u.lessons).length;
  const completedCount = Object.keys(progress?.completedLessons || {}).length;

  const lbData = leaderboardData.map(row =>
    row.isMe ? { ...row, xp: xp, name: progress?.name || 'Kamu' } : row
  ).sort((a, b) => b.xp - a.xp);

  return (
    <aside className="sticky top-0 self-start max-h-screen overflow-y-auto flex flex-col gap-5 p-6 pl-6 w-[360px]">
      {/* Profile & XP Card */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-xl text-[#08263F]"
            style={{ background: '#5DB8F5' }}
          >
            {(progress?.name || 'P')[0]?.toUpperCase() || 'P'}
          </div>
          <div>
            <div className="font-black text-[#14304A]">{progress?.name || 'Pelajar'}</div>
            <div className="text-xs font-bold text-[#56708A] uppercase tracking-wider">Level {level}</div>
          </div>
        </div>
        <div className="text-xs font-black text-[#56708A] uppercase tracking-wider mb-1.5">
          XP Level — {xpInLevel}/100
        </div>
        <ProgressBar value={xpInLevel} />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-[#EDF3F9] rounded-xl p-3">
            <div className="text-xl font-display font-bold text-[#1273BC]">{xp}</div>
            <div className="text-xs font-black text-[#56708A] uppercase tracking-wider">Total XP</div>
          </div>
          <div className="bg-[#EDF3F9] rounded-xl p-3">
            <div className="text-xl font-display font-bold text-[#1273BC]">{completedCount}/{totalLessons}</div>
            <div className="text-xs font-black text-[#56708A] uppercase tracking-wider">Pelajaran</div>
          </div>
        </div>
      </Card>

      {/* Daily Missions */}
      <Card>
        <div className="flex justify-between items-baseline mb-4">
          <h3 className="font-display font-bold text-lg text-[#14304A]">Misi Harian</h3>
          <span className="text-xs font-black text-[#1273BC] uppercase tracking-wider">Hari ini</span>
        </div>
        <div className="flex flex-col gap-3">
          {dailyMissions.map(m => {
            const current = Number(progress?.[m.key]) || 0;
            const pct = Math.min(100, (current / m.target) * 100);
            const done = current >= m.target;
            return (
              <div key={m.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF6FD] flex items-center justify-center text-xl flex-none">
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[#14304A] mb-1">{m.label}</div>
                  <ProgressBar value={pct} color={done ? '#3CC48A' : '#5DB8F5'} />
                </div>
                <div className="text-xs font-black text-[#1273BC] flex-none">+{m.xp} XP</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Leaderboard */}
      <Card>
        <div className="flex justify-between items-baseline mb-4">
          <h3 className="font-display font-bold text-lg text-[#14304A]">Papan Skor</h3>
          <span className="text-xs font-black text-[#1273BC] uppercase tracking-wider">Mingguan</span>
        </div>

        {/* Promotion zone */}
        <div className="mb-1 px-4 py-1.5 text-xs font-black tracking-widest uppercase text-[#137A4B] flex items-center gap-2">
          <span>🏆 Zona Promosi</span>
          <div className="flex-1 h-0.5 bg-[#E1F7EC]" />
        </div>

        <div className="flex flex-col gap-1">
          {lbData.slice(0, 5).map((row, idx) => (
            <div
              key={row.name}
              className="grid gap-3 px-3 py-2.5 rounded-xl items-center"
              style={{
                gridTemplateColumns: '28px 36px 1fr auto',
                background: row.isMe ? '#EDF6FD' : 'transparent',
                outline: row.isMe ? '2px solid #5DB8F5' : 'none',
              }}
            >
              <span className="font-black text-[#8AA0B4] text-center tabular-nums text-sm">
                {idx + 1}
              </span>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm"
                style={{ background: row.color, color: '#08263F' }}
              >
                {row.avatar}
              </div>
              <span className="font-bold text-[#14304A] text-sm truncate">{row.name}</span>
              <span className="font-black text-[#56708A] text-sm tabular-nums">{row.xp} XP</span>
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}
