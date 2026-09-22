'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Bot, 
  TrendingUp, 
  Users, 
  Coins, 
  ExternalLink, 
  Globe, 
  Zap, 
  DollarSign, 
  Flame, 
  Lock
} from 'lucide-react';
// CTA & Footer
import { SmartPoolsCTA } from "@/components/CTA/SmartPoolsCTA/SmartPoolsCTA";
import { TeamLeaderCTA } from "@/components/CTA/TeamLeaderCTA/TeamLeaderCTA";

export default function WhyEcnTrading() {
  return (
    <section className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 text-slate-100 max-w-7xl mx-auto">
      
      {/* MANIFESTO E VISÃO DO CEO */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6">
          <span className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl text-[#D4AF37]">
            <Bot className="w-8 h-8" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Por que criamos os Bots <span className="text-[#D4AF37]">ecnTrading AI Robot</span> para DEX?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manifesto do CEO & Arquitetura de Inteligência Web3 para Mercados Descentralizados
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p className="border-l-4 border-[#D4AF37] pl-4 italic text-slate-200 bg-white/[0.02] py-3 rounded-r-xl">
            "A plataforma eCoin foi concebida e projetada sob a orientação direta de um trader de criptomoedas extremamente profissional, experiente e acostumado com as realidades mais duras do mercado — desde as altas exponenciais até as quedas devastadoras dos criptoativos."
          </p>

          <p>
            Tendo vivenciado de perto a proliferação de plataformas fraudulentas (scams), presenciamos perdas financeiras massivas de usuários comuns, grandes líderes de rede e investidores de sucesso. Mais do que isso, vimos a quebra sistêmica de bancas de trading massivas mantidas por day traders e profissionais experientes, especialmente quando o **Bitcoin (BTC)** sofre correções severas, arrastando praticamente todas as altcoins devido à correlação direta do mercado.
          </p>
        </div>
      </div>

      {/* ARQUITETURA DE RETENÇÃO E BUYBACK / SELLBACK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <Flame className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Proteção Contra Queimas Arbitrárias</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Diferente de projetos como o <strong>SHIBA INU</strong> (que possui mais de 1 Quadrilhão de tokens emitidos), a moeda <strong>eCoin</strong> não foi criada com funções de emissão descontrolada ou queimas automáticas sem lastro para manipular o mercado. A entidade responsável não pode simplesmente emitir novos tokens e despejá-los no mercado para derrubar o preço.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sua infraestrutura própria de retenção e Staking dos eCoin ShareHolders, protege os holders contra vendas massivas e volatilidade desenfreada.
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-800">
            <a 
              href="https://ecoin.edenkingdom.org/whitepaper" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:underline"
            >
              <span>Leia todos os detalhes no nosso Whitepaper</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <Lock className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Tesouraria, BuyBack & SellBack Gradual</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Quando o preço da eCoin cai, a **Tesouraria da eCoin** utiliza seus fundos de reserva para realizar compras massivas do próprio token como forma de <strong>BuyBack (Queima com saída de circulação)</strong>.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Estes tokens comprados saem de circulação e **só retornam ao mercado de forma gradual através de SellBack (venda controlada)** quando o mercado estiver em extrema alta, garantindo liquidez sem prejudicar o ecossistema.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="inline-flex items-center gap-2 text-xs text-slate-400">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Mecanismo Anti-Dump Ativo e Auditado</span>
            </div>
          </div>
        </div>

      </div>

      {/* O MOTIVO REAL DOS BOTS E A INCLUSÃO FINANCEIRA GLOBAL */}
      <div className="bg-slate-950 border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Globe className="w-7 h-7 text-[#D4AF37]" />
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            A Realidade Social do Mercado e o Propósito dos Bots
          </h3>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Como CEO da eCoin e após anos atuando como líder, trader e investidor em criptoativos, presenciei uma barreira cruel: investidores de países em desenvolvimento (como **Índia, Nigéria, Tanzânia, Malawi** na Ásia e África, além de países da **América do Sul e América do Norte**) não conseguiam cumprir com os pré-requisitos exigidos para operar robôs de trading tradicionais.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-amber-400 text-sm mb-1">A Barreira do Capital & Taxa de Gás</h4>
            <p className="text-xs text-slate-300">
              O capital disponível para investir costuma ser baixo e a taxa de gás inviabilizava operações individuais. Qualquer oscilação negativa do mercado liquida bancas de $10 — valor que, em muitas dessas nações, é uma fortuna essencial para alimentar famílias e pagar contas básicas.
            </p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-emerald-400 text-sm mb-1">A Solução via Web3 Capital Pool</h4>
            <p className="text-xs text-slate-300">
              Para resolver isso, criamos o <strong>ecnTrading AI robot para DEX Markets</strong> sob um modelo de <strong>Capital Pool Unificado</strong>, permitindo que pequenos e grandes investidores operem juntos sem medo de quebra individual.
            </p>
          </div>
        </div>
      </div>

      {/* FLUXO DO PROFIT POOL E PROFIT CAPACITY */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <span>⚙️</span> Como Funciona o Ciclo de Lucro (PPP & PC)
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Transparência total na alocação de fundos para trading e sistema de comunidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Passo 1</span>
            <h4 className="font-bold text-white text-base">Profit Pool Position (PPP) ou Simplesmente Profit Margin (PM)</h4>
            <p className="text-xs text-slate-400">
              O usuário compra eCoin no mercado e retém no Profit Pool para obter sua **Margem de Lucro (ML / PM)**.
            </p>
          </div>

          <div className="bg-black/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Passo 2</span>
            <h4 className="font-bold text-white text-base">Profit Capacity (PC) + 30%</h4>
            <p className="text-xs text-slate-400">
              Ao adquirir o Profit Capacity, garante-se **30% de lucro líquido** (total de 130% retornado juntamente com o capital inicial):
            </p>
            <ul className="text-xs text-emerald-400 font-mono space-y-1 pt-1">
              <li>• $1.00 depositado ➔ obtém **$1.30**</li>
              <li>• $10.00 depositados ➔ obtém **$13.00**</li>
              <li>• $100.00 depositados ➔ obtém **$130.00**</li>
            </ul>
          </div>

          <div className="bg-black/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Passo 3</span>
            <h4 className="font-bold text-white text-base">Divisão dos 100% da Compra do PC</h4>
            <p className="text-xs text-slate-400">
              De todo valor que entra no ecossistem pelas compra ou emissão de Profit Capacity (PC):
            </p>
            <ul className="text-xs text-slate-300 font-mono space-y-1 pt-1">
              <li>• <strong className="text-amber-400">20%</strong> ➔ Pool de Referência (comunidade em 3 Níveis)</li>
              <li>• <strong className="text-emerald-400">80%</strong> ➔ Capital Pool de Trading do Bot</li>
            </ul>
          </div>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 text-xs sm:text-sm text-emerald-200">
          💡 <strong>Segurança Garantida:</strong> Você não precisa se preocupar com as oscilações do mercado. O Capital Pool é dimensionado para que o <strong>ecnTrading DEX Bot</strong> opere nas DEXs e entregue os lucros a todos de acordo com sua ML e PC.
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <Coins className="w-6 h-6 text-[#D4AF37]" />
            <div className="text-xs text-slate-300">
              <span>Ativos suportados nas operações do Robot: </span>
              <strong className="text-white">eCoin, BNB, USDT e eDollar ($eDollar)</strong>
            </div>
          </div>
          
          <a 
            href="https://edollar.edenkingdom.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2"
          >
            <span>Visite edollar.edenkingdom.org</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* COMPONENTES DE CTA / DIRETOS INCLUÍDOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <TeamLeaderCTA />
        <SmartPoolsCTA />
      </div>

    </section>
  );
}