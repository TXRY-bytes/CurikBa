'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserProgress } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getLevel, getLevelProgress } from '@/lib/store';

interface ProfileViewProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (p: UserProgress) => UserProgress) => void;
}

export default function ProfileView({ progress, onUpdateProgress }: ProfileViewProps) {
  const [name, setName] = useState(progress.name || 'Pelajar');
  const [isEditingName, setIsEditingName] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(progress.dailyGoal || 50);
  const [soundEnabled, setSoundEnabled] = useState(progress.sound ?? true);
  const [saveToast, setSaveToast] = useState(false);

  const level = getLevel(progress?.xp || 0);
  const levelProgress = getLevelProgress(progress?.xp || 0);
  const totalAnswered = progress?.totalAnswered || 0;
  const totalCorrect = progress?.totalCorrect || 0;
  const accuracy =
    totalAnswered > 0
      ? Math.round((totalCorrect / totalAnswered) * 100)
      : 100;

  function handleSaveProfile() {
    onUpdateProgress((prev) => ({
      ...prev,
      name: name.trim() || 'Pelajar',
      dailyGoal: dailyGoal,
      sound: soundEnabled,
    }));
    setIsEditingName(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  }

  function handleResetProgress() {
    if (confirm('Apakah kamu yakin ingin mereset seluruh progres belajar?')) {
      onUpdateProgress(() => ({
        xp: 0,
        gems: 100,
        hearts: 5,
        streak: 0,
        lastDay: '',
        shield: 0,
        completedLessons: {},
        openedChests: {},
        totalLessons: 0,
        totalCorrect: 0,
        totalAnswered: 0,
        dailyXp: 0,
        dailyLessons: 0,
        dailyCorrect: 0,
        dailyGoal: 50,
        claimedMissions: {},
        sound: true,
        name: 'Pelajar',
      }));
    }
  }

  return (
    <div className="py-6 px-4 max-w-xl mx-auto space-y-6">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#14304A] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg animate-bounce">
          ✓ Pengaturan berhasil disimpan!
        </div>
      )}

      {/* Header Profile Card */}
      <Card className="flex flex-col sm:flex-row items-center gap-6 p-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#5DB8F5] shadow-[0_4px_0_#2E8FD6]">
            <Image
              src="/images/curik1.jpeg"
              alt="Avatar"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#1273BC] text-white font-display font-bold text-xs px-2.5 py-1 rounded-full border-2 border-white shadow">
            Lv. {level}
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          {isEditingName ? (
            <div className="flex items-center gap-2 max-w-xs mx-auto sm:mx-0">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-[#5DB8F5] rounded-xl px-3 py-1.5 text-base font-bold text-[#14304A] w-full"
                placeholder="Masukkan nama"
              />
              <button
                onClick={handleSaveProfile}
                className="bg-[#3CC48A] text-white px-3 py-1.5 rounded-xl font-black text-xs uppercase"
              >
                Simpan
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-display font-bold text-2xl text-[#14304A]">{progress.name}</h1>
              <button
                onClick={() => setIsEditingName(true)}
                className="text-xs text-[#8AA0B4] hover:text-[#1273BC] font-bold"
              >
                ✏️ Ubah
              </button>
            </div>
          )}

          <p className="text-xs text-[#56708A] font-bold mt-1">
            Penjelajah Bahasa Bali · Bergabung di CurikBA
          </p>

          {/* Level Progress */}
          <div className="mt-3">
            <div className="flex justify-between text-xs font-black text-[#56708A] mb-1">
              <span>Progres Level {level}</span>
              <span>{levelProgress} / 100 XP</span>
            </div>
            <div className="w-full h-3 bg-[#EDF3F9] rounded-full overflow-hidden border border-[#DAE5EF]">
              <div
                className="h-full bg-[#5DB8F5] rounded-full transition-all duration-300"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics Grid */}
      <div>
        <h2 className="font-display font-bold text-xl text-[#14304A] mb-3">Statistik Belajar</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="font-display font-bold text-2xl text-[#F59A3D]">{progress.streak}</div>
            <div className="text-[11px] font-black text-[#8AA0B4] uppercase tracking-wider mt-0.5">
              Hari Beruntun
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <div className="font-display font-bold text-2xl text-[#1273BC]">{progress.xp}</div>
            <div className="text-[11px] font-black text-[#8AA0B4] uppercase tracking-wider mt-0.5">
              Total XP
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">💎</div>
            <div className="font-display font-bold text-2xl text-[#5DB8F5]">{progress.gems}</div>
            <div className="text-[11px] font-black text-[#8AA0B4] uppercase tracking-wider mt-0.5">
              Permata
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">🎯</div>
            <div className="font-display font-bold text-2xl text-[#3CC48A]">{accuracy}%</div>
            <div className="text-[11px] font-black text-[#8AA0B4] uppercase tracking-wider mt-0.5">
              Akurasi
            </div>
          </Card>
        </div>
      </div>

      {/* Settings Card */}
      <Card className="p-5 space-y-5">
        <h2 className="font-display font-bold text-lg text-[#14304A]">Pengaturan Belajar</h2>

        {/* Daily Goal */}
        <div>
          <label className="block text-xs font-black uppercase text-[#56708A] tracking-wider mb-2">
            Target XP Harian
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[20, 50, 100].map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => setDailyGoal(goal)}
                className={`py-2 px-3 rounded-xl border-2 font-black text-xs uppercase tracking-wider transition-all ${
                  dailyGoal === goal
                    ? 'bg-[#5DB8F5] border-[#2E8FD6] text-[#08263F] shadow-[0_3px_0_#2E8FD6]'
                    : 'bg-white border-[#DAE5EF] text-[#56708A] hover:bg-[#EDF3F9]'
                }`}
              >
                {goal} XP / hari
              </button>
            ))}
          </div>
        </div>

        {/* Sound toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-[#DAE5EF]">
          <div>
            <div className="font-bold text-sm text-[#14304A]">Efek Suara</div>
            <div className="text-xs text-[#8AA0B4]">Putar suara jawaban benar/salah</div>
          </div>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              soundEnabled ? 'bg-[#5DB8F5]' : 'bg-[#C2D3E3]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                soundEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <Button block onClick={handleSaveProfile} size="md">
          Simpan Pengaturan
        </Button>
      </Card>

      {/* Danger Zone */}
      <Card className="p-5 border-dashed border-[#EF6B63]/40 bg-[#FDE9E7]/20">
        <h3 className="font-display font-bold text-sm text-[#B02F28] mb-1">Zona Bahaya</h3>
        <p className="text-xs text-[#56708A] mb-3">
          Mereset progres akan mengembalikan seluruh skor, bintang level, dan inventaris menjadi 0.
        </p>
        <button
          onClick={handleResetProgress}
          className="text-xs font-black uppercase text-[#B02F28] hover:underline"
        >
          Reset Seluruh Progres
        </button>
      </Card>
    </div>
  );
}

