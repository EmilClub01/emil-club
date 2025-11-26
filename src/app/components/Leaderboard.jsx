"use client";
import React, { useEffect, useState } from 'react';
import { Trophy, Loader2, Crown, Medal } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function Leaderboard({ onJoin }) {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const { data, error } = await supabase
                    .from('fans')
                    .select('name, country, xp')
                    .order('xp', { ascending: false })
                    .limit(5);

                if (error) throw error;
                setLeaders(data || []);
            } catch (error) {
                console.error("Error fetching leaderboard:", JSON.stringify(error, null, 2));
                console.log("Supabase error details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaders();
    }, []);

    // Función para obtener bandera (simple)
    const getFlag = (countryName) => {
        const flags = {
            'Perú': '🇵🇪', 'México': '🇲🇽', 'Argentina': '🇦🇷',
            'Colombia': '🇨🇴', 'España': '🇪🇸', 'Global': '🌍'
        };
        return flags[countryName] || '🌍';
    };

    const getRankStyle = (index) => {
        if (index === 0) return { color: '#ccff00', shadow: 'shadow-[0_0_15px_rgba(204,255,0,0.4)]', border: 'border-[#ccff00]', bg: 'bg-[#ccff00]/10' };
        if (index === 1) return { color: '#00f3ff', shadow: 'shadow-[0_0_15px_rgba(0,243,255,0.4)]', border: 'border-[#00f3ff]', bg: 'bg-[#00f3ff]/10' };
        if (index === 2) return { color: '#bc13fe', shadow: 'shadow-[0_0_15px_rgba(188,19,254,0.4)]', border: 'border-[#bc13fe]', bg: 'bg-[#bc13fe]/10' };
        return { color: '#666', shadow: '', border: 'border-white/10', bg: 'hover:bg-white/5' };
    };

    return (
        <section className="py-20 px-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h3 className="text-4xl font-black uppercase flex items-center gap-3 tracking-tighter">
                        <Trophy className="text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.8)]" size={40} />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">SORTEO DEL MES</span>
                    </h3>
                    <p className="text-gray-500 font-mono text-sm">Ganadores, finalistas y retos semanales</p>
                </div>
                <button className="text-sm font-mono border-b border-[#ccff00] text-[#ccff00] hover:shadow-[0_0_10px_#ccff00] transition-shadow">VER TODOS &rarr;</button>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden min-h-[300px] relative">
                {/* Grid lines decoration */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[300px] gap-4">
                        <Loader2 className="animate-spin text-[#ccff00]" size={40} />
                        <p className="text-gray-500 font-mono animate-pulse">CARGANDO DATOS ENCRIPTADOS...</p>
                    </div>
                ) : leaders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center p-8">
                        <p className="text-gray-400 mb-4 font-light">Aún no hay agentes registrados. Sé el primero.</p>
                        <button onClick={onJoin} className="bg-[#ccff00] text-black px-6 py-2 font-bold rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                            REGISTRARSE AHORA
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-2 p-4 relative z-10">
                            {leaders.map((fan, i) => {
                                const style = getRankStyle(i);
                                return (
                                    <div key={i} className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-300 group ${style.border} ${style.bg} ${style.shadow}`}>
                                        <div className="flex items-center gap-6">
                                            <div className="relative w-12 h-12 flex items-center justify-center">
                                                {i === 0 && <Crown size={24} className="absolute -top-4 text-[#ccff00] animate-bounce" />}
                                                <span className={`text-3xl font-black font-mono italic`} style={{ color: i < 3 ? style.color : '#333' }}>
                                                    #{i + 1}
                                                </span>
                                            </div>

                                            <div className={`w-12 h-12 rounded-full border-2 overflow-hidden p-0.5`} style={{ borderColor: i < 3 ? style.color : '#333' }}>
                                                <img
                                                    src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${fan.name}`}
                                                    alt="avatar"
                                                    className="w-full h-full rounded-full bg-black"
                                                />
                                            </div>

                                            <div>
                                                <div className="font-bold text-lg text-white group-hover:text-[#ccff00] transition-colors uppercase tracking-wide">{fan.name}</div>
                                                <div className="text-[10px] text-gray-400 font-mono border border-white/10 px-2 py-0.5 rounded inline-block bg-black/50">
                                                    RANGO: {fan.xp > 1000 ? 'LEGEND' : 'ROOKIE'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <span className="text-2xl opacity-80 grayscale group-hover:grayscale-0 transition-all">{getFlag(fan.country)}</span>
                                            <div className="text-right min-w-[100px]">
                                                <div className="font-black font-mono text-2xl text-white drop-shadow-md">{fan.xp?.toLocaleString()}</div>
                                                <div className="text-[9px] text-[#ccff00] uppercase tracking-widest">XP POINTS</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-8 bg-black/40 text-center border-t border-white/5 backdrop-blur-sm">
                            <p className="text-xs text-gray-500 mb-6 uppercase tracking-[0.2em] font-mono">Dinámica de Puntos</p>
                            <div className="flex flex-col items-center justify-center gap-4 mb-8 max-w-2xl mx-auto">
                                <p className="text-gray-400 text-sm text-center leading-relaxed">
                                    Los puntos XP se obtienen participando en <span className="text-[#ccff00] font-bold">dinámicas exclusivas</span> en nuestras redes sociales, eventos en vivo y sorteos especiales.
                                </p>
                                <p className="text-gray-500 text-xs text-center font-mono">
                                    MANTENTE ATENTO A LAS REDES DE EMIL PARA CÓDIGOS Y PREMIOS.
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}