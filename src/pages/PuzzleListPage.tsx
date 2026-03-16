import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function PuzzleListPage() {
  const { t } = useTranslation();

  const puzzles = [
    {
      id: 'monty-hall',
      title: t('montyHall.title', '蒙提霍爾問題'),
      desc: t('montyHall.description', '直覺告訴你換不換門機率都是一半？來跑個模擬器吧！'),
      icon: '🐐',
      path: '/puzzles/monty-hall',
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 'cheryls-birthday',
      title: t('home.puzzle1.title', '雪柔的生日'), // 借用首頁的翻譯
      desc: t('home.puzzle1.desc', '你能單憑幾句對話推導出真正的生日嗎？'),
      icon: '📅',
      path: '/puzzles/cheryls-birthday',
      color: 'from-blue-500 to-indigo-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
        {t('nav.puzzles', '挑戰謎題')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {puzzles.map((puzzle) => (
          <Link 
            key={puzzle.id}
            to={puzzle.path}
            className="group relative bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
          >
            {/* 卡片頂部漸層裝飾 */}
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${puzzle.color}`}></div>
            
            <div className="text-5xl mb-6">{puzzle.icon}</div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
              {puzzle.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              {puzzle.desc}
            </p>
            
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 mt-auto">
              <Play className="w-4 h-4" /> 開始挑戰
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}