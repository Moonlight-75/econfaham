import { useState } from 'react';
import { elibData } from '../data/elibData';
import type { LanguageMode, TargetLevel } from '../types';
import { Lightbulb, Fuel, Utensils, Banknote, Egg, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface BrokeExplanationsProps {
  langMode: LanguageMode;
  targetLevel: TargetLevel;
}

export const BrokeExplanations: React.FC<BrokeExplanationsProps> = () => {
  const [expandedId, setExpandedId] = useState<string | null>('elib-1');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Fuel':
        return <Fuel className="w-5 h-5 text-amber-500" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-orange-500" />;
      case 'Banknote':
        return <Banknote className="w-5 h-5 text-emerald-500" />;
      case 'Egg':
        return <Egg className="w-5 h-5 text-rose-500" />;
      default:
        return <Lightbulb className="w-5 h-5 text-indigo-500" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-white text-xs font-semibold mb-2">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Siri "Explain Like I'm Broke" (ELIB)</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
          Ekonomi Tanpa Jargon: Cerita Realiti Malaysia
        </h1>
        <p className="text-xs sm:text-sm text-amber-50 mt-1 max-w-2xl leading-relaxed">
          Fahamkan konsep ekonomi paling kompleks dengan analogi harian seperti roti canai mamak, subsidi petrol, dan bilik darjah.
        </p>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {elibData.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-amber-300 transition-all"
            >
              {/* Header Bar */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {item.tag}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {item.readTime}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                        {item.level}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="text-slate-400 pl-2 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                  {/* The Hook */}
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950">
                    <span className="font-bold block text-xs uppercase tracking-wider text-amber-800 mb-1">
                      Persoalan / The Dilemma:
                    </span>
                    <p className="font-medium text-slate-800 leading-relaxed italic">
                      "{item.hook}"
                    </p>
                  </div>

                  {/* The Analogy */}
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Analogi Santai:</span>
                    </h4>
                    <p className="text-slate-600 leading-relaxed pl-1">
                      {item.analogi}
                    </p>
                  </div>

                  {/* Formal Theory Bridge */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                        Teori Formal STPM (BM):
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.teoriFormalBm}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 block">
                        Formal Theory for Degree (EN):
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.teoriFormalEn}
                      </p>
                    </div>
                  </div>

                  {/* Main Takeaway */}
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span><b>Takeaway Utama:</b> {item.takeaway}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
