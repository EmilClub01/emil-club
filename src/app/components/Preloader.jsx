"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); 
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-[#ccff00]"
    >
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">Emil Club</h1>
      <div className="w-64 h-1 bg-[#111] overflow-hidden">
        <motion.div 
          className="h-full bg-[#ccff00]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-mono opacity-50">LOADING ASSETS... {progress}%</p>
    </motion.div>
  );
}