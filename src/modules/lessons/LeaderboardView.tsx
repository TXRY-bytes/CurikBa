'use client';

import { UserProgress } from '@/types';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface LeaderboardViewProps {
  progress: UserProgress;
}

const leaderboardData = [
  { id: '1', name: 'Made Sukma', xp: 450, avatar: 'M', color: '#5DB8F5', lessons: 18 },
  { id: '2', name: 'Ni Luh Ayu', xp: 380, avatar: 'N', color: '#9ED8FB', lessons: 15 },
  { id: '3', name: 'Putu Bagus', xp: 320, avatar: 'P', color: '#2E8FD6', lessons: 12 },
  { id: '4', name: 'Wayan Putra', xp: 290, avatar: 'W', color: '#B9CFE2', lessons: 10 },
  { id: '5', name: 'Kadek Dani', xp: 210, avatar: 'K', color: '#5DB8F5', lessons: 8 },
  { id: '6', name: 'Ketut Sari', xp: 180, avatar: 'K', color: '#9ED8FB', lessons: 7 },
  { id: '7', name: 'Nyoman Devi', xp: 150, avatar: 'N', color: '#2E8FD6', lessons: 6 },
  { id: '8', name: 'Gede Surya', xp: 120, avatar: 'G', color: '#B9CFE2', lessons: 5 },
];

const medals = ['🥇', '🥈', '🥉'];

export default function LeaderboardView({ progress }: LeaderboardViewProps) {
  const name = progress?.name || 'Kamu';
  const myEntry = {
    id: 'me',
    name,
    xp: progress?.xp || 0,
    avatar: (name[0] || 'K').toUpperCase(),
    color: '#5DB8F5',
    lessons: progress?.totalLessons || 0,
    isMe: true,
  };

  const combined = [...leaderboardData, myEntry]
    .sort((a, b) => b.xp - a.xp)
    .map((r, idx) => ({ ...r, rank: idx + 1 }));

  const myRank = combined.find(r => 'isMe' in r && r.isMe)?.rank ?? 0;
  const promotionZone = 3;

  return (
    <div className="pt-6 pb-10">
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-[#14304A]">Papan Skor</h1>
        <p className="text-[#56708A] font-bold mt-1">Peringkat mingguan • Reset Senin</p>
      </div>

      {/* My rank highlight */}
      <Card className="mb-6 bg-[#EDF6FD] border-[#5DB8F5]">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-display font-bold text-[#1273BC] tabular-nums w-10 text-center">
            #{myRank}
          </div>
          <div
            className="w-11 h-11 rounded-full grid place-items-center font-display font-bold text-lg text-[#08263F]"
            style={{ background: '#5DB8F5' }}
          >
            {myEntry.avatar}
          </div>
          <div className="flex-1">
            <div className="font-black text-[#14304A]">{myEntry.name} (Kamu)</div>
            <div className="text-sm text-[#56708A] font-bold">{myEntry.xp} XP</div>
          </div>
          {myRank <= promotionZone ? (
            <span className="text-xs font-black text-[#137A4B] bg-[#E1F7EC] px-2 py-1 rounded-lg">Zona Promosi</span>
          ) : (
            <span className="text-xs font-black text-[#56708A]">+{(combined[promotionZone - 1]?.xp ?? 0) - myEntry.xp} XP untuk promosi</span>
          )}
        </div>
      </Card>

      {/* Full leaderboard */}
      <Card>
        {/* Promotion zone header */}
        <div className="flex items-center gap-2 mb-3 px-2 py-1 text-xs font-black tracking-widest uppercase text-[#137A4B]">
          <span>🏆 Zona Promosi</span>
          <div className="flex-1 h-0.5 bg-[#E1F7EC]" />
        </div>

        <div className="flex flex-col gap-1">
          {combined.map((row, idx) => {
            const isMe = 'isMe' in row && row.isMe;
            const showDemotionDivider = idx === promotionZone;

            return (
              <div key={row.id}>
                {showDemotionDivider && (
                  <div className="flex items-center gap-2 my-3 px-2 py-1 text-xs font-black tracking-widest uppercase text-[#56708A]">
                    <span>🛡️ Zona Bertahan</span>
                    <div className="flex-1 h-0.5 bg-[#DAE5EF]" />
                  </div>
                )}
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors',
                    isMe ? 'bg-[#EDF6FD] outline outline-2 outline-[#5DB8F5]' : 'hover:bg-[#F6F9FC]'
                  )}
                >
                  <span className="w-7 font-black text-[#8AA0B4] text-center tabular-nums text-sm">
                    {medals[row.rank - 1] ?? row.rank}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full grid place-items-center font-display font-bold text-sm flex-none"
                    style={{ background: row.color, color: '#08263F' }}
                  >
                    {row.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn('font-bold text-sm truncate', isMe ? 'text-[#1273BC]' : 'text-[#14304A]')}>
                      {row.name}{isMe ? ' (Kamu)' : ''}
                    </div>
                    <div className="text-xs text-[#8AA0B4] font-bold">{row.lessons} pelajaran</div>
                  </div>
                  <span className="font-black text-[#56708A] text-sm tabular-nums">{row.xp} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

