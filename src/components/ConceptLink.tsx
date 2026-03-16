import { Link } from 'react-router-dom';

interface ConceptLinkProps {
  term: string;        // 顯示的專有名詞
  to: string;          // 導向的路由路徑
  tooltipText: string; // Hover 時顯示的簡介
}

export default function ConceptLink({ term, to, tooltipText }: ConceptLinkProps) {
  return (
    <span className="relative inline-block group cursor-pointer">
      <Link 
        to={to} 
        className="font-semibold text-blue-600 dark:text-blue-400 underline decoration-dashed underline-offset-4 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
      >
        {term}
      </Link>
      
      {/* Tooltip 彈窗 (預設隱藏，Hover 時顯示) */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 text-sm text-white bg-gray-800 dark:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-50">
        {tooltipText}
        {/* 小三角形 */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
      </div>
    </span>
  );
}