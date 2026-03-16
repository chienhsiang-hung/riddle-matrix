import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n/config';
import MontyHallPuzzle from './puzzles/monty-hall';

const PuzzleList = () => <div className="p-20 text-center text-4xl font-bold">謎題列表頁面 (Coming Soon)</div>;
const ConceptList = () => <div className="p-20 text-center text-4xl font-bold">知識節點頁面 (Coming Soon)</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { 
        path: 'puzzles', 
        children: [
          // 未來的雪柔生日放這裡
          { path: 'monty-hall', element: <MontyHallPuzzle /> } 
        ]
      },
      // ... 
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}