import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/puzzles/**/*.{js,ts,jsx,tsx,mdx}", // 確保 puzzles 路徑也被掃描
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // 啟用 class-based dark mode
  plugins: [],
};
export default config;
