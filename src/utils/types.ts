export interface AnalysisResult {
  text: string;
  score: number;
  aspects: {
    positive: number;
    neutral: number;
    negative: number;
  };
  keyPhrases: {
    positive: string[];
    neutral: string[];
    negative: string[];
  };
  timestamp: string;
}