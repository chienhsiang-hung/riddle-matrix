import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 啟用 SSG 靜態匯出
  basePath: '/riddle-matrix', // 配合 GitHub Pages 子路徑
  images: {
    unoptimized: true, // 靜態匯出時不支援 Next.js 預設的圖片優化
  },
};

export default nextConfig;
