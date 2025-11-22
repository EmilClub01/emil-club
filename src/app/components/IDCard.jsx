"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, CheckCircle, Loader2, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { supabase } from '../lib/supabaseClient';

// --- COMPONENTE SVG DE CÓDIGO DE BARRAS ---
const BarcodeSVG = () => (
  <svg height="30" width="100%" viewBox="0 0 200 30" preserveAspectRatio="none" style={{ display: 'block' }}>
    <g fill="#fff" opacity="0.6">
      <rect x="0" y="0" width="2" height="30" />
      <rect x="4" y="0" width="2" height="30" />
      <rect x="8" y="0" width="6" height="30" />
      <rect x="16" y="0" width="2" height="30" />
      <rect x="20" y="0" width="4" height="30" />
      <rect x="28" y="0" width="2" height="30" />
      <rect x="34" y="0" width="2" height="30" />
      <rect x="38" y="0" width="6" height="30" />
      <rect x="48" y="0" width="2" height="30" />
      <rect x="54" y="0" width="2" height="30" />
      <rect x="58" y="0" width="2" height="30" />
      <rect x="62" y="0" width="4" height="30" />
      <rect x="70" y="0" width="2" height="30" />
      <rect x="76" y="0" width="4" height="30" />
      <rect x="82" y="0" width="2" height="30" />
      <rect x="88" y="0" width="6" height="30" />
      <rect x="98" y="0" width="2" height="30" />
      <rect x="104" y="0" width="2" height="30" />
      <rect x="108" y="0" width="4" height="30" />
      <rect x="114" y="0" width="2" height="30" />
      <rect x="120" y="0" width="2" height="30" />
      <rect x="124" y="0" width="6" height="30" />
      <rect x="134" y="0" width="2" height="30" />
      <rect x="138" y="0" width="2" height="30" />
      <rect x="144" y="0" width="6" height="30" />
      <rect x="152" y="0" width="2" height="30" />
      <rect x="156" y="0" width="4" height="30" />
      <rect x="162" y="0" width="2" height="30" />
      <rect x="168" y="0" width="2" height="30" />
      <rect x="172" y="0" width="6" height="30" />
      <rect x="180" y="0" width="2" height="30" />
      <rect x="186" y="0" width="4" height="30" />
      <rect x="192" y="0" width="2" height="30" />
      <rect x="198" y="0" width="2" height="30" />
    </g>
  </svg>
);

// --- COMPONENTE INTERNO DE LA TARJETA ---
const MemberCardDisplay = ({ data, cardRef, avatarSrc }) => {
  const agentCode =
    data.gender === 'female' ? 'UNIT-F' :
      data.gender === 'male' ? 'UNIT-M' :
        'UNIT-X';

  const styles = {
    card: {
      backgroundColor: '#050505',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '16px',
      overflow: 'hidden',
      position: 'relative',
      color: 'white',
      boxShadow: '0 0 50px rgba(204,255,0,0.1)',
      width: '100%',
      maxWidth: '450px',
      fontFamily: 'Arial, sans-serif'
    },
    gridBg: {
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      opacity: 1,
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
    },
    glow: {
      position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px',
      background: 'radial-gradient(circle, rgba(204,255,0,0.15) 0%, transparent 70%)',
      pointerEvents: 'none'
    },
    // CONTENEDOR FLEX (Centrado perfecto en pantalla)
    tagContainer: {
      border: '2px solid #ccff00',
      backgroundColor: 'rgba(204,255,0, 0.05)',
      height: '28px',
      padding: '0 12px',
      display: 'inline-flex',
      alignItems: 'center', // Centrado vertical real
      justifyContent: 'center',
      boxSizing: 'border-box'
    },
    tagText: {
      color: '#ccff00',
      fontSize: '11px',
      fontWeight: '900',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      margin: 0,
      lineHeight: 'normal', // Dejamos que flex haga su trabajo
      fontStyle: 'italic',
      fontFamily: 'Arial, sans-serif',
      // Quitamos transformaciones manuales aquí
    },
    label: { fontSize: '10px', color: '#888', textTransform: 'uppercase', fontFamily: 'monospace', letterSpacing: '0.05em', marginBottom: '4px', margin: 0 },
    valueMain: {
      fontSize: '22px',
      fontWeight: '900',
      textTransform: 'uppercase',
      lineHeight: '1.1',
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      marginBottom: '10px',
      marginTop: '4px',
      fontFamily: 'Arial, sans-serif'
    },
    valueSub: { fontFamily: 'monospace', color: '#ccff00', fontSize: '14px', textTransform: 'uppercase', margin: 0, marginTop: '2px' },
    valueWhite: { fontFamily: 'monospace', color: 'white', fontSize: '14px', textTransform: 'uppercase', margin: 0, marginTop: '2px' },

    // ETIQUETA UNIT
    unitTag: {
      backgroundColor: '#ccff00',
      color: 'black',
      fontSize: '11px',
      fontWeight: '900',
      textAlign: 'center',
      height: '20px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '8px',
      fontFamily: 'Arial, sans-serif'
    },
    unitText: {
      fontStyle: 'italic',
      lineHeight: 'normal',
      // Quitamos transformaciones manuales
    },
    headerTitle: {
      fontSize: '32px',
      fontWeight: '900',
      lineHeight: 0.8,
      margin: 0,
      color: 'white',
      fontStyle: 'italic',
      fontFamily: 'Arial, sans-serif'
    }
  };

  return (
    <div ref={cardRef} style={styles.card} id="capture-target">
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050505' }}></div>
      <div style={styles.gridBg}></div>
      <div style={styles.glow}></div>

      <div style={{ position: 'relative', zIndex: 10, padding: '32px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
          <div style={styles.tagContainer}>
            {/* ID único para manipularlo al clonar */}
            <span id="export-text-agent" style={styles.tagText}>OFFICIAL AGENT</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={styles.headerTitle}>EMIL</h3>
            <p style={{ fontSize: '10px', color: '#666', fontFamily: 'monospace', margin: 0, marginTop: '4px' }}>SYSTEM V5.0</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: '110px', height: '110px',
              border: '2px solid #ccff00',
              backgroundColor: '#111',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              marginBottom: '0px'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarSrc}
                alt="Avatar"
                crossOrigin="anonymous"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={styles.unitTag}>
              {/* ID único para manipularlo al clonar */}
              <span id="export-text-unit" style={styles.unitText}>{agentCode}</span>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ marginBottom: '16px' }}>
              <p style={styles.label}>CODENAME</p>
              <h2 style={styles.valueMain}>
                {data.name || 'UNKNOWN'}
              </h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={styles.label}>ORIGIN</p>
                <h2 style={styles.valueSub}>{data.country || 'GLOBAL'}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={styles.label}>LANG</p>
                <h2 style={styles.valueWhite}>{data.language || 'EN'}</h2>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '2px dashed rgba(255,255,255,0.15)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ width: '60%' }}>
            <BarcodeSVG />
            <p style={{ fontSize: '10px', color: '#444', fontFamily: 'monospace', marginTop: '4px', margin: 0 }}>ACCESS GRANTED // SECURE</p>
          </div>
          <div className="text-right">
            <p style={{ fontSize: '10px', color: '#666', fontFamily: 'monospace', margin: 0 }}>XP</p>
            <p style={{ fontSize: '18px', color: '#ccff00', fontWeight: 'bold', margin: 0 }}>{data.xp || 500}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function IDCard({ data }) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState(null);
  const [xp, setXp] = useState(data.xp || 500);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const generateBase64Avatar = async () => {
      const robotSeed = `${data.name}-${data.gender}`;
      const imageUrl = `https://api.dicebear.com/9.x/bottts-neutral/png?seed=${robotSeed}&size=200`;

      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarBase64(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error cargando avatar:", error);
      }
    };

    generateBase64Avatar();
  }, [data]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 3,
        backgroundColor: '#050505',
        logging: false,
        onclone: (clonedDoc) => {
          const element = clonedDoc.getElementById('capture-target');
          const textAgent = clonedDoc.getElementById('export-text-agent');
          const textUnit = clonedDoc.getElementById('export-text-unit');

          if (element) {
            element.style.transform = 'none';
            element.style.boxShadow = 'none';
            element.style.fontFamily = 'Arial, sans-serif';
          }

          // AQUÍ ESTÁ EL TRUCO: SOLO EMPUJAMOS HACIA ARRIBA AL MOMENTO DE CLONAR
          // PARA COMPENSAR EL BUG DE HTML2CANVAS, PERO NO EN PANTALLA
          if (textAgent) {
            textAgent.style.marginTop = '-8px'; // Ajuste manual para descarga
            textAgent.style.lineHeight = '1';
          }
          if (textUnit) {
            textUnit.style.marginTop = '-6px'; // Ajuste manual para descarga
            textUnit.style.lineHeight = '1';
          }
        }
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `EMIL-AGENT-${data.name.replace(/\s+/g, '_').toUpperCase()}.png`;
      link.click();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al generar. Intenta de nuevo.");
    }
    setDownloading(false);
  };

  const handleShare = async () => {
    if (shared) return;

    // 1. Simular compartir (en un caso real abriría ventana de Twitter/FB)
    const text = `¡Me he unido a Emil Club! Mi nombre clave es ${data.name}. Únete aquí: https://emil.club`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Emil Club ID',
          text: text,
          url: 'https://emil.club',
        });
      } catch (err) {
        console.log('Error compartiendo:', err);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(text);
      alert("Enlace copiado al portapapeles!");
    }

    // 2. Dar XP extra
    try {
      const { error } = await supabase
        .from('fans')
        .update({ xp: xp + 100 })
        .eq('email', data.email);

      if (!error) {
        setXp(prev => prev + 100);
        setShared(true);
      }
    } catch (err) {
      console.error("Error actualizando XP:", err);
    }
  };

  return (
    <div className="text-center w-full flex flex-col items-center">
      <div className="mb-6">
        <CheckCircle className="w-16 h-16 text-[#ccff00] mx-auto mb-4" />
        <h3 className="text-3xl font-black uppercase text-white">Acceso Autorizado</h3>
        <p className="text-gray-400 text-sm">Bienvenido a Emil Club, Agente.</p>
        <p className="text-[#ccff00] font-mono text-xs mt-2">XP ACTUAL: {xp}</p>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
        transition={{ type: "spring", bounce: 0.4, duration: 1 }}
        style={{ perspective: 1000 }}
      >
        <MemberCardDisplay data={{ ...data, xp }} cardRef={cardRef} avatarSrc={avatarBase64} />
      </motion.div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleDownload}
          disabled={downloading || !avatarBase64}
          className="flex items-center gap-2 bg-[#ccff00] text-black px-6 py-3 font-bold rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
          {downloading ? "GENERANDO..." : "DESCARGAR ID"}
        </button>

        <button
          onClick={handleShare}
          disabled={shared}
          className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full border transition-colors ${shared ? 'bg-green-900/20 border-green-500 text-green-500' : 'border-white/20 hover:bg-white/10 text-white'}`}
        >
          {shared ? <CheckCircle size={20} /> : <Share2 size={20} />}
          {shared ? "+100 XP GANADOS" : "COMPARTIR (+100 XP)"}
        </button>
      </div>
    </div>
  );
}