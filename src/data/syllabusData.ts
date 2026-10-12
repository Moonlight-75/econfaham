export interface SyllabusTopic {
  id: string;
  code: string;
  nameBm: string;
  nameEn: string;
  difficulty: 'Asas' | 'Sederhana' | 'Tinggi';
  keyConcepts: string[];
  tipsPeriksa: string;
}

export interface SyllabusSection {
  id?: string;
  titleBm: string;
  titleEn: string;
  level: 'STPM' | 'Degree';
  description: string;
  topics: SyllabusTopic[];
}

export const syllabusData: SyllabusSection[] = [
  {
    titleBm: 'STPM Penggal 1: Mikroekonomi',
    titleEn: 'STPM Semester 1: Microeconomics',
    level: 'STPM',
    description: 'Fokus kepada kelakuan unit ekonomi individu (pengguna, firma, dan pasaran tunggal).',
    topics: [
      {
        id: 'stpm-1',
        code: 'BAB 1-2',
        nameBm: 'Pengenalan & Pasaran Barang (DD/SS)',
        nameEn: 'Introduction & Market Demand and Supply',
        difficulty: 'Asas',
        keyConcepts: ['Keluk DD & SS', 'Peralihan vs Pergerakan di sepanjang keluk', 'Keseimbangan Pasaran', 'Lebihan & Kurangan Pasaran'],
        tipsPeriksa: 'Hati-hati beza antara "Perubahan Kuantiti Diminta" (harga barang itu sendiri ubah) vs "Perubahan Permintaan" (faktor bukan harga macam pendapatan/citarasa).'
      },
      {
        id: 'stpm-2',
        code: 'BAB 3',
        nameBm: 'Keanjalan Permintaan & Penawaran',
        nameEn: 'Elasticity of Demand & Supply',
        difficulty: 'Sederhana',
        keyConcepts: ['Keanjalan Harga (Ed/Es)', 'Keanjalan Silang (Exy)', 'Keanjalan Pendapatan (Ey)', 'Hubungan Keanjalan dengan Jumlah Hasil (TR)'],
        tipsPeriksa: 'Formula darjah keanjalan kerap keluar soalan kuantitatif bahagian B atau C. Ingat tanda negatif pada Ed biasanya diabaikan (nilai mutlak) melainkan soalan tanya tanda asal.'
      },
      {
        id: 'stpm-3',
        code: 'BAB 4-5',
        nameBm: 'Teori Pengeluaran & Teori Kos',
        nameEn: 'Theory of Production & Costs',
        difficulty: 'Sederhana',
        keyConcepts: ['Hukum Pulangan Berkurangan', 'Kos Tetap & Kos Berubah', 'AC, AVC, AFC, MC', 'Ekonomi & Tak Ekonomi Bidangan'],
        tipsPeriksa: 'Keluk MC sentiasa memotong keluk AC dan AVC pada titik minimum mereka dari bawah. Jangan lukis memotong di bahagian mencerun ke bawah!'
      },
      {
        id: 'stpm-4',
        code: 'BAB 6',
        nameBm: 'Struktur Pasaran (PPS, Monopoli, Bermonopoli, Oligopoli)',
        nameEn: 'Market Structures',
        difficulty: 'Tinggi',
        keyConcepts: ['Persaingan Sempurna (P=AR=MR)', 'Monopoli (Untung Lebih Normal)', 'Persaingan Bermonopoli', 'Perbandingan Kecekapan Peruntukan & Pengeluaran'],
        tipsPeriksa: 'Kuasai rajah untung lebih normal, normal, dan kurang normal dalam jangka pendek dan jangka panjang.'
      }
    ]
  },
  {
    titleBm: 'STPM Penggal 2: Makroekonomi',
    titleEn: 'STPM Semester 2: Macroeconomics',
    level: 'STPM',
    description: 'Fokus kepada ekonomi secara agregat (pendapatan negara, inflasi, pengangguran, imbangan pembayaran).',
    topics: [
      {
        id: 'stpm-5',
        code: 'BAB 1-2',
        nameBm: 'Perakaunan Pendapatan Negara',
        nameEn: 'National Income Accounting',
        difficulty: 'Sederhana',
        keyConcepts: ['KDNK (GDP) vs KNK (GNP)', 'Kaedah Perbelanjaan, Keluaran, Pendapatan', 'KDNK Nominal vs Benar', 'Pendapatan Per Kapita'],
        tipsPeriksa: 'Kira KDNK harga pasar kepada kos faktor: Cukai tak langsung tolak subsidi (Tolak CTL, tambah subsidi).'
      },
      {
        id: 'stpm-6',
        code: 'BAB 3',
        nameBm: 'Keseimbangan Pendapatan Negara & Pengganda',
        nameEn: 'Equilibrium National Income & The Multiplier',
        difficulty: 'Tinggi',
        keyConcepts: ['Model AE-Y (2, 3, 4 Sektor)', 'Pengganda Pelaburan & Cukai', 'Lompang Deflasi & Lompang Inflasi'],
        tipsPeriksa: 'Lompang deflasi = jurang jurang output / Pengganda. Jangan tersilap antara nilai jurang KDNK sebenar dengan lompang itu sendiri!'
      },
      {
        id: 'stpm-7',
        code: 'BAB 4-6',
        nameBm: 'Wang, Perbankan & Dasar Makroekonomi',
        nameEn: 'Money, Banking, and Macroeconomic Policies',
        difficulty: 'Sederhana',
        keyConcepts: ['Penciptaan Kredit oleh Bank Perdagangan', 'Dasar Monetari (OPR, Rizab Berkanun)', 'Dasar Fiskal (Cukai, Perbelanjaan G)', 'Keluk Phillips'],
        tipsPeriksa: 'Soalan esei gemar tanya langkah mengatasi masalah inflasi atau kemelesetan ekonomi menggunakan gabungan dasar fiskal dan monetari.'
      }
    ]
  },
  {
    id: 'deg-1',
    titleBm: 'Degree: Intermediate Microeconomics',
    titleEn: 'Degree: Intermediate Microeconomics',
    level: 'Degree',
    description: 'Analisis mikro lanjutan berasaskan kalkulus, teori permainan (game theory), dan kebajikan sosial.',
    topics: [
      {
        id: 'deg-1-1',
        code: 'ECON 201',
        nameBm: 'Teori Pengguna & Pilihan Optimum (Lagrangian)',
        nameEn: 'Consumer Theory & Constrained Optimization',
        difficulty: 'Tinggi',
        keyConcepts: ['Utility Maximization: max U(X,Y) s.t. PxX + PyY = M', 'MRS = Px / Py', 'Kesan Slutsky (SE vs IE)', 'Giffen Goods & Inferior Goods'],
        tipsPeriksa: 'Gunakan kaedah pengganda Lagrange L = U(X,Y) - λ(PxX + PyY - M). Cari F.O.C (∂L/∂X, ∂L/∂Y, ∂L/∂λ) untuk selesaikan bundle optimum.'
      },
      {
        id: 'deg-1-2',
        code: 'ECON 202',
        nameBm: 'Teori Pengeluaran & Dualiti Kos',
        nameEn: 'Production Functions & Cost Duality',
        difficulty: 'Tinggi',
        keyConcepts: ['Fungsi Cobb-Douglas (Q = A K^α L^β)', 'MRTS = w / r', 'Shephard\'s Lemma', 'Pulangan Mengikut Skala (CRS, IRS, DRS)'],
        tipsPeriksa: 'Jika α + β = 1 maka Constant Returns to Scale (CRS). Semak kehomogenan darjah 1 fungsi pengeluaran.'
      },
      {
        id: 'deg-1-3',
        code: 'ECON 203',
        nameBm: 'Teori Permainan & Ketidakcekapan Pasaran',
        nameEn: 'Game Theory, Externalities & Asymmetric Information',
        difficulty: 'Tinggi',
        keyConcepts: ['Nash Equilibrium', 'Model Cournot, Bertrand, Stackelberg', 'Penyelesaian Pigouvian Tax untuk Eksternaliti Negatif', 'Moral Hazard & Adverse Selection'],
        tipsPeriksa: 'Dalam Model Cournot, cari fungsi tindak balas (Reaction Function: q1*(q2) dan q2*(q1)) melalui pembezaan dπ1/dq1 = 0.'
      }
    ]
  },
  {
    id: 'deg-2',
    titleBm: 'Degree: Intermediate Macroeconomics & Econometrics',
    titleEn: 'Degree: Intermediate Macro & Econometrics',
    level: 'Degree',
    description: 'Dinamik pertumbuhan jangka panjang, model IS-LM/AD-AS, dan kaedah empirikal regresi OLS.',
    topics: [
      {
        id: 'deg-2-1',
        code: 'ECON 204',
        nameBm: 'Model IS-LM & Mundell-Fleming (Ekonomi Terbuka)',
        nameEn: 'IS-LM & Open Economy (Mundell-Fleming)',
        difficulty: 'Tinggi',
        keyConcepts: ['Keseimbangan Pasaran Barangan (IS)', 'Keseimbangan Pasaran Wang (LM)', 'Kesan Dasar Fiskal vs Monetari dalam Kadar Pertukaran Terapung vs Tetap', 'Trilemma Dasar Kewangan'],
        tipsPeriksa: 'Ingat "Impossible Trinity": Negara tidak boleh serentak memiliki Kadar Pertukaran Tetap, Aliran Modal Bebas, dan Dasar Monetari Bebas.'
      },
      {
        id: 'deg-2-2',
        code: 'ECON 205',
        nameBm: 'Model Pertumbuhan Solow-Swan',
        nameEn: 'Solow-Swan Neoclassical Growth Model',
        difficulty: 'Tinggi',
        keyConcepts: ['Steady State Capital per Worker (k*)', 'sy = (n + g + δ)k', 'Golden Rule Level of Capital', 'Konvergens Bersyarat'],
        tipsPeriksa: 'Dalam keadaan mantap (steady-state), pertumbuhan output per pekerja hanya didorong oleh kemajuan teknologi eksogen (g).'
      },
      {
        id: 'deg-2-3',
        code: 'ECON 301',
        nameBm: 'Asas Ekonometrik & Anggaran OLS',
        nameEn: 'Introductory Econometrics (OLS Regression)',
        difficulty: 'Tinggi',
        keyConcepts: ['Andaian Gauss-Markov (BLUE)', 'R-squared & Adjusted R^2', 'Multicollinearity, Heteroskedasticity, Autocorrelation', 'Ujian Hipotesis t-test & F-test'],
        tipsPeriksa: 'P-value < 0.05 bermaksud tolak H0 (pemboleh ubah bebas signifikan secara statistik pada aras keertian 5%).'
      }
    ]
  }
];
