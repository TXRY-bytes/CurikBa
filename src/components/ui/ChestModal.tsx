'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Button from './Button';

interface ChestModalProps {
  isOpen: boolean;
  isAlreadyOpened: boolean;
  gemReward: number;
  onClaim: () => void;
  onClose: () => void;
}

export default function ChestModal({
  isOpen,
  isAlreadyOpened,
  gemReward,
  onClaim,
  onClose,
}: ChestModalProps) {
  useEffect(() => {
    if (isOpen && !isAlreadyOpened) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59A3D', '#5DB8F5', '#3CC48A', '#FFD700'],
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen, isAlreadyOpened]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#081828]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border-2 border-[#DAE5EF] shadow-2xl text-center animate-slide-up relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EDF3F9] text-[#56708A] hover:bg-[#DAE5EF] flex items-center justify-center font-black transition-colors cursor-pointer"
        >
          ✕
        </button>

        {!isAlreadyOpened ? (
          <>
            {/* Animated Chest Graphic */}
            <div className="w-24 h-24 mx-auto mb-4 bg-[#FFF8EB] border-2 border-[#F59A3D]/40 rounded-3xl flex items-center justify-center text-5xl shadow-[0_6px_0_#F59A3D] animate-bob">
              🎁
            </div>

            <h2 className="font-display font-bold text-2xl text-[#14304A] mb-1">
              Peti Harta Karun!
            </h2>
            <p className="text-xs font-bold text-[#56708A] mb-4">
              Selamat! Kamu telah menyelesaikan modul sebelumnya dan berhak membuka peti ini.
            </p>

            {/* Reward Display */}
            <div className="bg-[#EDF6FD] border-2 border-[#5DB8F5] rounded-2xl py-3 px-4 mb-6 flex items-center justify-center gap-2">
              <span className="text-2xl">💎</span>
              <span className="font-display font-bold text-2xl text-[#1273BC]">
                +{gemReward} Permata
              </span>
            </div>

            <Button
              size="lg"
              block
              onClick={() => {
                try {
                  confetti({
                    particleCount: 100,
                    spread: 80,
                    origin: { y: 0.5 },
                  });
                } catch {}
                onClaim();
              }}
              className="bg-[#F59A3D] text-[#2A1502] shadow-[0_4px_0_#D4832A] hover:brightness-105 active:shadow-none"
            >
              Klaim Permata!
            </Button>
          </>
        ) : (
          <>
            {/* Already Opened State */}
            <div className="w-24 h-24 mx-auto mb-4 bg-[#EDF3F9] border-2 border-[#DAE5EF] rounded-3xl flex items-center justify-center text-5xl">
              ✨
            </div>

            <h2 className="font-display font-bold text-2xl text-[#14304A] mb-1">
              Peti Sudah Dibuka!
            </h2>
            <p className="text-xs font-bold text-[#56708A] mb-6">
              Kamu sudah mengklaim hadiah <span className="text-[#1273BC] font-black">+{gemReward} Permata</span> dari peti ini. Lanjutkan belajar untuk membuka tantangan berikutnya!
            </p>

            <Button size="lg" block variant="soft" onClick={onClose}>
              Mengerti
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

