"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient'; // Importamos la conexión
import IDCard from './IDCard'; // Importamos la tarjeta
import { Loader2 } from 'lucide-react';

export default function MissionControl() {
    const [formStep, setFormStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        gender: 'robot', // Default para visualización inicial
        country: 'Global',
        language: 'ES'
    });

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Función para guardar en Supabase
    const handleSubmit = async () => {
        if (!userData.name || !userData.email) {
            alert("Por favor completa tu nombre y email.");
            return;
        }

        setIsSubmitting(true);

        try {
            // 0. Verificar si ya existe
            const { data: existingUser } = await supabase
                .from('fans')
                .select('xp')
                .eq('email', userData.email)
                .maybeSingle();

            if (existingUser) {
                // Si ya existe, solo actualizamos localStorage y estado local
                console.log("Usuario ya existe, recuperando sesión...");
                localStorage.setItem('emil_user_email', userData.email);
                setUserData({ ...userData, xp: existingUser.xp });
                setFormStep(4);
                setIsSubmitting(false);
                return;
            }

            // 1. Enviamos los datos a la tabla 'fans' en Supabase
            const { error } = await supabase
                .from('fans')
                .insert([
                    {
                        name: userData.name,
                        email: userData.email,
                        gender: userData.gender,
                        country: userData.country,
                        language: userData.language,
                        xp: 500 // XP Inicial por registro
                    }
                ]);

            if (error) throw error;

            // 2. Si todo sale bien, guardamos en localStorage para el Player y actualizamos estado
            localStorage.setItem('emil_user_email', userData.email);
            setUserData({ ...userData, xp: 500 });
            setFormStep(4);

        } catch (error) {
            console.error('Error guardando:', error);
            alert('Hubo un error de conexión. Intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="mission-control" className="py-20 px-6 relative overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ccff00] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <h3 className="text-4xl font-black uppercase mb-2">Mission Control</h3>
                    <p className="text-gray-400">Completa tu registro para acceder al sistema.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-[#333] p-8 md:p-12 rounded-2xl shadow-2xl min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {formStep === 4 ? (
                            // --- FASE FINAL: ID CARD ---
                            <motion.div key="id-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                <IDCard data={userData} />
                            </motion.div>
                        ) : (
                            // --- FASE FORMULARIO ---
                            <motion.div key="form-wrapper" exit={{ opacity: 0 }}>
                                {/* Barra de Progreso */}
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

                                {/* PASO 1: DATOS */}
                                {formStep === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
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
                                                <label className="text-xs text-[#ccff00] font-mono mb-2 block">GÉNERO</label>
                                                <select name="gender" value={userData.gender} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white cursor-pointer">
                                                    <option value="robot" className="bg-black">No Binario</option>
                                                    <option value="male" className="bg-black">Masculino</option>
                                                    <option value="female" className="bg-black">Femenino</option>
                                                </select>
                                            </div>
                                            <div className="group">
                                                <label className="text-xs text-[#ccff00] font-mono mb-2 block">PAÍS</label>
                                                <select name="country" value={userData.country} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white cursor-pointer">
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
                                                <select name="language" value={userData.language} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white cursor-pointer">
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

                                {/* PASO 2: VÍNCULO */}
                                {formStep === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
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

                                {/* PASO 3: MISIÓN */}
                                {formStep === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
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
                                            <button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                className="bg-[#ccff00] text-black w-full ml-4 py-4 font-black text-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {isSubmitting ? <Loader2 className="animate-spin" /> : "CONFIRMAR INGRESO"}
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
    );
}