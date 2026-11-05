'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface AksaraItem {
  char: string;
  latin: string;
  name: string;
  category: 'wreastra' | 'swara' | 'pangangge';
  ipa: string;
  description: string;
  exampleWord?: string;
  exampleMeaning?: string;
}

const AKSARA_LIST: AksaraItem[] = [
  // Wreastra (18 Consonants)
  { char: 'ᬳ', latin: 'Ha', name: 'Ha / A', category: 'wreastra', ipa: '/ha/ atau /a/', description: 'Aksara pertama dalam urutan Hanacaraka Bali', exampleWord: 'ᬳᬮ (Hala)', exampleMeaning: 'Buruk / Jelek' },
  { char: 'ᬦ', latin: 'Na', name: 'Na', category: 'wreastra', ipa: '/na/', description: 'Aksara konsonan dental nasal', exampleWord: 'ᬦᬤᬶ (Dadi / Nadi)', exampleMeaning: 'Menjadi' },
  { char: 'ᬘ', latin: 'Ca', name: 'Ca', category: 'wreastra', ipa: '/tʃa/', description: 'Aksara konsonan palatal affricate', exampleWord: 'ᬘᬓ᭄ᬭ (Cakra)', exampleMeaning: 'Roda / Senjata' },
  { char: 'ᬭ', latin: 'Ra', name: 'Ra', category: 'wreastra', ipa: '/ra/', description: 'Aksara konsonan alveolar trill', exampleWord: 'ᬭᬳᬬᬸ (Rahayu)', exampleMeaning: 'Selamat / Sejahtera' },
  { char: 'ᬓ', latin: 'Ka', name: 'Ka', category: 'wreastra', ipa: '/ka/', description: 'Aksara konsonan velar stop tak bersuara', exampleWord: 'ᬓᬭᬗ᭄ (Karang)', exampleMeaning: 'Pekarangan' },
  { char: 'ᬤ', latin: 'Da', name: 'Da', category: 'wreastra', ipa: '/da/', description: 'Aksara konsonan dental stop bersuara', exampleWord: 'ᬤᬤᬸᬯ (Dadua)', exampleMeaning: 'Dua' },
  { char: 'ᬢ', latin: 'Ta', name: 'Ta', category: 'wreastra', ipa: '/ta/', description: 'Aksara konsonan dental stop tak bersuara', exampleWord: 'ᬢᬶᬬᬂ (Tiang)', exampleMeaning: 'Saya' },
  { char: 'ᬲ', latin: 'Sa', name: 'Sa', category: 'wreastra', ipa: '/sa/', description: 'Aksara konsonan sibilant alveolar', exampleWord: 'ᬲᬸᬓ᭄ᬱ᭄ᬫ (Suksma)', exampleMeaning: 'Terima kasih' },
  { char: 'ᬯ', latin: 'Wa', name: 'Wa', category: 'wreastra', ipa: '/wa/', description: 'Aksara konsonan labiovelar approximant', exampleWord: 'ᬯᬲ᭄ᬢᬦ᭄ (Wastan)', exampleMeaning: 'Nama' },
  { char: 'ᬮ', latin: 'La', name: 'La', category: 'wreastra', ipa: '/la/', description: 'Aksara konsonan alveolar lateral', exampleWord: 'ᬮᬶᬫ (Lima)', exampleMeaning: 'Lima' },
  { char: 'ᬫ', latin: 'Ma', name: 'Ma', category: 'wreastra', ipa: '/ma/', description: 'Aksara konsonan bilabial nasal', exampleWord: 'ᬫᬦᬶᬲ᭄ (Manis)', exampleMeaning: 'Manis' },
  { char: 'ᬕ', latin: 'Ga', name: 'Ga', category: 'wreastra', ipa: '/ga/', description: 'Aksara konsonan velar stop bersuara', exampleWord: 'ᬕᬚᬄ (Gajah)', exampleMeaning: 'Gajah' },
  { char: 'ᬩ', latin: 'Ba', name: 'Ba', category: 'wreastra', ipa: '/ba/', description: 'Aksara konsonan bilabial stop bersuara', exampleWord: 'ᬩᬮᬶ (Bali)', exampleMeaning: 'Bali' },
  { char: 'ᬗ', latin: 'Nga', name: 'Nga', category: 'wreastra', ipa: '/ŋa/', description: 'Aksara konsonan velar nasal', exampleWord: 'ᬗᭂᬮᬄ (Ngelah)', exampleMeaning: 'Memiliki' },
  { char: 'ᬧ', latin: 'Pa', name: 'Pa', category: 'wreastra', ipa: '/pa/', description: 'Aksara konsonan bilabial stop tak bersuara', exampleWord: 'ᬧᬢ᭄ (Pat)', exampleMeaning: 'Empat' },
  { char: 'ᬚ', latin: 'Ja', name: 'Ja', category: 'wreastra', ipa: '/dʒa/', description: 'Aksara konsonan palatal affricate bersuara', exampleWord: 'ᬚᬮᬦ᭄ (Jalan)', exampleMeaning: 'Jalan' },
  { char: 'ᬬ', latin: 'Ya', name: 'Ya', category: 'wreastra', ipa: '/ja/', description: 'Aksara konsonan palatal approximant', exampleWord: 'ᬬᬾᬄ (Yeh)', exampleMeaning: 'Air' },
  { char: 'ᬜ', latin: 'Nya', name: 'Nya', category: 'wreastra', ipa: '/ɲa/', description: 'Aksara konsonan palatal nasal', exampleWord: 'ᬜᬫ (Nyama)', exampleMeaning: 'Saudara' },

  // Swara (Vowels)
  { char: 'ᬅ', latin: 'A', name: 'Akara', category: 'swara', ipa: '/a/', description: 'Aksara vokal mandiri untuk bunyi A di awal kata' },
  { char: 'ᬇ', latin: 'I', name: 'Ikara', category: 'swara', ipa: '/i/', description: 'Aksara vokal mandiri untuk bunyi I di awal kata' },
  { char: 'ᬉ', latin: 'U', name: 'Ukara', category: 'swara', ipa: '/u/', description: 'Aksara vokal mandiri untuk bunyi U di awal kata' },
  { char: 'ᬏ', latin: 'E', name: 'Ekara', category: 'swara', ipa: '/e/', description: 'Aksara vokal mandiri untuk bunyi E di awal kata' },
  { char: 'ᬒ', latin: 'O', name: 'Okara', category: 'swara', ipa: '/o/', description: 'Aksara vokal mandiri untuk bunyi O di awal kata' },

  // Pangangge Suara & Tengenan
  { char: '◌ᬵ', latin: '-a (panjang)', name: 'Tedung', category: 'pangangge', ipa: '/aː/', description: 'Tanda bunyi vokal panjang a di belakang aksara' },
  { char: '◌ᬶ', latin: '-i', name: 'Ulu', category: 'pangangge', ipa: '/i/', description: 'Tanda bunyi vokal i di atas aksara' },
  { char: '◌ᬸ', latin: '-u', name: 'Suku', category: 'pangangge', ipa: '/u/', description: 'Tanda bunyi vokal u di bawah aksara' },
  { char: 'ᬾ◌', latin: 'e-', name: 'Taling', category: 'pangangge', ipa: '/e/', description: 'Tanda bunyi vokal e di depan aksara' },
  { char: 'ᬾ◌ᬵ', latin: 'o-', name: 'Taleng Tedung', category: 'pangangge', ipa: '/o/', description: 'Kombinasi taling dan tedung untuk bunyi o' },
  { char: '◌᭄', latin: '(mati)', name: 'Adeg-adeg', category: 'pangangge', ipa: '∅', description: 'Tanda pangkon untuk mematikan vokal aksara' },
  { char: '◌ᬂ', latin: '-ng', name: 'Cecek', category: 'pangangge', ipa: '/ŋ/', description: 'Tanda sengau ng di akhir suku kata' },
  { char: '◌ᬄ', latin: '-h', name: 'Bisah', category: 'pangangge', ipa: '/h/', description: 'Tanda hembusan h di akhir suku kata' },
  { char: '◌ᬃ', latin: '-r', name: 'Surang', category: 'pangangge', ipa: '/r/', description: 'Tanda getar r di akhir suku kata' },
];

export default function AksaraChart() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'wreastra' | 'swara' | 'pangangge'>('all');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<AksaraItem | null>(null);
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const filtered = AKSARA_LIST.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      search.trim() === '' ||
      item.latin.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.char.includes(search);
    return matchCat && matchSearch;
  });

  function playSound(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }

  function handleCopy(char: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(char);
      setCopiedChar(char);
      setTimeout(() => setCopiedChar(null), 2000);
    }
  }

  return (
    <div className="py-6 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-[#14304A]">Kamus Aksara Bali</h1>
        <p className="text-[#56708A] font-bold mt-1 text-sm">
          Kenali 18 aksara wreastra, aksara swara (vokal), dan gantungan aksara tradisional Bali.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {[
          { id: 'all', label: 'Semua' },
          { id: 'wreastra', label: 'Wreastra (18)' },
          { id: 'swara', label: 'Swara (Vokal)' },
          { id: 'pangangge', label: 'Pangangge' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase whitespace-nowrap transition-all border-2',
              selectedCategory === tab.id
                ? 'bg-[#5DB8F5] border-[#2E8FD6] text-[#08263F] shadow-[0_3px_0_#2E8FD6]'
                : 'bg-white border-[#DAE5EF] text-[#56708A] hover:bg-[#EDF3F9]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-6 relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari aksara (contoh: Ha, Ka, Tedung)..."
          className="w-full bg-white border-2 border-[#DAE5EF] rounded-xl px-4 py-3 text-sm font-bold text-[#14304A] placeholder-[#8AA0B4] focus:outline-none focus:border-[#5DB8F5] transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-[#8AA0B4] bg-[#EDF3F9] px-2 py-1 rounded-md"
          >
            Reset
          </button>
        )}
      </div>

      {/* Grid of Aksara Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {filtered.map((item) => (
          <button
            key={item.latin + item.char}
            onClick={() => {
              setSelectedItem(item);
              playSound(item.latin);
            }}
            className="group bg-white border-2 border-[#DAE5EF] hover:border-[#5DB8F5] hover:bg-[#EDF6FD] rounded-2xl p-3 flex flex-col items-center justify-center transition-all duration-150 active:scale-95 shadow-[0_3px_0_#DAE5EF] hover:shadow-[0_4px_0_#2E8FD6]"
          >
            <div className="text-4xl text-[#1273BC] font-serif group-hover:scale-110 transition-transform mb-1 py-1">
              {item.char}
            </div>
            <div className="font-display font-bold text-sm text-[#14304A]">
              {item.latin}
            </div>
            <div className="text-[11px] font-black text-[#8AA0B4] uppercase tracking-wide">
              {item.name}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#8AA0B4] font-bold">
          Tidak ditemukan aksara yang cocok dengan kata pencarian.
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#081828]/50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full border-2 border-[#DAE5EF] shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider bg-[#DDEFFC] text-[#1273BC]">
                {selectedItem.category}
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-[#EDF3F9] text-[#56708A] hover:bg-[#DAE5EF] flex items-center justify-center font-black"
              >
                ✕
              </button>
            </div>

            <div className="text-center my-4">
              <div className="text-7xl text-[#1273BC] font-serif mb-2 select-all">
                {selectedItem.char}
              </div>
              <h3 className="font-display font-bold text-2xl text-[#14304A]">
                {selectedItem.name}
              </h3>
              <p className="text-[#56708A] font-bold text-sm mt-0.5">
                Bunyi fonetik: <span className="text-[#1273BC]">{selectedItem.ipa}</span>
              </p>
            </div>

            <p className="text-xs text-[#56708A] bg-[#F6F9FC] border border-[#DAE5EF] rounded-xl p-3 leading-relaxed mb-4">
              {selectedItem.description}
            </p>

            {selectedItem.exampleWord && (
              <div className="bg-[#EDF6FD] rounded-xl p-3 border border-[#5DB8F5]/30 mb-5">
                <div className="text-[11px] font-black uppercase text-[#1273BC] tracking-wider mb-1">
                  Contoh Penggunaan:
                </div>
                <div className="text-lg font-serif text-[#14304A]">
                  {selectedItem.exampleWord}
                </div>
                <div className="text-xs text-[#56708A] font-bold">
                  {selectedItem.exampleMeaning}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => playSound(selectedItem.latin)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#5DB8F5] text-[#08263F] font-black text-xs uppercase tracking-wider shadow-[0_4px_0_#2E8FD6] hover:brightness-105 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2"
              >
                🔊 Dengar
              </button>
              <button
                onClick={() => handleCopy(selectedItem.char)}
                className="py-3 px-4 rounded-xl border-2 border-[#DAE5EF] bg-white text-[#14304A] font-black text-xs uppercase tracking-wider hover:bg-[#EDF3F9] active:translate-y-1"
              >
                {copiedChar === selectedItem.char ? '✓ Tersalin' : 'Salin'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

