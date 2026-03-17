"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight, RotateCcw, Lightbulb, MessageCircle, UserSearch, 
  CheckCircle2, XCircle, Eye, MousePointerClick, User 
} from 'lucide-react';

export default function CherylsBirthdayPuzzle() {
  const { t } = useTranslation();
  
  // 模式切換：'challenge' (玩家自己玩) | 'solution' (看解答)
  const [mode, setMode] = useState<'challenge' | 'solution'>('challenge');
  
  // 玩家自己標記排除的日期 (儲存格式: "Month-Day")
  const [userEliminated, setUserEliminated] = useState<string[]>([]);
  // 驗證狀態
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // 解答模式的進度
  const [solutionStep, setSolutionStep] = useState(0);

  const dates = [
    { month: 'May', day: 15 }, { month: 'May', day: 16 }, { month: 'May', day: 19 },
    { month: 'June', day: 17 }, { month: 'June', day: 18 },
    { month: 'July', day: 14 }, { month: 'July', day: 16 },
    { month: 'August', day: 14 }, { month: 'August', day: 15 }, { month: 'August', day: 17 }
  ];

  // ---------------- 玩家挑戰模式邏輯 ----------------
  const toggleDate = (month: string, day: number) => {
    if (mode !== 'challenge') return;
    const id = `${month}-${day}`;
    setUserEliminated(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
    setVerifyStatus('idle'); // 只要重新點擊就重置驗證狀態
  };

  const verifyAnswer = () => {
    // 檢查是否排除了 9 個，且剩下的唯一一個是 July-16
    const leftDates = dates.filter(d => !userEliminated.includes(`${d.month}-${d.day}`));
    if (leftDates.length === 1 && leftDates[0].month === 'July' && leftDates[0].day === 16) {
      setVerifyStatus('success');
    } else {
      setVerifyStatus('error');
    }
  };

  // ---------------- 系統解答模式邏輯 ----------------
  const isSystemEliminated = (month: string, day: number) => {
    if (solutionStep >= 1 && (month === 'May' || month === 'June')) return true;
    if (solutionStep >= 2 && day === 14) return true;
    if (solutionStep >= 3 && month === 'August') return true;
    return false;
  };

  const isSystemAnswer = (month: string, day: number) => {
    return solutionStep === 3 && month === 'July' && day === 16;
  };

  const stepsInfo = [
    { title: t('cherylsBirthday.step0', '初始狀態'), quote: '', explain: '', speaker: '' },
    { title: t('cherylsBirthday.step1', '步驟 1'), quote: t('cherylsBirthday.step1Quote'), explain: t('cherylsBirthday.step1Explain'), speaker: 'Albert' },
    { title: t('cherylsBirthday.step2', '步驟 2'), quote: t('cherylsBirthday.step2Quote'), explain: t('cherylsBirthday.step2Explain'), speaker: 'Bernard' },
    { title: t('cherylsBirthday.step3', '步驟 3'), quote: t('cherylsBirthday.step3Quote'), explain: t('cherylsBirthday.step3Explain'), speaker: 'Albert' }
  ];

  const currentStepInfo = stepsInfo[solutionStep];

  // 2. 建立一個內部使用的 Avatar 元件，方便管理顏色
  const CharacterAvatar = ({ name }: { name: string }) => {
    const isAlbert = name === 'Albert';
    return (
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded-full ${
          isAlbert 
            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
            : 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400'
        }`}>
          <User className="w-4 h-4" />
        </div>
        <p className={`text-xs font-bold uppercase tracking-wide ${
          isAlbert ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'
        }`}>
          {name}
        </p>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          {t('cherylsBirthday.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('cherylsBirthday.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* 左側：控制台與對話 */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* 前提情報卡 */}
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2">
              <UserSearch className="w-5 h-5" />
              {t('cherylsBirthday.premiseTitle')}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{t('cherylsBirthday.premiseAlbert')}</span>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{t('cherylsBirthday.premiseBernard')}</span>
              </div>
            </div>
          </div>

          {/* 主要互動區 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col flex-grow relative overflow-hidden">
            
            {mode === 'challenge' ? (
              // --- 挑戰模式內容 ---
              <div className="flex flex-col h-full animate-in fade-in duration-500">
                {/* 💡 醒目的動畫操作提示 */}
                <div className="mb-6 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative p-4 bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-white/10 rounded-2xl flex items-start sm:items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex-shrink-0 animate-bounce">
                      <MousePointerClick className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base mb-0.5">
                        {t('cherylsBirthday.interactive.instruction').split('！')[0]}！
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {t('cherylsBirthday.interactive.instruction').split('！')[1]}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
                    <CharacterAvatar name="Albert" />
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{t('cherylsBirthday.step1Quote')}</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800/50">
                    <CharacterAvatar name="Bernard" />
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{t('cherylsBirthday.step2Quote')}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
                    <CharacterAvatar name="Albert" />
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{t('cherylsBirthday.step3Quote')}</p>
                  </div>
                </div>

                <p className="text-sm font-bold text-gray-500 mb-4">{t('cherylsBirthday.interactive.instruction')}</p>

                {verifyStatus === 'success' && (
                  <div className="mb-4 p-4 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 rounded-xl flex items-center gap-3 animate-in slide-in-from-bottom-2">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <span className="font-bold">{t('cherylsBirthday.interactive.success')}</span>
                  </div>
                )}

                {verifyStatus === 'error' && (
                  <div className="mb-4 p-4 bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 rounded-xl flex items-center gap-3 animate-in slide-in-from-bottom-2">
                    <XCircle className="w-6 h-6 shrink-0" />
                    <span className="font-bold">{t('cherylsBirthday.interactive.error')}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                  <button onClick={verifyAnswer} className="sm:col-span-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
                    <CheckCircle2 className="w-5 h-5" /> {t('cherylsBirthday.interactive.checkAnswer')}
                  </button>
                  <button onClick={() => { setUserEliminated([]); setVerifyStatus('idle'); }} className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl transition-all">
                    <RotateCcw className="w-4 h-4" />
                    {t('cherylsBirthday.interactive.reset')}
                  </button>
                  <button 
                    onClick={() => { setMode('solution'); setSolutionStep(0); }} 
                    className="w-full flex items-center justify-center gap-2 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:hover:bg-indigo-800/80 text-indigo-700 dark:text-indigo-300 font-bold py-3 px-4 rounded-xl transition-all w-full"
                  >
                    <Eye className="w-4 h-4 flex-shrink-0" /> {/* 加入 flex-shrink-0 防止圖示被擠壓 */}
                    <span className="text-sm sm:text-base break-words"> {/* 使用 span 包裹文字並調整手機端字體大小 */}
                      {t('cherylsBirthday.interactive.showSolution')}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              // --- 系統解答模式內容 (原有的 Step-by-Step) ---
              <div className="flex flex-col h-full animate-in fade-in duration-500">
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 sm:w-6 s:h-6 text-yellow-500" />
                    {currentStepInfo.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 px-3 py-1 rounded-full shrink-0">
                    Step {solutionStep}/3
                  </span>
                </div>

                <div className="flex-grow">
                  {solutionStep === 0 ? (
                    // 為 Step 0 增加一個引導視窗，避免畫面塌陷
                    <div className="flex flex-col items-center justify-center h-full py-10 text-center animate-in fade-in duration-500">
                      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full mb-4">
                        <Lightbulb className="w-8 h-8 text-indigo-500" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        {t('cherylsBirthday.step0Guide', '點擊下方按鈕開始逐步解析邏輯')}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/50 relative">
                        <CharacterAvatar name={currentStepInfo.speaker} />
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{currentStepInfo.quote}</p>
                      </div>
                      <div className="flex items-start gap-4 p-5 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-200 dark:border-yellow-900/30">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">{currentStepInfo.explain}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-3">
                  {solutionStep < 3 ? (
                    <button onClick={() => setSolutionStep(s => s + 1)} className="col-span-2 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-all">
                      {t('cherylsBirthday.interactive.nextSolutionStep')} <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button onClick={() => setSolutionStep(0)} className="col-span-2 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all">
                      <RotateCcw className="w-5 h-5" /> {t('cherylsBirthday.interactive.watchAgain')}
                    </button>
                  )}
                  <button onClick={() => setMode('challenge')} className="col-span-2 mt-2 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-bold py-2 transition-all">
                    {t('cherylsBirthday.interactive.backToChallenge')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 右側：日期矩陣 */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-max">
          {dates.map((date) => {
            const isEliminated = mode === 'challenge' 
              ? userEliminated.includes(`${date.month}-${date.day}`)
              : isSystemEliminated(date.month, date.day);
              
            const isAnswer = mode === 'solution' && isSystemAnswer(date.month, date.day);
            const isUserFinalPick = mode === 'challenge' && verifyStatus === 'success' && !isEliminated;

            return (
              <div
                key={`${date.month}-${date.day}`}
                onClick={() => toggleDate(date.month, date.day)}
                className={`relative p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center
                  ${mode === 'challenge' ? 'cursor-pointer hover:scale-105' : ''}
                  ${(isAnswer || isUserFinalPick)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 shadow-[0_0_30px_rgba(34,197,94,0.3)] scale-105 z-10' 
                    : isEliminated
                      ? 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 opacity-40 grayscale scale-95'
                      : 'border-blue-100 dark:border-blue-900/50 bg-white dark:bg-gray-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-500'
                  }
                `}
              >
                <div className={`text-sm font-bold uppercase tracking-widest mb-2 transition-colors duration-500
                  ${(isAnswer || isUserFinalPick) ? 'text-green-600 dark:text-green-400' : isEliminated ? 'text-gray-400' : 'text-blue-500 dark:text-blue-400'}
                `}>
                  {t(`cherylsBirthday.months.${date.month}`, date.month)}
                </div>
                <div className="relative">
                  <div className={`text-5xl font-black transition-colors duration-500 
                    ${(isAnswer || isUserFinalPick) ? 'text-green-600 dark:text-green-400' : isEliminated ? 'text-gray-400' : 'text-gray-900 dark:text-white'}
                  `}>
                    {date.day}
                  </div>
                  {/* 紅色刪除線動畫 */}
                  {isEliminated && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-[-20%] right-[-20%] h-1.5 bg-red-500 rounded-full rotate-[-15deg] animate-in zoom-in duration-200"></div>
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