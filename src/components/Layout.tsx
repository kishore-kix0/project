import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;