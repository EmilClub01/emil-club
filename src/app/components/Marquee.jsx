"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Marquee() {
  return (
    <div className="bg-[#ccff00] py-4 overflow-hidden transform -rotate-1 border-y-4 border-black relative z-20 flex">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-4xl font-black text-black px-8">
            Únete a la CAUSA +++ Acceso GRATIS +++ Piola de Flow Remix +++
          </span>
        ))}
      </motion.div>
    </div>
  );
}