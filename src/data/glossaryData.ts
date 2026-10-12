import type { GlossaryItem } from '../types';

export const glossaryData: GlossaryItem[] = [
  {
    id: 'g1',
    bmTerm: 'Keanjalan Harga Permintaan',
    enTerm: 'Price Elasticity of Demand (PED / Ed)',
    category: 'mikro',
    level: 'both',
    formula: 'Ed = (%ΔQd) / (%ΔP)  @  (dQ/dP) × (P/Q)',
    definitionBm: 'Darjah tindak balas kuantiti diminta sesuatu barang terhadap perubahan harga barang itu sendiri.',
    definitionEn: 'A measure of the responsiveness of the quantity demanded of a good to a change in its price.',
    analogi: 'Ibarat getah. Kalau getah anjal (barang mewah/banyak pengganti), tarik sikit pun melenting jauh. Kalau getah mati/tak anjal (garam/minyak petrol/roti canai), harga naik macam mana pun orang terpaksa beli.',
    example: 'Kenaikan harga teh boba sebanyak 10% menyebabkan permintaan jatuh 30% (Ed = -3.0: Anjal).'
  },
  {
    id: 'g2',
    bmTerm: 'Lebihan Pengguna',
    enTerm: 'Consumer Surplus (CS)',
    category: 'mikro',
    level: 'both',
    formula: 'CS = Nilai Kesediaan Membayar (WTP) - Harga Sebenar (P*)',
    definitionBm: 'Faedah atau kepuasan tambahan yang dinikmati pengguna apabila harga sebenar di pasaran lebih rendah daripada harga maksimum yang sanggup dibayar.',
    definitionEn: 'The difference between the total amount that consumers are willing and able to pay and the total amount that they actually pay.',
    analogi: 'Bayangkan anda sedia bayar RM15 untuk payung masa hujan lebat di KL, tapi peniaga jual RM8. Anda rasa "untung" RM7 kepuasan bersih!',
    example: 'Kawasan segi tiga di bawah keluk permintaan (DD) dan di atas garisan harga keseimbangan (P*).'
  },
  {
    id: 'g3',
    bmTerm: 'Lebihan Pengeluar',
    enTerm: 'Producer Surplus (PS)',
    category: 'mikro',
    level: 'both',
    formula: 'PS = Hasil Sebenar Diterima (P*) - Kos Minimum Sanggup Dijual (WTS)',
    definitionBm: 'Perbezaan antara jumlah hasil yang diterima oleh pengeluar dengan jumlah minimum yang mereka sanggup terima untuk membekalkan kuantiti tersebut.',
    definitionEn: 'The difference between the amount the producer is willing to accept for each unit and the actual market price received.',
    analogi: 'Peniaga kuih sanggup jual karipap pada harga RM0.50 sebiji untuk lepas kos, tapi pasaran bayar RM1.00 sebiji. Peniaga dapat lebihan RM0.50 setiap biji.',
    example: 'Kawasan segi tiga di atas keluk penawaran (SS) dan di bawah garisan harga keseimbangan (P*).'
  },
  {
    id: 'g4',
    bmTerm: 'Beban Berat Hilang / Kerugian Luput',
    enTerm: 'Deadweight Loss (DWL)',
    category: 'mikro',
    level: 'degree',
    formula: 'DWL = 1/2 × (ΔP_tax) × (ΔQ_loss)',
    definitionBm: 'Kerugian kecekapan ekonomi masyarakat yang hilang akibat herotan pasaran (seperti cukai, kuota, atau monopoli) yang tidak dapat dinikmati oleh pengguna mahupun kerajaan.',
    definitionEn: 'The lost net social welfare that results from a market distortion such as taxes, subsidies, price controls, or monopoly power.',
    analogi: 'Ibarat kek hari jadi yang jatuh ke lantai masa orang berebut. Pengguna tak dapat, peniaga tak dapat, kerajaan pun tak kutip. Membazir begitu sahaja.',
    example: 'Kawasan segi tiga di antara keluk DD dan SS di sebelah kanan kuantiti selepas cukai/monopoli.'
  },
  {
    id: 'g5',
    bmTerm: 'Hasil Sut & Kos Sut',
    enTerm: 'Marginal Revenue (MR) & Marginal Cost (MC)',
    category: 'pasaran',
    level: 'both',
    formula: 'MR = dTR/dQ,  MC = dTC/dQ  (Syarat Maksimum Untung: MR = MC)',
    definitionBm: 'Hasil sut ialah tambahan hasil daripada jualan 1 unit tambahan output. Kos sut ialah tambahan kos untuk menghasilkan 1 unit tambahan output.',
    definitionEn: 'MR is the additional revenue gained from selling one more unit. MC is the additional cost incurred by producing one more unit.',
    analogi: 'Kalau buat nasi lemak ke-101 kosnya RM1.50 (MC) dan boleh jual RM2.50 (MR), buatlah! Tapi kalau kos nak buat naik jadi RM3.00 sedangkan boleh jual RM2.50 je, STOP.',
    example: 'Firma memaksimumkan untung pada titik persilangan di mana keluk MC memotong keluk MR dari bawah.'
  },
  {
    id: 'g6',
    bmTerm: 'Dasar Harga Maksimum (Harga Bumbung)',
    enTerm: 'Price Ceiling',
    category: 'mikro',
    level: 'both',
    formula: 'P_ceiling < P_equilibrium  ⇒  Qd > Qs (Kurangan / Shortage)',
    definitionBm: 'Harga tertinggi yang ditetapkan oleh kerajaan secara sah undang-undang di bawah harga keseimbangan pasaran untuk melindungi kebajikan pengguna.',
    definitionEn: 'A legal maximum on the price at which a good can be sold, set below the equilibrium price to protect consumers.',
    analogi: 'Kawalan harga siling ayam atau minyak masak paket peket RM2.50. Murah untuk rakyat, tapi selalu habis stok di pasar raya kerana permintaan melambung tetapi peniaga malas keluar stok banyak.',
    example: 'Menyebabkan kurangan penawaran (shortage) dan kecenderungan wujudnya pasar gelap (black market).'
  },
  {
    id: 'g7',
    bmTerm: 'Dasar Harga Minimum (Harga Lantai)',
    enTerm: 'Price Floor',
    category: 'mikro',
    level: 'both',
    formula: 'P_floor > P_equilibrium  ⇒  Qs > Qd (Lebihan / Surplus)',
    definitionBm: 'Harga terendah yang ditetapkan oleh kerajaan secara sah di atas harga keseimbangan pasaran untuk melindungi pendapatan pengeluar atau pekerja.',
    definitionEn: 'A legal minimum on the price at which a good can be sold, set above the equilibrium price to support producers/laborers.',
    analogi: 'Dasar Gaji Minimum (RM1,700). Bagus untuk pekerja, tapi jika terlalu tinggi tanpa peningkatan produktiviti, majikan kurangkan pengambilan pekerja baharu (kurang penawaran kerja).',
    example: 'Menyebabkan lebihan penawaran barang (lambakan stok padi/getah yang kerajaan terpaksa beli).'
  },
  {
    id: 'g8',
    bmTerm: 'Kesan Pendapatan & Kesan Penggantian',
    enTerm: 'Income Effect & Substitution Effect',
    category: 'mikro',
    level: 'degree',
    formula: 'Total Effect = Substitution Effect (SE) + Income Effect (IE)',
    definitionBm: 'Kesan penggantian: menukar kepada barang alternatif yang relatif lebih murah. Kesan pendapatan: perubahan kuasa beli benar pengguna akibat perubahan harga.',
    definitionEn: 'Substitution effect is the change in consumption due to the change in relative price. Income effect is the change due to higher/lower real purchasing power.',
    analogi: 'Harga tiket wayang naik dari RM15 ke RM25. Anda tukar tengok Netflix (Kesan Penggantian) DAN anda rasa diri anda lebih miskin bulan tu jadi kurang beli makanan ringan (Kesan Pendapatan).',
    example: 'Dianalisis menggunakan keluk puas sama (Indifference Curves) dan garisan belanjawan (Budget Line) oleh Slutsky atau Hicks.'
  },
  {
    id: 'g9',
    bmTerm: 'Pengganda Keynes',
    enTerm: 'Keynesian Multiplier (k)',
    category: 'makro',
    level: 'both',
    formula: 'k = 1 / (1 - MPC)  @  1 / MPS',
    definitionBm: 'Nisbah yang menunjukkan berapa kali ganda pendapatan negara (Y) akan bertambah akibat perubahan awal dalam perbelanjaan agregat (seperti pelaburan atau perbelanjaan kerajaan).',
    definitionEn: 'The ratio of the change in real GDP to the initial change in an expenditure component (such as investment or government spending).',
    analogi: 'Kerajaan belanjakan RM100 juta bina jalan di luar bandar. Kontraktor dapat duit dan bayar pekerja. Pekerja belanja beli makanan di kedai runcit. Pekedai runcit bayar pembekal. Duit berguling berkali-kali!',
    example: 'Jika kecenderungan mengguna sut (MPC) = 0.8, maka Pengganda k = 1 / (1 - 0.8) = 5. RM1 suntikan menjana RM5 pendapatan negara.'
  },
  {
    id: 'g10',
    bmTerm: 'Perangkap Kecairan',
    enTerm: 'Liquidity Trap',
    category: 'makro',
    level: 'degree',
    formula: 'Kadar Faedah (r) menghampiri 0%, Permintaan Wang MD menjadi anjal sempurna',
    definitionBm: 'Situasi di mana kadar faedah sangat rendah sehingga dasar monetari konvensional hilang keberkesanannya kerana orang ramai lebih suka simpan tunai daripada melabur.',
    definitionEn: 'A macroeconomic situation where interest rates are near zero and monetary policy becomes ineffective as consumers and investors hoard cash.',
    analogi: 'Bank Negara turunkan kadar faedah OPR sampai dekat 0% untuk suruh orang pinjam dan berniaga, tapi semua orang terlalu takut dengan krisis sampai simpan duit bawah tilam.',
    example: 'Krisis Jepun pada era 1990-an (Lost Decades) dan Krisis Kewangan Global 2008.'
  },
  {
    id: 'g11',
    bmTerm: 'Keluk Phillips',
    enTerm: 'Phillips Curve',
    category: 'makro',
    level: 'both',
    formula: 'Hubungan songsang antara Kadar Inflasi (π) dan Kadar Pengangguran (u)',
    definitionBm: 'Keluk yang menunjukkan hubungan songsang (trade-off) jangka pendek antara kadar inflasi dengan kadar pengangguran.',
    definitionEn: 'A graph showing the short-run inverse relationship between unemployment and inflation.',
    analogi: 'Ekonomi macam enjin kereta yang dipandu laju. Bila pecut laju (pengangguran rendah, semua orang kerja), enjin mula panas berasap (harga barang naik / inflasi melambung).',
    example: 'Jangka pendek: trade-off wujud. Jangka panjang: keluk Phillips menegak pada kadar pengangguran semula jadi (Natural Rate of Unemployment / NAIRU).'
  },
  {
    id: 'g12',
    bmTerm: 'Keseimbangan Nash & Dilema Banduan',
    enTerm: 'Nash Equilibrium & Prisoner\'s Dilemma',
    category: 'pasaran',
    level: 'degree',
    formula: 'Best response: Tiada pemain mempunyai insentif untuk menukar strategi secara unilateral',
    definitionBm: 'Konsep dalam Teori Permainan di mana setiap pemain memilih tindakan terbaik berdasarkan jangkaan tindakan pemain lain, dan tiada siapa mahu ubah strategi sendiri.',
    definitionEn: 'A situation in game theory where no player has an incentive to deviate from their chosen strategy unilaterally.',
    analogi: 'Dua stesen minyak Petronas dan Shell bersebelahan. Kalau dua-dua sepakat jual harga mahal, dua-dua untung. Tapi takut kawan sebelah turunkan harga curi pelanggan, akhirnya dua-dua turunkan harga ke paras kos minima.',
    example: 'Menerangkan persaingan harga dan kelakuan kartel dalam pasaran oligopoli di Malaysia.'
  }
];
