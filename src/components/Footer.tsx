import React from 'react';
import { Github, Twitter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`py-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm">
            © {new Date().getFullYear()} SentiPulse. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;