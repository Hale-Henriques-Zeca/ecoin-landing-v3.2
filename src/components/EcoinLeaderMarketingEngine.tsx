"use client";

import { useState, useMemo, useRef } from "react";
import QRCode from "react-qr-code";
import { Copy, Download, Share2, Send, MessageSquare, Twitter, LogOut, Wallet } from "lucide-react";
import { useAccount, useDisconnect, useWriteContract, usePublicClient } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Contextos e Componentes Internos
import { useDexWallet } from "@/contexts/DexWalletContext";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";

export default function EcoinLeaderMarketingEngine() {
  /* ==========================================================================
     1. WALLET HOOKS & CONTEXTS (Sempre no topo)
     ========================================================================== */
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { balances, isOwner } = useDexWallet();

  /* ==========================================================================
     2. ESTADOS LOCALIZADOS
     ========================================================================== */
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  /* ==========================================================================
     3. LÓGICA DE MEMOIZAÇÃO (TEXTOS E LINKS)
     ========================================================================== */
  const referralLink = useMemo(() => {
    if (!address) return "";
    return `https://ecoin.edenkingdom.org/?ref=${address}`;
  }, [address]);

  const marketingText = useMemo(() => {
    if (!address) return "";
    return `🚀 Torna-te líder na nova economia Web3!\n\nA E-Coin está a construir um ecossistema sustentável com staking real, buyback inteligente e infraestrutura on-chain.\n\n🔥 Junta-te à minha equipa e cresce connosco.\n\n🔗 Regista-te aqui:\n${referralLink}\n\n🏦 Meu endereço BEP20:\n${address}\n\n#ECoin #Web3 #CryptoLeadership`;
  }, [address, referralLink]);

  /* ==========================================================================
     4. FUNÇÕES DE AÇÃO (CLIPBOARD & EXPORT)
     ========================================================================== */
  const copyLink = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyAddress = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const copyMarketing = async () => {
    if (!marketingText) return;
    await navigator.clipboard.writeText(marketingText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const shareMarketing = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "E-Coin Web3 Invitation",
          text: marketingText,
        });
      } catch (error) {
        console.error("Erro ao partilhar:", error);
      }
    } else {
      copyMarketing();
    }
  };

  const downloadQR = () => {
    if (!qrRef.current || !address) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const img = new Image();
    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1350;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fundo Gradiente Profundo Premium
      const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(1, "#1e293b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Moldura Dourada Luxo
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 8;
      ctx.strokeRect(40, 40, 1000, 1270);

      // Título Principal
      ctx.fillStyle = "#D4AF37";
      ctx.font = "bold 64px Arial";
      ctx.textAlign = "center";
      ctx.fillText("E-Coin Official Leader Invitation", 540, 160);

      // Subtítulo
      ctx.fillStyle = "#ffffff";
      ctx.font = "32px Arial";
      ctx.fillText("Join My E-Coin Web3 Network", 540, 210);

      // Caixa Branca para o QR Code
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(240, 300, 600, 600);
      ctx.drawImage(img, 260, 320, 560, 560);

      // Informações do Link
      ctx.fillStyle = "#ffffff";
      ctx.font = "28px Arial";
      ctx.fillText("Register Using My Link:", 540, 980);

      ctx.font = "24px Arial";
      const shortLink = referralLink.length > 45 ? `${referralLink.slice(0, 45)}...` : referralLink;
      ctx.fillText(shortLink, 540, 1030);

      // Endereço da Carteira
      ctx.font = "24px Arial";
      ctx.fillText("BEP20 Wallet:", 540, 1090);
      ctx.font = "22px Arial";
      ctx.fillText(address.slice(0, 21), 540, 1130);
      ctx.fillText(address.slice(21), 540, 1165);

      // Rodapé
      ctx.font = "22px Arial";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Powered by E-Coin Web3 Infrastructure", 540, 1290);

      // Download Trigger
      const jpgFile = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = jpgFile;
      link.download = `Ecoin-Leader-Card-${address}.jpg`;
      link.click();

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  /* ==========================================================================
     5. RENDERIZAÇÃO DO COMPONENTE (INTERFACE DE USUÁRIO)
     ========================================================================== */
  return (
    <div className="w-full max-w-6xl mx-auto bg-zinc-950/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 md:p-10 my-10 shadow-2xl">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] tracking-wide mb-4">
          🚀 E-Coin Leader Marketing Engine
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
          Ferramentas avançadas para líderes promoverem o ecossistema E-Coin através de links Web3 estruturados, QR Codes institucionais e conteúdos prontos para conversão.
        </p>
      </div>

      {/* WALLET STATUS BAR */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
            <Wallet size={20} />
          </div>
          <div>
            <h4 className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Status de Liderança</h4>
            <p className="text-sm font-semibold text-zinc-200">
              {isConnected ? "Sessão Web3 Ativa" : "Aguardando Conexão de Líder"}
            </p>
          </div>
        </div>

        <div>
          {!isConnected ? (
            <ConnectButton label="Conectar Carteira de Líder" showBalance={false} />
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1.5 rounded-full font-mono font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full font-medium"
              >
                <LogOut size={13} />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>

      {/* GRID PRINCIPAL DE MAILING E CONVERSÃO */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* COLUNA ESQUERDA: LINKS DE AFILIADO & ARTE DIGITAL */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#D4AF37] mb-2 flex items-center gap-2">
              <span>🔗</span> Link de Referência Único
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Use este link para registrar sua rede direta. Seus bônus de rede e participação serão vinculados on-chain a este endereço.
            </p>

            <div className="bg-black/40 border border-zinc-800 rounded-xl p-4 font-mono text-sm break-all text-zinc-300 selection:bg-[#D4AF37]/30 min-h-[52px] flex items-center">
              {isConnected ? referralLink : <span className="text-zinc-600 italic">Conecte sua carteira para gerar o link</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <button
              onClick={copyLink}
              disabled={!isConnected}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-600 text-black font-bold text-sm flex items-center gap-2 justify-center transition active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-lg shadow-amber-500/5"
            >
              <Copy size={16} />
              {copiedLink ? "Copiado!" : "Copiar Link"}
            </button>

            <button
              onClick={downloadQR}
              disabled={!isConnected}
              className="px-4 py-2.5 rounded-xl border border-zinc-700 hover:border-[#D4AF37] text-zinc-200 hover:text-[#D4AF37] font-semibold text-sm flex items-center gap-2 justify-center transition bg-zinc-900/50 disabled:opacity-30 disabled:pointer-events-none"
            >
              <Download size={16} />
              Baixar Card Premium
            </button>
          </div>
        </div>

        {/* COLUNA DIREITA: ENDEREÇO BEP20 & QR CODE DE DEPÓSITO/REGISTRO */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 text-center flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-[#D4AF37] mb-2 self-start flex items-center gap-2">
            <span>🏦</span> Identidade BEP20 On-Chain
          </h3>
          <p className="text-xs text-zinc-400 mb-6 self-start text-left">
            Código QR público estruturado para transferências diretas de BNB e interações inteligentes na rede Binance Smart Chain: scan imediato do seu upline para vincula-lo na live.
          </p>

          {isConnected ? (
            <div className="w-full flex flex-col items-center">
              <div className="bg-black/30 border border-zinc-800 rounded-xl px-4 py-2.5 font-mono text-xs text-zinc-400 break-all w-full max-w-md mb-6 flex items-center justify-between gap-2">
                <span className="truncate">{address}</span>
                <button 
                  onClick={copyAddress} 
                  className="text-[#D4AF37] hover:text-amber-400 p-1 rounded transition shrink-0"
                  title="Copiar Endereço Completo"
                >
                  {copiedAddress ? <span className="text-xs font-sans text-green-400">✓</span> : <Copy size={14} />}
                </button>
              </div>

              {/* QR CODE WRAPPER */}
              <div className="bg-white p-3.5 rounded-xl shadow-xl inline-block transition-transform hover:scale-[1.02] duration-300">
                <div ref={qrRef}>
                  <QRCode value={address} size={180} level="H" />
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-3 font-medium">
                Este QR Code contém exclusivamente o seu endereço público BEP20.
              </p>
            </div>
          ) : (
            <div className="py-12 text-zinc-600 italic text-sm">
              Conecte sua carteira para instanciar as credenciais de rede.
            </div>
          )}
        </div>
      </div>

      {/* SEÇÃO 6: BALANCES & INTEGRATED METRICS DASHBOARD */}
      <div className="mt-8 bg-zinc-900/20 border border-zinc-800/60 rounded-xl p-4">
        <EcoinWalletDashboard />
      </div>

      {/* SEÇÃO 7: COPYWRITING HUB & COMPARTILHAMENTO EM REDES SOCIAIS */}
      {isConnected && (
        <div className="mt-8 border-t border-zinc-800/80 pt-8">
          <h3 className="text-xl font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
            <span>📢</span> Kit de Divulgação para Líderes
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* TEXT BOX PRE-MADE */}
            <div className="lg:col-span-2 bg-black/50 border border-zinc-800 rounded-xl p-5 relative flex flex-col justify-between">
              <div>
                <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-widest text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  Copywriting Pronto
                </span>
                <p className="text-sm text-zinc-300 font-sans whitespace-pre-line leading-relaxed pt-2 pr-12 select-all">
                  {marketingText}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-zinc-900">
                <button
                  onClick={copyMarketing}
                  className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 transition active:scale-95"
                >
                  <Copy size={14} />
                  {copiedText ? "Texto Copiado!" : "Copiar Texto Base"}
                </button>

                <button
                  onClick={shareMarketing}
                  className="px-5 py-2 rounded-xl border border-green-500/30 hover:border-green-500 bg-green-500/5 text-green-400 hover:text-green-300 text-xs font-semibold flex items-center gap-2 transition"
                >
                  <Share2 size={14} />
                  Compartilhamento Nativo
                </button>
              </div>
            </div>

            {/* QUICK SOCIAL SHARE LINKS */}
            <div className="flex flex-col gap-3 justify-between">
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex-1 flex flex-col justify-center">
                <p className="text-xs font-medium text-zinc-400 mb-4 text-center">
                  Compartilhamento direto via API oficial das redes:
                </p>
                
                <div className="space-y-2.5">
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(marketingText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#229ED9]/10 border border-[#229ED9]/20 text-[#229ED9] hover:bg-[#229ED9]/20 transition font-medium text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <Send size={16} /> Telegram Elite
                    </span>
                    <span className="text-xs opacity-60">Disparar →</span>
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(marketingText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition font-medium text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare size={16} /> WhatsApp Direct
                    </span>
                    <span className="text-xs opacity-60">Disparar →</span>
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(marketingText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition font-medium text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <Twitter size={16} /> Twitter / X Global
                    </span>
                    <span className="text-xs opacity-60">Disparar →</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}