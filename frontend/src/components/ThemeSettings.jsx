import React, { useState } from 'react';
import { Moon, Sun, Palette, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeSettings() {
  const { isDark, toggleDarkMode, colorTheme, setColorTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'default', name: 'Eco Green', colorClass: 'bg-green-500' },
    { id: 'ocean', name: 'Ocean Blue', colorClass: 'bg-blue-500' },
    { id: 'sunset', name: 'Sunset Orange', colorClass: 'bg-orange-500' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
        title="Theme Settings"
      >
        <Palette className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 z-50 animate-in fade-in slide-in-from-top-2">
          
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDark ? 'bg-eco-500' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Color Theme</span>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setColorTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${colorTheme === t.id ? 'bg-eco-50 text-eco-700 dark:bg-eco-900/30 dark:text-eco-400 font-medium' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${t.colorClass}`}></div>
                  <span>{t.name}</span>
                </div>
                {colorTheme === t.id && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
