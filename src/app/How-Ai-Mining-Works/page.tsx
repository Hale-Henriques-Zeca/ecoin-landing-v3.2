"use client";

import { motion } from "framer-motion";
import { 
  FaInstagram, FaTiktok, FaFacebookF, FaYoutube, 
  FaTelegramPlane, FaTelegram, FaWhatsapp, FaTwitter, FaDiscord 
} from "react-icons/fa";
import { 
  Pickaxe, PieChart, ShieldCheck, Zap, ArrowRight, Bot, Wallet 
} from "lucide-react";

export default function HowAiMiningWorksPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-gray-200 overflow-hidden py-16 px-6 md:px-12">
      
      {/* 🌟 FUNDO AMBIENTE ECOIN (GOLD/AMBER) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-16">
        
        {/* CABEÇALHO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md">
            <Pickaxe size={16} />
            Mineração & Staking
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Como funciona a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-600">eCoin AI Mining?</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Entenda a matemática, a sustentabilidade e o poder de geração de renda passiva do nosso ecossistema.
          </p>
        </motion.div>

        {/* 💬 SEÇÃO 1: PERGUNTAS FREQUENTES (GANHOS E STAKING) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-[#D4AF37]/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Ganhos & Flexibilidade</h3>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed font-light">
              <p>
                <strong className="text-gray-200">"Qual é o ganho diário ou ganho mínimo?"</strong><br/>
                Na eCoin é tudo flexível e instantâneo — o poder da conquista e liberdade financeira é isso, sem limites e barreiras. Os ganhos dependem da compra de ecGas.
              </p>
              <p>
                Existe um auge nos ganhos estabelecido em <strong className="text-[#D4AF37]">130%</strong>. A verdadeira mecânica por trás do investimento está na sua participação na pool de Staking.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-[#D4AF37]/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <PieChart size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">A Fatia do Bolo (Pool)</h3>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed font-light">
              <p>
                O Staking torna-te capaz de participar da fatia do bolo que cada compra de ecGas proporciona. Logo após fazer staking, o painel exibe a sua percentagem de participação.
              </p>
              <p>
                Se a sua participação for <strong className="text-gray-200">10%</strong>, sempre que alguém comprar ecGas, 10% do valor enviado à mesa vai para si. Se entrarem $100, $10 vão para si instantaneamente.
              </p>
              <p>
                Essa percentagem define a velocidade com que atinge os 130%. Que os outros que tem apenas 0.01% da participação da fatia 🍰 do bolo.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 🛡️ SEÇÃO 2: SUSTENTABILIDADE E DISTRIBUIÇÃO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 relative overflow-hidden"
        >
          {/* Brilho interno */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <ShieldCheck className="text-[#D4AF37]" size={32} />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Sustentabilidade do Ecossistema</h2>
          </div>

          <div className="space-y-6 text-gray-300 font-light leading-relaxed relative z-10">
            <p className="text-lg">
              Como qualquer ecossistema financeiro sólido, a eCoin possui uma fonte de produção e reprodução matemática que impede o colapso do sistema. É possível minerar sem ecGas? <strong className="text-[#D4AF37]">Obviamente não.</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Lado Esquerdo: Fontes */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg border-b border-white/10 pb-2">Fontes de Lucro</h4>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    A compra de ecGas é a principal fonte de lucro e saque para investidores.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    O sistema de indicação por níveis depende da taxa de saques (10%) e compras de ecGas.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    Compras de ecGas realizadas pelo futuro Neural AI Trading Bot, igualmente é uma fonte.
                  </li>
                </ul>
              </div>

              {/* Lado Direito: Taxa de Saque */}
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <h4 className="text-[#D4AF37] font-bold mb-4">Distribuição da Taxa de Saque (10%)</h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between items-center">
                    <span>Sistema de Indicação (3 Níveis)</span>
                    <strong className="text-white bg-white/10 px-2 py-1 rounded">30%</strong>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="pr-4">Reinvestimento (Distribuição horária visível no painel VELOCIDADE DE RECOMPENSA)</span>
                    <strong className="text-white bg-white/10 px-2 py-1 rounded">20%</strong>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Retorno ao Tesouro (Bônus futuros)</span>
                    <strong className="text-white bg-white/10 px-2 py-1 rounded">50%</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 🔗 SEÇÃO 3: LINKS ÚTEIS (BOTÕES PREMIUM) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="https://ecoin.edenkingdom.org/ecoin-ai-trading" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <Bot size={32} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white">AI Trading Bot</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">Acessar <ArrowRight size={12} /></span>
          </a>

          <a 
            href="https://ecoin.edenkingdom.org/Savings" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <Wallet size={32} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white">Painel de Mineração</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">Acessar <ArrowRight size={12} /></span>
          </a>

          <a 
            href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ?s=cl&p=a&mlu=1&amv=0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <FaWhatsapp size={32} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white">Comunidade VIP</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">Entrar no Grupo <ArrowRight size={12} /></span>
          </a>
        </div>

        {/* 🌐 SEÇÃO 4: REDES SOCIAIS OFICIAIS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-10 border-t border-white/10 text-center"
        >
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm">
            Siga a <span className="text-[#D4AF37]">E-Coin</span> Oficial
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://t.me/ecoin2026" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 text-[#D4AF37]">
              <FaTelegramPlane size={24} />
            </a>
            <a href="https://t.me/ecoin2025" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 text-[#D4AF37]">
              <FaTelegram size={24} />
            </a>
            <a href="https://x.com/CoinE28810?t=Dm9BWORAfzh5YcuqHYIUwQ&s=09" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 text-[#D4AF37]">
              <FaTwitter size={24} />
            </a>
            <a href="https://discord.com/users/1443996675638300834" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 text-[#D4AF37]">
              <FaDiscord size={24} />
            </a>
            <a href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 text-[#D4AF37]">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}