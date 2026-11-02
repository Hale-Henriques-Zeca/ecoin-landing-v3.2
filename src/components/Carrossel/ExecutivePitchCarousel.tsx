import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Globe, HeartHandshake, Scale, Coins, Gift } from 'lucide-react';

/**
 * Componente: ExecutivePitchCarousel
 * Estilo inspirado no Shiba Inu, com rotação contínua, cartões retangulares e botões de acesso direto.
 */
export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);

  // Slides atualizados com os 6 módulos institucionais e links de imagens da internet
  const slides = [
    {
      id: 1,
      title: "Whitepaper Oficial",
      desc: "Documento técnico oficial da E-Coin detalhando o ecossistema e tokenomics.",
      tag: "TECNOLOGIA",
      img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      href: "/whitepaper",
      actionText: "Ler Whitepaper →",
      icon: <LineChart size={20} />
    },
    {
      id: 2,
      title: "Business Presentation",
      desc: "Visão estratégica, expansão de mercado e modelo corporativo global.",
      tag: "ESTRATÉGIA",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      href: "/EcoinBusinessPresentation",
      actionText: "Ver Apresentação →",
      icon: <Globe size={20} />
    },
    {
      id: 3,
      title: "Líder de Equipes",
      desc: "Gestão, estrutura organizacional e liderança descentralizada.",
      tag: "ECOSSISTEMA",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      href: "/equipes",
      actionText: "Conhecer Líderes →",
      icon: <HeartHandshake size={20} />
    },
    {
      id: 4,
      title: "Solidity Interpretation",
      desc: "Análise técnica avançada e segurança do contrato inteligente verificado.",
      tag: "AUDITORIA",
      img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      href: "/ECoinSolidity",
      actionText: "Ver Análise →",
      icon: <Scale size={20} />
    },
    {
      id: 5,
      title: "Buy eCoin",
      desc: "Adquira eCoin instantaneamente com total segurança e liquidez garantida.",
      tag: "MERCADO",
      img: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80",
      href: "/buy",
      actionText: "Comprar Agora →",
      icon: <Coins size={20} />
    },
    {
      id: 6,
      title: "Airdrop & Mineração",
      desc: "Participe da mineração progressiva e resgate as suas recompensas exclusivas.",
      tag: "RECOMPENSAS",
      img: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
      href: "/airdrop",
      actionText: "Participar →",
      icon: <Gift size={20} />
    }
  ];

  // Lógica de Autoplay (Rotação Infinita Suave)
  useEffect(() => {
    let interval;
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

  // Handlers para Arrastar (Mouse / Touch)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  return (
    <div className="w-full bg-[#001220] py-20 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-pink-500 font-black text-xs uppercase tracking-[0.4em] mb-2">Ecossistema & Acesso Rápido</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">eDollar Executive Pitch</h1>
        </div>
        <div className="hidden md:flex gap-2">
           <div className="w-12 h-1 bg-pink-600 rounded-full"></div>
           <div className="w-4 h-1 bg-gray-700 rounded-full"></div>
           <div className="w-4 h-1 bg-gray-700 rounded-full"></div>
        </div>
      </div>

      {/* Container do Carrossel com Estilo Retangular (Shiba Inu UI) */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-hidden cursor-grab active:cursor-grabbing px-6 select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={(e) => {
          if (!isDragging) return;
          const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
          const walk = (x - startX) * 2;
          carouselRef.current.scrollLeft = scrollLeft - walk;
        }}
      >
        {/* Duplicamos os slides para criar o efeito infinito contínuo */}
        {[...slides, ...slides].map((slide, index) => (
          <div 
            key={`${slide.id}-${index}`}
            className="min-w-[300px] md:min-w-[380px] bg-gradient-to-br from-blue-900/40 to-[#001220] border border-blue-800/50 rounded-[2rem] p-6 relative group transition-all duration-500 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black bg-pink-600/20 text-pink-500 px-3 py-1 rounded-full border border-pink-500/20 flex items-center gap-1.5">
                  {slide.icon} {slide.tag}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {String(slide.id).padStart(2, '0')} / 06
                </span>
              </div>
              
              {/* Imagem em formato retangular médio */}
              <div className="w-full h-36 mb-5 rounded-[1.25rem] overflow-hidden border border-gray-800 bg-black">
                 <img 
                 src={slide.img} 
                 alt={slide.title} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                 />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                {slide.title}
              </h3>
              <p className="text-blue-200 text-xs leading-relaxed mb-6">
                {slide.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-blue-900/40 mt-auto">
               <a 
                 href={slide.href}
                 className="text-xs font-bold text-pink-500 uppercase tracking-widest flex items-center justify-between group/btn w-full py-1"
               >
                 <span>{slide.actionText}</span>
                 <span className="group-hover/btn:translate-x-1.5 transition-transform">→</span>
               </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] animate-pulse">
          Passe o mouse para pausar • Arraste para navegar
        </p>
      </div>
    </div>
  );
}