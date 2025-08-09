import { useSelector } from 'react-redux';
import './App.css'
import Navbar from './components/layout/Navbar'
import { useEffect, useState } from 'react';

function App() {

   const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      root.classList.add(systemTheme ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <>
      <Navbar/>
    </>
  )
}

export default App
