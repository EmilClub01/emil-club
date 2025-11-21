"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA({ onJoin }) {
    return (
        <section className="py-32 px-6 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ccff00] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 text-white">
                    ÚNETE HOY
                </h2>
                <p className="text-xl text-gray-400 mb-10">
                    El acceso es gratuito por tiempo limitado. Asegura tu ID de Agente antes de que cerremos las puertas.
                </p>

                <button
                    onClick={onJoin}
                    className="group relative inline-flex items-center gap-3 bg-[#ccff00] text-black px-10 py-5 text-xl font-black uppercase tracking-wider hover:bg-white transition-all duration-300 skew-x-[-10deg] hover:skew-x-0 hover:scale-105"
                >
                    <span className="skew-x-[10deg] group-hover:skew-x-0">Registrarse Ahora</span>
                    <ArrowRight className="skew-x-[10deg] group-hover:skew-x-0 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="mt-6 text-xs font-mono text-gray-600">
                    NO CREDIT CARD REQUIRED // INSTANT ACCESS
                </p>
            </div>
        </section>
    );
}
