"use client";
import React from 'react';
import { Globe, Users } from 'lucide-react';

export default function SocialProof() {
    return (
        <section className="py-20 border-y border-white/10 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <div className="mb-12">
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 text-white">
                        Desde <span className="text-[#ccff00]">Latinoamérica</span> <br /> al Mundo
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Emil Club no tiene fronteras. Conectamos a los verdaderos fans en una sola frecuencia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Stat 1 */}
                    <div className="p-6 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <div className="flex justify-center mb-4 text-[#ccff00]">
                            <Users size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-1">+15,000</h3>
                        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Fans Registrados</p>
                        <p className="text-xs text-gray-500 mt-2">México, Argentina, España, Colombia...</p>
                    </div>

                    {/* Stat 2 */}
                    <div className="p-6 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <div className="flex justify-center mb-4 text-[#ccff00]">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-1">24/7</h3>
                        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Comunidad Activa</p>
                        <p className="text-xs text-gray-500 mt-2">Foros privados y eventos digitales</p>
                    </div>

                    {/* Stat 3 - Nivel */}
                    <div className="p-6 border border-[#ccff00]/20 rounded-2xl bg-[#ccff00]/5 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[#ccff00] text-black text-[10px] font-bold px-2 py-1">NUEVO</div>
                        <div className="flex justify-center mb-4 text-[#ccff00]">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-1">VIP</h3>
                        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Nivel Fan vs VIP</p>
                        <p className="text-xs text-gray-500 mt-2">Escala tu nivel por interacción</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
