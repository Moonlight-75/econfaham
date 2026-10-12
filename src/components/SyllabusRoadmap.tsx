import { useState } from 'react';
import { syllabusData } from '../data/syllabusData';
import type { TargetLevel, LanguageMode } from '../types';
import { Map, AlertCircle } from 'lucide-react';

interface SyllabusRoadmapProps {
  langMode: LanguageMode;
  targetLevel: TargetLevel;
}

export const SyllabusRoadmap: React.FC<SyllabusRoadmapProps> = ({ targetLevel }) => {
  const [selectedSection, setSelectedSection] = useState<number>(0);

  const filteredSections = syllabusData.filter((sec) => {
    if (targetLevel === 'stpm') return sec.level === 'STPM';
    if (targetLevel === 'degree') return sec.level === 'Degree';
    return true;
  });

  const active = filteredSections[Math.min(selectedSection, filteredSections.length - 1)] || filteredSections[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
              <Map className="w-3.5 h-3.5" />
              <span>Panduan Silibus & Strategi Skor A</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Laluan Pembelajaran (Roadmap STPM & Degree)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Kenal pasti topik paling kerap keluar, konsep teras yang wajib dikuasai, dan perangkap soalan peperiksaan.
            </p>
          </div>
        </div>

        {/* Section Selectors (scrollable on mobile) */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 sm:gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          {filteredSections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSection(idx)}
              className={`px-3 py-2 rounded-xl font-medium transition-all ${
                active.titleBm === sec.titleBm
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="font-bold">{sec.level}:</span> {sec.titleBm.split(':')[1] || sec.titleBm}
            </button>
          ))}
        </div>
      </div>

      {/* Active Section Topics List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {active.level}
            </span>
            <h2 className="text-xl font-bold text-slate-900">{active.titleBm}</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">{active.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {active.topics.map((topic) => (
            <div
              key={topic.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all bg-slate-50/50 hover:bg-white flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {topic.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      topic.difficulty === 'Tinggi'
                        ? 'bg-rose-100 text-rose-700'
                        : topic.difficulty === 'Sederhana'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    Aras: {topic.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{topic.nameBm}</h3>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">{topic.nameEn}</div>
                </div>

                {/* Key Concepts Pills */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 block">Konsep Teras:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.keyConcepts.map((kc, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700"
                      >
                        {kc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Exam Tip */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-950 space-y-0.5">
                <div className="flex items-center gap-1 font-bold text-amber-900">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tips Skor Periksa / Perangkap Soalan:</span>
                </div>
                <p className="leading-relaxed pl-4">{topic.tipsPeriksa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
