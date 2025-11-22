"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Disc, SkipForward, Share2, CheckCircle, Music } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function Player({ isPlaying, togglePlay }) {
  const audioRef = useRef(null);
  const [xpEarned, setXpEarned] = useState(null); // 'listen' | 'share' | null
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Cargar email al montar para verificar identidad
    const storedEmail = localStorage.getItem('emil_user_email');
    if (storedEmail) setEmail(storedEmail);
  }, []);

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

  // --- XP HELPER ---
  const awardXP = async (amount, type) => {
    const userEmail = localStorage.getItem('emil_user_email');
    if (!userEmail) return;

    const storageKey = `emil_xp_last_${type}_date`;
    const lastDate = localStorage.getItem(storageKey);
    const today = new Date().toISOString().split('T')[0];

    if (lastDate === today) {
      console.log(`XP limit reached for ${type} today.`);
      return;
    }

    try {
      console.log(`Attempting to award ${amount} XP to:`, userEmail); // DEBUG

      // 1. Get current XP (Allow multiple rows)
      const { data: userData, error: fetchError } = await supabase
        .from('fans')
        .select('xp')
        .eq('email', userEmail);

      if (fetchError || !userData || userData.length === 0) {
        console.error("User not found for XP award. Error:", JSON.stringify(fetchError), "User:", userData);
        return;
      }

      // 2. Calculate new XP (Take the max if duplicates exist to be safe)
      const currentXP = Math.max(...userData.map(u => u.xp || 0));
      const newXP = currentXP + amount;

      // 3. Update XP (Update ALL records with this email to keep them in sync)
      const { error: updateError } = await supabase
        .from('fans')
        .update({ xp: newXP })
        .eq('email', userEmail);

      if (updateError) {
        console.error("Error updating XP:", updateError);
        return;
      }

      // 4. Success!
      localStorage.setItem(storageKey, today);
      setXpEarned({ type, amount });
      setTimeout(() => setXpEarned(null), 4000);

    } catch (err) {
      console.error("Unexpected error awarding XP:", err);
    }
  };

  // --- LISTEN XP ---
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    // Si lleva más de 30 segundos escuchando
    if (audioRef.current.currentTime > 30) {
      awardXP(50, 'listen');
    }
  };

  // --- SHARE XP ---
  const handleShare = async () => {
    // Intentar dar XP primero (optimista) o paralelo
    awardXP(100, 'share');

    const text = "Escuchando NO FAKE LOVE de EMIL. Únete a la resistencia: https://emil.club";
    if (navigator.share) {
      try { await navigator.share({ title: 'Emil Club Music', text, url: 'https://emil.club' }); } catch (e) { }
    } else {
      navigator.clipboard.writeText(text);
      alert("Link copiado al portapapeles. ¡Compártelo para ganar XP!");
    }
  };

  return (
    <>
      {/* TOAST NOTIFICATION - MEJORADO */}
      <AnimatePresence>
        {xpEarned && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[100] bg-[#ccff00] text-black px-8 py-4 rounded-2xl font-black flex items-center gap-4 shadow-[0_0_30px_rgba(204,255,0,0.6)] border-2 border-white"
          >
            <div className="bg-black text-[#ccff00] p-2 rounded-full">
              {xpEarned.type === 'listen' ? <Music size={24} /> : <Share2 size={24} />}
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-widest mb-1">Misión Completada</div>
              <div className="text-2xl leading-none">+{xpEarned.amount} XP GANADOS</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          onTimeUpdate={handleTimeUpdate}
        />

        <div className="flex items-center gap-4 md:gap-6">
          <div className={`w-12 h-12 md:w-14 md:h-14 bg-[#ccff00] rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.3)] ${isPlaying ? 'animate-pulse' : ''}`}>
            <Disc size={24} className={`text-black ${isPlaying ? 'animate-spin' : ''}`} />
          </div>
          <div className="hidden md:block">
            <h4 className="text-base font-black text-white uppercase tracking-wide">NO FAKE LOVE</h4>
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
            {/* Badge más visible */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#ccff00] text-black text-xs font-black px-3 py-1 rounded-full opacity-100 animate-bounce shadow-lg whitespace-nowrap">
              +100 XP
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ccff00] rotate-45"></div>
            </div>

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
    </>
  );
}