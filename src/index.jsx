import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const Root = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? 'dark bg-[#121212]' : 'bg-white'}`}>
      <App />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);