"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- CORRECCIÓN DE RUTAS (Usando ./ porque la carpeta está al lado) ---
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import BentoGrid from './components/BentoGrid';
import Leaderboard from './components/Leaderboard';
import SpotifyEmbed from './components/SpotifyEmbed';
import MissionControl from './components/MissionControl';
import Player from './components/Player';

import SocialProof from './components/SocialProof';
import FinalCTA from './components/FinalCTA';

export default function EmilClubPage() {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Efecto de cursor
  useEffect(() => {
    const updateMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  // Scroll suave al formulario
  const scrollToForm = () => {
    document.getElementById('mission-control')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden pb-24 selection:bg-[#ccff00] selection:text-black">

      {/* Background Noise */}
      <div className="fixed inset-0 z-20 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* Cursor */}
      <motion.div className="fixed w-6 h-6 border border-[#ccff00] rounded-full z-[100] pointer-events-none mix-blend-difference hidden md:block" animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }} transition={{ type: "spring", mass: 0.1 }} />

      {/* 1. HERO SECTION */}
      <Hero isPlaying={isPlaying} setIsPlaying={setIsPlaying} onScrollToForm={scrollToForm} />

      {/* 2. MARQUEE SECTION */}
      <Marquee />

      {/* 3. BENTO GRID (BENEFICIOS) */}
      <BentoGrid onJoin={scrollToForm} />

      {/* 4. LEADERBOARD */}
      <Leaderboard onJoin={scrollToForm} />

      {/* 4.5 SPOTIFY EMBED */}
      <SpotifyEmbed />

      {/* 5. SOCIAL PROOF (NUEVO BLOQUE 4) */}
      <SocialProof />

      {/* 6. MISSION CONTROL (EL CEREBRO) */}
      <MissionControl />

      {/* 7. FINAL CTA (NUEVO BLOQUE 5) */}
      <FinalCTA onJoin={scrollToForm} />

      {/* 8. PLAYER */}
      <Player isPlaying={isPlaying} togglePlay={() => setIsPlaying(!isPlaying)} />

      <footer className="text-center py-10 text-gray-600 text-xs font-mono border-t border-[#111] mt-20">EMIL CLUB SYSTEM V6.0 // PRODUCTION READY</footer>
    </div>
  );
}