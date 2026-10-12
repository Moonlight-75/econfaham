import { useState } from 'react';
import { quizData } from '../data/quizData';
import type { TargetLevel, LanguageMode } from '../types';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickQuizProps {
  langMode: LanguageMode;
  targetLevel: TargetLevel;
}

export const QuickQuiz: React.FC<QuickQuizProps> = ({ langMode, targetLevel }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Filter quiz by target level
  const filteredQuestions = quizData.filter((q) => {
    if (targetLevel === 'stpm') return q.level === 'stpm';
    if (targetLevel === 'degree') return q.level === 'degree';
    return true;
  });

  const question = filteredQuestions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (question.options[idx].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < filteredQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (!question && !quizFinished) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
        Tiada soalan kuiz bagi tapisan ini.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2 border border-indigo-200">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Uji Kefahaman Konsep</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Kuiz Pantas Ekonomi</h1>
            <p className="text-xs text-slate-500 mt-1">
              Uji kefahaman teori dan analisis graf anda dengan soalan berformat peperiksaan.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] sm:text-xs text-slate-400 block">Skor:</span>
            <span className="text-xl sm:text-2xl font-black text-indigo-600">{score}</span>
            <span className="text-xs text-slate-500"> / {filteredQuestions.length}</span>
          </div>
        </div>
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-8 space-y-5 sm:space-y-6">
          {/* Question Meta */}
          <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-indigo-600 uppercase tracking-wider">
                Soalan {currentIdx + 1} daripada {filteredQuestions.length}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                {question.topic}
              </span>
            </div>
            <span className="font-bold px-2 py-0.5 rounded uppercase text-[10px] bg-indigo-50 text-indigo-700">
              {question.level.toUpperCase()}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {question.question}
            </h2>
            {langMode !== 'bm' && (
              <p className="text-xs text-slate-500 italic">
                {question.questionEn}
              </p>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnClass = 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50 text-slate-700';

              if (isAnswered) {
                if (opt.isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  btnClass = 'border-rose-500 bg-rose-50 text-rose-900 font-medium';
                } else {
                  btnClass = 'border-slate-200 opacity-50 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${btnClass}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold shrink-0 text-slate-700">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1">
                    <div>{opt.text}</div>
                    {langMode !== 'bm' && (
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">{opt.textEn}</div>
                    )}
                  </div>
                  {isAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when answered */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in">
              <span className="font-bold text-xs uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Penerangan Jawapan:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {question.explanationBm}
              </p>
              {langMode !== 'bm' && (
                <p className="text-[11px] text-slate-500 italic leading-relaxed pt-1 border-t border-slate-200/60">
                  {question.explanationEn}
                </p>
              )}
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-indigo-100 transition-all"
              >
                <span>{currentIdx + 1 === filteredQuestions.length ? 'Lihat Keputusan' : 'Soalan Seterusnya'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900">Tahniah! Kuiz Selesai!</h2>
            <p className="text-xs text-slate-500 mt-1">Berikut ialah prestasi anda bagi set kuiz ini:</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 max-w-xs mx-auto border border-slate-200">
            <span className="text-xs text-slate-500">Skor Akhir:</span>
            <div className="text-4xl font-black text-indigo-600 my-1">
              {score} / {filteredQuestions.length}
            </div>
            <span className="text-xs font-semibold text-emerald-600">
              {score === filteredQuestions.length
                ? 'Gred A+ Cemerlang! Anda kuasai konsep!'
                : score >= filteredQuestions.length / 2
                ? 'Bagus! Ulang kaji sikit lagi untuk mantap.'
                : 'Cuba lagi! Gunakan simulator untuk kuatkan visual graf.'}
            </span>
          </div>

          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulang Kuiz Semula</span>
          </button>
        </div>
      )}
    </div>
  );
};
