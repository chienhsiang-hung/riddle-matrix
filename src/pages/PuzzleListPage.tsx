'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function PuzzleListPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900 dark:text-white">
        {t('nav.puzzles')}
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* 蒙提霍爾 */}
        <Link href="/puzzles/monty-hall" className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all">
          <div className="text-4xl mb-4">🚪</div>
          <h2 className="text-2xl font-bold mb-2">{t('montyHall.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {t('montyHall.description').slice(0, 60)}...
          </p>
          <span className="text-blue-600 dark:text-blue-400 font-bold">Challenge →</span>
        </Link>
        
        {/* 雪柔的生日 */}
        <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-4 opacity-50">📅</div>
          <h2 className="text-2xl font-bold mb-2 opacity-50">{t('home.puzzle1.title')}</h2>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Coming Soon...</p>
        </div>
      </div>
    </div>
  );
}
