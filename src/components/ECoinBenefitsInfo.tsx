"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, Coins, ChevronRight } from "lucide-react";

export default function ECoinBenefitsFuturistic() {
  const benefits = [
    {
      title: "Rendimento Contínuo",
      desc: "Mineração via Smart Pools com distribuição de rewards em tempo real na blockchain.",
      icon: Zap,
      color: "from-[#00FF85] to-[#00D1FF]"
    },
    {
      title: "Segurança de Ativos",
      desc: "Protocolo imutável e auditado. Seus tokens E-Coin nunca saem da sua custódia.",
      icon: ShieldCheck,
      color: "from-[#FF007A] to-[#FF5C00]"
    },
    {
      title: "Valorização Económica",
      desc: "Modelo deflacionário inteligente com buyback automático e queima de supply.",
      icon: TrendingUp,
      color: "from-[#00D1FF] to-[#6366f1]"
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-[#020617] overflow-hidden">
      {/* Background futurista */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-4 block"
          >
            EdenKingDom Protocol
          </motion.span>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-white italic tracking-tighter"
          >
            Vantagens da <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3BA2F]">E-Coin</span>
          </motion.h2>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-white/30"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`p-4 rounded-2xl bg-white/5 w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <b.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA "Futurista" */}
        <div className="text-center">
          <Link href="/ecoin-benefits">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-none transition-all"
            >
              Formas de ganhar com a E-Coin
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
}