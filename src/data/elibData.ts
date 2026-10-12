import type { ElibArticle } from '../types';

export const elibData: ElibArticle[] = [
  {
    id: 'elib-1',
    title: 'Kenapa Subsidi Petrol RON95 Disasarkan? (Deadweight Loss & Subsidi)',
    titleEn: 'Targeted Fuel Subsidies: Deadweight Loss & Resource Allocation',
    tag: 'Dasar Fiskal & Mikro',
    level: 'STPM',
    readTime: '3 minit bacaan',
    icon: 'Fuel',
    hook: 'Bila kerajaan jual petrol murah (RM2.05), kenapa pakar ekonomi kata ada "kerugian ekonomi" padahal rakyat suka?',
    analogi: 'Bayangkan mak ayah bagi subsidi 80% untuk setiap cawan teh boba yang anak beli. Anak yang asalnya minum 1 cawan seminggu, terus minum 7 cawan seminggu sebab murah. Anak happy, tapi kesihatan terabai dan duit mak ayah habis membazir pada benda yang tak optimum.',
    teoriFormalBm: 'Subsidi am merendahkan kos peribadi di bawah kos sosial sebenar. Ini mencipta terlebih penggunaan (overconsumption). Kawasan perbelanjaan kerajaan melebihi faedah bersih yang diterima pengguna dan pengeluar, menghasilkan Kerugian Luput (Deadweight Loss). Subsidi bersasar memulihkan kecekapan alokasi sumber.',
    teoriFormalEn: 'Blanket subsidies create an artificial price below marginal cost, resulting in allocative inefficiency and a deadweight loss triangle where marginal cost exceeds marginal social benefit.',
    takeaway: 'Subsidi pukal memberi manfaat kepada golongan kaya yang guna kereta besar lebih banyak daripada orang miskin yang naik motosikal kapcai.'
  },
  {
    id: 'elib-2',
    title: 'Kenapa Kedai Mamak Jarang Turunkan Harga Roti Canai? (Keanjalan & Kekakuan Harga)',
    titleEn: 'Price Stickiness & Inelastic Demand in Everyday Goods',
    tag: 'Keanjalan & Struktur Pasaran',
    level: 'Degree',
    readTime: '4 minit bacaan',
    icon: 'Utensils',
    hook: 'Masa harga gandum dunia naik, harga roti canai naik RM0.20 serta merta. Tapi bila harga gandum dunia turun balik, harga roti canai tak pernah turun. Kenapa?',
    analogi: 'Orang Malaysia dah biasa makan roti canai dan teh tarik sarapan pagi. Peniaga tahu permintaan adalah "Tak Anjal" (Inelastic). Kalau dia turunkan harga RM0.20, orang takkan makan 5 keping roti canai extra pagi tu (hasil jualan takkan naik banyak). Tambah pula kos sewa dan gaji pekerja tak pernah turun (Menu Costs).',
    teoriFormalBm: 'Teori Kinked Demand Curve (Keluk Permintaan Terpatah) dan Menu Costs. Peniaga sedar bahawa keluk keanjalan permintaan di bawah harga semasa adalah tak anjal, jadi penurunan harga menurunkan Jumlah Hasil (TR = P × Q). Manakala kos menu dan upah tegar ke bawah (downward wage rigidity).',
    teoriFormalEn: 'Price asymmetry driven by relatively inelastic demand for staples and downward nominal price rigidity (menu costs and sticky wages in oligopolistic/monopolistically competitive retail).',
    takeaway: 'Jika permintaan tak anjal (|Ed| < 1), kenaikan harga akan menaikkan jumlah hasil (TR), manakala penurunan harga merugikan peniaga.'
  },
  {
    id: 'elib-3',
    title: 'Kenapa Kerajaan Tak Boleh Cetak Duit Je Bagi Sorang RM100,000?',
    titleEn: 'Why Can\'t the Central Bank Just Print Money for Everyone? (Inflation & QTM)',
    tag: 'Makroekonomi & Kewangan',
    level: 'STPM',
    readTime: '3 minit bacaan',
    icon: 'Banknote',
    hook: 'Idea paling popular budak baru belajar ekonomi: "Kalau negara ada mesin cetak duit, kenapa tak print je banyak-banyak bagi settle hutang dan bagi semua orang kaya?"',
    analogi: 'Bayangkan dalam satu bilik darjah cuma ada 5 biji karipap, dan setiap murid cuma ada RM1 (jumlah duit RM5). Harga sebutir karipap RM1. Tiba-tiba cikgu agihkan RM1,000 tunai kepada setiap murid. Adakah karipap dalam bilik tu bertambah jadi sejuta biji? Tidak! Karipap tetap ada 5 biji. Akhirnya murid sanggup bida RM500 untuk sebiji karipap. Duit bertambah, tapi barang sama banyak = Harga melambung tinggi!',
    teoriFormalBm: 'Teori Kuantiti Wang (Quantity Theory of Money) oleh Irving Fisher: M × V = P × Y. Dengan andaian halaju wang (V) dan output benar (Y) tetap dalam jangka pendek, sebarang pertambahan penawaran wang (M) akan memindahkan secara langsung kepada peningkatan tingkat harga umum (P) iaitu Inflasi.',
    teoriFormalEn: 'According to Fisher\'s Equation of Exchange (MV = PY), expanding the money supply (M) without real output growth (Y) simply creates hyperinflation where the value of money depreciates rapidly.',
    takeaway: 'Kekayaan sebenar sesebuah negara diukur melalui jumlah barang & perkhidmatan yang dihasilkan (GDP), bukan jumlah kertas duit yang dicetak.'
  },
  {
    id: 'elib-4',
    title: 'Kartel Ayam & Kenapa Oligopoli Sukar Nak "Pecah"?',
    titleEn: 'Chicken Cartels & Game Theory (Prisoner\'s Dilemma in Malaysia)',
    tag: 'Struktur Pasaran & Game Theory',
    level: 'Degree',
    readTime: '4 minit bacaan',
    icon: 'Egg',
    hook: 'Bila MyCC (Suruhanjaya Persaingan Malaysia) denda beberapa pengeluar makanan ternakan ayam ratusan juta ringgit kerana pakatan harga, apa sebenarnya yang berlaku di sebalik tabir?',
    analogi: 'Macam pelajar dalam kelas nak boikot tak nak hantar assignment supaya cikgu tunda tarikh akhir. Semua janji jangan hantar. Tapi kalau ada sorang hantar senyap-senyap, dia dapat markah penuh dan kawan lain gagal. Dalam kartel ayam, penternak besar sepakat hadkan bekalan anak ayam supaya harga naik tinggi. Tapi sentiasa ada syarikat tergoda nak seludup jual lebih banyak secara rahsia untuk kaut untung sendiri.',
    teoriFormalBm: 'Model Oligopoli & Teori Permainan (Nash Equilibrium). Kartel cuba bertindak seperti Monopoli bersama untuk memaksimumkan untung industri. Namun, struktur Prisoner\'s Dilemma menyebabkan kartel terdedah kepada ketidakstabilan kerana wujudnya insentif untuk menipu (incentive to cheat).',
    teoriFormalEn: 'Firms in an oligopoly face a classic Prisoner\'s Dilemma. While tacit collusion or formal cartels maximize joint industry profits, each individual firm has an incentive to defect and expand production.',
    takeaway: 'Monopoli kawal sendiri. Oligopoli kena selalu intip pesaing sebab keputusan pesaing menentukan untung rugi kita.'
  }
];
