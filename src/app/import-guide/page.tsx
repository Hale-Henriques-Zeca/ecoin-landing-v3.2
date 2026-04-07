"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Copy, Check, Wallet, Globe, Smartphone, Monitor, 
  ChevronRight, Info, ExternalLink, ShieldCheck, Database, Cpu
} from "lucide-react";
import TrustWalletNeuralImporter from "@/components/TrustWalletNeuralImporter";
import BlockchainDeviceAlert from "@/components/BlockchainDeviceAlert";

const ECOIN = "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964";
const USDT = "0x55d398326f99059fF775485246999027B3197955";

const WALLET_DIRECTORY = [
  { name: "MetaMask", url: "https://metamask.io/download/", color: "bg-orange-600" },
  { name: "Trust Wallet", url: "https://trustwallet.com/download", color: "bg-blue-600" },
  { name: "OKX Wallet", url: "https://www.okx.com", color: "bg-black" },
  { name: "Binance Web3", url: "https://www.binance.com", color: "bg-yellow-500" },
  { name: "TokenPocket", url: "https://www.tokenpocket.pro", color: "bg-blue-400" },
  { name: "SafePal", url: "https://www.safepal.com", color: "bg-purple-600" },
  { name: "Bitget Wallet", url: "https://web3.bitget.com", color: "bg-emerald-500" },
  { name: "Coin98", url: "https://coin98.com", color: "bg-yellow-700" },
];

export default function ImportGuide() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-white p-6 space-y-12 font-sans">
      
      {/* 👑 HERO SECTION */}
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-xs font-bold uppercase tracking-widest"
        >
          <ShieldCheck size={14} /> Centro de Suporte Oficial E-Coin
        </motion.div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic">
          CONFIGURAÇÃO <span className="text-[#D4AF37]"> E-COIN NEURAL WEB3</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Siga este guia profissional para integrar os ativos da EdenKingdom na sua carteira preferida via <span className="text-yellow-500 font-bold">BNB Smart Chain</span>.
        </p>
      </div>
<BlockchainDeviceAlert />
      {/* 📋 CONTRATOS DE ELITE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "E-Coin Token (EKD)", address: ECOIN, icon: <Cpu className="text-[#D4AF37]" /> },
          { name: "USDT (BEP-20)", address: USDT, icon: <div className="text-emerald-500 font-bold">S</div> }
        ].map((token) => (
          <div key={token.name} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Copy size={60} />
            </div>
            <div className="flex items-center gap-3 mb-4">
              {token.icon}
              <h3 className="font-bold text-sm uppercase tracking-widest">{token.name}</h3>
            </div>
            <div className="flex flex-col gap-3">
              <code className="bg-black/60 p-4 rounded-xl text-[10px] md:text-xs text-gray-300 border border-white/5 break-all font-mono">
                {token.address}
              </code>
              <button
                onClick={() => copyToClipboard(token.address, token.name)}
                className="w-full py-3 bg-[#D4AF37] text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
              >
                {copied === token.name ? <Check size={16} /> : <Copy size={16} />}
                {copied === token.name ? "Copiado!" : "Copiar Contrato"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🚀 PASSO A PASSO INTERATIVO */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <ChevronRight className="text-[#D4AF37]" /> Guia de Importação em 3 Passos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PASSO 1 */}
          <div className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] relative">
            <div className="text-5xl font-black text-white/5 absolute top-4 right-6">01</div>
            <div className="bg-yellow-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20">
              <Globe className="text-yellow-500" />
            </div>
            <h4 className="font-bold mb-3 uppercase text-xs tracking-widest">Ativar Rede</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Abra as configurações de rede da sua Wallet e selecione <b>BNB Smart Chain</b> (ou BSC). É a rede onde o ecossistema E-Coin vive.
            </p>
          </div>

          {/* PASSO 2 */}
          <div className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] relative">
            <div className="text-5xl font-black text-white/5 absolute top-4 right-6">02</div>
            <div className="bg-[#D4AF37]/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-[#D4AF37]/20">
              <Wallet className="text-[#D4AF37]" />
            </div>
            <h4 className="font-bold mb-3 uppercase text-xs tracking-widest">Importar Ativo</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Procure pelo botão <b>"Importar Token"</b> ou <b>"+ Custom Token"</b>. Certifique-se de que está no modo "Personalizado".
            </p>
          </div>

          {/* PASSO 3 */}
          <div className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] relative">
            <div className="text-5xl font-black text-white/5 absolute top-4 right-6">03</div>
            <div className="bg-emerald-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
              <Check className="text-emerald-500" />
            </div>
            <h4 className="font-bold mb-3 uppercase text-xs tracking-widest">Colar Contrato</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Cole o contrato copiado acima. O nome (E-Coin) e decimais (18) devem aparecer <b>automaticamente</b>. Confirme a importação.
            </p>
          </div>
        </div>
      </div>

      {/* 📱 DIRETÓRIO DE CARTEIRAS */}
      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Ecossistema de Carteiras</h2>
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-1">Multi-Platform Compatibility</p>
          </div>
          <div className="flex gap-4">
             <Monitor size={20} className="text-white/20" />
             <Smartphone size={20} className="text-white/20" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {WALLET_DIRECTORY.map((wallet) => (
            <a
              key={wallet.name}
              href={wallet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center gap-3 group hover:border-[#D4AF37]/50 hover:bg-black/60 transition-all active:scale-95"
            >
              <div className={`w-10 h-10 rounded-xl ${wallet.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                {wallet.name[0]}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                {wallet.name}
              </span>
              <ExternalLink size={10} className="text-white/20 group-hover:text-[#D4AF37]" />
            </a>
          ))}
        </div>
      </div>

      {/* 💡 DICA PRO */}
      <div className="flex items-center gap-4 bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl">
        <Info className="text-blue-400 shrink-0" size={24} />
        <p className="text-[10px] md:text-xs text-blue-200 leading-relaxed">
          <b>Dica Pro:</b> Caso utilize a Binance Web3 Wallet ou OKX Wallet, o token E-Coin pode ser adicionado pesquisando diretamente o endereço do contrato na barra de busca de ativos. Certifique-se sempre de estar na rede <b>BNB Smart Chain (BEP-20)</b> para evitar perda de fundos.
        </p>
      </div>

      {/* ⚠️ ALERTA DE SEGURANÇA CRÍTICA: AUTO-CUSTÓDIA */}
<div className="relative overflow-hidden bg-red-500/5 border border-red-500/20 p-8 rounded-[2.5rem] mt-12 group">
  
  {/* Efeito visual de pulsação de alerta */}
  <div className="absolute top-0 right-0 p-6 opacity-10 animate-pulse">
    <ShieldCheck size={80} className="text-red-500" />
  </div>

  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
    <div className="bg-red-500/20 p-4 rounded-2xl shrink-0 border border-red-500/30">
      <Info className="text-red-500" size={32} />
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-black text-red-500 uppercase tracking-tighter italic">
        Aviso de Responsabilidade: Tu és o teu próprio Banco! 🏦
      </h3>

      <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed">
        <p>
          No mundo Web3, a **E-Coin** e as carteiras (MetaMask, Trust, Binance Web3) não têm acesso ao teu dinheiro. 
          É **CRUCIAL** que guardes a tua <span className="text-white font-bold underline">Frase de Recuperação (12/24 palavras)</span> e a tua <span className="text-white font-bold underline">Chave Privada</span> em locais físicos e seguros (como papel ou metal).
        </p>

        <div className="bg-black/40 p-4 rounded-xl border-l-4 border-red-600 italic">
          "Se perderes o teu dispositivo, esqueceres o PIN ou a senha, a **ÚNICA** maneira de recuperar os teus ativos são estas palavras. Se não as tiveres, os teus fundos estarão **PERDIDOS PARA SEMPRE**."
        </div>

        <p className="font-medium">
          Lembra-te: Ninguém pode ajudar-te a recuperar a conta — nem a equipa E-Coin, nem os fornecedores da carteira, nem governos. 
          <span className="text-[#D4AF37] block mt-2 font-bold uppercase tracking-widest">
            Tu és o dono soberano do teu dinheiro. Tu decides quanto e quando movimentar sem interferências. 
            A tua liberdade financeira depende da tua segurança. Yeah! 🚀
          </span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-bold text-red-400 uppercase tracking-widest">
          🚫 Nunca partilhes as tuas palavras
        </div>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          🔐 Guarda em Local Offline
        </div>
      </div>
    </div>
  </div>
</div>

{/* 🛡️ ALERTA DE SEGURANÇA 02: PROTEÇÃO CONTRA ROUBO E ACESSO INDEVIDO */}
<div className="relative overflow-hidden bg-orange-500/5 border border-orange-500/20 p-8 rounded-[2.5rem] mt-8 group">
  
  {/* Ícone de Cadeado em Chamas no fundo */}
  <div className="absolute top-0 right-0 p-6 opacity-10 animate-pulse">
    <Database size={80} className="text-orange-500" />
  </div>

  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
    <div className="bg-orange-500/20 p-4 rounded-2xl shrink-0 border border-orange-500/30">
      <ShieldCheck className="text-orange-500" size={32} />
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-black text-orange-500 uppercase tracking-tighter italic">
        ALERTA DE INTRUSÃO: Protege a tua Chave como a tua Vida! 🔐
      </h3>

      <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed">
        <p>
          A tua **Frase de Recuperação** e **Chave Privada** são o acesso total ao teu cofre. Se alguém tiver acesso a elas — seja por e-mail comprometido, backups na nuvem ou espionagem física — essa pessoa poderá **ROUBAR OS TEUS FUNDOS** instantaneamente e sem qualquer impedimento.
        </p>

        <div className="bg-black/60 p-5 rounded-2xl border-l-4 border-orange-600">
          <p className="font-bold text-orange-400 mb-2 uppercase text-[10px] tracking-widest">🚨 Protocolo de Emergência E-Coin:</p>
          "Se suspeitas que alguém conheça ou tenha tido acesso aos teus dados, senhas ou PINs, a nossa equipa aconselha veementemente: **Crie uma nova carteira imediatamente e transfira todos os teus fundos da carteira antiga.**"
        </div>

        <p className="font-medium text-white/80 italic">
          Isto não é apenas um conselho, é uma **Nota de Segurança Vital**. Se os teus ativos forem drenados por má gestão das tuas chaves, o Suporte E-Coin **NÃO TERÁ COMO AJUDAR-TE**, muito menos recuperar fundos perdidos.
        </p>

        <p className="text-[#D4AF37] font-bold uppercase tracking-widest text-[10px] md:text-xs">
          Na Blockchain, a transação é irreversível. O único guardião da tua riqueza és TU. Fica atento, fica seguro. Yeah! 🚀
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] font-bold text-orange-400 uppercase tracking-widest">
          ⚠️ Transação Irreversível
        </div>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          💻 Cuidado com Backups na Nuvem
        </div>
      </div>
    </div>
  </div>
</div>

 <TrustWalletNeuralImporter />


      <p className="text-center text-[9px] text-white/20 uppercase tracking-[0.4em]">
        © 2025 EdenKingdom Ecosystem • Security First
      </p>
    </div>
  );
}
