'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  time: string;
}

interface AiTutorProps {
  onBack: () => void;
}

const QUICK_PROMPTS = [
  'Bagaimana cara mengucapkan salam dalam bahasa Bali?',
  'Jelaskan perbedaan bahasa Bali Alus dan Kasar',
  'Bagaimana cara menulis aksara Bali "Om Swastyastu"?',
  'Ajarkan saya berhitung 1 sampai 10 dalam bahasa Bali',
];

export default function AiTutor({ onBack }: AiTutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: 'Om Swastyastu! Rahajeng semeng/siang. Saya Guru Wayan, tutor interaktif Bahasa dan Aksara Bali di CurikBA. Ada yang ingin kamu tanyakan atau latih hari ini?',
      time: 'Baru saja',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function speakText(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }

  async function handleSend(textToSend?: string) {
    const text = (textToSend ?? input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for API
      const history = messages.slice(1).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) {
        throw new Error('API response error');
      }

      const data = await res.json();
      const reply = data.response || 'Matur suksma! Ada yang bisa saya bantu lagi?';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      // Intelligent fallback response if API is unreachable / without key
      let fallbackText = 'Matur suksma atas pertanyaannya! ';
      const lower = text.toLowerCase();

      if (lower.includes('salam') || lower.includes('swastyastu')) {
        fallbackText += 'Salam pembuka utama di Bali adalah "Om Swastyastu" (ᬒᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ), yang bermakna "Semoga selamat sejahtera atas karunia Sang Hyang Widhi". Untuk salam waktu: "Rahajeng semeng" (Pagi), "Rahajeng siang" (Siang), "Rahajeng wengi" (Malam).';
      } else if (lower.includes('hitung') || lower.includes('angka') || lower.includes('1')) {
        fallbackText += 'Berikut angka 1-10 dalam bahasa Bali: 1=Sa/Besik, 2=Dua, 3=Telu, 4=Pat, 5=Lima, 6=Nem, 7=Pitu, 8=Kutus, 9=Sia, 10=Dasa.';
      } else if (lower.includes('aksara')) {
        fallbackText += 'Aksara Bali terdiri dari 18 aksara wreastra dasar: Ha, Na, Ca, Ra, Ka, Da, Ta, Sa, Wa, La, Ma, Ga, Ba, Nga, Pa, Ja, Ya, Nya. Kamu bisa mengecek tabel aksara lengkap di tab menu Aksara!';
      } else if (lower.includes('alus') || lower.includes('kasar')) {
        fallbackText += 'Tingkatan bahasa Bali terbagi menjadi: Bali Alus (singgih/sor) yang dipakai untuk orang yang dihormati, dan Bali Kasar/Andap yang dipakai dengan teman akrab sebaya. Contohnya: "Saya" dalam alus adalah "Tiang", sedangkan dalam andap/kasar adalah "Icang".';
      } else {
        fallbackText += `Saya memahami kamu bertanya tentang "${text}". Bahasa Bali memiliki kekayaan kosakata dan tata krama bertutur (Anggah-Ungguh Kruna). Coba tanyakan juga contoh percakapan sehari-hari!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: fallbackText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] max-w-2xl mx-auto py-2 px-3 sm:px-4">
      {/* Header Bar */}
      <div className="flex items-center gap-3 bg-white border-2 border-[#DAE5EF] rounded-2xl p-3 shadow-xs mb-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-[#EDF3F9] hover:bg-[#DAE5EF] text-[#14304A] flex items-center justify-center font-black transition-colors"
          aria-label="Kembali"
        >
          ←
        </button>

        <div className="relative">
          <Image
            src="/images/curik1.jpeg"
            alt="Guru Wayan"
            width={44}
            height={44}
            className="rounded-full object-cover border-2 border-[#5DB8F5]"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#3CC48A] border-2 border-white rounded-full" />
        </div>

        <div>
          <h2 className="font-display font-bold text-lg text-[#14304A] leading-tight">
            Guru Wayan
          </h2>
          <p className="text-xs text-[#3CC48A] font-black uppercase tracking-wider">
            Tutor AI Bahasa Bali · Aktif
          </p>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 px-1 py-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 border-2 shadow-xs ${
                m.sender === 'user'
                  ? 'bg-[#5DB8F5] border-[#2E8FD6] text-[#08263F] font-bold rounded-tr-xs'
                  : 'bg-white border-[#DAE5EF] text-[#14304A] font-medium rounded-tl-xs'
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>

              {m.sender === 'tutor' && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#DAE5EF]/50">
                  <span className="text-[10px] text-[#8AA0B4] font-black uppercase">{m.time}</span>
                  <button
                    onClick={() => speakText(m.text)}
                    className="text-xs text-[#1273BC] font-bold hover:underline flex items-center gap-1"
                    title="Dengarkan pelafalan"
                  >
                    🔊 Dengarkan
                  </button>
                </div>
              )}
            </div>
            {m.sender === 'user' && (
              <span className="text-[10px] text-[#8AA0B4] font-bold mt-1 mr-1">{m.time}</span>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="bg-white border-2 border-[#DAE5EF] rounded-2xl px-4 py-3 text-sm text-[#56708A] font-bold flex items-center gap-2">
              <span className="animate-spin text-lg">🌀</span>
              Guru Wayan sedang mengetik...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="py-2 overflow-x-auto flex gap-2 scrollbar-none">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-xs font-bold text-[#1273BC] bg-[#EDF6FD] border border-[#5DB8F5]/40 hover:bg-[#DDEFFC] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2 pt-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya Guru Wayan tentang bahasa Bali..."
          className="flex-1 bg-white border-2 border-[#DAE5EF] focus:border-[#5DB8F5] rounded-xl px-4 py-3 text-sm font-bold text-[#14304A] placeholder-[#8AA0B4] focus:outline-none transition-colors"
        />
        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-5 uppercase font-black"
        >
          Kirim
        </Button>
      </form>
    </div>
  );
}

