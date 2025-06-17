import { AnalysisResult } from './types';

// This is a mock implementation of sentiment analysis
// In a real application, this would use a proper NLP service

// Map of positive words and their scores
const positiveWords = new Map([
  ['good', 0.6],
  ['great', 0.8],
  ['excellent', 0.9],
  ['amazing', 0.9],
  ['awesome', 0.9],
  ['fantastic', 0.9],
  ['wonderful', 0.9],
  ['love', 0.8],
  ['like', 0.6],
  ['recommend', 0.7],
  ['best', 0.8],
  ['perfect', 0.9],
  ['happy', 0.7],
  ['easy', 0.6],
  ['reliable', 0.7],
  ['helpful', 0.7],
  ['improved', 0.7],
  ['improvement', 0.7],
  ['quality', 0.7],
  ['worth', 0.7],
  ['satisfied', 0.7],
  ['fast', 0.6],
  ['enjoy', 0.7],
  ['pleased', 0.7],
  ['well', 0.6],
  ['smooth', 0.6]
]);

// Map of negative words and their scores
const negativeWords = new Map([
  ['bad', 0.6],
  ['poor', 0.7],
  ['terrible', 0.9],
  ['horrible', 0.9],
  ['awful', 0.8],
  ['disappointing', 0.7],
  ['disappointed', 0.7],
  ['hate', 0.8],
  ['dislike', 0.6],
  ['frustrating', 0.7],
  ['difficult', 0.6],
  ['problem', 0.6],
  ['issue', 0.6],
  ['expensive', 0.6],
  ['overpriced', 0.7],
  ['waste', 0.7],
  ['broken', 0.7],
  ['fail', 0.7],
  ['failed', 0.7],
  ['failure', 0.7],
  ['slow', 0.6],
  ['annoying', 0.7],
  ['unhappy', 0.7],
  ['disappointed', 0.7],
  ['unreliable', 0.7],
  ['worst', 0.9]
]);

// Neutral words
const neutralWords = new Map([
  ['okay', 0.5],
  ['ok', 0.5],
  ['average', 0.5],
  ['normal', 0.5],
  ['fine', 0.5],
  ['standard', 0.5],
  ['usual', 0.5],
  ['typical', 0.5],
  ['expected', 0.5],
  ['moderate', 0.5],
  ['adequate', 0.5],
  ['acceptable', 0.5],
  ['fair', 0.5],
  ['reasonable', 0.5],
  ['common', 0.5],
  ['regular', 0.5],
  ['ordinary', 0.5],
  ['middle', 0.5]
]);

// Function to identify phrases containing sentiment words
const extractKeyPhrases = (text: string, wordMap: Map<string, number>, windowSize: number = 5): string[] => {
  const words = text.toLowerCase().split(/\s+/);
  const phrases: string[] = [];
  
  for (let i = 0; i < words.length; i++) {
    // Clean the word (remove punctuation)
    const cleanWord = words[i].replace(/[^\w]/g, '');
    
    if (wordMap.has(cleanWord)) {
      // Get words before and after the sentiment word
      const start = Math.max(0, i - windowSize);
      const end = Math.min(words.length, i + windowSize + 1);
      const phrase = words.slice(start, end).join(' ');
      phrases.push(phrase);
    }
  }
  
  // Remove duplicate phrases
  return [...new Set(phrases)];
};

export const analyzeSentiment = (text: string): AnalysisResult => {
  const words = text.toLowerCase().split(/\s+/);
  let positiveScore = 0;
  let negativeScore = 0;
  let matchedWords = 0;
  
  // Count words with sentiment and their scores
  for (const word of words) {
    // Clean the word (remove punctuation)
    const cleanWord = word.replace(/[^\w]/g, '');
    
    if (positiveWords.has(cleanWord)) {
      positiveScore += positiveWords.get(cleanWord) || 0;
      matchedWords++;
    } else if (negativeWords.has(cleanWord)) {
      negativeScore += negativeWords.get(cleanWord) || 0;
      matchedWords++;
    } else if (neutralWords.has(cleanWord)) {
      matchedWords++;
    }
  }
  
  // Calculate overall sentiment score (0-1 scale)
  let overallScore = 0.5; // Default neutral
  if (matchedWords > 0) {
    // Scale positive score by word count
    const posWeight = positiveScore / matchedWords;
    // Scale negative score by word count
    const negWeight = negativeScore / matchedWords;
    
    // Calculate weighted score (0-1 scale where 0 is negative, 1 is positive)
    if (posWeight > 0 || negWeight > 0) {
      overallScore = posWeight / (posWeight + negWeight);
    }
  }
  
  // Extract positive, negative, and neutral phrases
  const positiveKeyPhrases = extractKeyPhrases(text, positiveWords);
  const negativeKeyPhrases = extractKeyPhrases(text, negativeWords);
  const neutralKeyPhrases = extractKeyPhrases(text, neutralWords);
  
  // Calculate aspect scores
  const aspects = {
    positive: Math.min(1, positiveScore / Math.max(1, matchedWords)),
    negative: Math.min(1, negativeScore / Math.max(1, matchedWords)),
    neutral: Math.max(0, 1 - (positiveScore + negativeScore) / Math.max(1, matchedWords))
  };
  
  // Normalize aspect scores to sum to 1
  const sum = aspects.positive + aspects.negative + aspects.neutral;
  if (sum > 0) {
    aspects.positive /= sum;
    aspects.negative /= sum;
    aspects.neutral /= sum;
  }
  
  return {
    text,
    score: overallScore,
    aspects,
    keyPhrases: {
      positive: positiveKeyPhrases,
      neutral: neutralKeyPhrases,
      negative: negativeKeyPhrases
    },
    timestamp: new Date().toISOString()
  };
};