# CurikBA – Belajar Bahasa & Aksara Bali

CurikBA adalah platform web pembelajaran Bahasa Bali dan Aksara Bali interaktif bergaya **Duolingo** yang dibangun dengan **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, dan **Google Gemini AI**.

---

## 🌟 Fitur Utama (MVP)

1. **Jalur Belajar Gamifikasi (Learning Path)**:
   - Tampilan jalur zigzag khas Duolingo dengan tombol 3D bertepi (elevated buttons).
   - Status modul: Selesai, Aktif (dengan ring animasi dan maskot), Terkunci.
   - Hadiah Peti Permata (Chest) dan Tantangan Unit (Trophy).

2. **Mesin Latihan Modular (Modular Exercise Engine)**:
   - **Multiple Choice**: Pemilihan kata dan arti kalimat.
   - **Word Bank**: Penyusunan blok kata dalam urutan bahasa Bali yang benar.
   - **Matching Pairs**: Pencocokan kosakata Bali ↔ Indonesia secara interaktif.
   - **Type Answer**: Latihan menulis kata dalam bahasa Bali.
   - **Aksara Quiz**: Tebak bunyi dan bentuk Aksara Bali.
   - Desain modular: mudah menambah tipe latihan baru di `src/modules/lessons/exercises/`.

3. **Kamus & Visualisasi Aksara Bali Interaktif**:
   - 18 Aksara Wreastra (Konsonan dasar: Ha, Na, Ca, Ra, Ka, ...).
   - Aksara Swara (Vokal mandiri).
   - Pangangge Suara & Tengenan (Tanda vokal & sandhangan).
   - Fitur dengarkan pelafalan (SpeechSynthesis) dan salin karakter Unicode.

4. **Tutor AI Terintegrasi (Guru Wayan)**:
   - Tutor interaktif ramah berbasis Google Gemini API (`gemini-1.5-flash`).
   - Mampu menjawab tanya jawab percakapan sehari-hari, aturan aksara, dan tingkatan bahasa (Bali Alus / Andap).
   - Fallback cerdas offline jika API key belum diisi.

5. **Gamifikasi & Progres Belajar**:
   - Sistem XP, Permata (Gems), Nyawa (Hearts), dan Daily Streak.
   - Misi harian dengan tombol klaim hadiah.
   - Papan skor liga (Leaderboard).
   - Pengaturan profil dan target belajar harian tersimpan rapi di browser (`localStorage`).

6. **Desain & Responsivitas Modern**:
   - Tema warna: Dominan Putih (`#FFFFFF`, `#F6F9FC`) dengan aksen Biru Langit (`#5DB8F5`, `#2E8FD6`, `#1273BC`).
   - Responsif di semua ukuran layar:
     - **Desktop (>1080px)**: 3 Kolom (Sidebar Nav, Learning Path, Progress Rail).
     - **Tablet (820px-1080px)**: 2 Kolom dengan Top Bar statistik.
     - **Mobile (<820px)**: 1 Kolom adaptif dengan Bottom Navigation Bar.
   - Logo aplikasi: Menggunakan maskot resmi di `/images/curik1.jpeg`.
   - Siap animasi `.rif` (Rive) di layar penyelesaian modul (`CompletionScreen.tsx`).

---

## 🚀 Cara Menjalankan

### 1. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 2. Konfigurasi AI Tutor (Opsional)
Buka file `.env.local` dan masukkan Google Gemini API Key Anda:
```env
GEMINI_API_KEY=AIzaSy...
```
*(Catatan: Aplikasi tetap memiliki respon interaktif bawaan untuk pertanyaan seputar bahasa Bali meskipun tanpa API key)*.

### 3. Build Produksi
```bash
npm run build
npm run start
```

---

## 🧱 Arsitektur Modular

```
src/
├── app/
│   ├── layout.tsx              # Root layout & Google Fonts (Fredoka + Nunito)
│   ├── page.tsx                # Halaman utama
│   ├── globals.css             # Desain sistem & variabel warna
│   └── api/ai-tutor/route.ts   # Endpoint integrasi Google Gemini
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx        # Shell tata letak responsif 3-kolom
│   │   ├── Sidebar.tsx         # Navigasi kiri desktop
│   │   ├── TopBar.tsx          # Bar atas & Bottom Nav mobile
│   │   └── ProgressRail.tsx    # Panel statistik & misi kanan
│   └── ui/                     # Komponen UI dasar (Button, Card, StatsBar, Mascot)
├── modules/
│   ├── curriculum/
│   │   └── data.ts             # Data kurikulum & bank soal bahasa Bali
│   ├── lessons/
│   │   ├── LearningPath.tsx    # Jalur belajar zigzag
│   │   ├── ExerciseEngine.tsx  # Mesin render latihan soal
│   │   ├── CompletionScreen.tsx # Layar apresiasi & slot animasi .rif
│   │   └── exercises/          # Modul latihan (MultipleChoice, WordBank, Pairs, dll.)
│   ├── aksara/
│   │   └── AksaraChart.tsx     # Tabel aksara Bali interaktif
│   └── ai-tutor/
│       └── AiTutor.tsx         # Chat tutor Guru Wayan
└── lib/
    ├── store.ts                # Penyimpanan progres & state management
    └── utils.ts                # Helper styling (clsx + tailwind-merge)
```

### Cara Menambahkan Mata Pelajaran / Soal Baru:
Cukup tambahkan objek `Unit` atau `Lesson` pada `src/modules/curriculum/data.ts`. Sistem akan secara otomatis membuat node pada jalur belajar dan memasukkan soal ke dalam Exercise Engine.

