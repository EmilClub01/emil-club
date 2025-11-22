"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

// Sub-componente Vinilo (interno para mantener orden)
const Vinyl3D = ({ isPlaying, onClick }) => (
  <motion.div
    className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer group perspective-1000"
    onClick={onClick}
    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
  >
    <motion.div
      animate={{ rotate: isPlaying ? 360 : 0 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear", playState: isPlaying ? "running" : "paused" }}
      className="w-full h-full rounded-full bg-black border-4 border-[#111] shadow-[0_0_40px_rgba(204,255,0,0.3)] flex items-center justify-center relative z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[repeating-radial-gradient(#111_0,#111_2px,#222_3px)] opacity-50"></div>
      <div className="w-1/3 h-1/3 bg-[#ccff00] rounded-full flex items-center justify-center relative z-20">
        <div className="w-3 h-3 bg-black rounded-full"></div>
      </div>
    </motion.div>
  </motion.div>
);

export default function Hero({ isPlaying, setIsPlaying, onScrollToForm }) {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">

      {/* FONDO IMAGEN/VIDEO ANIMADO */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40 z-10"></div>
        <motion.img
          initial={{ scale: 1 }} animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop"
          alt="Concert Background" className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* TEXTO GIGANTE DE FONDO */}
      <motion.div style={{ y: yHero }} className="absolute inset-0 flex items-center justify-center select-none opacity-20 pointer-events-none z-0">
        <h1 className="text-[25vw] font-black text-white leading-none tracking-tighter mix-blend-overlay">EMIL</h1>
      </motion.div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 w-full max-w-7xl">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#ccff00] rounded-full text-[#ccff00] font-mono text-xs uppercase tracking-widest bg-black/50 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#ccff00] rounded-full animate-ping"></span> SYSTEM ONLINE V2.0
          </div>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9]">
            Rompe <br /><span className="text-transparent stroke-text" style={{ WebkitTextStroke: "2px white" }}>La Norma</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-lg">
            Únete a Emil Club. Accede a contenido encriptado, preventas exclusivas y sube de rango en el leaderboard global.
          </p>

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button onClick={onScrollToForm} className="bg-[#ccff00] text-black px-8 py-4 font-bold text-lg hover:bg-white transition-colors">
              UNIRSE AHORA
            </button>
            <div className="relative group">
              <div className="absolute -top-3 -right-2 bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce z-20">
                +50 XP DIARIOS
              </div>
              <button onClick={() => setIsPlaying(!isPlaying)} className="border border-white px-8 py-4 font-bold text-lg hover:bg-white hover:text-black transition-colors flex items-center gap-2 backdrop-blur-sm bg-black/20 relative z-10">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? "PAUSA" : "PLAY DEMO"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <Vinyl3D isPlaying={isPlaying} onClick={() => setIsPlaying(!isPlaying)} />
        </div>
      </div>
    </section>
  );
}