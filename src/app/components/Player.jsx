"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Disc, SkipForward, Volume2 } from 'lucide-react';

export default function Player({ isPlaying, togglePlay }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      // Forzar volumen al 50% para evitar sustos pero asegurar que suene
      audioRef.current.volume = 0.5; 
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Reproduciendo audio...");
            })
            .catch(error => {
              console.error("Error al reproducir:", error);
              // Si el error es "NotAllowedError", es porque el navegador bloqueó el autoplay
              // y necesita un clic del usuario primero.
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <motion.div 
      initial={{ y: 100 }} 
      animate={{ y: 0 }} 
      className="fixed bottom-0 left-0 w-full bg-[#050505]/90 backdrop-blur-xl border-t border-white/10 z-50 px-6 py-3 flex items-center justify-between"
    >
      {/* IMPORTANTE: Asegúrate que demo.mp3 está en la carpeta public */}
      <audio ref={audioRef} src="/demo.mp3" loop preload="auto" />

      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 bg-[#ccff00] rounded-sm flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
            <Disc size={20} className={`text-black ${isPlaying ? 'animate-spin' : ''}`} />
        </div>
        <div className="hidden md:block">
            <h4 className="text-sm font-black text-white uppercase">NO FAKE LOVE</h4>
            <p className="text-xs text-[#ccff00] font-mono">EMIL • PROD. SYSTEM</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <SkipForward size={24} className="text-gray-500 rotate-180 cursor-pointer hover:text-white" />
        <button onClick={togglePlay} className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            {isPlaying ? <Pause fill="black" size={20} /> : <Play fill="black" className="ml-1" size={20} />}
        </button>
        <SkipForward size={24} className="text-gray-500 cursor-pointer hover:text-white" />
      </div>
      
      {/* Visualizador Fake */}
      <div className="hidden lg:flex items-end gap-1 h-8 ml-auto">
        {[...Array(8)].map((_, i) => (
            <motion.div 
                key={i}
                animate={{ height: isPlaying ? [8, Math.random() * 32 + 5, 8] : 4 }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                className="w-1 bg-[#ccff00] rounded-sm opacity-80"
            />
        ))}
      </div>
    </motion.div>
  );
}