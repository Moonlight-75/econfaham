# 📈 EconFaham — Platform Visual & Interaktif Ekonomi (STPM & Degree)

> Platform web interaktif khas untuk membantu pelajar yang bergelut memahami konsep, keluk graf, formula matematik, dan dasar ekonomi di peringkat STPM (Tingkatan 6) dan Ijazah Sarjana Muda (Degree).

---

## 🌟 Ciri-Ciri Utama (Key Features)

1. **📊 Simulator Rajah & Keluk Pasaran Interaktif (Market Simulator)**
   - Graf dinamik berketepatan tinggi (SVG) memaparkan keluk Permintaan ($DD$) dan Penawaran ($SS$).
   - Slider untuk simulasi anjakan keluk berasaskan faktor bukan harga.
   - Simulasi dasar kerajaan: **Cukai Seunit ($t$)**, **Subsidi Seunit ($s$)**, **Dasar Harga Siling (Price Ceiling)**, dan **Dasar Harga Lantai (Price Floor)**.
   - Pengiraan automatik kawasan **Lebihan Pengguna (CS)**, **Lebihan Pengeluar (PS)**, Hasil Cukai, dan **Beban Berat Hilang (Deadweight Loss / DWL)**.

2. **🧮 Kalkulator & Penyelesai Masalah Kuantitatif (Step-by-Step Solver)**
   - Masukkan fungsi pasaran ($Q_d = a - bP$ & $Q_s = c + dP$).
   - Paparan jalan kerja 4-langkah lengkap mengikut skema pemarkahan peperiksaan.
   - Analisis Keanjalan Titik ($E_d = \frac{dQ}{dP} \times \frac{P}{Q}$) dan kesan ke atas Jumlah Hasil ($TR$).
   - Pengiraan Teori Pengganda Keynes ($k = \frac{1}{1 - MPC}$).

3. **📖 Glosari Dwibahasa (BM STPM ⇄ English Degree)**
   - Carian pantas istilah untuk merapatkan jurang bahasa dari Tingkatan 6 ke Universiti.
   - Disertakan formula dan analogi santai harian.

4. **💡 Siri "Explain Like I'm Broke" (ELIB)**
   - Penerangan topik sukar menggunakan situasi realiti di Malaysia (subsidi petrol RON95, kekakuan harga roti canai mamak, inflasi & cetakan duit, kartel ayam & dilema banduan).

5. **🗺️ Silibus Roadmap & 🎯 Kuiz Pantas**
   - Panduan silibus lengkap STPM Penggal 1, 2, 3 dan Degree (Intermediate Micro & Macro/Econometrics) beserta tips peperiksaan.
   - Kuiz aneka pilihan dengan semakan jawapan segera.

---

## 🚀 Teknologi (Tech Stack)

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Gamification:** Canvas-Confetti

---

## 🛠️ Pemasangan & Menjalankan Projek Secara Tempatan

```bash
# 1. Klon repositori
git clone https://github.com/Moonlight-75/econfaham.git

# 2. Masuk ke direktori
cd econfaham

# 3. Pasang dependensi
npm install

# 4. Jalankan pelayan pembangunan (development server)
npm run dev
```

Layari `http://localhost:5173/` di pelayar web anda.

---

## 🌐 Deploy ke Vercel

1. Pergi ke [Vercel Dashboard](https://vercel.com/new).
2. Pilih repositori **`Moonlight-75/econfaham`**.
3. Klik **Deploy** (Semua tetapan binaan Vite dikesan secara automatik!).
