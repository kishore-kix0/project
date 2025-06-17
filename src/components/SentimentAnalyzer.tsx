import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import SentimentInput from './SentimentInput';
import SentimentResult from './SentimentResult';
import SentimentHistory from './SentimentHistory';
import { analyzeSentiment } from '../utils/sentimentAnalysis';
import { AnalysisResult } from '../utils/types';

const SentimentAnalyzer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  const handleAnalyze = (text: string) => {
    if (!text.trim()) return;
    
    const result = analyzeSentiment(text);
    setCurrentAnalysis(result);
    
    // Add to history
    setHistory(prev => [result, ...prev].slice(0, 5)); // Keep only last 5 analyses
  };

  const handleSampleClick = (sample: string) => {
    handleAnalyze(sample);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className={`rounded-xl p-6 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className="text-2xl font-bold mb-6">Product Sentiment Analysis</h2>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Analyze customer reviews and feedback to understand sentiment toward your products.
          Enter text below to get started.
        </p>
        
        <SentimentInput onAnalyze={handleAnalyze} onSampleClick={handleSampleClick} />
      </div>
      
      {currentAnalysis && (
        <SentimentResult result={currentAnalysis} />
      )}
      
      {history.length > 0 && (
        <SentimentHistory history={history} />
      )}
    </div>
  );
};

export default SentimentAnalyzer;