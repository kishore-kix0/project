import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { AnalysisResult } from '../utils/types';

interface SentimentKeyPhrasesProps {
  result: AnalysisResult;
}

const SentimentKeyPhrases: React.FC<SentimentKeyPhrasesProps> = ({ result }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Key Phrases
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-lg p-4 ${
          isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
        }`}>
          <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Positive</h4>
          {result.keyPhrases.positive.length > 0 ? (
            <ul className="space-y-1">
              {result.keyPhrases.positive.map((phrase, index) => (
                <li key={index} className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  • {phrase}
                </li>
              ))}
            </ul>
          ) : (
            <p className={`text-sm italic ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No positive phrases detected
            </p>
          )}
        </div>
        
        <div className={`rounded-lg p-4 ${
          isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
        }`}>
          <h4 className="font-medium text-yellow-600 dark:text-yellow-400 mb-2">Neutral</h4>
          {result.keyPhrases.neutral.length > 0 ? (
            <ul className="space-y-1">
              {result.keyPhrases.neutral.map((phrase, index) => (
                <li key={index} className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  • {phrase}
                </li>
              ))}
            </ul>
          ) : (
            <p className={`text-sm italic ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No neutral phrases detected
            </p>
          )}
        </div>
        
        <div className={`rounded-lg p-4 ${
          isDarkMode ? 'bg-red-900/20' : 'bg-red-50'
        }`}>
          <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Negative</h4>
          {result.keyPhrases.negative.length > 0 ? (
            <ul className="space-y-1">
              {result.keyPhrases.negative.map((phrase, index) => (
                <li key={index} className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  • {phrase}
                </li>
              ))}
            </ul>
          ) : (
            <p className={`text-sm italic ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No negative phrases detected
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentimentKeyPhrases;