"use client";
import React from 'react';
import { Play } from 'lucide-react';

// Sub-componente interno para imágenes
const ArtImage = ({ src, className, overlay = false }) => (
    <div className={`relative overflow-hidden group h-full w-full ${className}`}>
        {overlay && <div className="absolute inset-0 bg-[#ccff00] mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10"></div>}
        <img src={src} alt="Visual" className="object-cover w-full h-full grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-700 ease-out" />
    </div>
);

export default function BentoGrid({ onJoin }) {
    return (
        <section className="py-32 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[350px]">

                <div className="bg-[#0a0a0a] border border-white/10 p-10 flex flex-col justify-center">
                    <h3 className="text-5xl font-black uppercase leading-none mb-4">
                        Más que <br /><span className="text-[#ccff00]">Música.</span>
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Únete al círculo interno. Acceso a contenido raw, preventas exclusivas y una comunidad que entiende el código.
                    </p>
                </div>

                <div className="md:col-span-2 relative">
                    <ArtImage src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop" overlay={true} />
                    <div className="absolute top-4 right-4 w-12 h-12 border border-[#ccff00] rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-ping"></div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <ArtImage src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop" />
                </div>

                <div className="bg-[#ccff00] text-black p-8 flex flex-col justify-between">
                    <h3 className="text-3xl font-black uppercase">Tu Acceso</h3>
                    <ul className="space-y-3 font-bold font-mono text-xs">
                        <li className="flex items-center gap-2 border-b border-black/20 pb-2"><Play size={10} fill="black" /> PREVENTA + ACCESO ANTICIPADO</li>
                        <li className="flex items-center gap-2 border-b border-black/20 pb-2"><Play size={10} fill="black" /> CONTENIDO EXCLUSIVO DETRÁS DE CÁMARAS</li>
                        <li className="flex items-center gap-2 border-b border-black/20 pb-2"><Play size={10} fill="black" /> SORTEOS MEET & GREET + MERCH</li>
                        <li className="flex items-center gap-2 border-b border-black/20 pb-2"><Play size={10} fill="black" /> COMUNIDAD GLOBAL + FOROS PRIVADOS</li>
                        <li className="flex items-center gap-2 border-b border-black/20 pb-2"><Play size={10} fill="black" /> NOTICIAS ANTICIPADAS (LATAM)</li>
                    </ul>
                    <button onClick={onJoin} className="bg-black text-white py-3 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-colors mt-4">
                        INICIAR REGISTRO &rarr;
                    </button>
                </div>
            </div>
        </section>
    );
}