import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import SentimentAnalyzer from './components/SentimentAnalyzer';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <SentimentAnalyzer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;