'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Settings2, Play, Trophy, XCircle, Code, Info, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext'; // 確保這裡對應你的 ThemeContext 匯出

// CodeMirror 相關套件
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { githubLight } from '@uiw/codemirror-theme-github';

// 宣告 Pyodide 在 window 上的型別
declare global {
  interface Window {
    loadPyodide: any;
    pyodide: any;
  }
}

interface SimulationResult {
  wins: number;
  losses: number;
  run: boolean;
}

type CodeLanguage = 'javascript' | 'python';

export default function MontyHallPuzzle() {
  const { t } = useTranslation();
  // 取得全域的深淺色主題 (若你的 hook 回傳結構不同請稍微調整)
  const { theme } = useTheme(); 
  
  const [doors, setDoors] = useState<number>(3);
  const [trials, setTrials] = useState<number>(1000);
  const [switchDoor, setSwitchDoor] = useState<boolean>(true);
  const [results, setResults] = useState<SimulationResult>({ wins: 0, losses: 0, run: false });

  // 程式碼沙盒狀態
  const [codeLang, setCodeLang] = useState<CodeLanguage>('javascript');
  const [codeOutput, setCodeOutput] = useState<string>('');
  const [isRunningCode, setIsRunningCode] = useState(false);

  // 根據多國語系動態產生預設的程式碼字串
  const getJsDefault = () => `// ${t('montyHall.code.jsComment1')}
const trials = 1000;
const doors = 3;
const switchDoor = true;

let wins = 0;
let losses = 0;

for (let i = 0; i < trials; i++) {
  const carDoor = Math.floor(Math.random() * doors);
  const initialPick = Math.floor(Math.random() * doors);

  if (switchDoor) {
    if (initialPick !== carDoor) wins++;
    else losses++;
  } else {
    if (initialPick === carDoor) wins++;
    else losses++;
  }
}

// ${t('montyHall.code.jsComment2')}
return { 
  wins, 
  losses, 
  winRate: ((wins / trials) * 100).toFixed(1) + '%' 
};`;

  const getPyDefault = () => `# ${t('montyHall.code.pyComment1')}
import random
import json

trials = 1000
doors = 3
switch_door = True

wins = 0
losses = 0

for _ in range(trials):
    car_door = random.randint(0, doors - 1)
    initial_pick = random.randint(0, doors - 1)
    
    if switch_door:
        if initial_pick != car_door:
            wins += 1
        else:
            losses += 1
    else:
        if initial_pick == car_door:
            wins += 1
        else:
            losses += 1

# ${t('montyHall.code.pyComment2')}
# ${t('montyHall.code.pyComment3')}
json.dumps({
    "wins": wins,
    "losses": losses,
    "winRate": f"{(wins / trials) * 100:.1f}%"
})`;

  // 儲存兩種語言的使用者編輯內容，切換時才不會遺失
  const [customCodes, setCustomCodes] = useState({
    javascript: getJsDefault(),
    python: getPyDefault(),
  });

  // 當語系改變時，若使用者未曾修改過預設程式碼，則更新翻譯
  useEffect(() => {
    setCustomCodes((prev) => ({
      ...prev,
      javascript: getJsDefault(),
      python: getPyDefault(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const runSimulation = () => {
    let wins = 0;
    let losses = 0;
    for (let i = 0; i < trials; i++) {
      const carDoor = Math.floor(Math.random() * doors);
      const initialPick = Math.floor(Math.random() * doors);
      if (switchDoor) {
        if (initialPick !== carDoor) wins++;
        else losses++;
      } else {
        if (initialPick === carDoor) wins++;
        else losses++;
      }
    }
    setResults({ wins, losses, run: true });
  };

  const runCustomCode = async () => {
    setIsRunningCode(true);
    setCodeOutput('');
    const codeToRun = customCodes[codeLang];

    if (codeLang === 'javascript') {
      try {
        const executeUserCode = new Function(codeToRun);
        const result = executeUserCode();
        setCodeOutput(JSON.stringify(result, null, 2));
      } catch (error: any) {
        setCodeOutput(`JavaScript Error:\n${error.message}`);
      }
      setIsRunningCode(false);
    } 
    else if (codeLang === 'python') {
      try {
        // 動態載入 Pyodide (只有第一次需要)
        if (!window.loadPyodide) {
          setCodeOutput(t('montyHall.executingPy'));
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
        if (!window.pyodide) {
          window.pyodide = await window.loadPyodide();
        }
        // 執行 Python 程式碼
        const result = await window.pyodide.runPythonAsync(codeToRun);
        // 因為 Python 的 json.dumps 回傳字串，我們嘗試解析後再排版輸出
        try {
          const parsed = JSON.parse(result);
          setCodeOutput(JSON.stringify(parsed, null, 2));
        } catch {
          setCodeOutput(String(result));
        }
      } catch (error: any) {
        setCodeOutput(`Python Error:\n${error.message}`);
      }
      setIsRunningCode(false);
    }
  };

  const chartData = [
    { name: t('montyHall.wins'), value: results.wins, color: '#3b82f6' }, 
    { name: t('montyHall.losses'), value: results.losses, color: '#ef4444' }, 
  ];

  const winRate = results.run ? ((results.wins / trials) * 100).toFixed(1) : '0.0';
  const expectedWinRate = ((doors - 1) / doors * 100).toFixed(1);

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans space-y-8">
      {/* 標題與說明區 */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          {t('montyHall.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          {t('montyHall.description')}
        </p>
      </div>

      {/* 題目詳細解說卡片 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            {t('montyHall.explanationTitle')}
          </h2>
        </div>
        <p className="text-blue-800 dark:text-blue-200 leading-relaxed text-sm md:text-base">
          {t('montyHall.explanationText')}
        </p>
      </div>

      {/* 視覺化模擬器區塊 (保留原本的邏輯) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：控制面板 */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
            <Settings2 className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('montyHall.settings')}
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t('montyHall.doors')}
              </label>
              <input 
                type="number" 
                value={doors} 
                onChange={(e) => setDoors(Math.max(3, parseInt(e.target.value) || 3))}
                min="3"
                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {t('montyHall.doorsHint')} {expectedWinRate}%
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t('montyHall.trials')}
              </label>
              <input 
                type="number" 
                value={trials} 
                onChange={(e) => setTrials(Math.max(1, parseInt(e.target.value) || 1000))}
                min="1"
                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t('montyHall.strategy')}
              </label>
              <select 
                value={switchDoor ? 'switch' : 'stay'} 
                onChange={(e) => setSwitchDoor(e.target.value === 'switch')}
                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none cursor-pointer text-gray-900 dark:text-white"
              >
                <option value="switch">{t('montyHall.strategySwitch')}</option>
                <option value="stay">{t('montyHall.strategyStay')}</option>
              </select>
            </div>

            <button 
              onClick={runSimulation} 
              className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
            >
              <Play className="w-5 h-5 fill-current" />
              {t('montyHall.runBtn')}
            </button>
          </div>
        </div>

        {/* 右側：結果展示區 */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors flex flex-col justify-center items-center min-h-[400px]">
          {results.run ? (
            <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <h3 className="text-6xl font-black text-gray-900 dark:text-white mb-2">{winRate}%</h3>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-8 tracking-widest uppercase">
                {t('montyHall.winRate')}
              </p>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', border: 'none', 
                        backgroundColor: theme === 'dark' ? '#1f2937' : 'rgba(255, 255, 255, 0.9)', 
                        color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full flex justify-around mt-8 p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('montyHall.wins')}</p>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">{results.wins.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('montyHall.losses')}</p>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">{results.losses.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 dark:text-gray-600 flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-2 shadow-inner">
                <Play className="w-8 h-8 text-gray-300 dark:text-gray-700 ml-1" />
              </div>
              <p className="text-lg font-medium">{t('montyHall.idleTitle')}</p>
              <p className="text-sm">{t('montyHall.idleDesc')}</p>
            </div>
          )}
        </div>
      </div>

      {/* 支援主題切換與 Python 的程式碼編輯器沙盒區塊 */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-lg mt-8 border border-gray-200 dark:border-gray-800 transition-colors">
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e1e1e] transition-colors gap-4">
          
          {/* 左側：標題與語言切換 */}
          <div className="flex items-center gap-6 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <h3 className="font-bold text-gray-800 dark:text-gray-200">
                {t('montyHall.codeSandboxTitle', 'Code Your Own Logic')}
              </h3>
            </div>
            
            {/* 語言切換按鈕群 */}
            <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setCodeLang('javascript')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                  codeLang === 'javascript' 
                    ? 'bg-white dark:bg-[#2d2d2d] text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {t('montyHall.langJs', 'JavaScript')}
              </button>
              <button
                onClick={() => setCodeLang('python')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                  codeLang === 'python' 
                    ? 'bg-white dark:bg-[#2d2d2d] text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {t('montyHall.langPy', 'Python')}
              </button>
            </div>
          </div>

          <button
            onClick={runCustomCode}
            disabled={isRunningCode}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <Play className={`w-4 h-4 ${isRunningCode ? 'animate-pulse' : ''}`} />
            {isRunningCode ? 'Running...' : t('montyHall.runCodeBtn', 'Run Code')}
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* 左側：CodeMirror 編輯器 (隨系統深淺色主題自動切換) */}
          <div className="border-r border-gray-200 dark:border-gray-800">
            <CodeMirror
              value={customCodes[codeLang]}
              height="360px"
              theme={theme === 'dark' ? vscodeDark : githubLight}
              extensions={[codeLang === 'javascript' ? javascript({ jsx: false }) : python()]}
              onChange={(value) => {
                setCustomCodes(prev => ({ ...prev, [codeLang]: value }));
              }}
              className="text-sm border-none outline-none"
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                foldGutter: true,
              }}
            />
          </div>
          
          {/* 右側：終端機輸出區域 */}
          <div className="bg-gray-50 dark:bg-[#151515] p-6 h-[360px] overflow-y-auto transition-colors">
            <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-400">
              <Terminal className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-bold">
                {t('montyHall.codeOutput', 'Output:')}
              </span>
            </div>
            {codeOutput ? (
              <pre className="text-blue-600 dark:text-blue-400 font-mono text-sm whitespace-pre-wrap break-words">
                {codeOutput}
              </pre>
            ) : (
              <p className="text-gray-500 dark:text-gray-600 text-sm italic font-mono">
                {`// Click 'Run Code' to see the output...`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}