import { useState } from 'react';
import type { TargetLevel, LanguageMode } from './types';
import { Navbar } from './components/Navbar';
import { MarketSimulator } from './components/MarketSimulator';
import { Solver } from './components/Solver';
import { Glossary } from './components/Glossary';
import { BrokeExplanations } from './components/BrokeExplanations';
import { SyllabusRoadmap } from './components/SyllabusRoadmap';
import { QuickQuiz } from './components/QuickQuiz';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [targetLevel, setTargetLevel] = useState<TargetLevel>('all');
  const [langMode, setLangMode] = useState<LanguageMode>('bilingual');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        targetLevel={targetLevel}
        setTargetLevel={setTargetLevel}
        langMode={langMode}
        setLangMode={setLangMode}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'simulator' && (
          <MarketSimulator langMode={langMode} targetLevel={targetLevel} />
        )}
        {activeTab === 'solver' && (
          <Solver langMode={langMode} targetLevel={targetLevel} />
        )}
        {activeTab === 'glossary' && (
          <Glossary langMode={langMode} targetLevel={targetLevel} />
        )}
        {activeTab === 'elib' && (
          <BrokeExplanations langMode={langMode} targetLevel={targetLevel} />
        )}
        {activeTab === 'roadmap' && (
          <SyllabusRoadmap langMode={langMode} targetLevel={targetLevel} />
        )}
        {activeTab === 'quiz' && (
          <QuickQuiz langMode={langMode} targetLevel={targetLevel} />
        )}
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
              EF
            </div>
            <span className="font-bold text-slate-700">EconFaham Malaysia</span>
            <span>— Platform Visual & Interaktif Ekonomi STPM & Universiti</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>STPM Penggal 1, 2, 3</span>
            <span>•</span>
            <span>Intermediate Micro & Macro</span>
            <span>•</span>
            <span className="text-indigo-600 font-semibold">Skor A Tanpa Hapal Buta</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
