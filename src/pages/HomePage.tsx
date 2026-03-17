'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

interface PuzzleCardProps {
  icon: string;
  title: string;
  desc: string;
  to: string;
  tag: string;
}

// 封裝謎題卡片元件
function PuzzleCard({ icon, title, desc, to, tag }: PuzzleCardProps) {
  return (
    <Link href={to} className="group relative block p-8 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:border-blue-900 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      {/* 背景裝飾幾何圖形 (滑鼠移上去會變亮) */}
      <div className="absolute -bottom-6 -right-6 text-9xl opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 dark:group-hover:opacity-20 transition-all group-hover:rotate-12 group-hover:scale-110 duration-700">
        {icon}
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-4xl group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <span className="px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            {tag}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 flex-grow">
          {desc}
        </p>
        
        <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:gap-4 transition-all">
          <span>{tag.includes('Logic') ? 'Solve Mystery' : 'Take Challenge'}</span>
          <span className="text-xl">→</span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950">
      
      {/* 背景裝飾 - 多重動態光影 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-400/10 dark:bg-indigo-600/5 rounded-full blur-[100px]"></div>

      {/* --- Hero Section --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-32 text-center">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-widest uppercase animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Explore the Wonders of Mind
        </div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8">
          <span className="block text-gray-900 dark:text-white">
            {t('home.heroTitle').split(' ')[0]}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
            {t('home.heroTitle').split(' ').slice(1).join(' ')}
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed">
          {t('home.heroSubtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/puzzles" 
            className="w-full sm:w-auto px-10 py-5 rounded-2xl text-lg font-bold bg-gray-900 text-white dark:bg-blue-600 dark:hover:bg-blue-500 hover:bg-gray-800 transition-all shadow-2xl shadow-blue-500/20 active:scale-95"
          >
            {t('home.startExploring')}
          </Link>
          <Link 
            href="/concepts" 
            className="w-full sm:w-auto px-10 py-5 rounded-2xl text-lg font-bold bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95"
          >
            Learn Concepts
          </Link>
        </div>
      </section>

      {/* --- Featured Puzzles --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              {t('home.featuredPuzzles')}
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"></div>
          </div>
          <Link href="/puzzles" className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-2">
            View all puzzles <span>→</span>
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
          <PuzzleCard 
            icon="📅"
            title={t('home.puzzle1.title')}
            desc={t('home.puzzle1.desc')}
            to="/puzzles/cheryls-birthday"
            tag="Logic Deduction"
          />
          
          <PuzzleCard 
            icon="🎂"
            title={t('home.puzzle2.title')}
            desc={t('home.puzzle2.desc')}
            to="/puzzles/birthday-paradox"
            tag="Probability"
          />
        </div>
      </section>
    </div>
  );
}
