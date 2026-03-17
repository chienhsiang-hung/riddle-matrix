'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Play } from 'lucide-react';

export default function PuzzleListPage() {
  const { t } = useTranslation();

  // 謎題清單資料
  const puzzles = [
    {
      id: 'cheryls-birthday',
      title: t('cherylsBirthday.title', '雪柔的生日'),
      desc: t('cherylsBirthday.description', '艾伯特和貝爾納剛認識雪柔，他們想知道她的生日。這是一道經典的邏輯推導題...'),
      icon: '📅',
      path: '/puzzles/cheryls-birthday',
      color: 'from-blue-500 to-indigo-400',
      tag: 'Logic'
    },
    {
      id: 'monty-hall',
      title: t('montyHall.title', '蒙提霍爾問題'),
      desc: t('montyHall.description', '直覺告訴你換不換門機率都是一半？透過設定下方的參數並執行模擬揭曉真相！'),
      icon: '🐐',
      path: '/puzzles/monty-hall',
      color: 'from-green-500 to-emerald-400',
      tag: 'Probability'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-up">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
        {t('nav.puzzles', '挑戰謎題')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {puzzles.map((puzzle) => (
          <Link 
            key={puzzle.id}
            href={puzzle.path}
            className="group relative bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
          >
            {/* 卡片頂部漸層裝飾 */}
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${puzzle.color}`}></div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {puzzle.icon}
              </div>
              <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {puzzle.tag}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
              {puzzle.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              {puzzle.desc}
            </p>
            
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 mt-auto group-hover:gap-3 transition-all">
              <Play className="w-4 h-4 fill-current" /> 開始挑戰
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}