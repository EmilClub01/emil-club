"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA({ onJoin }) {
    return (
        <section className="py-32 px-6 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ccff00] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="inline-block mb-6 px-4 py-1 border border-[#ccff00] rounded-full bg-black/50 backdrop-blur-sm">
                    <span className="text-[#ccff00] text-xs font-mono font-bold tracking-[0.2em] animate-pulse">SISTEMA DE INSCRIPCIÓN ACTIVO</span>
                </div>

                <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-8 text-white leading-[0.85] px-4 py-2">
                    ÚNETE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-white pr-8">HOY</span>
                </h2>

                <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
                    Plataforma oficial de inscripción y gestión de fans.
                </p>

                <button
                    onClick={onJoin}
                    className="group relative inline-flex items-center gap-4 bg-[#ccff00] text-black px-12 py-6 text-2xl font-black uppercase tracking-wider hover:bg-white transition-all duration-300 skew-x-[-10deg] hover:skew-x-0 hover:scale-105 shadow-[0_0_40px_rgba(204,255,0,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]"
                >
                    <span className="skew-x-[10deg] group-hover:skew-x-0">Registrarse Ahora</span>
                    <ArrowRight className="skew-x-[10deg] group-hover:skew-x-0 transition-transform group-hover:translate-x-2" size={28} />
                </button>

                <div className="mt-12 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#ccff00] rounded-full"></div>
                        <span className="text-xs font-mono text-gray-400">NO CREDIT CARD</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#ccff00] rounded-full"></div>
                        <span className="text-xs font-mono text-gray-400">INSTANT ACCESS</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#ccff00] rounded-full"></div>
                        <span className="text-xs font-mono text-gray-400">ENCRYPTED DATA</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
