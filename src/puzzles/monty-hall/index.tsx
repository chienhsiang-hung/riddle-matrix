import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Settings2, Play, Trophy, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 引入翻譯 Hook

interface SimulationResult {
  wins: number;
  losses: number;
  run: boolean;
}

export default function MontyHallPuzzle() {
  const { t } = useTranslation(); // 取得 t 函式
  const [doors, setDoors] = useState<number>(3);
  const [trials, setTrials] = useState<number>(1000);
  const [switchDoor, setSwitchDoor] = useState<boolean>(true);
  const [results, setResults] = useState<SimulationResult>({ wins: 0, losses: 0, run: false });

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

  const chartData = [
    { name: t('montyHall.wins'), value: results.wins, color: '#3b82f6' }, 
    { name: t('montyHall.losses'), value: results.losses, color: '#ef4444' }, 
  ];

  const winRate = results.run ? ((results.wins / trials) * 100).toFixed(1) : '0.0';
  const expectedWinRate = ((doors - 1) / doors * 100).toFixed(1);

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      {/* 標題區 */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          {t('montyHall.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('montyHall.description')}
        </p>
      </div>

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
                        borderRadius: '12px', 
                        border: 'none', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#1f2937',
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
    </div>
  );
}