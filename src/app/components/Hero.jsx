"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero({ onScrollToForm }) {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden bg-[#050505]">

      {/* FONDO AMBIENTAL NEON */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#bc13fe] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00f3ff] rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* FONDO IMAGEN/VIDEO ANIMADO */}
      <div className="absolute inset-0 z-0 mix-blend-overlay opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10"></div>
        <motion.img
          initial={{ scale: 1 }} animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop"
          alt="Concert Background" className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* TEXTO GIGANTE DE FONDO */}
      <motion.div style={{ y: yHero }} className="absolute inset-0 flex items-center justify-center select-none opacity-10 pointer-events-none z-0">
        <h1 className="text-[25vw] font-black text-transparent stroke-text leading-none tracking-tighter" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)" }}>EMIL</h1>
      </motion.div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 w-full max-w-7xl">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#ccff00] rounded-full text-[#ccff00] font-mono text-xs uppercase tracking-widest bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(204,255,0,0.2)]">
            <span className="w-2 h-2 bg-[#ccff00] rounded-full animate-ping"></span> SYSTEM ONLINE V2.0
          </div>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600" style={{ WebkitTextStroke: "1px white" }}>¡Disfrútalo</span> <br />
            <span className="text-[#ccff00] drop-shadow-[0_0_20px_rgba(204,255,0,0.5)]">con flow!</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-lg font-light">
            Aquí podrás vivir experiencias exclusivas, ganar premios y compartir tus sueños junto a EMIL.
          </p>

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              onClick={onScrollToForm}
              className="bg-[#ccff00] text-black px-10 py-5 font-black text-xl hover:bg-[#b3e600] hover:scale-110 hover:shadow-[0_0_50px_rgba(204,255,0,0.8)] transition-all duration-300 clip-path-slant animate-pulse"
            >
              ¡Únete aquí!
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center relative">
          {/* Logo Glow Effect - Minimal Opacity */}
          <div className="absolute inset-0 bg-[#ccff00] blur-[100px] opacity-[0.10] rounded-full"></div>

          {/* Logo - Increased Size */}
          <motion.img
            src="/Logo EMIL CLUB.png"
            alt="Emil Club Logo"
            className="w-full max-w-2xl object-contain relative z-10 drop-shadow-[0_0_20px_rgba(204,255,0,0.1)]"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.05, dropShadow: "0 0 40px rgba(204,255,0,0.6)" }}
          />
        </div>
      </div>
    </section>
  );
}