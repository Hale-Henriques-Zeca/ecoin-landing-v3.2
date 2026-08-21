"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

export default function EfteExchangeCTA() {
  const [mode, setMode] = useState("Comprar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] text-gray-300 py-12 px-6 rounded-3xl border border-[#D4AF37]/20 shadow-xl w-full">
      {/* LOGO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex justify-center mb-4"
      >
        <img
          src="/logo-ebc.png"
          alt="EBC Logo"
          className="h-24 md:h-32 object-contain"
        />
      </motion.div>

      {/* TÍTULO */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-4xl font-extrabold text-center mb-4"
      >
        <span style={{ color: "#1FA971" }}>EdenKingDom </span>
        <span style={{ color: "#D4AF37" }}>Financial </span>
        <span style={{ color: "#FFFFFF" }}>Tools </span>
        <span style={{ color: "#0B5ED7" }}>Empire</span>
      </motion.h2>

      {/* SUBTÍTULO */}
      <motion.div
        className="text-center mb-8 text-sm md:text-base"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="text-[#0B5ED7] font-bold text-base mb-1">
          O teu portal para a liberdade digital.
        </div>
        <p className="text-gray-400">
          Compra cripto com segurança institucional e acesso Web3 direto.
        </p>
      </motion.div>

      {/* SWITCH */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { id: "Comprar", label: "Comprar" },
          { id: "Vender", label: "Vender" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm border transition-all duration-300 ${
              mode === tab.id
                ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg"
                : "border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTEÚDO DINÂMICO */}
      <motion.div
        key={mode}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="max-w-2xl mx-auto bg-[#0D0D0D]/70 border border-[#D4AF37]/20 rounded-2xl p-6 text-center"
      >
        {mode === "Comprar" ? (
          <div>
            <h3 className="text-xl font-bold text-[#1FA971] mb-3">
              💰 Comprar E-Coin via web3 da EFTE (E-Exchange)
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mb-4">
              Compre na baixa e Venda na alta e ganhe lucros massivos pela margem de diferença de preços da moeda oficial da EdenKingDom Corporation (E-Coin).
            </p>
            <div className="mb-4">
              <div className="h-2.5 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-2.5 bg-[#1FA971] w-[65%] animate-pulse" />
              </div>
              <p className="mt-2 text-xs text-gray-400">
                O Supply da E-Coin é fixo e reciclável através das Vendas e compras.
              </p>
            </div>

            <button
              onClick={() => window.open("https://efte.edenkingdom.org/trade", "_blank")}
              className="mt-4 bg-[#1FA971] text-black font-bold py-3 px-6 rounded-xl hover:bg-[#0B5ED7] hover:text-white transition-all text-sm"
            >
              📈 Comprar E-Coin na EFTE
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-[#fc0000] mb-3">
              🔥 Vender E-Coin via web3 da EFTE (E-Exchange)
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mb-4">
              Compre na baixa e Venda na alta e ganhe lucros massivos pela margem de diferença de preços da moeda oficial da EdenKingDom Corporation (E-Coin).
            </p>
            <div className="mb-4">
              <div className="h-2.5 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-2.5 bg-[#fc0000] w-[65%] animate-pulse" />
              </div>
              <p className="mt-2 text-xs text-gray-400">
                O Supply da E-Coin é fixo e reciclável através das Vendas e compras.
              </p>
            </div>

            <button
              onClick={() => window.open("https://efte.edenkingdom.org/trade", "_blank")}
              className="mt-4 bg-[#fc0000] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0B5ED7] transition-all text-sm"
            >
              📉 Vender E-Coin na EFTE
            </button>
          </div>
        )}
      </motion.div>

      {/* FOOTER SOCIAL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-8 flex flex-col items-center gap-2 text-[#D4AF37]"
      >
        <p className="text-xs text-gray-400">Conecte-se à comunidade EFTE</p>

        <div className="flex justify-center gap-4 text-xl text-gray-300">
          <a href="https://t.me/EdenKingDomBuyCrypto" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition">
            <FaTelegramPlane />
          </a>
          <a href="https://t.me/edenkingdomexchange" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition">
            <FaTelegram />
          </a>
          <a href="https://chat.whatsapp.com/Ge733s4ekK7IQrOWluwZlq" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition">
            <FaWhatsapp />
          </a>
        </div>

        <BsStars className="text-2xl mt-2 animate-pulse text-[#D4AF37]" />
      </motion.div>
    </div>
  );
}