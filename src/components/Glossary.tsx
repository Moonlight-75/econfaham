import { useState } from 'react';
import { glossaryData } from '../data/glossaryData';
import type { LanguageMode, TargetLevel } from '../types';
import { Search, BookOpen, Lightbulb } from 'lucide-react';

interface GlossaryProps {
  langMode: LanguageMode;
  targetLevel: TargetLevel;
}

export const Glossary: React.FC<GlossaryProps> = ({ langMode, targetLevel }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = glossaryData.filter((item) => {
    // Level filter
    if (targetLevel === 'stpm' && item.level === 'degree') return false;
    if (targetLevel === 'degree' && item.level === 'stpm') return false;

    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

    // Search query filter
    const query = searchQuery.toLowerCase();
    return (
      item.bmTerm.toLowerCase().includes(query) ||
      item.enTerm.toLowerCase().includes(query) ||
      item.definitionBm.toLowerCase().includes(query) ||
      item.definitionEn.toLowerCase().includes(query) ||
      item.analogi.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 border border-emerald-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Jambatan Terma STPM ⇄ Degree</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Glosari Dwibahasa Ekonomi & Analogi Pantas
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Jangan sangkut lagi bila tukar daripada BM (Tingkatan 6) ke English di Universiti. Cari sebarang istilah dengan mudah!
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari istilah: Keanjalan, DWL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Category Filter Pills (scrollable on mobile) */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 sm:gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({glossaryData.length})
          </button>
          <button
            onClick={() => setSelectedCategory('mikro')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === 'mikro'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Mikroekonomi Asas
          </button>
          <button
            onClick={() => setSelectedCategory('pasaran')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === 'pasaran'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Struktur Pasaran & Firma
          </button>
          <button
            onClick={() => setSelectedCategory('makro')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === 'makro'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Makroekonomi & Fiskal
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2.5">
              {/* Header: BM & EN Names */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.bmTerm}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {item.level === 'both' ? 'STPM & Degree' : item.level.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-indigo-600 mt-0.5">
                    {item.enTerm}
                  </div>
                </div>
              </div>

              {/* Formula Badge if exists */}
              {item.formula && (
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono text-[11px] text-slate-800 font-semibold">
                  {item.formula}
                </div>
              )}

              {/* Definitions */}
              <div className="text-xs text-slate-600 space-y-1 leading-relaxed">
                {(langMode === 'bm' || langMode === 'bilingual') && (
                  <p>
                    <span className="font-semibold text-slate-700">Takrifan (BM): </span>
                    {item.definitionBm}
                  </p>
                )}
                {(langMode === 'en' || langMode === 'bilingual') && (
                  <p className="text-slate-500 italic">
                    <span className="font-semibold text-slate-600 not-italic">Def (EN): </span>
                    {item.definitionEn}
                  </p>
                )}
              </div>
            </div>

            {/* Analogy & Real-life Example Box */}
            <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Analogi Mudah Hadam:</span>
              </div>
              <p className="text-amber-950/80 leading-relaxed text-[11px]">
                {item.analogi}
              </p>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">Tiada istilah yang sepadan dengan carian "{searchQuery}"</p>
            <p className="text-xs text-slate-400 mt-1">Cuba cari istilah seperti "Keanjalan", "Surplus", "Kurangan", atau "Pengganda".</p>
          </div>
        )}
      </div>
    </div>
  );
};
