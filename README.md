# CurikBA – Aplikasi Edukasi Bahasa & Aksara Bali Berbasis AI

Mulai pengembangan project pada : 03/11/2026 s.d 06/11/2026

## Description
CurikBA adalah platform edukasi interaktif berbasis AI dan gamifikasi web untuk mengakselerasi literasi Bahasa dan Aksara Bali bagi generasi muda.

## Problem & Target User
- **Problem**: Erosi penggunaan Bahasa Bali halus (Anggah-Ungguh Kruna) di kalangan generasi muda dan minimnya media interaktif untuk belajar Aksara Bali digital.
- **Target User**: Siswa sekolah (SD–SMA), mahasiswa, wisatawan domestik/mancanegara, dan diaspora Bali.

## Key Features
- **Gamified Learning Path**: 5 tipe latihan modular (Multiple Choice, Word Bank, Matching Pairs, Type Answer, Aksara Quiz).
- **Interactive Aksara Bali Studio**: Visualisasi 18 Aksara Wreastra, Swara, dan Sandhangan berbasis Unicode U+1B00–U+1B7F.
- **Guru Wayan AI Tutor**: Asisten tutor percakapan dan konsultasi tata krama bahasa secara real-time.

## Tech Stack
- Frontend: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- AI / LLM: Google Gemini API ('gemini-3.5-flash','gemini-3.8-flash','gemini-3.1-flash-lite')
- State Management: LocalStorage Reactive Store (Hearts, Gems, XP, Streaks)
- Hosting / Deployment: Vercel

## AI Implementation
- Model: Google Gemini API (`@google/generative-ai`)
- System Prompt: Socratic Tutor Persona (Guru Wayan) dengan batasan tata krama bertutur Bali dan output aksara Unicode.
- Fallback Mechanism: Caching respon kontekstual cerdas saat koneksi internet atau kuota API terbatas.

## Architecture / Data Flow
User Input -> Next.js Frontend -> Next.js Edge/Server Route (`/api/ai-tutor`) -> Google Gemini API -> Sanitized Response & Unicode Render -> User UI

## Installation / Run Instructions
```bash
git clone git@github.com:TXRY-bytes/CurikBa.git
cd CurikBa
npm install
cp .env.example .env.local
# Masukkan GEMINI_API_KEY Anda di .env.local
npm run dev
```

## Deployment URL
- Production URL: https://curik-ba.vercel.app/

## Known Limitations
- Modul TTS audio pelafalan saat ini mengandalkan Web Speech API lokal browser.
- Kurikulum latihan saat ini mencakup tingkat pemula (Unit 1 & Unit 2).
- AI terkadang menciptakan false positif (jawaban yg tidak sesuai)
- Tampilan masih kurang responsif dan sering ngebug di perangkat mobile.
- Kurikulum masih terbatas, cakupan kurikulum masih di tingkat dasar saja.
- Integrasi AI masih terbatas, hanya bisa digunakan untuk tanya jawab, belum bisa menggenerate soal secara dinamis sesuai kebutuhan pengguna.
- terdapat beberapa bug di sistem seperti bug nyawa yg tidak berkurang ketika salah menjawab soal.

## Third-party Resources / Credits
- Google Generative AI SDK
- Lucide React & Canvas Confetti
- Karakter Maskot Curik Bali (Aset orisinal tim)

## AI Disclosure
- Kami memanfaatkan model gratis Gemmini & Claude AI untuk mendukung pengembangan aplikasi, mulai frontend hingga backend, di bawah kendali kami.
- Asset seperti foto aplikasi dibuat dengan Claude AI, dengan penentuan dari kami

# RUOK TEAM
### Team Members & Information
- Nama Ketua : Ida Bagus Gede Raditya Pradnyan Putra Kameten - [Peran: Frontend / AI Integration / Kurikulum / Web Architech]
- Nama Anggota 1 : Putu Arya Dananjaya -
[Peran: Desainer / Asset & Content Creator ]
### Kategori Lomba: SMA/SMK