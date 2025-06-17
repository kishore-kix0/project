import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface SentimentGaugeProps {
  score: number;
}

const SentimentGauge: React.FC<SentimentGaugeProps> = ({ score }) => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Define gauge parameters
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.8 / 2;
    const startAngle = Math.PI * 0.8;
    const endAngle = Math.PI * 2.2;
    const arcLength = endAngle - startAngle;
    
    // Draw background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 15;
    ctx.strokeStyle = isDarkMode ? '#374151' : '#e5e7eb';
    ctx.stroke();
    
    // Create gradient for score arc
    const gradient = ctx.createLinearGradient(0, 0, size, 0);
    gradient.addColorStop(0, '#ef4444');    // Red for negative
    gradient.addColorStop(0.5, '#eab308');  // Yellow for neutral
    gradient.addColorStop(1, '#10b981');    // Green for positive
    
    // Draw score arc
    ctx.beginPath();
    ctx.arc(
      centerX, 
      centerY, 
      radius, 
      startAngle, 
      startAngle + (score * arcLength)
    );
    ctx.lineWidth = 15;
    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Draw center text
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = isDarkMode ? '#ffffff' : '#111827';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${(score * 100).toFixed(0)}%`, centerX, centerY);
    
    // Draw small label
    ctx.font = '14px sans-serif';
    ctx.fillStyle = isDarkMode ? '#9ca3af' : '#6b7280';
    ctx.fillText('sentiment score', centerX, centerY + 25);
    
  }, [score, isDarkMode]);
  
  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  );
};

export default SentimentGauge;