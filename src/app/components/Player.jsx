"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Disc, SkipForward, Share2 } from 'lucide-react';

export default function Player({ isPlaying, togglePlay }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;

      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => console.error("Error al reproducir:", error));
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // --- SHARE ---
  const handleShare = async () => {
    const text = "Escuchando NO FAKE LOVE de EMIL. Únete a la resistencia: https://emil.club";
    if (navigator.share) {
      try { await navigator.share({ title: 'Emil Club Music', text, url: 'https://emil.club' }); } catch (e) { }
    } else {
      navigator.clipboard.writeText(text);
      alert("Link copiado al portapapeles.");
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 z-50 px-4 md:px-8 py-4 flex items-center justify-between shadow-2xl"
    >
      {/* IMPORTANTE: Asegúrate que demo.mp3 está en la carpeta public */}
      <audio
        ref={audioRef}
        src="/demo.mp3"
        loop
        preload="auto"
      />

      <div className="flex items-center gap-4 md:gap-6">
        <div className={`w-12 h-12 md:w-14 md:h-14 bg-[#ccff00] rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.3)] ${isPlaying ? 'animate-pulse' : ''}`}>
          <Disc size={24} className={`text-black ${isPlaying ? 'animate-spin' : ''}`} />
        </div>
        <div className="hidden md:block">
          <h3 className="text-white font-bold text-sm leading-tight">Piola De Flow Remix</h3>
          <p className="text-xs text-[#ccff00] font-mono">EMIL • PROD. SYSTEM</p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8 absolute left-1/2 -translate-x-1/2">
        <SkipForward size={28} className="text-gray-500 rotate-180 cursor-pointer hover:text-white transition-colors" />
        <button onClick={togglePlay} className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-white/20">
          {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" className="ml-1" size={24} />}
        </button>
        <SkipForward size={28} className="text-gray-500 cursor-pointer hover:text-white transition-colors" />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative group">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-[#ccff00] text-white px-4 py-2 rounded-full transition-all group-hover:text-[#ccff00]"
          >
            <Share2 size={18} />
            <span className="hidden md:inline font-bold text-sm">COMPARTIR</span>
          </button>
        </div>
        {/* Visualizador Fake - ALWAYS VISIBLE */}
        <div className="flex items-end gap-1 h-8">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: isPlaying ? [8, Math.random() * 32 + 5, 8] : 4 }}
              transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
              className="w-1 bg-[#ccff00] rounded-sm opacity-80"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}