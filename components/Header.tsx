
import React from 'react';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-primary-500 via-primary-600 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-xl shadow-lg z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            AI Grad School Assistant
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm text-white hover:bg-white/30 dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 hover:scale-105"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};
