'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Settings2, Play, Trophy, XCircle, Code, Info, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// 引入 CodeMirror 相關套件
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

interface SimulationResult {
  wins: number;
  losses: number;
  run: boolean;
}

// 預設的互動程式碼
const DEFAULT_CODE = `// 你可以自由修改下方的變數來測試結果
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

// 回傳的結果會顯示在下方
return { 
  wins, 
  losses, 
  winRate: ((wins / trials) * 100).toFixed(1) + '%' 
};`;

export default function MontyHallPuzzle() {
  const { t } = useTranslation();
  const [doors, setDoors] = useState<number>(3);
  const [trials, setTrials] = useState<number>(1000);
  const [switchDoor, setSwitchDoor] = useState<boolean>(true);
  const [results, setResults] = useState<SimulationResult>({ wins: 0, losses: 0, run: false });

  // 程式碼沙盒狀態
  const [customCode, setCustomCode] = useState<string>(DEFAULT_CODE);
  const [codeOutput, setCodeOutput] = useState<string>('');

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

  const runCustomCode = () => {
    try {
      const executeUserCode = new Function(customCode);
      const result = executeUserCode();
      setCodeOutput(JSON.stringify(result, null, 2));
    } catch (error: any) {
      setCodeOutput(`Error: ${error.message}`);
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

      {/* 原本的 UI 模擬器區塊 */}
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
                        <Cell key={`cell-\${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', border: 'none', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#1f2937',
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

      {/* 程式碼編輯器沙盒區塊 */}
      <div className="bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-lg mt-8 border border-gray-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#1e1e1e]">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-gray-200">
              {t('montyHall.codeSandboxTitle', 'Code Your Own Logic (JavaScript)')}
            </h3>
          </div>
          <button
            onClick={runCustomCode}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <Play className="w-4 h-4" />
            {t('montyHall.runCodeBtn', 'Run Code')}
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* 左側：CodeMirror 編輯器 */}
          <div className="border-r border-gray-800">
            <CodeMirror
              value={customCode}
              height="320px"
              theme={vscodeDark}
              extensions={[javascript({ jsx: false })]}
              onChange={(value) => setCustomCode(value)}
              className="text-sm"
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                foldGutter: true,
              }}
            />
          </div>
          
          {/* 右側：終端機輸出區域 */}
          <div className="bg-[#151515] p-6 h-[320px] overflow-y-auto">
            <div className="flex items-center gap-2 mb-4 text-gray-500">
              <Terminal className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-bold">
                {t('montyHall.codeOutput', 'Output:')}
              </span>
            </div>
            {codeOutput ? (
              <pre className="text-blue-400 font-mono text-sm whitespace-pre-wrap break-words">
                {codeOutput}
              </pre>
            ) : (
              <p className="text-gray-600 text-sm italic font-mono">
                {"// Click 'Run Code' to see the output..."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}