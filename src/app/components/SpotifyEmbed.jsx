import React from 'react';
import { Music } from 'lucide-react';

export default function SpotifyEmbed() {
    return (
        <section className="py-20 px-6 bg-black relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#ccff00] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#bc13fe] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h3 className="text-4xl font-black uppercase flex items-center gap-3 tracking-tighter">
                            <Music className="text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.8)]" size={40} />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Stream Emil</span>
                        </h3>
                        <p className="text-gray-500 font-mono text-sm">ESCUCHA LOS ÚLTIMOS LANZAMIENTOS EN SPOTIFY</p>
                    </div>
                    <a
                        href="https://open.spotify.com/artist/5XeDmt0B3iDEHhLft6kr8a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono border-b border-[#ccff00] text-[#ccff00] hover:shadow-[0_0_10px_#ccff00] transition-shadow"
                    >
                        ABRIR SPOTIFY &rarr;
                    </a>
                </div>

                {/* Gradient Border Container */}
                <div className="relative group rounded-xl p-[2px] bg-gradient-to-r from-[#ccff00] via-[#00f3ff] to-[#bc13fe] shadow-[0_0_30px_rgba(204,255,0,0.2)] hover:shadow-[0_0_50px_rgba(204,255,0,0.4)] transition-shadow duration-500">
                    <div className="rounded-xl overflow-hidden bg-[#121212] relative w-full h-[352px]">
                        <iframe
                            src="https://open.spotify.com/embed/artist/5XeDmt0B3iDEHhLft6kr8a"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            title="Spotify Embed"
                            className="absolute top-0 left-0 w-full h-full"
                            loading="eager"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
