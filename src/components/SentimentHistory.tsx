import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { AnalysisResult } from '../utils/types';
import { CheckCircle, Info, XCircle } from 'lucide-react';

interface SentimentHistoryProps {
  history: AnalysisResult[];
}

const SentimentHistory: React.FC<SentimentHistoryProps> = ({ history }) => {
  const { isDarkMode } = useTheme();
  
  const getSentimentIcon = (score: number) => {
    if (score >= 0.6) return <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />;
    if (score >= 0.4) return <Info className="w-5 h-5 text-yellow-500 flex-shrink-0" />;
    return <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />;
  };
  
  const getSentimentBadge = (score: number) => {
    if (score >= 0.6) return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
        Positive
      </span>
    );
    if (score >= 0.4) return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
        Neutral
      </span>
    );
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
        Negative
      </span>
    );
  };

  // Format text to a reasonable length for display
  const formatText = (text: string) => {
    if (text.length > 100) {
      return text.substring(0, 100) + '...';
    }
    return text;
  };
  
  return (
    <div className={`rounded-xl p-6 transition-colors duration-300 animate-slideUp ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-lg`}>
      <h2 className="text-xl font-bold mb-6">Recent Analyses</h2>
      
      <div className="space-y-4">
        {history.map((item, index) => (
          <div 
            key={index}
            className={`rounded-lg p-4 transition-colors hover:bg-opacity-50 ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-3">
                {getSentimentIcon(item.score)}
                <div>
                  <p className={`text-sm mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {formatText(item.text)}
                  </p>
                  <div className="flex items-center gap-3">
                    {getSentimentBadge(item.score)}
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Score: {(item.score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentimentHistory;