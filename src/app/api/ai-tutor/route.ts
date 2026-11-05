import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Pesan tidak valid' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY belum dikonfigurasi di file .env.local' },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `Kamu adalah Guru Wayan, seorang tutor dan guru Bahasa Bali serta Aksara Bali yang ramah, bijaksana, dan sabar pada aplikasi edukasi CurikBA.
Aturan responmu:
1. Jawab pertanyaan pengguna dalam bahasa Indonesia yang santun, hangat, dan mudah dipahami.
2. Selalu sertakan contoh bahasa Bali (lengkap dengan aksara Bali Unicode U+1B00-U+1B7F jika relevan) beserta arti bahasa Indonesianya.
3. Jelaskan tingkatan bahasa (Bali Alus / Singgih / Sor / Andap) jika berkaitan dengan tata krama bertutur (Anggah-Ungguh Kruna).
4. Buat jawaban tetap ringkas, terstruktur rapi dengan poin-poin yang mudah dipelajari seperti micro-learning gaya Duolingo.
5. Awali atau akhiri dengan salam khas Bali seperti "Om Swastyastu", "Matur suksma", atau "Rahajeng".`,
    });

    // Format history for chat
    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((item: any) => ({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.parts?.[0]?.text || '' }],
        }))
      : [];

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error('Error in AI Tutor route:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal memproses permintaan AI' },
      { status: 500 }
    );
  }
}

