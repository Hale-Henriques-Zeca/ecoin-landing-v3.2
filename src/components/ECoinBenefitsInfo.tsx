"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, ChevronRight, Sparkles } from "lucide-react";

export default function ECoinBenefitsFuturistic() {
  const benefits = [
    {
      title: "Rendimento Contínuo",
      desc: "Mineração via Smart Pools com distribuição de rewards em tempo real na blockchain.",
      icon: Zap,
      badge: "Smart Pool",
      borderColor: "border-emerald-500/30 hover:border-emerald-400/60",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      accentGradient: "from-emerald-400 to-cyan-500"
    },
    {
      title: "Segurança de Ativos",
      desc: "Protocolo imutável e auditado. Seus tokens E-Coin nunca saem da sua custódia.",
      icon: ShieldCheck,
      badge: "Web3 Custody",
      borderColor: "border-pink-500/30 hover:border-pink-400/60",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
      iconBg: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      accentGradient: "from-pink-500 to-amber-500"
    },
    {
      title: "Valorização Económica",
      desc: "Modelo deflacionário inteligente com buyback automático e queima de supply.",
      icon: TrendingUp,
      badge: "Deflationary",
      borderColor: "border-cyan-500/30 hover:border-cyan-400/60",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
      iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      accentGradient: "from-cyan-400 to-indigo-500"
    }
  ];

  return (
    <section className="relative py-28 px-6 bg-[#020204] overflow-hidden">
      {/* Background futurista com efeitos gold & cyan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#121216_1px,transparent_1px),linear-gradient(to_bottom,#121216_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>EdenKingDom Protocol</span>
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-white italic tracking-tighter"
          >
            Vantagens da <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-400 to-[#F3BA2F]">E-Coin</span>
          </motion.h2>
        </div>

        {/* Grid de Cards com Visual Totalmente Reformulado (Estilo Cyber-Glassmorphism Premium) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-3xl bg-gradient-to-b from-zinc-900/90 to-black/95 border ${b.borderColor} p-8 backdrop-blur-xl transition-all duration-500 ${b.glowColor} overflow-hidden`}
            >
              {/* Linha de destaque superior no card */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${b.accentGradient}`} />

              {/* Badge interno flutuante */}
              <div className="flex items-center justify-between mb-8">
                <div className={`p-4 rounded-2xl border ${b.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <b.icon size={26} />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  {b.badge}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="relative z-10">
                <h3 className="text-xl font-extrabold text-white mb-3 tracking-wide group-hover:text-amber-300 transition-colors">
                  {b.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {b.desc}
                </p>
              </div>

              {/* Efeito de luz decorativo de fundo no hover */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* CTA "Futurista" atualizado */}
        <div className="text-center">
          <Link href="/ecoin-benefits">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all duration-300"
            >
              <span>Formas de ganhar com a E-Coin</span>
              <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
}