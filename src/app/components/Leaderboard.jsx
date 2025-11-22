"use client";
import React, { useEffect, useState } from 'react';
import { Trophy, Loader2 } from 'lucide-react';
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
                console.error("Error fetching leaderboard:", error);
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

    return (
        <section className="py-20 px-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h3 className="text-4xl font-black uppercase flex items-center gap-3">
                        <Trophy className="text-[#ccff00]" size={40} />
                        Leaderboard
                    </h3>
                    <p className="text-gray-500 font-mono">Top miembros de Emil Club este mes</p>
                </div>
                <button className="text-sm font-mono border-b border-[#ccff00] text-[#ccff00]">VER TODOS &rarr;</button>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden min-h-[300px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[300px] gap-4">
                        <Loader2 className="animate-spin text-[#ccff00]" size={40} />
                        <p className="text-gray-500 font-mono">CARGANDO DATOS...</p>
                    </div>
                ) : leaders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center p-8">
                        <p className="text-gray-400 mb-4">Aún no hay agentes registrados. Sé el primero.</p>
                        <button onClick={onJoin} className="bg-[#ccff00] text-black px-6 py-2 font-bold rounded-full hover:bg-white transition-colors">
                            REGISTRARSE AHORA
                        </button>
                    </div>
                ) : (
                    <>
                        {leaders.map((fan, i) => (
                            <div key={i} className="flex items-center justify-between p-6 border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <div className="flex items-center gap-6">
                                    <span className={`text-2xl font-black font-mono ${i === 0 ? 'text-[#ccff00]' : 'text-gray-600'}`}>
                                        #{i + 1}
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden">
                                        <img
                                            src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${fan.name}`}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg group-hover:text-[#ccff00] transition-colors">{fan.name}</div>
                                        <div className="text-xs text-gray-500 font-mono">NIVEL: {fan.xp > 1000 ? 'LEGEND' : 'ROOKIE'}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">{getFlag(fan.country)}</span>
                                    <div className="text-right">
                                        <div className="font-bold font-mono text-xl">{fan.xp?.toLocaleString()}</div>
                                        <div className="text-[10px] text-gray-500 uppercase">XP POINTS</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="p-8 bg-[#1a1a1a] text-center border-t border-white/10">
                            <p className="text-sm text-gray-400 mb-6 uppercase tracking-widest font-mono">Cómo subir de rango</p>
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <div className="bg-black/50 border border-white/10 px-4 py-3 rounded-lg flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"></div>
                                    <span className="text-sm font-bold text-white">Escucha Música <span className="text-[#ccff00] ml-1">+50 XP</span></span>
                                </div>
                                <div className="bg-black/50 border border-white/10 px-4 py-3 rounded-lg flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"></div>
                                    <span className="text-sm font-bold text-white">Comparte el Club <span className="text-[#ccff00] ml-1">+100 XP</span></span>
                                </div>
                            </div>
                            <button onClick={onJoin} className="bg-[#ccff00] text-black px-8 py-3 font-black text-sm rounded-full hover:bg-white transition-colors hover:scale-105 transform duration-200">
                                INICIAR MISIÓN
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}