"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, RotateCcw, Lightbulb, MessageCircle, CalendarCheck, UserSearch } from 'lucide-react';

export default function CherylsBirthdayPuzzle() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const dates = [
    { month: 'May', day: 15 }, { month: 'May', day: 16 }, { month: 'May', day: 19 },
    { month: 'June', day: 17 }, { month: 'June', day: 18 },
    { month: 'July', day: 14 }, { month: 'July', day: 16 },
    { month: 'August', day: 14 }, { month: 'August', day: 15 }, { month: 'August', day: 17 }
  ];

  const isEliminated = (month: string, day: number) => {
    if (step >= 1 && (month === 'May' || month === 'June')) return true;
    if (step >= 2 && day === 14) return true;
    if (step >= 3 && month === 'August') return true;
    return false;
  };

  const isAnswer = (month: string, day: number) => {
    return step === 3 && month === 'July' && day === 16;
  };

  const stepsInfo = [
    { title: t('cherylsBirthday.step0', '初始狀態'), quote: '', explain: '', speaker: '' },
    { title: t('cherylsBirthday.step1', '步驟 1'), quote: t('cherylsBirthday.step1Quote'), explain: t('cherylsBirthday.step1Explain'), speaker: 'Albert' },
    { title: t('cherylsBirthday.step2', '步驟 2'), quote: t('cherylsBirthday.step2Quote'), explain: t('cherylsBirthday.step2Explain'), speaker: 'Bernard' },
    { title: t('cherylsBirthday.step3', '步驟 3'), quote: t('cherylsBirthday.step3Quote'), explain: t('cherylsBirthday.step3Explain'), speaker: 'Albert' }
  ];

  const currentStepInfo = stepsInfo[step];

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      {/* 標題區 */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          {t('cherylsBirthday.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('cherylsBirthday.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* 左側：邏輯對話控制台 */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* 💡 新增：核心前提情報卡 */}
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2">
              <UserSearch className="w-5 h-5" />
              {t('cherylsBirthday.premiseTitle')}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                  {t('cherylsBirthday.premiseAlbert')}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                  {t('cherylsBirthday.premiseBernard')}
                </span>
              </div>
            </div>
          </div>

          {/* 執行區塊 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col flex-grow">
            <div className="mb-6 flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-blue-500" />
                {currentStepInfo.title}
              </h3>
              <span className="text-sm font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-3 py-1 rounded-full">
                Step {step}/3
              </span>
            </div>

            <div className="flex-grow">
              {step > 0 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50 relative">
                    <div className="absolute -left-3 top-6 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-blue-50 dark:border-r-blue-900/20 border-b-[10px] border-b-transparent"></div>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide flex items-center gap-2">
                      {currentStepInfo.speaker}
                    </p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {currentStepInfo.quote}
                    </p>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-200 dark:border-yellow-900/30">
                    <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">
                      {currentStepInfo.explain}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 space-y-4 py-6">
                  <CalendarCheck className="w-16 h-16 opacity-20" />
                  <p className="text-center font-medium">請詳閱上方情報後，點擊下方按鈕開始推理</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              {step < 3 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
                >
                  {t('cherylsBirthday.nextStep', '執行此步驟')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => setStep(0)}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all active:scale-[0.98]"
                >
                  <RotateCcw className="w-5 h-5" />
                  {t('cherylsBirthday.reset', '重新挑戰')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 右側：日期矩陣 (保留原有的酷炫動畫) */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-max">
          {dates.map((date) => {
            const eliminated = isEliminated(date.month, date.day);
            const answer = isAnswer(date.month, date.day);
            
            return (
              <div
                key={`${date.month}-${date.day}`}
                className={`relative p-6 rounded-3xl border-2 transition-all duration-700 flex flex-col items-center justify-center
                  ${answer 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 shadow-[0_0_30px_rgba(34,197,94,0.3)] scale-105 z-10' 
                    : eliminated
                      ? 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 opacity-40 grayscale scale-95'
                      : 'border-blue-100 dark:border-blue-900/50 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1'
                  }
                `}
              >
                <div className={`text-sm font-bold uppercase tracking-widest mb-2 transition-colors duration-500
                  ${answer ? 'text-green-600 dark:text-green-400' 
                    : eliminated ? 'text-gray-400' : 'text-blue-500 dark:text-blue-400'}
                `}>
                  {t(`cherylsBirthday.months.${date.month}`, date.month)}
                </div>
                <div className="relative">
                  <div className={`text-5xl font-black transition-colors duration-500 
                    ${answer ? 'text-green-600 dark:text-green-400' 
                      : eliminated ? 'text-gray-400' : 'text-gray-900 dark:text-white'}
                  `}>
                    {date.day}
                  </div>
                  {eliminated && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-[-20%] right-[-20%] h-1.5 bg-red-500 rounded-full rotate-[-15deg] animate-in zoom-in duration-300"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}