import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('isDark');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [colorTheme, setColorTheme] = useState(() => {
    return localStorage.getItem('colorTheme') || 'default';
  });

  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);
    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [colorTheme]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
