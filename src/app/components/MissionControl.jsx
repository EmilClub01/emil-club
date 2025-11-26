"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient'; // Importamos la conexión
import IDCard from './IDCard'; // Importamos la tarjeta
import { Loader2 } from 'lucide-react';

export default function MissionControl() {
    const [formStep, setFormStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConsentWarning, setShowConsentWarning] = useState(false);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        gender: 'no_preciso',
        country: 'Global',
        region: '',
        language: 'ES',
        birthday: '',
        phoneCode: '+51',
        phoneNumber: '',
        sinceYear: '',
        contactPreference: '',
        socialPreference: [],
        missionPreferences: []
    });

    const regionsByCountry = {
        'Perú': ['Lima', 'Arequipa', 'Cajamarca', 'Cusco', 'Piura', 'La Libertad', 'Lambayeque', 'Junín', 'Ancash', 'San Martín'],
        'México': ['CDMX', 'Jalisco', 'Nuevo León', 'Puebla', 'Guanajuato', 'Veracruz', 'Yucatán'],
        'Argentina': ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán'],
        'Colombia': ['Bogotá', 'Antioquia', 'Valle del Cauca', 'Cundinamarca', 'Atlántico'],
        'España': ['Madrid', 'Cataluña', 'Andalucía', 'Valencia', 'Galicia'],
        'Global': ['Global']
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => {
            const newData = { ...prev, [name]: value };
            // Reset region if country changes
            if (name === 'country') {
                newData.region = '';
            }
            return newData;
        });
    };

    const toggleSelection = (field, value) => {
        setUserData(prev => {
            const current = prev[field] || [];
            const newSelection = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [field]: newSelection };
        });
    };

    const handleConsent = (accepted) => {
        if (accepted) {
            setFormStep(3);
        } else {
            setShowConsentWarning(true);
        }
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
                console.log("Usuario ya existe, recuperando sesión...");
                localStorage.setItem('emil_user_email', userData.email);
                setUserData({ ...userData, xp: existingUser.xp });
                setFormStep(5); // Ir a ID Card (Final)
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
                        region: userData.region,
                        language: userData.language,
                        birthday: userData.birthday || null,
                        phone_code: userData.phoneCode,
                        phone_number: userData.phoneNumber,
                        since_year: userData.sinceYear || null,
                        contact_preference: userData.contactPreference,
                        social_preference: userData.socialPreference,
                        mission_preferences: userData.missionPreferences,
                        xp: 0
                    }
                ]);

            if (error) throw error;

            // 2. Si todo sale bien, guardamos en localStorage
            localStorage.setItem('emil_user_email', userData.email);
            setUserData({ ...userData, xp: 0 });
            setFormStep(5); // Ir a ID Card (Final)

        } catch (error) {
            console.error('Error guardando:', error);
            alert(`Error: ${error.message || JSON.stringify(error)}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto relative">
                    {/* Green Glow Effect */}
                    <div className="absolute inset-0 bg-[#ccff00] blur-[150px] opacity-20 rounded-full pointer-events-none"></div>
                    <AnimatePresence mode="wait">
                        {formStep === 5 ? (
                            // --- FASE FINAL: ID CARD ---
                            <motion.div key="id-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                <IDCard data={userData} />
                            </motion.div>
                        ) : (
                            // --- FASE FORMULARIO ---
                            <motion.div key="form-wrapper" exit={{ opacity: 0 }}>
                                {/* Barra de Progreso */}
                                <div className="flex mb-10 border-b border-white/10 pb-6">
                                    {[1, 2, 3, 4].map((step) => (
                                        <div key={step} className="flex-1 flex flex-col gap-2 relative">
                                            <div className={`h-1 w-full rounded-full transition-all duration-500 ${step <= formStep ? 'bg-[#ccff00] shadow-[0_0_10px_#ccff00]' : 'bg-[#333]'}`}></div>
                                            <span className={`text-[10px] uppercase font-mono tracking-widest ${step <= formStep ? 'text-[#ccff00]' : 'text-[#555]'}`}>
                                                {step === 1 ? 'Datos' : step === 2 ? 'Legal' : step === 3 ? 'Vínculo' : 'Misión'}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* PASO 1: DATOS */}
                                {formStep === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <h3 className="text-3xl font-bold uppercase italic">1. Identificación</h3>

                                        {/* Nombre y Email */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="text-xs text-[#ccff00] font-mono mb-2 block">NOMBRE COMPLETO</label>
                                                <input type="text" name="name" value={userData.name} onChange={handleInputChange} placeholder="Tu nombre" className="w-full bg-transparent border-b border-[#333] py-3 text-xl focus:border-[#ccff00] focus:shadow-[0_10px_20px_-10px_rgba(204,255,0,0.2)] focus:outline-none transition-all text-white placeholder-gray-700" />
                                            </div>
                                            <div className="group">
                                                <label className="text-xs text-[#ccff00] font-mono mb-2 block">EMAIL</label>
                                                <input type="email" name="email" value={userData.email} onChange={handleInputChange} placeholder="email@ejemplo.com" className="w-full bg-transparent border-b border-[#333] py-3 text-xl focus:border-[#ccff00] focus:shadow-[0_10px_20px_-10px_rgba(204,255,0,0.2)] focus:outline-none transition-all text-white placeholder-gray-700" />
                                            </div>
                                        </div>

                                        {/* Género y Cumpleaños */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="text-xs text-[#ccff00] font-mono mb-2 block">GÉNERO</label>
                                                <select name="gender" value={userData.gender} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white cursor-pointer appearance-none rounded-none">
                                                    <option value="male" className="bg-black">Masculino</option>
                                                    <option value="female" className="bg-black">Femenino</option>
                                                    <option value="other" className="bg-black">Otros</option>
                                                    <option value="no_preciso" className="bg-black">No preciso</option>
                                                </select>
                                            </div>
                                            <div className="group">
                                                <label className="text-xs text-[#ccff00] font-mono mb-2 block">TU CUMPLEAÑOS</label>
                                                <input type="date" name="birthday" value={userData.birthday} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white uppercase" />
                                            </div>
                                        </div>

                                        {/* País y Región */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="text-xs text-[#ccff00] font-mono mb-2 block">PAÍS</label>
                                                <select name="country" value={userData.country} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white cursor-pointer appearance-none rounded-none">
                                                    <option value="Global" className="bg-black">Global</option>
                                                    <option value="Perú" className="bg-black">Perú</option>
                                                    <option value="México" className="bg-black">México</option>
                                                    <option value="Argentina" className="bg-black">Argentina</option>
                                                    <option value="Colombia" className="bg-black">Colombia</option>
                                                    <option value="España" className="bg-black">España</option>
                                                </select>
                                            </div>
                                            <div className="group">
                                                <label className="text-xs text-[#ccff00] font-mono mb-2 block">REGIÓN</label>
                                                <select name="region" value={userData.region} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white cursor-pointer appearance-none rounded-none" disabled={!userData.country || userData.country === 'Global'}>
                                                    <option value="" className="bg-black">Selecciona Región</option>
                                                    {regionsByCountry[userData.country]?.map(region => (
                                                        <option key={region} value={region} className="bg-black">{region}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Celular e Idioma */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="text-xs text-[#ccff00] font-mono mb-2 block">CELULAR</label>
                                                <div className="flex gap-4">
                                                    <select name="phoneCode" value={userData.phoneCode} onChange={handleInputChange} className="w-24 bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white cursor-pointer appearance-none rounded-none">
                                                        <option value="+51" className="bg-black">🇵🇪 +51</option>
                                                        <option value="+52" className="bg-black">🇲🇽 +52</option>
                                                        <option value="+54" className="bg-black">🇦🇷 +54</option>
                                                        <option value="+57" className="bg-black">🇨🇴 +57</option>
                                                        <option value="+34" className="bg-black">🇪🇸 +34</option>
                                                        <option value="+1" className="bg-black">🌎 +1</option>
                                                    </select>
                                                    <input type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} placeholder="999 999 999" className="flex-1 bg-transparent border-b border-[#333] py-3 text-xl focus:border-[#ccff00] focus:shadow-[0_10px_20px_-10px_rgba(204,255,0,0.2)] focus:outline-none transition-all text-white placeholder-gray-700" />
                                                </div>
                                            </div>
                                            <div className="group">
                                                <label className="text-xs text-[#ccff00] font-mono mb-2 block">IDIOMA</label>
                                                <select name="language" value={userData.language} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#333] py-3 text-sm focus:border-[#ccff00] focus:outline-none transition-colors text-white cursor-pointer appearance-none rounded-none">
                                                    <option value="ES" className="bg-black">Español</option>
                                                    <option value="EN" className="bg-black">English</option>
                                                    <option value="PT" className="bg-black">Portugués</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-8">
                                            <button onClick={() => setFormStep(2)} className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold hover:bg-[#ccff00] hover:shadow-[0_0_20px_#ccff00] transition-all duration-300 clip-path-slant">
                                                SIGUIENTE &rarr;
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* PASO 2: CONSENTIMIENTO (NUEVO) */}
                                {formStep === 2 && (
                                    <motion.div key="step2-consent" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 text-center py-10">
                                        <h3 className="text-3xl font-bold uppercase italic">Consentimiento</h3>
                                        <div className="max-w-md mx-auto">
                                            <p className="text-lg text-gray-300 mb-8 leading-relaxed font-light">
                                                Soy mayor de edad (+ 18 años) y autorizo el tratamiento de mis datos personales únicamente para mi participación en las actividades de EMIL CLUB.
                                            </p>

                                            <div className="flex gap-4 justify-center mb-6">
                                                <button
                                                    onClick={() => handleConsent(true)}
                                                    className="bg-[#ccff00] text-black px-12 py-4 font-black text-xl hover:scale-105 hover:shadow-[0_0_30px_#ccff00] transition-all duration-300 clip-path-slant"
                                                >
                                                    SÍ
                                                </button>
                                                <button
                                                    onClick={() => handleConsent(false)}
                                                    className="bg-transparent border border-white/30 text-white px-12 py-4 font-black text-xl hover:bg-white/10 hover:border-white transition-all duration-300 clip-path-slant"
                                                >
                                                    NO
                                                </button>
                                            </div>

                                            <p className="text-xs text-gray-500 font-mono mt-8">

                                            </p>

                                            {showConsentWarning && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#ccff00] text-sm font-mono bg-[#ccff00]/10 p-4 border border-[#ccff00]/30 mt-4">
                                                    <button onClick={() => setFormStep(3)} className="underline hover:text-white">Continuar de todos modos &rarr;</button>
                                                </motion.div>
                                            )}
                                        </div>
                                        <div className="flex justify-start mt-8">
                                            <button onClick={() => setFormStep(1)} className="text-gray-500 hover:text-white text-sm font-mono">ATRAS</button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* PASO 3: VÍNCULO */}
                                {formStep === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <h3 className="text-3xl font-bold uppercase italic">3. Sincronización</h3>

                                        {/* Año */}
                                        <div className="group">
                                            <label className="text-xs text-[#ccff00] font-mono mb-2 block">¿DESDE CUÁNDO SIGUES A EMIL? (AÑO)</label>
                                            <input type="number" name="sinceYear" value={userData.sinceYear} onChange={handleInputChange} placeholder="Ej: 2023" className="w-full bg-transparent border-b border-[#333] py-3 text-xl focus:border-[#ccff00] focus:shadow-[0_10px_20px_-10px_rgba(204,255,0,0.2)] focus:outline-none transition-all text-white placeholder-gray-700" />
                                        </div>

                                        {/* Contacto */}
                                        <div>
                                            <label className="text-xs text-[#ccff00] font-mono mb-3 block">¿CÓMO TE GUSTARÍA QUE TE CONTACTEMOS?</label>
                                            <div className="flex gap-2 flex-wrap">
                                                {['Correo', 'Redes', 'WhatsApp', 'Telegram', 'Discord'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setUserData({ ...userData, contactPreference: opt })}
                                                        className={`border px-4 py-2 text-sm transition-all duration-300 clip-path-slant ${userData.contactPreference === opt ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.4)]' : 'border-white/20 hover:bg-white/10 hover:border-white'}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Redes Sociales */}
                                        <div>
                                            <label className="text-xs text-[#ccff00] font-mono mb-3 block">¿EN QUÉ RED(ES) PREFIERES SEGUIR A EMIL?</label>
                                            <div className="flex gap-2 flex-wrap">
                                                {['FACEBOOK', 'INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'SPOTIFY', 'DISCORD', 'KICK', 'WHATSAPP'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => toggleSelection('socialPreference', opt)}
                                                        className={`border px-4 py-2 text-sm transition-all duration-300 clip-path-slant ${userData.socialPreference.includes(opt) ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.4)]' : 'border-white/20 hover:bg-white/10 hover:border-white'}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-8">
                                            <button onClick={() => setFormStep(2)} className="text-gray-500 hover:text-white text-sm font-mono">ATRAS</button>
                                            <button onClick={() => setFormStep(4)} className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold hover:bg-[#ccff00] hover:shadow-[0_0_20px_#ccff00] transition-all duration-300 clip-path-slant">
                                                SIGUIENTE &rarr;
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* PASO 4: MISIÓN */}
                                {formStep === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <h3 className="text-3xl font-bold uppercase italic">Importante</h3>
                                        <p className="text-gray-400 text-sm font-mono">¿Qué experiencia te gustaría disfrutar? (Selecciona en orden de importancia):</p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                'CONOCER A EMIL',
                                                'REUNIRME CON OTROS FANS DE EMIL',
                                                'IR A UN CONCIERTO DE EMIL',
                                                'COMPRAR ARTÍCULOS EXCLUSIVOS DE EMIL',
                                                'GANAR PREMIOS',
                                                'ACCESO A EVENTOS EXCLUSIVOS DE EMIL'
                                            ].map((item) => {
                                                const isSelected = userData.missionPreferences.includes(item);
                                                const order = userData.missionPreferences.indexOf(item) + 1;
                                                return (
                                                    <div
                                                        key={item}
                                                        onClick={() => toggleSelection('missionPreferences', item)}
                                                        className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-300 group ${isSelected ? 'border-[#ccff00] bg-[#ccff00]/10 shadow-[0_0_20px_rgba(204,255,0,0.1)]' : 'border-white/10 hover:border-[#ccff00] hover:bg-white/5'}`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-sm transition-all ${isSelected ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_10px_#ccff00]' : 'border-white/30 group-hover:border-[#ccff00]'}`}>
                                                            {isSelected ? order : ''}
                                                        </div>
                                                        <span className={`font-bold uppercase text-sm tracking-wider ${isSelected ? 'text-[#ccff00]' : 'text-white'}`}>{item}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="flex justify-between mt-8">
                                            <button onClick={() => setFormStep(3)} className="text-gray-500 hover:text-white text-sm font-mono">ATRAS</button>
                                            <button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                className="bg-[#ccff00] text-black w-full ml-4 py-4 font-black text-xl hover:scale-105 hover:shadow-[0_0_30px_#ccff00] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 clip-path-slant"
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