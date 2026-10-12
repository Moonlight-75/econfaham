import { useState } from 'react';
import type { LanguageMode, TargetLevel } from '../types';
import { Calculator, CheckCircle2, Sparkles } from 'lucide-react';

interface SolverProps {
  langMode: LanguageMode;
  targetLevel: TargetLevel;
}

export const Solver: React.FC<SolverProps> = () => {
  // Demand: Qd = a - bP
  const [a, setA] = useState<number>(100);
  const [b, setB] = useState<number>(2);

  // Supply: Qs = c + dP
  const [c, setC] = useState<number>(20);
  const [d, setD] = useState<number>(3);

  // Keynesian Multiplier MPC
  const [mpc, setMpc] = useState<number>(0.75);
  const [deltaG, setDeltaG] = useState<number>(50);

  // Active solver tab
  const [solverType, setSolverType] = useState<'equilibrium' | 'elasticity' | 'multiplier'>('equilibrium');

  // Equilibrium Calculation
  // Qd = Qs  =>  a - bP = c + dP  =>  (a - c) = (b + d)P  =>  P* = (a - c) / (b + d)
  const isValidEquilibrium = (b + d) !== 0 && (a - c) > 0;
  const pStar = isValidEquilibrium ? (a - c) / (b + d) : 0;
  const qStar = isValidEquilibrium ? a - b * pStar : 0;

  // Maximum price consumers will pay (Qd = 0 => P = a / b)
  const pMax = b !== 0 ? a / b : 0;
  // Minimum price producers will accept (Qs = 0 => P = -c / d)
  const pMin = d !== 0 ? Math.max(0, -c / d) : 0;

  // Consumer Surplus = 0.5 * (pMax - pStar) * qStar
  const cs = Math.max(0, 0.5 * (pMax - pStar) * qStar);
  // Producer Surplus = 0.5 * (pStar - pMin) * qStar
  const ps = Math.max(0, 0.5 * (pStar - pMin) * qStar);
  const totalSurplus = cs + ps;

  // Point Elasticity of Demand: Ed = (dQ/dP) * (P*/Q*) = -b * (pStar / qStar)
  const edValue = qStar > 0 ? -b * (pStar / qStar) : 0;
  const absEd = Math.abs(edValue);

  // Multiplier calculation
  const multiplierK = mpc < 1 ? 1 / (1 - mpc) : 0;
  const deltaY = multiplierK * deltaG;

  const loadPreset = (presetName: string) => {
    if (presetName === 'stpm_past_year') {
      setA(120);
      setB(4);
      setC(30);
      setD(2);
    } else if (presetName === 'inelastic_food') {
      setA(80);
      setB(0.5);
      setC(10);
      setD(1.5);
    } else if (presetName === 'degree_elastic') {
      setA(200);
      setB(5);
      setC(20);
      setD(4);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold mb-2 border border-violet-200">
              <Calculator className="w-3.5 h-3.5" />
              <span>Penyelesai Masalah Kuantitatif</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Kalkulator Keseimbangan & Formula Langkah-demi-Langkah
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Masukkan fungsi permintaan & penawaran anda untuk melihat pengiraan lengkap berserta jalan kerja periksa.
            </p>
          </div>

          {/* Sub tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200">
            <button
              onClick={() => setSolverType('equilibrium')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                solverType === 'equilibrium' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Keseimbangan & Lebihan
            </button>
            <button
              onClick={() => setSolverType('elasticity')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                solverType === 'elasticity' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Keanjalan Harga ($E_d$)
            </button>
            <button
              onClick={() => setSolverType('multiplier')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                solverType === 'multiplier' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Pengganda Keynes ($k$)
            </button>
          </div>
        </div>
      </div>

      {solverType === 'equilibrium' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-sm">Fungsi Persamaan Pasaran</h3>
                <div className="flex gap-1 text-[11px]">
                  <button
                    onClick={() => loadPreset('stpm_past_year')}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-medium text-slate-700"
                  >
                    Soalan STPM
                  </button>
                  <button
                    onClick={() => loadPreset('degree_elastic')}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-medium text-slate-700"
                  >
                    Degree (Anjal)
                  </button>
                </div>
              </div>

              {/* Demand Function Input */}
              <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900">Keluk Permintaan: Qd = a - bP</span>
                  <span className="text-xs font-mono font-bold text-indigo-700">
                    Qd = {a} - {b}P
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-600 block mb-1">Nilai Pintasan (a):</label>
                    <input
                      type="number"
                      value={a}
                      onChange={(e) => setA(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">Kecerunan (b):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={b}
                      onChange={(e) => setB(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Supply Function Input */}
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900">Keluk Penawaran: Qs = c + dP</span>
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    Qs = {c} + {d}P
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-600 block mb-1">Nilai Pintasan (c):</label>
                    <input
                      type="number"
                      value={c}
                      onChange={(e) => setC(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">Kecerunan (d):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={d}
                      onChange={(e) => setD(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Results Summary Cards */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="p-3 rounded-xl bg-slate-900 text-white">
                  <span className="text-slate-400 block text-[11px]">Harga Keseimbangan (P*)</span>
                  <span className="text-lg font-black text-indigo-300">RM {pStar.toFixed(2)}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-white">
                  <span className="text-slate-400 block text-[11px]">Kuantiti Keseimbangan (Q*)</span>
                  <span className="text-lg font-black text-emerald-300">{qStar.toFixed(2)} unit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Working Out Section */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">
                Jalan Kerja Lengkap (Skema Pemarkahan Periksa)
              </h3>
            </div>

            {isValidEquilibrium ? (
              <div className="space-y-4 text-xs font-sans">
                {/* Step 1 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <span className="font-bold text-indigo-800 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-900 flex items-center justify-center text-[10px]">1</span>
                    Syarat Keseimbangan Pasaran
                  </span>
                  <p className="text-slate-600">
                    Keseimbangan pasaran tercapai apabila kuantiti diminta bersamaan dengan kuantiti ditawar:
                  </p>
                  <div className="bg-white p-2.5 rounded-lg border font-mono text-slate-800 font-semibold">
                    Qd = Qs
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <span className="font-bold text-indigo-800 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-900 flex items-center justify-center text-[10px]">2</span>
                    Gantikan Persamaan & Selesaikan untuk Harga (P*)
                  </span>
                  <div className="bg-white p-3 rounded-lg border font-mono text-slate-800 space-y-1 leading-relaxed">
                    <div>{a} - {b}P = {c} + {d}P</div>
                    <div>{a} - {c} = {d}P + {b}P</div>
                    <div>{a - c} = {(b + d).toFixed(1)}P</div>
                    <div>P* = {a - c} ÷ {(b + d).toFixed(1)}</div>
                    <div className="text-indigo-600 font-bold pt-1 text-sm">
                      ⇒ P* = RM {pStar.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <span className="font-bold text-indigo-800 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-900 flex items-center justify-center text-[10px]">3</span>
                    Gantikan Nilai P* ke dalam Persamaan Kuantiti (Q*)
                  </span>
                  <div className="bg-white p-3 rounded-lg border font-mono text-slate-800 space-y-1">
                    <div>Q* = {a} - {b}({pStar.toFixed(2)})</div>
                    <div>Q* = {a} - {(b * pStar).toFixed(2)}</div>
                    <div className="text-emerald-600 font-bold pt-1 text-sm">
                      ⇒ Q* = {qStar.toFixed(2)} unit
                    </div>
                  </div>
                </div>

                {/* Step 4: Welfare / Surpluses */}
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                  <span className="font-bold text-indigo-900 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-300 text-indigo-950 flex items-center justify-center text-[10px]">4</span>
                    Pengiraan Lebihan Pengguna (CS) & Lebihan Pengeluar (PS)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono">
                      <span className="text-[11px] text-slate-500 font-sans block">Lebihan Pengguna (CS):</span>
                      <div className="text-xs mt-1">CS = 1/2 × ({pMax.toFixed(2)} - {pStar.toFixed(2)}) × {qStar.toFixed(2)}</div>
                      <div className="font-bold text-blue-700 text-sm mt-1">
                        = RM {cs.toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono">
                      <span className="text-[11px] text-slate-500 font-sans block">Lebihan Pengeluar (PS):</span>
                      <div className="text-xs mt-1">PS = 1/2 × ({pStar.toFixed(2)} - {pMin.toFixed(2)}) × {qStar.toFixed(2)}</div>
                      <div className="font-bold text-emerald-700 text-sm mt-1">
                        = RM {ps.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-600 pt-1 font-semibold">
                    Jumlah Kebajikan Ekonomi Masyarakat = CS + PS = RM {totalSurplus.toFixed(2)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500 text-xs">
                Sila pastikan nilai persamaan yang dimasukkan sah dan menghasilkan persilangan positif.
              </div>
            )}
          </div>
        </div>
      )}

      {solverType === 'elasticity' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-900 text-lg">
              Analisis Keanjalan Harga Permintaan ($E_d$) Pada Titik Keseimbangan
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Menghitung kepekaan pengguna terhadap harga mengikut kaedah kalkulus titik (Point Elasticity Formula).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-medium">Formula STPM:</span>
              <div className="font-mono text-sm font-bold text-slate-800">
                Ed = (%ΔQ) / (%ΔP)
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Gunakan nisbah peratusan kuantiti baharu dan kuantiti asal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-1">
              <span className="text-xs text-indigo-700 font-medium">Formula Degree (Kalkulus Titik):</span>
              <div className="font-mono text-sm font-bold text-indigo-900">
                Ed = (dQ/dP) × (P* / Q*)
              </div>
              <p className="text-[11px] text-indigo-700/80 pt-1">
                dQ/dP ialah pembezaan fungsi permintaan terhadap harga (-b).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
              <span className="text-xs text-slate-400 font-medium">Nilai Keanjalan Dikira:</span>
              <div className="text-2xl font-black text-indigo-300">
                {edValue.toFixed(2)}
              </div>
              <span className="text-xs text-emerald-400 font-semibold block">
                Darjah: {absEd > 1 ? 'ANJAL (|Ed| > 1)' : absEd < 1 ? 'TAK ANJAL (|Ed| < 1)' : 'ANJAL SATU (|Ed| = 1)'}
              </span>
            </div>
          </div>

          {/* Strategy Recommendation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Strategi Peniaga & Kesan ke Atas Jumlah Hasil (TR = P × Q)</span>
            </h4>
            <div className="text-slate-600 leading-relaxed space-y-1">
              {absEd < 1 ? (
                <p>
                  Permintaan barang ini adalah <b>TAK ANJAL</b> (contoh: minyak, beras, garam). Pengguna tidak peka kepada kenaikan harga. 
                  Jika peniaga <b>menaikkan harga (P ↑)</b>, kuantiti hanya turun sedikit sahaja (%ΔQ &lt; %ΔP), maka <b>Jumlah Hasil (TR) akan MENINGKAT</b>!
                </p>
              ) : absEd > 1 ? (
                <p>
                  Permintaan barang ini adalah <b>ANJAL</b> (contoh: telefon pintar mewah, minuman boba). Pengguna sangat sensitif kepada harga. 
                  Jika peniaga menaikkan harga, pelanggan akan lari beramai-ramai. Untuk memaksimumkan hasil, peniaga patut <b>menurunkan harga (P ↓)</b> untuk menarik lonjakan kuantiti (%ΔQ &gt; %ΔP), maka <b>Jumlah Hasil (TR) akan MENINGKAT</b>.
                </p>
              ) : (
                <p>
                  Permintaan adalah <b>ANJAL SATU</b> (|Ed| = 1). Sebarang perubahan harga akan diimbangi oleh perubahan kuantiti dalam perkadaran yang sama. Jumlah Hasil (TR) berada pada paras maksimum.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {solverType === 'multiplier' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-900 text-lg">
              Kalkulator Teori Pengganda Keynes (Keynesian Multiplier)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Topik utama STPM Penggal 2 & Makroekonomi Degree: Menghitung berapa kali ganda pendapatan negara (Y) berkembang akibat suntikan pelaburan atau belanja kerajaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  <span>Kecenderungan Mengguna Sut (MPC / b):</span>
                  <span className="font-bold text-indigo-600">{mpc}</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.95"
                  step="0.05"
                  value={mpc}
                  onChange={(e) => setMpc(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <span className="text-[11px] text-slate-500 block">
                  Nilai MPS (Kecenderungan Menabung Sut) = 1 - MPC = {(1 - mpc).toFixed(2)}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  <span>Suntikan Belanja Kerajaan / Pelaburan (ΔG atau ΔI):</span>
                  <span className="font-bold text-emerald-600">RM {deltaG} Juta</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={deltaG}
                  onChange={(e) => setDeltaG(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-5 text-white space-y-4 flex flex-col justify-center">
              <div>
                <span className="text-xs text-slate-400">Nilai Pengganda (k = 1 / (1 - MPC)):</span>
                <div className="text-3xl font-black text-indigo-300 mt-0.5">
                  k = {multiplierK.toFixed(2)} kali ganda
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <span className="text-xs text-slate-400">Peningkatan Pendapatan Negara (ΔY = k × ΔG):</span>
                <div className="text-2xl font-black text-emerald-400 mt-0.5">
                  ΔY = RM {deltaY.toFixed(2)} Juta
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Suntikan awal RM{deltaG} Juta berputar dalam ekonomi dan menjana pertambahan pendapatan negara bernilai RM{deltaY.toFixed(2)} Juta!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
