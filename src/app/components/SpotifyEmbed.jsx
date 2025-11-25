import React from 'react';

export default function SpotifyEmbed() {
    return (
        <section className="py-20 px-6 bg-black/50 border-y border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold uppercase mb-8 text-[#ccff00] font-mono tracking-widest">
                    // STREAM EMIL
                </h3>
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#ccff00]/30 transition-colors duration-500">
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/artist/5XeDmt0B3iDEHhLft6kr8a?utm_source=generator&theme=0"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Spotify Embed"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
