import { Unit } from '@/types';

export const CURRICULUM: Unit[] = [
  {
    id: 'u1',
    part: 1, no: 1,
    title: 'Sapaan & Salam',
    titleBali: 'Pangaksama',
    description: 'Pelajari cara menyapa dalam bahasa Bali',
    color: '#5DB8F5',
    lessons: [
      {
        id: 'u1-l1',
        title: 'Salam Dasar',
        nodeType: 'lesson',
        xpReward: 10,
        exercises: [
          {
            id: 'e1',
            type: 'multiple-choice',
            question: 'Apa arti "Om Swastyastu"?',
            options: ['Semoga selamat sejahtera', 'Selamat pagi', 'Terima kasih', 'Permisi'],
            correctAnswer: 'Semoga selamat sejahtera',
            explanation: 'Om Swastyastu adalah salam pembuka dalam bahasa Bali yang berarti "Semoga selamat sejahtera atas karunia Tuhan"'
          },
          {
            id: 'e2',
            type: 'multiple-choice',
            question: 'Bagaimana cara mengucapkan "Selamat pagi" dalam bahasa Bali?',
            options: ['Rahajeng semeng', 'Rahajeng siang', 'Rahajeng wengi', 'Rahajeng tengah lemeng'],
            correctAnswer: 'Rahajeng semeng',
            explanation: '"Rahajeng semeng" artinya selamat pagi. Semeng = pagi hari'
          },
          {
            id: 'e3',
            type: 'matching-pairs',
            question: 'Cocokkan salam dengan artinya!',
            pairs: [['Rahajeng semeng', 'Selamat pagi'], ['Rahajeng siang', 'Selamat siang'], ['Rahajeng wengi', 'Selamat malam']],
            correctAnswer: 'matched',
          },
          {
            id: 'e4',
            type: 'word-bank',
            question: 'Susun kalimat: "Selamat tinggal" dalam bahasa Bali',
            wordBank: ['Rahajeng', 'pamit', 'Wengi', 'siang', 'Nggih'],
            correctAnswer: 'Rahajeng pamit',
            explanation: '"Rahajeng pamit" berarti "Selamat tinggal / Permisi saya pamit"'
          },
          {
            id: 'e5',
            type: 'multiple-choice',
            question: 'Apa bahasa Bali untuk "Terima kasih"?',
            options: ['Suksma', 'Ampura', 'Inggih', 'Nenten'],
            correctAnswer: 'Suksma',
            explanation: '"Suksma" atau "Matur suksma" artinya terima kasih dalam bahasa Bali'
          }
        ]
      },
      {
        id: 'u1-l2',
        title: 'Percakapan Dasar',
        nodeType: 'lesson',
        xpReward: 10,
        exercises: [
          {
            id: 'e6',
            type: 'multiple-choice',
            question: 'Apa arti "Inggih" dalam bahasa Bali?',
            options: ['Ya/Iya (formal)', 'Tidak', 'Mungkin', 'Belum'],
            correctAnswer: 'Ya/Iya (formal)',
            explanation: '"Inggih" adalah kata "ya" yang sopan/formal dalam bahasa Bali'
          },
          {
            id: 'e7',
            type: 'multiple-choice',
            question: 'Bagaimana cara mengatakan "Maaf" dalam bahasa Bali?',
            options: ['Ampura', 'Suksma', 'Inggih', 'Nenten'],
            correctAnswer: 'Ampura',
            explanation: '"Ampura" artinya maaf. Bisa juga "Ampurayang tiang" (Maafkan saya)'
          },
          {
            id: 'e8',
            type: 'word-bank',
            question: 'Susun kalimat: "Nama saya Wayan"',
            wordBank: ['tiang', 'Wastan', 'Wayan', 'Ampura', 'Inggih'],
            correctAnswer: 'Wastan tiang Wayan',
            explanation: '"Wastan tiang Wayan" = Nama saya Wayan. Wastan = nama, Tiang = saya (formal)'
          },
          {
            id: 'e9',
            type: 'type-answer',
            question: 'Tulis dalam bahasa Bali: "Tidak" (formal)',
            correctAnswer: 'Nenten',
            explanation: '"Nenten" adalah kata "tidak" yang sopan dalam bahasa Bali'
          },
        ]
      },
      {
        id: 'u1-c1',
        title: 'Peti Hadiah',
        nodeType: 'chest',
        xpReward: 0,
        gemReward: 50,
        exercises: []
      },
      {
        id: 'u1-l3',
        title: 'Kata Ganti',
        nodeType: 'lesson',
        xpReward: 15,
        exercises: [
          {
            id: 'e10',
            type: 'multiple-choice',
            question: 'Apa bahasa Bali untuk "Saya" (formal/halus)?',
            options: ['Tiang', 'Icang', 'Iraga', 'Ipun'],
            correctAnswer: 'Tiang',
            explanation: '"Tiang" adalah kata ganti orang pertama (saya) yang sopan dalam bahasa Bali'
          },
          {
            id: 'e11',
            type: 'matching-pairs',
            question: 'Cocokkan kata ganti dengan artinya!',
            pairs: [['Tiang', 'Saya (halus)'], ['Icang', 'Saya (kasar)'], ['Ragane', 'Anda/Bapak/Ibu'], ['Ipun', 'Dia/Beliau']],
            correctAnswer: 'matched'
          },
          {
            id: 'e12',
            type: 'multiple-choice',
            question: 'Apa bahasa Bali untuk "Kamu" (halus/sopan)?',
            options: ['Ragane', 'Cai', 'Iraga', 'Tiang'],
            correctAnswer: 'Ragane',
            explanation: '"Ragane" dipakai untuk menyebut orang yang lebih tua atau dihormati'
          }
        ]
      },
      {
        id: 'u1-trophy',
        title: 'Tantangan Unit',
        nodeType: 'trophy',
        xpReward: 20,
        exercises: [
          {
            id: 'et1',
            type: 'multiple-choice',
            question: 'Bagaimana cara menyapa orang yang baru ditemui dalam bahasa Bali?',
            options: ['Om Swastyastu', 'Rahajeng pamit', 'Matur suksma', 'Nenten'],
            correctAnswer: 'Om Swastyastu'
          },
          {
            id: 'et2',
            type: 'word-bank',
            question: 'Susun: "Terima kasih banyak" dalam bahasa Bali',
            wordBank: ['Matur', 'suksma', 'pisan', 'Ampura', 'tiang'],
            correctAnswer: 'Matur suksma pisan',
            explanation: '"Matur suksma pisan" = Terima kasih banyak'
          }
        ]
      }
    ]
  },
  {
    id: 'u2',
    part: 1, no: 2,
    title: 'Angka & Bilangan',
    titleBali: 'Wilangan',
    description: 'Pelajari angka 1-10 dalam bahasa Bali',
    color: '#3CC48A',
    lessons: [
      {
        id: 'u2-l1',
        title: 'Angka 1-5',
        nodeType: 'lesson',
        xpReward: 10,
        exercises: [
          {
            id: 'e20',
            type: 'multiple-choice',
            question: 'Berapa "Dua" dalam angka?',
            options: ['2', '1', '3', '4'],
            correctAnswer: '2',
            explanation: '"Dua" = 2 dalam bahasa Bali'
          },
          {
            id: 'e21',
            type: 'multiple-choice',
            question: 'Bagaimana mengucapkan angka 1 dalam bahasa Bali?',
            options: ['Sa / Besik', 'Dua', 'Telu', 'Pat'],
            correctAnswer: 'Sa / Besik',
            explanation: '"Sa" atau "Besik" artinya satu dalam bahasa Bali'
          },
          {
            id: 'e22',
            type: 'matching-pairs',
            question: 'Cocokkan angka Bali dengan angkanya!',
            pairs: [['Sa', '1'], ['Dua', '2'], ['Telu', '3'], ['Pat', '4']],
            correctAnswer: 'matched'
          },
          {
            id: 'e23',
            type: 'type-answer',
            question: 'Tulis angka 5 dalam bahasa Bali',
            correctAnswer: 'Lima',
            explanation: '"Lima" = 5 dalam bahasa Bali'
          }
        ]
      },
      {
        id: 'u2-l2',
        title: 'Angka 6-10',
        nodeType: 'lesson',
        xpReward: 10,
        exercises: [
          {
            id: 'e24',
            type: 'multiple-choice',
            question: 'Bagaimana cara mengucapkan "6" dalam bahasa Bali?',
            options: ['Nem', 'Pitu', 'Kutus', 'Sia'],
            correctAnswer: 'Nem',
            explanation: '"Nem" = 6 dalam bahasa Bali'
          },
          {
            id: 'e25',
            type: 'matching-pairs',
            question: 'Cocokkan angka Bali dengan angkanya!',
            pairs: [['Nem', '6'], ['Pitu', '7'], ['Kutus', '8'], ['Sia', '9']],
            correctAnswer: 'matched'
          },
          {
            id: 'e26',
            type: 'multiple-choice',
            question: 'Berapa "Dasa" dalam angka?',
            options: ['10', '8', '9', '7'],
            correctAnswer: '10',
            explanation: '"Dasa" = 10 dalam bahasa Bali'
          },
          {
            id: 'e27',
            type: 'word-bank',
            question: 'Susun: "Saya punya 3 buku" dalam bahasa Bali',
            wordBank: ['Tiang', 'ngelah', 'buku', 'telu', 'dua', 'dadua'],
            correctAnswer: 'Tiang ngelah buku telu',
            explanation: '"Tiang ngelah buku telu" = Saya punya 3 buku. Ngelah = punya/memiliki'
          }
        ]
      },
      {
        id: 'u2-c1',
        title: 'Peti Hadiah',
        nodeType: 'chest',
        xpReward: 0,
        gemReward: 60,
        exercises: []
      }
    ]
  },
  {
    id: 'u3',
    part: 2, no: 1,
    title: 'Aksara Bali Dasar',
    titleBali: 'Aksara Bali',
    description: 'Kenali huruf-huruf dalam Aksara Bali',
    color: '#9B59B6',
    lessons: [
      {
        id: 'u3-l1',
        title: 'Vokal Dasar',
        nodeType: 'lesson',
        xpReward: 15,
        exercises: [
          {
            id: 'e30',
            type: 'aksara-quiz',
            question: 'Aksara ini dibaca apa?',
            questionBali: 'ᬅ',
            options: ['A', 'I', 'U', 'E'],
            correctAnswer: 'A',
            explanation: 'ᬅ adalah aksara vokal "A" dalam Aksara Bali'
          },
          {
            id: 'e31',
            type: 'aksara-quiz',
            question: 'Aksara ini dibaca apa?',
            questionBali: 'ᬇ',
            options: ['I', 'A', 'U', 'O'],
            correctAnswer: 'I',
            explanation: 'ᬇ adalah aksara vokal "I" dalam Aksara Bali'
          },
          {
            id: 'e32',
            type: 'aksara-quiz',
            question: 'Aksara ini dibaca apa?',
            questionBali: 'ᬉ',
            options: ['U', 'A', 'I', 'E'],
            correctAnswer: 'U',
            explanation: 'ᬉ adalah aksara vokal "U" dalam Aksara Bali'
          },
          {
            id: 'e33',
            type: 'multiple-choice',
            question: 'Aksara Bali ditulis dari arah mana?',
            options: ['Kiri ke kanan', 'Kanan ke kiri', 'Atas ke bawah', 'Bawah ke atas'],
            correctAnswer: 'Kiri ke kanan',
            explanation: 'Seperti tulisan Latin, Aksara Bali ditulis dari kiri ke kanan'
          }
        ]
      },
      {
        id: 'u3-l2',
        title: 'Konsonan Dasar',
        nodeType: 'lesson',
        xpReward: 15,
        exercises: [
          {
            id: 'e34',
            type: 'aksara-quiz',
            question: 'Aksara ini dibaca apa?',
            questionBali: 'ᬓ',
            options: ['Ka', 'Ga', 'Pa', 'Ba'],
            correctAnswer: 'Ka',
            explanation: 'ᬓ adalah aksara konsonan "Ka" dalam Aksara Bali'
          },
          {
            id: 'e35',
            type: 'aksara-quiz',
            question: 'Aksara ini dibaca apa?',
            questionBali: 'ᬢ',
            options: ['Ta', 'Da', 'Na', 'Sa'],
            correctAnswer: 'Ta',
            explanation: 'ᬢ adalah aksara konsonan "Ta" dalam Aksara Bali'
          },
          {
            id: 'e36',
            type: 'aksara-quiz',
            question: 'Aksara ini dibaca apa?',
            questionBali: 'ᬦ',
            options: ['Na', 'Ma', 'La', 'Ra'],
            correctAnswer: 'Na',
            explanation: 'ᬦ adalah aksara konsonan "Na" dalam Aksara Bali'
          },
          {
            id: 'e37',
            type: 'matching-pairs',
            question: 'Cocokkan aksara dengan bunyinya!',
            pairs: [['ᬅ', 'A'], ['ᬇ', 'I'], ['ᬓ', 'Ka'], ['ᬢ', 'Ta']],
            correctAnswer: 'matched'
          }
        ]
      }
    ]
  }
];

export const getFlatLessons = () => CURRICULUM.flatMap(u => u.lessons);
export const findLesson = (id: string) => getFlatLessons().find(l => l.id === id);
export const findUnit = (lessonId: string) => CURRICULUM.find(u => u.lessons.some(l => l.id === lessonId));

