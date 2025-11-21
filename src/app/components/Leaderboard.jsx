"use client";
import React from 'react';
import { Trophy } from 'lucide-react';

export default function Leaderboard({ onJoin }) {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
            <div>
                <h3 className="text-4xl font-black uppercase flex items-center gap-3">
                    <Trophy className="text-[#ccff00]" size={40}/>
                    Leaderboard
                </h3>
                <p className="text-gray-500 font-mono">Top miembros de la tribu este mes</p>
            </div>
            <button className="text-sm font-mono border-b border-[#ccff00] text-[#ccff00]">VER TODOS &rarr;</button>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            {[
                { rank: 1, user: "CyberPunk_99", pts: "15,400", country: "PE" },
                { rank: 2, user: "EmilStan_MX", pts: "12,200", country: "MX" },
                { rank: 3, user: "TrapQueen", pts: "10,850", country: "AR" },
            ].map((fan, i) => (
                <div key={i} className="flex items-center justify-between p-6 border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-6">
                        <span className={`text-2xl font-black font-mono ${i === 0 ? 'text-[#ccff00]' : 'text-gray-600'}`}>
                            #{fan.rank}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${fan.user}`} alt="avatar" />
                        </div>
                        <div>
                            <div className="font-bold text-lg group-hover:text-[#ccff00] transition-colors">{fan.user}</div>
                            <div className="text-xs text-gray-500 font-mono">NIVEL: {i === 0 ? 'LEGEND' : 'ELITE'}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-2xl">{fan.country}</span>
                        <div className="text-right">
                            <div className="font-bold font-mono text-xl">{fan.pts}</div>
                            <div className="text-[10px] text-gray-500 uppercase">XP POINTS</div>
                        </div>
                    </div>
                </div>
            ))}
            
            <div className="p-8 bg-[#1a1a1a] text-center">
                <p className="text-sm text-gray-300 mb-4">¿Quieres aparecer aquí? Regístrate y escucha música para ganar XP.</p>
                <button onClick={onJoin} className="bg-[#ccff00] text-black px-6 py-2 font-bold text-sm rounded-full hover:bg-white transition-colors">
                    CREAR CUENTA DE FAN
                </button>
            </div>
        </div>
    </section>
  );
}