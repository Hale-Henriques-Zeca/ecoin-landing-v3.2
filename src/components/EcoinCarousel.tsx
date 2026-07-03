"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { Pause, Play } from "lucide-react"; // Usando ícones padrão
import ECoinContractInfo from "@/components/ECoinContractInfo";

type Slide = { title: string; desc: string; img: string };

const slides: Slide[] = [
  { title: "AI-Powered Smart Contracts", desc: "Automation meets security — powered by E-Coin Intelligence.", img: "/images/ai-contract.png" },
  { title: "Cross-Chain Swap Live", desc: "Seamless interoperability across all supported blockchains.", img: "/images/swap.jpg" },
  { title: "Buy-Back Engine Active", desc: "Every transaction fuels E-Coin sustainability & value.", img: "/images/buyback.jpg" },
  { title: "E-Coin is Zero Ownership By Design", desc: "No central control. Ownership-less. Pure decentralization by architecture.", img: "/images/Zero Ownership.png" },
  { title: "Low Gas Fee Protocol", desc: "Optimized for ultra-low latency transactions worldwide.", img: "/images/gasfee.jpg" },
  { title: "There is No Admin", desc: "Only E-Treasury team acts through buy-back mechanism ensuring full decentralization.", img: "/images/Decentralized.jpg" },
  { title: "No Mint by Design", desc: "Mint 100% emitted at deploy time — once and forever.", img: "/images/No Mint.png" },
  { title: "No Burn by Design", desc: "Economic burn via buyback and treasury system. Buyback re-acquires tokens to reserve/inactive wallets.", img: "/images/No Burn by Design.png" },
  { title: "No Privileged Functions", desc: "No owner, no admin, no central control — immutable code by architecture.", img: "/images/No Privileged Functions.png" },
  { title: "Fixed Supply", desc: "E-Coin total supply is permanently capped at deployment — deflationary by logic.", img: "/images/Fixed Supply.png" },
  { title: "Immutable Contract", desc: "No upgrades, no proxy — immutable and verified forever on-chain.", img: "/images/Immutable Contract.png" },
  { title: "No Halving", desc: "No artificial halving events — value is sustained through utility and buyback mechanics.", img: "/images/No Halving.png" },
  { title: "Binance Smart Chain (BEP-20)", desc: "Fully compatible with BSC ecosystem — fast, secure, and low-cost.", img: "/images/Binance Smart Chain (BEP-20).png" },
  { title: "Visit Our Whitepaper & Solidity Interpretation", desc: "Learn more about E-Coin, tokenomics, buyback, and the E-Treasury system.", img: "/images/Whitepaper.jpg" },
];

export default function ECoinSafeguardRingCarousel() {
  const controls = useAnimation();
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);
  
  // Guardar o ângulo atual para retomar o movimento de onde parou
  const currentAngle = useRef(0);

  // ring geometry
  const count = slides.length;
  const step = 360 / count;
  const radius = 360; // px

  // Duração de uma rotação completa (em segundos)
  const rotationDuration = 64; 

  // Função para calcular qual o slide "da frente" baseado no ângulo
  const updateActiveSlide = useCallback((angle: number) => {
    // Normaliza o ângulo para [0, 360[
    const normalized = ((-angle % 360) + 360) % 360;
    const idx = Math.round(normalized / step) % count;
    setActive(idx);
  }, [count, step]);

  // Efeito principal para controlar a animação infinita
  useEffect(() => {
    if (paused) {
      controls.stop();
      // Ao pausar, atualizamos o slide ativo para garantir que corresponde à posição visual
      updateActiveSlide(currentAngle.current);
      return;
    }

    // Define a animação linear e infinita
    controls.start({
      rotateY: [currentAngle.current, currentAngle.current - 360],
      transition: { 
        duration: rotationDuration, 
        ease: "linear", 
        repeat: Infinity,
        // Ao retomar, começa do ângulo atual
        from: currentAngle.current 
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, controls]);

  // Função para lidar com a atualização do ângulo durante a animação
  // Framer Motion fornece o valor atual no callback onUpdate
  const handleAnimationUpdate = (latest: any) => {
    currentAngle.current = latest.rotateY;
    // Opcional: Atualizar o slide ativo em tempo real.
    // Para melhor performance, talvez seja melhor atualizar apenas ao pausar.
    updateActiveSlide(currentAngle.current);
  };

  // Função para alternar o estado de pausa manual
  const togglePause = () => {
    setPaused(!paused);
  };

  const activeSlide = slides[active];

  return (
    <section className="relative w-full overflow-hidden bg-black py-16 sm:py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute top-24 left-10 h-72 w-72 rounded-full bg-[#0B5FFF]/10 blur-3xl" />
        <div className="absolute top-24 right-10 h-72 w-72 rounded-full bg-[#B11226]/10 blur-3xl" />
      </div>

      {/* Title */}
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
          E-Coin is Safe, reliable and Descentralized
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/55">
          No one can stop or control E-Coin
        </p>
        <ECoinContractInfo />
      </div>

      {/* Ring stage */}
      <div className="mx-auto mt-10 sm:mt-14 max-w-6xl px-6">
        <div
          className="relative mx-auto w-full max-w-[980px] rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-10"
          // REMOVIDO: onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd automáticos
        >
          
          {/* ring viewport */}
          <div className="relative mx-auto h-[260px] sm:h-[320px] w-full overflow-hidden">
            {/* subtle vignettes */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-black/60 to-transparent z-30" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-black/60 to-transparent z-30" />

            {/* 3D scene */}
            <div className="absolute inset-0 flex items-center justify-center [perspective:1200px]">
              <motion.div
                className="relative h-[220px] sm:h-[280px] w-[220px] sm:w-[280px] [transform-style:preserve-3d]"
                animate={controls}
                style={{ transformStyle: "preserve-3d" }}
                onUpdate={handleAnimationUpdate} // Atualiza o ângulo atual
              >
                {slides.map((s, i) => {
                  const angle = i * step;
                  
                  // A lógica 'isFront' original dependia de um 'dragY' que não existe mais.
                  // Para o estilo visual, vamos simplificar. 
                  // O slide ativo (que calculamos ao pausar) será o que ganha destaque.
                  const isMain = i === active && paused;

                  return (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                      }}
                    >
                      {/* coin (tornando interativo apenas quando pausado para focar) */}
                      <button
                        type="button"
                        onClick={() => {
                          if (paused) setActive(i);
                        }}
                        className={[
                          "group relative h-20 w-20 sm:h-24 sm:w-24 rounded-full",
                          "outline-none transition-transform duration-300",
                          isMain ? "scale-[1.1]" : "scale-[0.95]",
                          paused ? "cursor-pointer" : "cursor-default"
                        ].join(" ")}
                        aria-label={s.title}
                        disabled={!paused} // Desativa a interação se não estiver pausado
                      >
                        {/* coin rim */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-white/5 blur-[0.2px]" />
                        <div
                          className={[
                            "absolute inset-[2px] rounded-full border transition-colors",
                            isMain ? "border-[#0B5FFF]/80" : "border-white/12",
                          ].join(" ")}
                        />
                        {/* coin face */}
                        <div className="absolute inset-[6px] rounded-full overflow-hidden bg-black">
                          <Image
                            src={s.img}
                            alt={s.title}
                            fill
                            className="object-cover opacity-90 transition-opacity duration-300"
                          />
                        </div>

                        {/* glow */}
                        <div
                          className={[
                            "absolute -inset-2 rounded-full blur-xl opacity-0 transition-opacity duration-300",
                            isMain ? "opacity-100 bg-gradient-to-r from-[#D4AF37]/30 via-[#0B5FFF]/25 to-[#B11226]/25" : "",
                          ].join(" ")}
                        />
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* ADICIONADO: Botão de Controle Manual */}
          <div className="absolute top-6 right-6 z-40">
            <button
              onClick={togglePause}
              className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 p-3 px-4 text-sm font-medium text-white/70 shadow-lg backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              {paused ? (
                <>
                  <Play className="h-4 w-4 fill-white text-white" />
                  Retomar Rotação
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4 fill-white text-white" />
                  Pausar para Ler
                </>
              )}
            </button>
          </div>

          {/* Info card (shows the currently "front" or selected slide) */}
          <div className="mt-6 sm:mt-8 grid gap-4 sm:grid-cols-[1.2fr_2fr] items-stretch">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="relative h-40 sm:h-full min-h-[180px]">
                <Image src={activeSlide.img} alt={activeSlide.title} fill className="object-cover opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-white text-lg sm:text-xl font-semibold">
                  {activeSlide.title}
                </h3>

                <span
                  className={[
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap",
                    paused ? "border-[#D4AF37]/40 text-[#D4AF37]" : "border-white/10 text-white/60",
                  ].join(" ")}
                >
                  <span className={`h-2 w-2 rounded-full ${paused ? 'bg-[#D4AF37]' : 'bg-white/40'}`}></span>
                  {paused ? "Paused • Inspecting" : "Auto • Spinning"}
                </span>
              </div>

              <p className="mt-2 text-white/65 text-sm sm:text-base leading-relaxed">
                {activeSlide.desc}
              </p>

              <div className="mt-4 text-xs text-white/45 bg-black/20 p-3 rounded-lg border border-white/5">
                Utilize o botão acima para pausar o carrossel e ler os detalhes. Quando pausado, pode clicar nas moedas para focar numa específica.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}