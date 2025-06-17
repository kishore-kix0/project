import React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AnalysisResult } from '../utils/types';
import SentimentGauge from './SentimentGauge';
import SentimentKeyPhrases from './SentimentKeyPhrases';

interface SentimentResultProps {
  result: AnalysisResult;
}

const SentimentResult: React.FC<SentimentResultProps> = ({ result }) => {
  const { isDarkMode } = useTheme();
  
  const getSentimentColor = (score: number) => {
    if (score >= 0.6) return 'text-green-500';
    if (score >= 0.4) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSentimentIcon = (score: number) => {
    if (score >= 0.6) return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (score >= 0.4) return <Info className="w-6 h-6 text-yellow-500" />;
    return <XCircle className="w-6 h-6 text-red-500" />;
  };

  const getSentimentText = (score: number) => {
    if (score >= 0.8) return 'Very Positive';
    if (score >= 0.6) return 'Positive';
    if (score >= 0.4) return 'Neutral';
    if (score >= 0.2) return 'Negative';
    return 'Very Negative';
  };

  return (
    <div className={`rounded-xl p-6 transition-colors duration-300 animate-slideUp ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-lg space-y-6`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Analysis Results</h2>
        <div className="flex items-center space-x-2">
          {getSentimentIcon(result.score)}
          <span className={`font-medium ${getSentimentColor(result.score)}`}>
            {getSentimentText(result.score)}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Sentiment Score
          </h3>
          <div className="flex-1 flex items-center justify-center p-4">
            <SentimentGauge score={result.score} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Sentiment Breakdown
          </h3>
          <div className={`rounded-lg p-4 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Positive</span>
                <span className="font-medium">{(result.aspects.positive * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div 
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${result.aspects.positive * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Neutral</span>
                <span className="font-medium">{(result.aspects.neutral * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div 
                  className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${result.aspects.neutral * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Negative</span>
                <span className="font-medium">{(result.aspects.negative * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div 
                  className="bg-red-500 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${result.aspects.negative * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SentimentKeyPhrases result={result} />
      
      <div className={`text-sm rounded-lg p-4 flex items-start space-x-3 ${
        isDarkMode ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-50 text-blue-800'
      }`}>
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>
          This analysis is for demonstration purposes only and uses simulated data.
          In a production environment, it would utilize advanced NLP algorithms for accurate sentiment analysis.
        </p>
      </div>
    </div>
  );
};

export default SentimentResult;