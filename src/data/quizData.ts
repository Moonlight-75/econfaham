import type { QuizQuestion } from '../types';

export const quizData: QuizQuestion[] = [
  {
    id: 1,
    level: 'stpm',
    topic: 'Keanjalan Permintaan',
    question: 'Jika nilai keanjalan harga permintaan bagi barang X ialah -0.4, bagaimanakah tindakan pengeluar untuk meningkatkan jumlah hasil (TR)?',
    questionEn: 'If the price elasticity of demand for good X is -0.4, what strategy should the producer adopt to maximize total revenue (TR)?',
    options: [
      { text: 'Menaikkan harga barang X', textEn: 'Increase the price of good X', isCorrect: true },
      { text: 'Menurunkan harga barang X', textEn: 'Decrease the price of good X', isCorrect: false },
      { text: 'Mengekalkan harga dan mengurangkan promosi', textEn: 'Keep price constant and cut promotion', isCorrect: false },
      { text: 'Menggandakan kuantiti pengeluaran serta merta', textEn: 'Double output immediately', isCorrect: false }
    ],
    explanationBm: 'Tepat! Nilai |-0.4| < 1 menunjukkan permintaan adalah TAK ANJAL. Bagi barang tak anjal, peratusan penurunan kuantiti diminta adalah lebih kecil daripada peratusan kenaikan harga (%ΔQ < %ΔP). Maka, menaikkan harga akan meningkatkan Jumlah Hasil (TR = P × Q).',
    explanationEn: 'Correct! Demand is inelastic (|Ed| < 1). The percentage drop in quantity demanded is smaller than the percentage price hike, so raising prices increases Total Revenue.'
  },
  {
    id: 2,
    level: 'stpm',
    topic: 'Keseimbangan Pasaran & Cukai',
    question: 'Apabila kerajaan mengenakan cukai jualan ke atas pengeluar barang Y, apakah kesan langsung ke atas keluk penawaran?',
    questionEn: 'When the government imposes an excise tax on producers of good Y, what is the direct impact on the supply curve?',
    options: [
      { text: 'Keluk penawaran beralih ke kiri/ke atas sebanyak nilai cukai seunit', textEn: 'Supply curve shifts left/upwards by the per-unit tax amount', isCorrect: true },
      { text: 'Keluk penawaran beralih ke kanan/ke bawah', textEn: 'Supply curve shifts right/downwards', isCorrect: false },
      { text: 'Keluk permintaan beralih ke kiri', textEn: 'Demand curve shifts left', isCorrect: false },
      { text: 'Keluk penawaran menjadi lebih landai tanpa beralih', textEn: 'Supply curve becomes flatter without shifting', isCorrect: false }
    ],
    explanationBm: 'Betul! Cukai seunit meningkatkan kos sut pengeluaran bagi setiap unit output. Oleh itu, keluk penawaran (SS) beralih ke kiri (ke atas secara menegak sebanyak nilai cukai seunit t).',
    explanationEn: 'Correct! The tax increases the marginal cost of production, shifting the supply curve vertically upwards by the tax amount per unit.'
  },
  {
    id: 3,
    level: 'degree',
    topic: 'Deadweight Loss & Kebajikan',
    question: 'Dalam pasaran persaingan sempurna, penetapan Dasar Harga Siling (Price Ceiling) di bawah harga keseimbangan akan mengakibatkan:',
    questionEn: 'In a competitive market, setting an effective Price Ceiling below market equilibrium causes:',
    options: [
      { text: 'Kurangan (Shortage) dan kemunculan Deadweight Loss', textEn: 'Shortage and the creation of Deadweight Loss', isCorrect: true },
      { text: 'Lebihan penawaran (Surplus) dan kecekapan Pareto maksimum', textEn: 'Surplus and maximum Pareto efficiency', isCorrect: false },
      { text: 'Peningkatan serentak lebihan pengguna dan pengeluar', textEn: 'Simultaneous gain in consumer and producer surplus', isCorrect: false },
      { text: 'Tiada kesan ke atas kuantiti pasaran', textEn: 'No effect on market quantity', isCorrect: false }
    ],
    explanationBm: 'Tepat! Harga siling yang berkesan (di bawah P*) menyebabkan kuantiti diminta (Qd) melebihi kuantiti ditawar (Qs), menghasilkan kurangan (shortage). Kerana output yang diniagakan terhad kepada Qs, transaksi yang sepatutnya menguntungkan kedua-dua pihak tidak berlaku, menjana Beban Berat Hilang (Deadweight Loss).',
    explanationEn: 'Correct! An effective price ceiling creates excess demand (shortage) and restricts transacted quantity, leading to deadweight loss due to foregone mutually beneficial trades.'
  },
  {
    id: 4,
    level: 'degree',
    topic: 'Struktur Pasaran',
    question: 'Apakah syarat utama untuk pemaksimuman keuntungan (profit maximization) bagi firma dalam sebarang struktur pasaran?',
    questionEn: 'What is the universal necessary condition for profit maximization across any market structure?',
    options: [
      { text: 'Hasil Sut bersamaan Kos Sut (MR = MC)', textEn: 'Marginal Revenue equals Marginal Cost (MR = MC)', isCorrect: true },
      { text: 'Harga bersamaan Kos Purata Minimum (P = min ATC)', textEn: 'Price equals minimum ATC', isCorrect: false },
      { text: 'Jumlah Hasil bersamaan Kos Berubah (TR = VC)', textEn: 'Total Revenue equals Variable Cost', isCorrect: false },
      { text: 'Hasil Sut adalah sifar (MR = 0)', textEn: 'Marginal Revenue equals zero', isCorrect: false }
    ],
    explanationBm: 'Tepat! Dalam analisis kalkulus: π = TR(Q) - TC(Q). Untuk mencari titik maksimum: dπ/dQ = dTR/dQ - dTC/dQ = 0 ⇒ MR - MC = 0 ⇒ MR = MC.',
    explanationEn: 'Correct! Differentiating profit π(Q) = TR(Q) - TC(Q) with respect to Q gives dπ/dQ = MR - MC = 0, which yields MR = MC as the first-order condition.'
  }
];
