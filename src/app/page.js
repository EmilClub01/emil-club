"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Pause, Disc, SkipForward, Trophy, Zap, Activity, Globe, CheckCircle, X, Download, QrCode } from 'lucide-react';

// --- 1. COMPONENTE PRELOADER ----
const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); 
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-[#ccff00]"
    >
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">Emil Club</h1>
      <div className="w-64 h-1 bg-[#111] overflow-hidden">
        <motion.div 
          className="h-full bg-[#ccff00]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-mono opacity-50">LOADING ASSETS... {progress}%</p>
    </motion.div>
  );
};

// --- 2. COMPONENTE ID CARD (ACTUALIZADO CON ROBOTS) ---
const MemberCard = ({ data }) => {
  // Generamos el robot usando el nombre + género para que sea único
  const robotSeed = `${data.name}-${data.gender}`;
  
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ type: "spring", bounce: 0.4, duration: 1 }}
      className="relative w-full max-w-md mx-auto bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(204,255,0,0.15)] group perspective-1000"
    >
      {/* Fondo Decorativo */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00] blur-[80px] opacity-20"></div>

      <div className="p-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
           <div className="border border-[#ccff00] text-[#ccff00] px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-widest">
             Official Agent
           </div>
           <div className="text-right">
             <h3 className="text-2xl font-black text-white tracking-tighter">EMIL</h3>
             <p className="text-[10px] text-gray-500 font-mono">SYSTEM V5.0</p>
           </div>
        </div>

        {/* Body */}
        <div className="flex gap-6 items-center mb-8">
           {/* AVATAR ROBOT */}
           <div className="w-24 h-24 border-2 border-[#ccff00] rounded-lg overflow-hidden bg-gray-900 relative">
              <img 
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${robotSeed}&backgroundColor=transparent`} 
                alt="Robot Avatar" 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 w-full bg-[#ccff00] text-black text-[8px] text-center font-bold font-mono">
                  {data.gender === 'female' ? 'UNIT-F' : data.gender === 'male' ? 'UNIT-M' : 'UNIT-X'}
              </div>
           </div>
           
           <div className="flex-1">
              <div className="mb-2">
                 <p className="text-[10px] text-gray-500 uppercase font-mono">Codename</p>
                 <h2 className="text-xl font-bold text-white uppercase truncate">{data.name || 'UNKNOWN'}</h2>
              </div>
              <div className="flex justify-between">
                  <div className="mb-2">
                     <p className="text-[10px] text-gray-500 uppercase font-mono">Origin</p>
                     <h2 className="text-sm font-mono text-[#ccff00] uppercase">{data.country || 'GLOBAL'}</h2>
                  </div>
                  <div className="mb-2 text-right">
                     <p className="text-[10px] text-gray-500 uppercase font-mono">Lang</p>
                     <h2 className="text-sm font-mono text-white uppercase">{data.language || 'EN'}</h2>
                  </div>
              </div>
              <div>
                 <p className="text-[10px] text-gray-500 uppercase font-mono">Rank</p>
                 <h2 className="text-sm font-bold text-white">RECRUIT CLASS A</h2>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-4 flex justify-between items-end">
            <div className="barcode h-8 w-32 bg-white/10">
                <div className="w-full h-full" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 2px, #fff 2px, #fff 4px)'}}></div>
            </div>
            <QrCode className="text-white w-10 h-10 opacity-80" />
        </div>
      </div>
      
      {/* Brillo Holográfico */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

// --- 3. UTILITIES ---
const ArtImage = ({ src, className, overlay = false }) => (
  <div className={`relative overflow-hidden group h-full w-full ${className}`}>
    {overlay && <div className="absolute inset-0 bg-[#ccff00] mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10"></div>}
    <img src={src} alt="Visual" className="object-cover w-full h-full grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-700 ease-out" />
  </div>
);

const Vinyl3D = ({ isPlaying, onClick }) => (
  <motion.div 
    className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer group perspective-1000"
    onClick={onClick}
    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
  >
    <motion.div 
      animate={{ rotate: isPlaying ? 360 : 0 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear", playState: isPlaying ? "running" : "paused" }}
      className="w-full h-full rounded-full bg-black border-4 border-[#111] shadow-[0_0_40px_rgba(204,255,0,0.3)] flex items-center justify-center relative z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[repeating-radial-gradient(#111_0,#111_2px,#222_3px)] opacity-50"></div>
      <div className="w-1/3 h-1/3 bg-[#ccff00] rounded-full flex items-center justify-center relative z-20">
         <div className="w-3 h-3 bg-black rounded-full"></div>
      </div>
    </motion.div>
  </motion.div>
);

const PersistentPlayer = ({ isPlaying, togglePlay }) => {
  return (
    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 w-full bg-[#050505]/90 backdrop-blur-xl border-t border-white/10 z-50 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 bg-[#ccff00] flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
            <Disc size={20} className={`text-black ${isPlaying ? 'animate-spin' : ''}`} />
        </div>
        <div className="hidden md:block">
            <h4 className="text-sm font-black text-white uppercase">NO FAKE LOVE</h4>
            <p className="text-xs text-[#ccff00] font-mono">EMIL • PROD. SYSTEM</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <SkipForward size={24} className="text-gray-500 rotate-180 cursor-pointer hover:text-white" />
        <button onClick={togglePlay} className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            {isPlaying ? <Pause fill="black" size={20} /> : <Play fill="black" className="ml-1" size={20} />}
        </button>
        <SkipForward size={24} className="text-gray-500 cursor-pointer hover:text-white" />
      </div>
      
      <div className="hidden lg:flex items-end gap-1 h-8 ml-auto">
        {[...Array(12)].map((_, i) => (
            <motion.div 
                key={i}
                animate={{ height: isPlaying ? [8, Math.random() * 32 + 5, 8] : 4 }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                className="w-1 bg-[#ccff00] rounded-sm opacity-80"
            />
        ))}
      </div>
    </motion.div>
  );
};

export default function EmilClubFinal() {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  // Estado actualizado con nuevos campos
  const [userData, setUserData] = useState({ 
      name: '', 
      email: '', 
      gender: 'robot', // valor por defecto
      country: 'Global', 
      language: 'ES' 
  });

  useEffect(() => {
    const updateMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden pb-24 selection:bg-[#ccff00] selection:text-black">
      
      <div className="fixed inset-0 z-20 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <motion.div className="fixed w-6 h-6 border border-[#ccff00] rounded-full z-[100] pointer-events-none mix-blend-difference hidden md:block" animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }} transition={{ type: "spring", mass: 0.1 }} />

      {/* --- SECCIÓN 1: HERO --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40 z-10"></div>
            <motion.img 
                initial={{ scale: 1 }} animate={{ scale: 1.1 }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop" 
                alt="Concert Background" className="w-full h-full object-cover opacity-50"
            />
        </div>
        <motion.div style={{ y: yHero }} className="absolute inset-0 flex items-center justify-center select-none opacity-20 pointer-events-none z-0">
             <h1 className="text-[25vw] font-black text-white leading-none tracking-tighter mix-blend-overlay">EMIL</h1>
        </motion.div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 w-full max-w-7xl">
            <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#ccff00] rounded-full text-[#ccff00] font-mono text-xs uppercase tracking-widest bg-black/50 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-[#ccff00] rounded-full animate-ping"></span> SYSTEM ONLINE V2.0
                </div>
                <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9]">
                    Rompe <br/><span className="text-transparent stroke-text" style={{ WebkitTextStroke: "2px white" }}>La Norma</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-lg">Únete a la tribu. Accede a contenido encriptado, preventas exclusivas y sube de rango en el leaderboard global.</p>
                <div className="flex gap-4 pt-4">
                    <button onClick={() => document.getElementById('mission-control').scrollIntoView({behavior:'smooth'})} className="bg-[#ccff00] text-black px-8 py-4 font-bold text-lg hover:bg-white transition-colors">UNIRSE AHORA</button>
                    <button onClick={() => setIsPlaying(!isPlaying)} className="border border-white px-8 py-4 font-bold text-lg hover:bg-white hover:text-black transition-colors flex items-center gap-2 backdrop-blur-sm bg-black/20">
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />} {isPlaying ? "PAUSA" : "PLAY DEMO"}
                    </button>
                </div>
            </div>
            <div className="flex-1 flex justify-center">
                <Vinyl3D isPlaying={isPlaying} onClick={() => setIsPlaying(!isPlaying)} />
            </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: MARQUEE (30s) --- */}
      <div className="bg-[#ccff00] py-4 overflow-hidden transform -rotate-1 border-y-4 border-black relative z-20 flex">
        <motion.div className="flex whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
           {[...Array(8)].map((_, i) => (
              <span key={i} className="text-4xl font-black text-black px-8">JOIN THE TRIBE +++ ACCESS GRANTED +++ NO FAKE LOVE +++</span>
           ))}
        </motion.div>
      </div>

      {/* --- SECCIÓN 3: BENTO GRID --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[350px]">
            <div className="bg-[#0a0a0a] border border-white/10 p-10 flex flex-col justify-center">
                <h3 className="text-5xl font-black uppercase leading-none mb-4">Más que <br/><span className="text-[#ccff00]">Música.</span></h3>
                <p className="text-gray-400 text-sm">Únete al círculo interno. Acceso a contenido raw, preventas exclusivas y una comunidad que entiende el código.</p>
            </div>
            <div className="md:col-span-2 relative">
                <ArtImage src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop" overlay={true} />
                <div className="absolute top-4 right-4 w-12 h-12 border border-[#ccff00] rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-[#ccff00] rounded-full animate-ping"></div></div>
            </div>
            <div className="md:col-span-2">
                <ArtImage src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop" />
            </div>
            <div className="bg-[#ccff00] text-black p-8 flex flex-col justify-between">
                <h3 className="text-3xl font-black uppercase">Tu Acceso</h3>
                <ul className="space-y-4 font-bold font-mono text-sm">
                    <li className="flex items-center gap-2 border-b border-black/20 pb-2"><Play size={10} fill="black"/> EARLY ACCESS TICKETS</li>
                    <li className="flex items-center gap-2 border-b border-black/20 pb-2"><Play size={10} fill="black"/> BEHIND THE SCENES</li>
                    <li className="flex items-center gap-2 border-b border-black/20 pb-2"><Play size={10} fill="black"/> DIGITAL MEET & GREET</li>
                </ul>
                <button onClick={() => document.getElementById('mission-control').scrollIntoView({behavior:'smooth'})} className="bg-black text-white py-3 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-colors mt-4">INICIAR REGISTRO &rarr;</button>
            </div>
        </div>
      </section>

      {/* --- SECCIÓN 4: LEADERBOARD --- */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
            <div>
                <h3 className="text-4xl font-black uppercase flex items-center gap-3"><Trophy className="text-[#ccff00]" size={40}/>Leaderboard</h3>
                <p className="text-gray-500 font-mono">Top miembros de la tribu este mes</p>
            </div>
            <button className="text-sm font-mono border-b border-[#ccff00] text-[#ccff00]">VER TODOS &rarr;</button>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            {[{ rank: 1, user: "CyberPunk_99", pts: "15,400", country: "PE" }, { rank: 2, user: "EmilStan_MX", pts: "12,200", country: "MX" }, { rank: 3, user: "TrapQueen", pts: "10,850", country: "AR" }].map((fan, i) => (
                <div key={i} className="flex items-center justify-between p-6 border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-6">
                        <span className={`text-2xl font-black font-mono ${i === 0 ? 'text-[#ccff00]' : 'text-gray-600'}`}>#{fan.rank}</span>
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
                <button className="bg-[#ccff00] text-black px-6 py-2 font-bold text-sm rounded-full hover:bg-white transition-colors">CREAR CUENTA DE FAN</button>
            </div>
        </div>
      </section>

      {/* --- SECCIÓN 5: MISSION CONTROL (FORMULARIO FINAL) --- */}
      <section id="mission-control" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ccff00] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-10">
                <h3 className="text-4xl font-black uppercase mb-2">Mission Control</h3>
                <p className="text-gray-400">Completa tu registro para acceder al sistema.</p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#333] p-8 md:p-12 rounded-2xl shadow-2xl">
                <AnimatePresence mode="wait">
                    {formStep === 4 ? (
                        <motion.div key="id-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                           <div className="mb-6">
                               <CheckCircle className="w-16 h-16 text-[#ccff00] mx-auto mb-4" />
                               <h3 className="text-3xl font-black uppercase text-white">Acceso Autorizado</h3>
                               <p className="text-gray-400 text-sm">Bienvenido a la tribu, Agente.</p>
                           </div>
                           
                           {/* MOSTRAR ID CARD GENERADA */}
                           <MemberCard data={userData} />

                           <button className="mt-8 flex items-center gap-2 mx-auto bg-[#ccff00] text-black px-6 py-3 font-bold rounded-full hover:bg-white transition-colors">
                               <Download size={20} /> DESCARGAR ID
                           </button>
                        </motion.div>
                    ) : (
                        <motion.div key="form-wrapper" exit={{opacity:0}}>
                            <div className="flex mb-10 border-b border-white/10 pb-6">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex-1 flex flex-col gap-2">
                                        <div className={`h-1 w-full rounded-full transition-all duration-500 ${step <= formStep ? 'bg-[#ccff00]' : 'bg-[#333]'}`}></div>
                                        <span className={`text-[10px] uppercase font-mono tracking-widest ${step <= formStep ? 'text-[#ccff00]' : 'text-[#555]'}`}>
                                            {step === 1 ? 'Datos' : step === 2 ? 'Vínculo' : 'Misión'}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* PASO 1: DATOS + GÉNERO + PAIS */}
                            {formStep === 1 && (
                                <motion.div key="step1" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                                    <h3 className="text-3xl font-bold">1. Identificación</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="text-xs text-[#ccff00] font-mono mb-2 block">NOMBRE CLAVE</label>
                                            <input type="text" name="name" value={userData.name} onChange={handleInputChange} placeholder="Tu nombre" className="w-full bg-transparent border-b border-[#333] py-3 text-xl focus:border-[#ccff00] focus:outline-none transition-colors text-white" />
                                        </div>
                                        <div className="group">
                                            <label className="text-xs text-[#ccff00] font-mono mb-2 block">EMAIL</label>
                                            <input type="email" name="email" value={userData.email} onChange={handleInputChange} placeholder="email@ejemplo.com" className="w-full bg-transparent border-b border-[#333] py-3 text-xl focus:border-[#ccff00] focus:outline-none transition-colors text-white" />
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-3 gap-6">
                                         <div className="group">
                                            {/* MODIFICACIÓN AQUÍ: ETIQUETA Y OPCIONES DE GÉNERO */}
                                            <label className="text-xs text-[#ccff00] font-mono mb-2 block">GÉNERO</label>
                                            <select name="gender" value={userData.gender} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white appearance-none cursor-pointer">
                                                <option value="robot" className="bg-black">No Binario</option>
                                                <option value="male" className="bg-black">Masculino</option>
                                                <option value="female" className="bg-black">Femenino</option>
                                            </select>
                                        </div>
                                        <div className="group">
                                            <label className="text-xs text-[#ccff00] font-mono mb-2 block">PAÍS</label>
                                            <select name="country" value={userData.country} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white appearance-none cursor-pointer">
                                                <option value="Global" className="bg-black">Global</option>
                                                <option value="Perú" className="bg-black">Perú</option>
                                                <option value="México" className="bg-black">México</option>
                                                <option value="Argentina" className="bg-black">Argentina</option>
                                                <option value="Colombia" className="bg-black">Colombia</option>
                                                <option value="España" className="bg-black">España</option>
                                            </select>
                                        </div>
                                        <div className="group">
                                            <label className="text-xs text-[#ccff00] font-mono mb-2 block">IDIOMA</label>
                                            <select name="language" value={userData.language} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white appearance-none cursor-pointer">
                                                <option value="ES" className="bg-black">Español</option>
                                                <option value="EN" className="bg-black">English</option>
                                                <option value="PT" className="bg-black">Portugués</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-8">
                                        <button onClick={() => setFormStep(2)} className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold hover:bg-[#ccff00] transition-colors">
                                            SIGUIENTE &rarr;
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* PASO 2 */}
                            {formStep === 2 && (
                                <motion.div key="step2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                                    <h3 className="text-3xl font-bold">2. Sincronización</h3>
                                    <div>
                                        <label className="text-xs text-[#ccff00] font-mono mb-3 block">¿DESDE CUÁNDO SIGUES A EMIL?</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {['Desde el inicio', '2023', 'Recién llegué'].map(opt => (
                                                <button key={opt} className="border border-white/20 px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors">{opt}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-8">
                                        <button onClick={() => setFormStep(1)} className="text-gray-500 hover:text-white text-sm">ATRAS</button>
                                        <button onClick={() => setFormStep(3)} className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold hover:bg-[#ccff00] transition-colors">
                                            SIGUIENTE &rarr;
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* PASO 3 */}
                            {formStep === 3 && (
                                <motion.div key="step3" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                                    <h3 className="text-3xl font-bold">3. Misión</h3>
                                    <p className="text-gray-400 text-sm">Selecciona experiencias:</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {['Conciertos VIP', 'Merch Limitado', 'Comunidad Secreta'].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 border border-white/10 hover:border-[#ccff00] cursor-pointer transition-colors group">
                                                <div className="w-6 h-6 rounded-full border border-white/30 group-hover:bg-[#ccff00]"></div>
                                                <span className="font-bold uppercase text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-8">
                                        <button onClick={() => setFormStep(2)} className="text-gray-500 hover:text-white text-sm">ATRAS</button>
                                        <button onClick={() => setFormStep(4)} className="bg-[#ccff00] text-black w-full ml-4 py-4 font-black text-xl hover:scale-105 transition-transform">
                                            CONFIRMAR INGRESO
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      <PersistentPlayer isPlaying={isPlaying} togglePlay={() => setIsPlaying(!isPlaying)} />
      <footer className="text-center py-10 text-gray-600 text-xs font-mono border-t border-[#111] mt-20">EMIL CLUB SYSTEM V5.2 // INCLUSIVE AGENTS</footer>
    </div>
  );
}