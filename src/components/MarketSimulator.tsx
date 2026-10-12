import { useState, useMemo } from 'react';
import type { LanguageMode, TargetLevel } from '../types';
import { 
  Sliders, RotateCcw, Info, Sparkles, AlertTriangle
} from 'lucide-react';

interface MarketSimulatorProps {
  langMode: LanguageMode;
  targetLevel: TargetLevel;
}

type PolicyMode = 'none' | 'tax' | 'subsidy' | 'ceiling' | 'floor';

export const MarketSimulator: React.FC<MarketSimulatorProps> = () => {
  // Demand Parameters: P = a - b*Q
  const [demandInterceptShift, setDemandInterceptShift] = useState<number>(0); // -30 to +30
  // Supply Parameters: P = c + d*Q
  const [supplyInterceptShift, setSupplyInterceptShift] = useState<number>(0); // -30 to +30

  // Government Intervention
  const [policy, setPolicy] = useState<PolicyMode>('none');
  const [taxAmount, setTaxAmount] = useState<number>(15);
  const [subsidyAmount, setSubsidyAmount] = useState<number>(15);
  const [ceilingPrice, setCeilingPrice] = useState<number>(35);
  const [floorPrice, setFloorPrice] = useState<number>(65);

  // Visualization toggles
  const [showSurplus, setShowSurplus] = useState<boolean>(true);
  const [showDWL, setShowDWL] = useState<boolean>(true);

  // Base parameters
  const baseA = 80; // Demand intercept: P = 80 - 0.6Q
  const b = 0.6;
  const baseC = 20; // Supply intercept: P = 20 + 0.6Q
  const d = 0.6;

  // Active parameters
  const activeA = baseA + demandInterceptShift;
  const activeC = baseC - supplyInterceptShift; // higher shift = higher supply (lower intercept)

  // Base Equilibrium (E0)
  const baseP = (baseA * d + baseC * b) / (b + d); // (80*0.6 + 20*0.6)/1.2 = (48 + 12)/1.2 = 50
  const baseQ = (baseA - baseC) / (b + d); // (80 - 20)/1.2 = 50

  // Current Market Equilibrium without policy
  const currentP = (activeA * d + activeC * b) / (b + d);
  const currentQ = (activeA - activeC) / (b + d);

  // Effective Equilibrium with policy
  const marketState = useMemo(() => {
    let eqP = currentP;
    let eqQ = currentQ;
    let buyerPrice = currentP;
    let sellerPrice = currentP;
    let dwl = 0;
    let taxRevenue = 0;
    let subsidyExpense = 0;
    let shortage = 0;
    let surplusAmount = 0;
    let blackMarketPrice = 0;

    if (policy === 'tax') {
      // Supply with tax: P_buyer = (activeC + taxAmount) + d*Q
      // activeA - b*Q = activeC + taxAmount + d*Q
      const qTax = Math.max(0, (activeA - (activeC + taxAmount)) / (b + d));
      eqQ = qTax;
      buyerPrice = activeA - b * qTax;
      sellerPrice = buyerPrice - taxAmount;
      eqP = buyerPrice;
      taxRevenue = taxAmount * qTax;
      dwl = 0.5 * taxAmount * Math.max(0, currentQ - qTax);
    } else if (policy === 'subsidy') {
      // Supply with subsidy: P = (activeC - subsidyAmount) + d*Q
      const qSub = Math.max(0, (activeA - (activeC - subsidyAmount)) / (b + d));
      eqQ = qSub;
      buyerPrice = activeA - b * qSub;
      sellerPrice = buyerPrice + subsidyAmount;
      eqP = buyerPrice;
      subsidyExpense = subsidyAmount * qSub;
      dwl = 0.5 * subsidyAmount * Math.max(0, qSub - currentQ);
    } else if (policy === 'ceiling') {
      if (ceilingPrice < currentP) {
        const qSupply = Math.max(0, (ceilingPrice - activeC) / d);
        const qDemand = Math.max(0, (activeA - ceilingPrice) / b);
        shortage = Math.max(0, qDemand - qSupply);
        eqQ = qSupply; // Quantity transacted is constrained by short side
        eqP = ceilingPrice;
        buyerPrice = ceilingPrice;
        sellerPrice = ceilingPrice;
        blackMarketPrice = Math.max(0, activeA - b * qSupply);
        dwl = 0.5 * (blackMarketPrice - ceilingPrice) * (currentQ - qSupply);
      }
    } else if (policy === 'floor') {
      if (floorPrice > currentP) {
        const qSupply = Math.max(0, (floorPrice - activeC) / d);
        const qDemand = Math.max(0, (activeA - floorPrice) / b);
        surplusAmount = Math.max(0, qSupply - qDemand);
        eqQ = qDemand; // Quantity transacted is constrained by demand
        eqP = floorPrice;
        buyerPrice = floorPrice;
        sellerPrice = floorPrice;
        const sellersWillingP = Math.max(0, activeC + d * qDemand);
        dwl = 0.5 * (floorPrice - sellersWillingP) * (currentQ - qDemand);
      }
    }

    // Consumer Surplus and Producer Surplus
    // CS = area under demand from 0 to eqQ above buyerPrice
    const cs = Math.max(0, 0.5 * (activeA - buyerPrice) * eqQ);
    // PS = area above supply from 0 to eqQ below sellerPrice
    const ps = Math.max(0, 0.5 * (sellerPrice - activeC) * eqQ);

    return {
      eqP,
      eqQ,
      buyerPrice,
      sellerPrice,
      cs,
      ps,
      dwl,
      taxRevenue,
      subsidyExpense,
      shortage,
      surplusAmount,
      blackMarketPrice,
    };
  }, [activeA, activeC, b, d, currentP, currentQ, policy, taxAmount, subsidyAmount, ceilingPrice, floorPrice]);

  // SVG coordinate transformation
  // SVG Canvas: width = 560, height = 440. Margins: left = 60, bottom = 50, right = 30, top = 30
  const width = 560;
  const height = 420;
  const margin = { top: 30, right: 30, bottom: 55, left: 65 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const maxQ = 110;
  const maxP = 100;

  const toSvgX = (q: number) => margin.left + (Math.max(0, Math.min(maxQ, q)) / maxQ) * graphWidth;
  const toSvgY = (p: number) => margin.top + graphHeight - (Math.max(0, Math.min(maxP, p)) / maxP) * graphHeight;

  // Preset Handlers
  const handlePreset = (type: string) => {
    switch (type) {
      case 'default':
        setDemandInterceptShift(0);
        setSupplyInterceptShift(0);
        setPolicy('none');
        break;
      case 'cukai':
        setDemandInterceptShift(0);
        setSupplyInterceptShift(0);
        setPolicy('tax');
        setTaxAmount(18);
        break;
      case 'subsidi':
        setDemandInterceptShift(0);
        setSupplyInterceptShift(0);
        setPolicy('subsidy');
        setSubsidyAmount(16);
        break;
      case 'ceiling':
        setDemandInterceptShift(0);
        setSupplyInterceptShift(0);
        setPolicy('ceiling');
        setCeilingPrice(36);
        break;
      case 'floor':
        setDemandInterceptShift(0);
        setSupplyInterceptShift(0);
        setPolicy('floor');
        setFloorPrice(64);
        break;
      case 'income_boom':
        setDemandInterceptShift(22);
        setSupplyInterceptShift(0);
        setPolicy('none');
        break;
      case 'cost_shock':
        setDemandInterceptShift(0);
        setSupplyInterceptShift(-20);
        setPolicy('none');
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 rounded-2xl p-4 sm:p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-2 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Makmal Visual Interaktif Ekonomi</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Simulator Keseimbangan Pasaran & Kebajikan
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-2xl leading-relaxed">
              Tarik slider untuk saksikan peralihan keluk Permintaan (DD), Penawaran (SS), kesan Cukai, Subsidi, dan Kawalan Harga secara masa nyata!
            </p>
          </div>

          {/* Quick Presets (Horizontally scrollable on mobile) */}
          <div className="flex flex-col gap-1.5 bg-black/25 p-2.5 rounded-xl border border-white/10 shrink-0">
            <span className="text-[11px] font-semibold text-indigo-200 block">Preset Senario Pantas:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={() => handlePreset('default')}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all font-medium whitespace-nowrap active:scale-95"
              >
                Asal ($E_0$)
              </button>
              <button
                onClick={() => handlePreset('cukai')}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-amber-500/30 hover:bg-amber-500/40 text-amber-200 border border-amber-400/30 font-medium whitespace-nowrap active:scale-95"
              >
                + Cukai ($t$)
              </button>
              <button
                onClick={() => handlePreset('subsidi')}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/30 hover:bg-emerald-500/40 text-emerald-200 border border-emerald-400/30 font-medium whitespace-nowrap active:scale-95"
              >
                + Subsidi ($s$)
              </button>
              <button
                onClick={() => handlePreset('ceiling')}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-rose-500/30 hover:bg-rose-500/40 text-rose-200 border border-rose-400/30 font-medium whitespace-nowrap active:scale-95"
              >
                Harga Siling
              </button>
              <button
                onClick={() => handlePreset('floor')}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-purple-500/30 hover:bg-purple-500/40 text-purple-200 border border-purple-400/30 font-medium whitespace-nowrap active:scale-95"
              >
                Gaji Min
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Graph + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Side: SVG Graph Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
              <h2 className="text-sm sm:text-base font-bold text-slate-800">
                Rajah Keluk Pasaran Interaktif
              </h2>
            </div>
            {/* Display badges */}
            <div className="flex items-center gap-3 text-[11px] sm:text-xs">
              <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showSurplus}
                  onChange={(e) => setShowSurplus(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Lebihan (CS/PS)</span>
              </label>
              {(policy === 'tax' || policy === 'subsidy' || policy === 'ceiling' || policy === 'floor') && (
                <label className="flex items-center gap-1.5 text-amber-700 cursor-pointer font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={showDWL}
                    onChange={(e) => setShowDWL(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>DWL</span>
                </label>
              )}
            </div>
          </div>

          {/* SVG Diagram Area - fully responsive without fixed min-width */}
          <div className="w-full flex justify-center py-1 sm:py-2 overflow-hidden">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-[620px] h-auto select-none font-sans"
            >
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
                {/* Diagonal stripes for DWL */}
                <pattern id="dwlStripes" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#f43f5e" strokeWidth="2" opacity="0.6" />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect x={margin.left} y={margin.top} width={graphWidth} height={graphHeight} fill="url(#grid)" />

              {/* Shaded Areas: Consumer Surplus (CS) */}
              {showSurplus && marketState.eqQ > 0 && (
                <polygon
                  points={`
                    ${toSvgX(0)},${toSvgY(marketState.buyerPrice)}
                    ${toSvgX(marketState.eqQ)},${toSvgY(marketState.buyerPrice)}
                    ${toSvgX(0)},${toSvgY(activeA)}
                  `}
                  fill="#3b82f6"
                  fillOpacity="0.18"
                />
              )}

              {/* Shaded Areas: Producer Surplus (PS) */}
              {showSurplus && marketState.eqQ > 0 && (
                <polygon
                  points={`
                    ${toSvgX(0)},${toSvgY(marketState.sellerPrice)}
                    ${toSvgX(marketState.eqQ)},${toSvgY(marketState.sellerPrice)}
                    ${toSvgX(0)},${toSvgY(activeC)}
                  `}
                  fill="#10b981"
                  fillOpacity="0.18"
                />
              )}

              {/* Tax Revenue Area (Rectangle) */}
              {policy === 'tax' && marketState.eqQ > 0 && (
                <rect
                  x={toSvgX(0)}
                  y={toSvgY(marketState.buyerPrice)}
                  width={toSvgX(marketState.eqQ) - toSvgX(0)}
                  height={toSvgY(marketState.sellerPrice) - toSvgY(marketState.buyerPrice)}
                  fill="#f59e0b"
                  fillOpacity="0.25"
                  stroke="#d97706"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              )}

              {/* Deadweight Loss Area (Triangle) */}
              {showDWL && policy === 'tax' && marketState.eqQ < currentQ && (
                <polygon
                  points={`
                    ${toSvgX(marketState.eqQ)},${toSvgY(marketState.buyerPrice)}
                    ${toSvgX(currentQ)},${toSvgY(currentP)}
                    ${toSvgX(marketState.eqQ)},${toSvgY(marketState.sellerPrice)}
                  `}
                  fill="url(#dwlStripes)"
                  stroke="#e11d48"
                  strokeWidth="1.5"
                />
              )}

              {/* DWL for Price Ceiling */}
              {showDWL && policy === 'ceiling' && ceilingPrice < currentP && (
                <polygon
                  points={`
                    ${toSvgX(marketState.eqQ)},${toSvgY(marketState.blackMarketPrice)}
                    ${toSvgX(currentQ)},${toSvgY(currentP)}
                    ${toSvgX(marketState.eqQ)},${toSvgY(ceilingPrice)}
                  `}
                  fill="url(#dwlStripes)"
                  stroke="#e11d48"
                  strokeWidth="1.5"
                />
              )}

              {/* DWL for Price Floor */}
              {showDWL && policy === 'floor' && floorPrice > currentP && (
                <polygon
                  points={`
                    ${toSvgX(marketState.eqQ)},${toSvgY(floorPrice)}
                    ${toSvgX(currentQ)},${toSvgY(currentP)}
                    ${toSvgX(marketState.eqQ)},${toSvgY(activeC + d * marketState.eqQ)}
                  `}
                  fill="url(#dwlStripes)"
                  stroke="#e11d48"
                  strokeWidth="1.5"
                />
              )}

              {/* Axes */}
              {/* Y Axis (Price / Harga) */}
              <line
                x1={margin.left}
                y1={margin.top}
                x2={margin.left}
                y2={margin.top + graphHeight}
                stroke="#334155"
                strokeWidth="2.5"
              />
              {/* X Axis (Quantity / Kuantiti) */}
              <line
                x1={margin.left}
                y1={margin.top + graphHeight}
                x2={margin.left + graphWidth}
                y2={margin.top + graphHeight}
                stroke="#334155"
                strokeWidth="2.5"
              />

              {/* Axis Labels */}
              <text
                x={margin.left - 15}
                y={margin.top - 10}
                className="text-xs font-bold fill-slate-700"
                textAnchor="end"
              >
                P (Harga / RM)
              </text>
              <text
                x={margin.left + graphWidth + 15}
                y={margin.top + graphHeight + 15}
                className="text-xs font-bold fill-slate-700"
                textAnchor="start"
              >
                Q (Kuantiti)
              </text>
              <text
                x={margin.left - 12}
                y={margin.top + graphHeight + 16}
                className="text-xs font-semibold fill-slate-500"
                textAnchor="middle"
              >
                0
              </text>

              {/* Base Demand D0 (if shifted) */}
              {demandInterceptShift !== 0 && (
                <g opacity="0.4">
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(baseA)}
                    x2={toSvgX(baseA / b)}
                    y2={toSvgY(0)}
                    stroke="#4338ca"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                  <text
                    x={toSvgX(Math.min(maxQ - 15, baseA / b - 8))}
                    y={toSvgY(baseA - b * (baseA / b - 8)) - 8}
                    className="text-xs font-semibold fill-indigo-600"
                  >
                    D₀
                  </text>
                </g>
              )}

              {/* Active Demand Curve D1 */}
              <line
                x1={toSvgX(0)}
                y1={toSvgY(activeA)}
                x2={toSvgX(activeA / b)}
                y2={toSvgY(0)}
                stroke="#4f46e5"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <text
                x={toSvgX(Math.min(maxQ - 12, (activeA / b) - 6))}
                y={toSvgY(activeA - b * ((activeA / b) - 6)) - 10}
                className="text-xs font-extrabold fill-indigo-700"
              >
                {demandInterceptShift !== 0 ? 'D₁' : 'DD (Permintaan)'}
              </text>

              {/* Base Supply S0 (if shifted) */}
              {supplyInterceptShift !== 0 && (
                <g opacity="0.4">
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(baseC)}
                    x2={toSvgX((maxP - baseC) / d)}
                    y2={toSvgY(maxP)}
                    stroke="#059669"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                  <text
                    x={toSvgX((maxP - baseC) / d) - 15}
                    y={toSvgY(maxP) + 16}
                    className="text-xs font-semibold fill-emerald-600"
                  >
                    S₀
                  </text>
                </g>
              )}

              {/* Active Supply Curve S1 */}
              <line
                x1={toSvgX(0)}
                y1={toSvgY(activeC)}
                x2={toSvgX((maxP - activeC) / d)}
                y2={toSvgY(maxP)}
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <text
                x={toSvgX((maxP - activeC) / d) - 25}
                y={toSvgY(maxP) + 16}
                className="text-xs font-extrabold fill-emerald-700"
              >
                {supplyInterceptShift !== 0 ? 'S₁' : 'SS (Penawaran)'}
              </text>

              {/* Shifted Supply Curve due to Tax (S + Tax) */}
              {policy === 'tax' && (
                <g>
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(activeC + taxAmount)}
                    x2={toSvgX((maxP - (activeC + taxAmount)) / d)}
                    y2={toSvgY(maxP)}
                    stroke="#d97706"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  <text
                    x={toSvgX((maxP - (activeC + taxAmount)) / d) - 30}
                    y={toSvgY(maxP) + 16}
                    className="text-xs font-bold fill-amber-700"
                  >
                    Sₜ (S + Cukai)
                  </text>
                </g>
              )}

              {/* Shifted Supply Curve due to Subsidy (S - Subsidy) */}
              {policy === 'subsidy' && (
                <g>
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(activeC - subsidyAmount)}
                    x2={toSvgX((maxP - (activeC - subsidyAmount)) / d)}
                    y2={toSvgY(maxP)}
                    stroke="#0284c7"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  <text
                    x={toSvgX((maxP - (activeC - subsidyAmount)) / d) - 30}
                    y={toSvgY(maxP) + 16}
                    className="text-xs font-bold fill-sky-700"
                  >
                    Sₛ (S - Subsidi)
                  </text>
                </g>
              )}

              {/* Price Ceiling Line */}
              {policy === 'ceiling' && (
                <g>
                  <line
                    x1={margin.left}
                    y1={toSvgY(ceilingPrice)}
                    x2={margin.left + graphWidth}
                    y2={toSvgY(ceilingPrice)}
                    stroke="#e11d48"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  <text
                    x={margin.left + graphWidth - 10}
                    y={toSvgY(ceilingPrice) - 8}
                    className="text-xs font-bold fill-rose-600"
                    textAnchor="end"
                  >
                    P_siling = RM{ceilingPrice.toFixed(0)}
                  </text>
                </g>
              )}

              {/* Price Floor Line */}
              {policy === 'floor' && (
                <g>
                  <line
                    x1={margin.left}
                    y1={toSvgY(floorPrice)}
                    x2={margin.left + graphWidth}
                    y2={toSvgY(floorPrice)}
                    stroke="#9333ea"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  <text
                    x={margin.left + graphWidth - 10}
                    y={toSvgY(floorPrice) - 8}
                    className="text-xs font-bold fill-purple-700"
                    textAnchor="end"
                  >
                    P_lantai = RM{floorPrice.toFixed(0)}
                  </text>
                </g>
              )}

              {/* Guides to Axes for Effective Equilibrium */}
              {/* Vertical line from eqQ down to X-axis */}
              <line
                x1={toSvgX(marketState.eqQ)}
                y1={toSvgY(marketState.eqP)}
                x2={toSvgX(marketState.eqQ)}
                y2={toSvgY(0)}
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Horizontal line from eqP to Y-axis */}
              <line
                x1={margin.left}
                y1={toSvgY(marketState.eqP)}
                x2={toSvgX(marketState.eqQ)}
                y2={toSvgY(marketState.eqP)}
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Equilibrium Point E0 / E* */}
              <circle
                cx={toSvgX(marketState.eqQ)}
                cy={toSvgY(marketState.eqP)}
                r="6.5"
                fill="#4338ca"
                stroke="#ffffff"
                strokeWidth="2.5"
                className="transition-all duration-200"
              />
              <text
                x={toSvgX(marketState.eqQ) + 10}
                y={toSvgY(marketState.eqP) - 8}
                className="text-xs font-black fill-indigo-900"
              >
                E* (RM{marketState.eqP.toFixed(1)}, {marketState.eqQ.toFixed(1)})
              </text>

              {/* Axis Tick Values */}
              <rect
                x={toSvgX(marketState.eqQ) - 20}
                y={margin.top + graphHeight + 4}
                width="40"
                height="18"
                rx="4"
                fill="#312e81"
              />
              <text
                x={toSvgX(marketState.eqQ)}
                y={margin.top + graphHeight + 17}
                className="text-[10px] font-bold fill-white text-center"
                textAnchor="middle"
              >
                Q={marketState.eqQ.toFixed(1)}
              </text>

              <rect
                x={margin.left - 50}
                y={toSvgY(marketState.eqP) - 9}
                width="46"
                height="18"
                rx="4"
                fill="#312e81"
              />
              <text
                x={margin.left - 27}
                y={toSvgY(marketState.eqP) + 4}
                className="text-[10px] font-bold fill-white text-center"
                textAnchor="middle"
              >
                RM{marketState.eqP.toFixed(1)}
              </text>

              {/* Extra guide for tax seller price if tax active */}
              {policy === 'tax' && (
                <g>
                  <line
                    x1={margin.left}
                    y1={toSvgY(marketState.sellerPrice)}
                    x2={toSvgX(marketState.eqQ)}
                    y2={toSvgY(marketState.sellerPrice)}
                    stroke="#d97706"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <rect
                    x={margin.left - 50}
                    y={toSvgY(marketState.sellerPrice) - 9}
                    width="46"
                    height="18"
                    rx="4"
                    fill="#b45309"
                  />
                  <text
                    x={margin.left - 27}
                    y={toSvgY(marketState.sellerPrice) + 4}
                    className="text-[10px] font-bold fill-white text-center"
                    textAnchor="middle"
                  >
                    Ps={marketState.sellerPrice.toFixed(1)}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Legend / Info Bar at bottom of graph */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-xs">
            <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100">
              <span className="text-slate-500 block text-[11px]">Harga Pasaran (P*)</span>
              <span className="font-extrabold text-indigo-900 text-sm">RM {marketState.eqP.toFixed(2)}</span>
            </div>
            <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100">
              <span className="text-slate-500 block text-[11px]">Kuantiti (Q*)</span>
              <span className="font-extrabold text-indigo-900 text-sm">{marketState.eqQ.toFixed(1)} unit</span>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
              <span className="text-slate-500 block text-[11px]">Lebihan Pengguna (CS)</span>
              <span className="font-extrabold text-blue-700 text-sm">RM {marketState.cs.toFixed(1)}</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
              <span className="text-slate-500 block text-[11px]">Lebihan Pengeluar (PS)</span>
              <span className="font-extrabold text-emerald-700 text-sm">RM {marketState.ps.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Controls & Explanation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Controls Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-slate-800 text-sm">Kawalan Peralihan Keluk</h3>
              </div>
              <button
                onClick={() => handlePreset('default')}
                className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                title="Reset semula keluk"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Slider 1: Demand Shift */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-indigo-700">Peralihan Keluk Permintaan (DD):</span>
                <span className="font-bold text-slate-700">
                  {demandInterceptShift > 0 ? `+${demandInterceptShift} (Ke Kanan)` : demandInterceptShift < 0 ? `${demandInterceptShift} (Ke Kiri)` : '0 (Asal)'}
                </span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                step="5"
                value={demandInterceptShift}
                onChange={(e) => setDemandInterceptShift(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
              <p className="text-[11px] text-slate-500">
                Faktor: Perubahan pendapatan, trend viral, harga barang pengganti.
              </p>
            </div>

            {/* Slider 2: Supply Shift */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-emerald-700">Peralihan Keluk Penawaran (SS):</span>
                <span className="font-bold text-slate-700">
                  {supplyInterceptShift > 0 ? `+${supplyInterceptShift} (Ke Kanan)` : supplyInterceptShift < 0 ? `${supplyInterceptShift} (Ke Kiri)` : '0 (Asal)'}
                </span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                step="5"
                value={supplyInterceptShift}
                onChange={(e) => setSupplyInterceptShift(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
              <p className="text-[11px] text-slate-500">
                Faktor: Kos bahan mentah, teknologi baharu, cuaca/musim.
              </p>
            </div>

            {/* Policy Interventions */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block">
                Dasar Campur Tangan Kerajaan:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 text-xs">
                <button
                  onClick={() => setPolicy('none')}
                  className={`py-2 px-2 rounded-lg font-medium border text-center transition-all col-span-2 sm:col-span-1 lg:col-span-1 ${
                    policy === 'none'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Pasaran Bebas
                </button>
                <button
                  onClick={() => setPolicy('tax')}
                  className={`py-2 px-2 rounded-lg font-medium border text-center transition-all ${
                    policy === 'tax'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  Cukai ($t$)
                </button>
                <button
                  onClick={() => setPolicy('subsidy')}
                  className={`py-2 px-2 rounded-lg font-medium border text-center transition-all ${
                    policy === 'subsidy'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
                  }`}
                >
                  Subsidi ($s$)
                </button>
                <button
                  onClick={() => setPolicy('ceiling')}
                  className={`py-2 px-2 rounded-lg font-medium border text-center transition-all ${
                    policy === 'ceiling'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-white text-rose-800 border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  Harga Siling
                </button>
                <button
                  onClick={() => setPolicy('floor')}
                  className={`py-2 px-2 rounded-lg font-medium border text-center transition-all ${
                    policy === 'floor'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-white text-purple-800 border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  Harga Lantai
                </button>
              </div>

              {/* Policy Specific Sliders */}
              {policy === 'tax' && (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 space-y-1.5 animate-in fade-in">
                  <div className="flex justify-between text-xs font-semibold text-amber-900">
                    <span>Kadar Cukai Seunit ($t$):</span>
                    <span>RM {taxAmount} / unit</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="2"
                    value={taxAmount}
                    onChange={(e) => setTaxAmount(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer h-1.5 bg-amber-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-amber-800 pt-1">
                    <span>Hasil Cukai: <b>RM {marketState.taxRevenue.toFixed(1)}</b></span>
                    <span>DWL: <b>RM {marketState.dwl.toFixed(1)}</b></span>
                  </div>
                </div>
              )}

              {policy === 'subsidy' && (
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200/80 space-y-1.5 animate-in fade-in">
                  <div className="flex justify-between text-xs font-semibold text-emerald-900">
                    <span>Kadar Subsidi Seunit ($s$):</span>
                    <span>RM {subsidyAmount} / unit</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="2"
                    value={subsidyAmount}
                    onChange={(e) => setSubsidyAmount(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-emerald-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-emerald-800 pt-1">
                    <span>Kos Kerajaan: <b>RM {marketState.subsidyExpense.toFixed(1)}</b></span>
                    <span>Output Baru: <b>{marketState.eqQ.toFixed(1)} unit</b></span>
                  </div>
                </div>
              )}

              {policy === 'ceiling' && (
                <div className="bg-rose-50 p-3 rounded-xl border border-rose-200/80 space-y-1.5 animate-in fade-in">
                  <div className="flex justify-between text-xs font-semibold text-rose-900">
                    <span>Paras Harga Maksimum (Siling):</span>
                    <span>RM {ceilingPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="50"
                    step="2"
                    value={ceilingPrice}
                    onChange={(e) => setCeilingPrice(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer h-1.5 bg-rose-200 rounded-lg"
                  />
                  {marketState.shortage > 0 ? (
                    <div className="text-[11px] text-rose-800 flex items-center justify-between font-medium">
                      <span>Kurangan Pasaran: <b>{marketState.shortage.toFixed(1)} unit</b></span>
                      <span>Potensi Pasar Gelap: <b>RM {marketState.blackMarketPrice.toFixed(1)}</b></span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic">Harga siling tidak berkesan kerana melebihi P* asal.</p>
                  )}
                </div>
              )}

              {policy === 'floor' && (
                <div className="bg-purple-50 p-3 rounded-xl border border-purple-200/80 space-y-1.5 animate-in fade-in">
                  <div className="flex justify-between text-xs font-semibold text-purple-900">
                    <span>Paras Harga Minimum (Lantai):</span>
                    <span>RM {floorPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="80"
                    step="2"
                    value={floorPrice}
                    onChange={(e) => setFloorPrice(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer h-1.5 bg-purple-200 rounded-lg"
                  />
                  {marketState.surplusAmount > 0 ? (
                    <div className="text-[11px] text-purple-800 flex items-center justify-between font-medium">
                      <span>Lebihan Bekalan (Surplus): <b>{marketState.surplusAmount.toFixed(1)} unit</b></span>
                      <span>Lambakan Stok Pasaran</span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic">Harga lantai tidak berkesan kerana di bawah P* asal.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Educational Explanations Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-800 text-sm">
                Penerangan Analisis & Tips Periksa
              </h3>
            </div>

            {/* Dynamic Step-by-Step Explanation */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0 text-[10px]">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Peralihan Keluk:</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {demandInterceptShift > 0 && 'Permintaan (DD) beralih ke kanan. Pengguna sanggup membeli lebih banyak pada setiap tingkat harga. '}
                    {demandInterceptShift < 0 && 'Permintaan (DD) beralih ke kiri. Pengguna mengurangkan pembelian pada setiap tingkat harga. '}
                    {supplyInterceptShift > 0 && 'Penawaran (SS) beralih ke kanan/bawah. Pengeluar membekalkan lebih banyak output akibat penurunan kos atau teknologi bertambah baik. '}
                    {supplyInterceptShift < 0 && 'Penawaran (SS) beralih ke kiri/atas. Kos pengeluaran meningkat. '}
                    {demandInterceptShift === 0 && supplyInterceptShift === 0 && 'Keluk DD dan SS berada pada kedudukan asas normal.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0 text-[10px]">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Kesan Ke Atas Keseimbangan ($P^*$ & $Q^*$):</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Titik keseimbangan baharu terbentuk pada{' '}
                    <span className="font-bold text-indigo-700">RM {marketState.eqP.toFixed(2)}</span> dan kuantiti{' '}
                    <span className="font-bold text-indigo-700">{marketState.eqQ.toFixed(1)} unit</span>.
                    {marketState.eqP > baseP && ' Harga pasaran meningkat berbanding titik asal. '}
                    {marketState.eqP < baseP && ' Harga pasaran menurun berbanding titik asal. '}
                    {marketState.eqQ > baseQ && ' Kuantiti dagangan bertambah.'}
                    {marketState.eqQ < baseQ && ' Kuantiti dagangan berkurangan.'}
                  </p>
                </div>
              </div>

              {/* Policy specific takeaways */}
              {policy === 'tax' && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <h4 className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>STPM & Degree Focus: Beban Cukai & Kerugian Luput (DWL)</span>
                  </h4>
                  <p className="mt-1 leading-relaxed text-[11px]">
                    Pengguna membayar RM{marketState.buyerPrice.toFixed(2)}, pengeluar menerima bersih RM{marketState.sellerPrice.toFixed(2)}. 
                    Cukai menyebabkan pengecutan kuantiti ({marketState.eqQ.toFixed(1)} &lt; {currentQ.toFixed(1)}).
                    Kawasan segi tiga merah mewakili <b>Beban Berat Hilang (Deadweight Loss) = RM{marketState.dwl.toFixed(1)}</b>, 
                    iaitu kebajikan masyarakat yang musnah dan tidak dikutip oleh sesiapa!
                  </p>
                </div>
              )}

              {policy === 'ceiling' && marketState.shortage > 0 && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                  <h4 className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Kesan Harga Bumbung (Price Ceiling)</span>
                  </h4>
                  <p className="mt-1 leading-relaxed text-[11px]">
                    Wujud <b>kurangan bekalan (shortage)</b> sebanyak {marketState.shortage.toFixed(1)} unit. 
                    Peniaga hanya sanggup keluar {marketState.eqQ.toFixed(1)} unit, tetapi pengguna berebut nak beli. 
                    Ini mendorong kemunculan pasar gelap di mana orang sanggup membayar sehingga RM{marketState.blackMarketPrice.toFixed(1)}.
                  </p>
                </div>
              )}

              {policy === 'floor' && marketState.surplusAmount > 0 && (
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900">
                  <h4 className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-purple-600" />
                    <span>Kesan Harga Lantai (Price Floor / Gaji Minimum)</span>
                  </h4>
                  <p className="mt-1 leading-relaxed text-[11px]">
                    Wujud <b>lebihan bekalan (surplus)</b> sebanyak {marketState.surplusAmount.toFixed(1)} unit. 
                    Jika ini pasaran buruh, harga lantai mewakili gaji minimum yang menyebabkan penawaran buruh melebihi permintaan majikan (pengangguran berstruktur jika tiada peningkatan produktiviti).
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
