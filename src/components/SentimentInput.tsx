import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SentimentInputProps {
  onAnalyze: (text: string) => void;
  onSampleClick: (sample: string) => void;
}

const SAMPLE_REVIEWS = [
  "I absolutely love this product! It works exactly as described and has improved my workflow significantly.",
  "This product is okay, but it has some issues. The battery life is shorter than advertised and it sometimes freezes.",
  "The worst purchase I've ever made. It broke after two days and customer service was unhelpful."
];

const SentimentInput: React.FC<SentimentInputProps> = ({ onAnalyze, onSampleClick }) => {
  const { isDarkMode } = useTheme();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(text);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className={`w-full p-4 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-gray-50 border-gray-300 text-gray-900'
          }`}
          rows={5}
          placeholder="Enter product review or feedback to analyze sentiment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!text.trim()}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !text.trim() 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-md'
            } ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <span>Analyze</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
      
      <div className="space-y-3">
        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Or try a sample:
        </h3>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_REVIEWS.map((sample, index) => (
            <button
              key={index}
              onClick={() => onSampleClick(sample)}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Sample {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentInput;