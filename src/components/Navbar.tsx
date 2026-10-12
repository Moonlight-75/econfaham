import type { TargetLevel, LanguageMode } from '../types';
import { TrendingUp, Calculator, BookOpen, Lightbulb, Map, HelpCircle, GraduationCap } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  targetLevel: TargetLevel;
  setTargetLevel: (level: TargetLevel) => void;
  langMode: LanguageMode;
  setLangMode: (mode: LanguageMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  targetLevel,
  setTargetLevel,
  langMode,
  setLangMode,
}) => {
  const tabs = [
    { id: 'simulator', label: 'Simulator Graf', labelEn: 'Graph Simulator', icon: TrendingUp },
    { id: 'solver', label: 'Kalkulator', labelEn: 'Equation Solver', icon: Calculator },
    { id: 'glossary', label: 'Glosari Dwisains', labelEn: 'Glossary', icon: BookOpen },
    { id: 'elib', label: 'Analogi Santai', labelEn: 'Analogy (ELIB)', icon: Lightbulb },
    { id: 'roadmap', label: 'Silibus & Roadmap', labelEn: 'Syllabus Map', icon: Map },
    { id: 'quiz', label: 'Kuiz Pantas', labelEn: 'Quick Quiz', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('simulator')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-900 to-indigo-600 bg-clip-text text-transparent">
                  EconFaham
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  STPM & Degree
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Visualkan Keluk • Faham Matematik • Skor A
              </p>
            </div>
          </div>

          {/* Quick Filters: Level and Language */}
          <div className="flex items-center gap-2">
            {/* Level Selector */}
            <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 border border-slate-200/80">
              <button
                onClick={() => setTargetLevel('all')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  targetLevel === 'all'
                    ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setTargetLevel('stpm')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                  targetLevel === 'stpm'
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <span>STPM</span>
              </button>
              <button
                onClick={() => setTargetLevel('degree')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                  targetLevel === 'degree'
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3 h-3" />
                <span>Degree</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="hidden md:inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 border border-slate-200/80">
              <button
                onClick={() => setLangMode('bilingual')}
                className={`px-2 py-1 rounded-md transition-all ${
                  langMode === 'bilingual' ? 'bg-white text-indigo-700 font-semibold shadow-xs' : 'hover:text-slate-900'
                }`}
                title="BM & English Serentak"
              >
                Dwisains (BM+EN)
              </button>
              <button
                onClick={() => setLangMode('bm')}
                className={`px-2 py-1 rounded-md transition-all ${
                  langMode === 'bm' ? 'bg-white text-indigo-700 font-semibold shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                BM
              </button>
              <button
                onClick={() => setLangMode('en')}
                className={`px-2 py-1 rounded-md transition-all ${
                  langMode === 'en' ? 'bg-white text-indigo-700 font-semibold shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{langMode === 'en' ? tab.labelEn : tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
