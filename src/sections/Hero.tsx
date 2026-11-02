"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  LineChart,
  Scale,
  HeartHandshake,
  Globe,
  Coins,
  Gift,
  ExternalLink,
  Sparkles,
  Flame
} from "lucide-react";

export default function Hero() {
  // 🟦 Gerar partículas SOMENTE no cliente
  const [particles, setParticles] = useState<any[]>([]);

  // Estados do carrossel estilo Shiba Inu
  const [isPaused, setIsPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Slides oficiais integrados com os 6 módulos da eCoin
  const slides = [
    {
      id: 1,
      title: "Whitepaper",
      desc: "Documento técnico oficial da E-Coin detalhando o ecossistema e tokenomics.",
      tag: "TECNOLOGIA",
      img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      href: "/whitepaper",
      actionText: "Acessar",
      icon: <LineChart size={18} />
    },
    {
      id: 2,
      title: "Business Presentation",
      desc: "Visão estratégica, expansão de mercado e modelo corporativo global.",
      tag: "ESTRATÉGIA",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      href: "/EcoinBusinessPresentation",
      actionText: "Acessar",
      icon: <Globe size={18} />
    },
    {
      id: 3,
      title: "Líder de Equipes",
      desc: "Gestão, estrutura organizacional e liderança descentralizada.",
      tag: "ECOSSISTEMA",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      href: "/equipes",
      actionText: "Acessar",
      icon: <HeartHandshake size={18} />
    },
    {
      id: 4,
      title: "Solidity Interpretation",
      desc: "Análise técnica avançada e segurança do contrato inteligente verificado.",
      tag: "AUDITORIA",
      img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      href: "/ECoinSolidity",
      actionText: "Acessar",
      icon: <Scale size={18} />
    },
    {
      id: 5,
      title: "Buy eCoin",
      desc: "Adquira eCoin instantaneamente com total segurança e liquidez garantida.",
      tag: "MERCADO",
      img: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80",
      href: "/buyeCoin",
      actionText: "Acessar",
      icon: <Coins size={18} />
    },
    {
      id: 6,
      title: "Airdrop & Mineração",
      desc: "Participe da mineração progressiva e resgate as suas recompensas exclusivas.",
      tag: "RECOMPENSAS",
      img: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
      href: "/airDropMining",
      actionText: "Acessar",
      icon: <Gift size={18} />
    }
  ];

  useEffect(() => {
    const p = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: 6 + Math.random() * 5,
      delay: Math.random() * 5,
    }));
    setParticles(p);
  }, []);

  // Lógica de Autoplay contínuo para o carrossel
  useEffect(() => {
    let interval: any;
    if (!isPaused && !isDragging) {
      interval = setInterval(() => {
        if (carouselRef.current) {
          const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
          if (carouselRef.current.scrollLeft >= maxScroll) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carouselRef.current.scrollBy({ left: 2, behavior: 'auto' });
          }
        }
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  // Handlers para Arrastar o Carrossel (Mouse / Touch)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  return (
    <section className="
      relative
      w-full
      min-h-screen
      flex
      flex-col
      items-center
      justify-start
      bg-black
      pt-safe
      pb-20
      overflow-hidden
    ">

      {/* Fundo Radial posicionado por trás */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.35),transparent_70%)] animate-pulse pointer-events-none"></div>

      {/* Partículas */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#D4AF37] rounded-full"
            initial={{
              opacity: 0,
              scale: 0,
              left: `${p.x}%`, 
              top: `${p.y}%`,  
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.3, 0],
              x: "+=80",
              y: "-=120",
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
            style={{
              width: p.size,
              height: p.size,
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>

      {/* BOTÕES DE MARKETING NAS LATERAIS (ABAIXO DOS EMOJIS) */}
      <div className="absolute top-28 left-4 md:left-12 z-30 hidden sm:block">
        <Link href="/airDropMining">
          <motion.div 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold px-4 py-2.5 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.6)] border border-emerald-300/40 cursor-pointer animate-bounce"
          >
            <Gift size={18} className="text-emerald-200" />
            <span className="text-xs uppercase tracking-wider">🎁 Airdrop Grátis</span>
          </motion.div>
        </Link>
      </div>

      <div className="absolute top-28 right-4 md:right-12 z-30 hidden sm:block">
        <Link href="/buyeCoin">
          <motion.div 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold px-4 py-2.5 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.6)] border border-yellow-200/50 cursor-pointer animate-pulse"
          >
            <Flame size={18} className="text-black fill-black" />
            <span className="text-xs uppercase tracking-wider">🚀 Buy eCoin</span>
          </motion.div>
        </Link>
      </div>

      {/* LOGO + CÍRCULO PREMIUM */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-20 mt-16 sm:mt-21"
      >
        <div className="relative flex justify-center">

          {/* Círculo suave */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full border border-[#D4AF37]/40 animate-pulse-soft"
          ></motion.div>

          {/* Círculo rotativo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="absolute w-[320px] h-[320px] rounded-full border border-[#D4AF37]/25"
          ></motion.div>

          {/* LOGO */}
          <Image
            src="/AI-E-Coin-Logo2.PNG"
            alt="E-Coin Logo"
            width={300}
            height={300}
            priority
            className="
              w-[200px]
              sm:w-[240px]
              md:w-[260px]
              object-contain
              drop-shadow-[0_0_30px_rgba(212,175,55,0.75)]
            "
          />

        </div>
      </motion.div>

      {/* TÍTULO + DESCRIÇÃO */}
      <motion.div
        className="relative z-20 mt-8 px-4 flex flex-col items-center text-center w-full max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
      >
        <h1 className="
          text-3xl sm:text-4xl md:text-5xl lg:text-5xl
          font-extrabold
          text-[#D4AF37]
          tracking-wider
          drop-shadow-lg
          max-w-3xl
        ">
          EDENKINGDOM COIN
        </h1>

        <p className="
          text-gray-300
          text-sm sm:text-base md:text-lg
          mt-4
          max-w-xl
        ">
          A moeda corporativa da EdenKingDom — construída com tecnologia, segurança e visão eterna.
        </p>

        {/* BOTÕES DE MARKETING MOBILE (PARA APARECER EM TELAS PEQUENAS) */}
        <div className="flex sm:hidden gap-4 mt-6">
          <Link href="/airDropMining">
            <div className="flex items-center gap-1.5 bg-emerald-600 text-white font-bold px-3 py-2 rounded-full text-xs shadow-md">
              <Gift size={14} /> Airdrop
            </div>
          </Link>
          <Link href="/buyeCoin">
            <div className="flex items-center gap-1.5 bg-amber-500 text-black font-extrabold px-3 py-2 rounded-full text-xs shadow-md">
              <Coins size={14} /> Buy eCoin
            </div>
          </Link>
        </div>

        {/* CARROSSEL EXECUTIVO INTEGRADO DIRETAMENTE NO HERO */}
        <div className="w-full mt-12">
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-hidden cursor-grab active:cursor-grabbing px-4 select-none w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={(e) => {
              if (!isDragging || !carouselRef.current) return;
              const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
              const walk = (x - startX) * 2;
              carouselRef.current.scrollLeft = scrollLeft - walk;
            }}
          >
            {/* Duplicamos os slides para criar o efeito contínuo infinito */}
            {[...slides, ...slides].map((slide, index) => (
              <div 
                key={`${slide.id}-${index}`}
                className="
                  min-w-[300px] md:min-w-[340px] lg:min-w-[360px]
                  group
                  relative
                  p-6
                  rounded-2xl
                  bg-gradient-to-br from-black/80 to-[#111]/90
                  border border-[#D4AF37]/30
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:scale-[1.03]
                  hover:border-[#D4AF37]
                  hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]
                  flex flex-col
                  justify-between
                  text-left
                "
              >
                <div className="
                  absolute inset-0 rounded-2xl opacity-0
                  group-hover:opacity-100
                  bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_70%)]
                  transition
                  pointer-events-none
                "></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/20 flex items-center gap-1.5">
                      {slide.icon} {slide.tag}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {String(slide.id).padStart(2, '0')} / 06
                    </span>
                  </div>
                  
                  {/* Imagem em formato retangular médio */}
                  <div className="w-full h-36 mb-4 rounded-[1rem] overflow-hidden border border-gray-800 bg-black">
                     <Image 
                       src={slide.img} 
                       alt={slide.title} 
                       width={350}
                       height={150}
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                     />
                  </div>

                  <h3 className="text-lg font-semibold text-[#D4AF37] mb-2 group-hover:text-yellow-300 transition-colors">
                    {slide.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">
                    {slide.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-[#D4AF37]/10 mt-auto flex items-center justify-between">
                   <a 
                     href={slide.href}
                     className="
                       inline-flex
                       items-center
                       gap-2
                       text-xs
                       font-medium
                       text-black
                       bg-[#D4AF37]
                       px-4
                       py-2
                       rounded-full
                       hover:bg-[#c9a92d]
                       transition
                       w-full
                       justify-center
                     "
                   >
                     {slide.actionText}
                     <ExternalLink size={14} />
                   </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] animate-pulse">
              Passe o mouse para pausar • Arraste para navegar
            </p>
          </div>
        </div>

      </motion.div>
      
    </section>
  );
}