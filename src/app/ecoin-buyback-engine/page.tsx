"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ECoinSmartPoolsExplanation() {

return (

<section className="relative bg-black text-white py-24 px-6 overflow-hidden">

{/* BACKGROUND */}

<div className="absolute inset-0 -z-10">

<div className="absolute top-0 left-1/2 w-[700px] h-[700px] -translate-x-1/2 bg-cyan-500/10 rounded-full blur-[180px]" />

<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />

</div>

<div className="max-w-6xl mx-auto text-center">

{/* TITLE */}

<motion.h1
initial={{ opacity:0, y:-20 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:1 }}
className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-6"
>

eCoin AI Smart Reward Infrastructure

</motion.h1>

<p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base mb-16 leading-relaxed">

A infraestrutura inteligente da eCoin foi construída para distribuir
liquidez, estabilidade e recompensas através de Smart Pools,
Reward Streams e mecanismos automáticos alimentados pelas taxas
internas do ecossistema, ecGas e roteamento dinâmico de liquidez.

</p>

{/* ================= EXPLANATION ================= */}

<div className="mt-16 text-gray-300 max-w-4xl mx-auto text-sm sm:text-base space-y-10 text-left">

<div>

<h3 className="text-cyan-400 font-semibold text-lg mb-2">

⚡ O que são os AI Smart Reward Pools?

</h3>

<p className="leading-relaxed">

Os AI Smart Reward Pools são pools inteligentes de distribuição
de liquidez e recompensas contínuas alimentados automaticamente
por taxas do ecossistema, reciclagem de claims, treasury routing,
ecGas e streams de liquidez protocolar.

Ao invés de depender de campanhas manuais de Buy-Back,
o protocolo opera através de mecanismos autônomos de estabilidade
e streaming financeiro on-chain.

</p>

</div>

{/* SLOGAN FINAL */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 1 }}
  className="mt-16 text-center text-cyan-400 font-semibold italic leading-relaxed"
>

“Quando o mercado oscila, a infraestrutura responde.
A E-Coin transforma participação em estabilidade,
e estabilidade em oportunidade sustentável.”

</motion.div>

<div className="mt-12 border border-cyan-500/20 bg-cyan-500/5 rounded-2xl p-6">

<h3 className="text-cyan-400 font-semibold text-xl mb-4">

🌍 Muito além de pagamentos e trading

</h3>

<p className="text-gray-300 leading-relaxed">

A eCoin não foi construída apenas para transferências,
pagamentos ou especulação de mercado.

Os AI Smart Reward Pools transformam a moeda em uma
infraestrutura produtiva de liquidez e geração de rendimento.

Isso significa que participantes do ecossistema podem:

</p>

<ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">

<li>Gerar renda passiva através de staking inteligente.</li>

<li>Participar da estabilidade e retenção de liquidez do protocolo.</li>

<li>Fortalecer a sustentabilidade financeira do ecossistema.</li>

<li>Contribuir para a estabilidade de preço da moeda.</li>

<li>Participar de pools inteligentes alimentados por atividade económica real.</li>

<li>Transformar participação em rendimento sustentável.</li>

</ul>

<p className="mt-5 text-gray-400 italic leading-relaxed">

Ao unir utilidade financeira, staking,
reward streaming e liquidez dinâmica,
a eCoin evolui de uma simples moeda digital
para uma infraestrutura económica inteligente.

</p>

</div>

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.5, duration: 1 }}
className="mt-16 text-center text-cyan-400 font-semibold italic"
>

“Liquidez inteligente. Recompensas contínuas.
Infraestrutura financeira construída para o futuro.”

</motion.div>

<div>



<h3 className="text-cyan-400 font-semibold text-lg mb-2">

🧠 Como funciona a infraestrutura?

</h3>

<p className="leading-relaxed">

As taxas geradas dentro do ecossistema são redistribuídas
automaticamente entre treasury, reward pools,
referral systems, staking buffers e protocolos de liquidez.

O sistema utiliza Reward Buffers inteligentes que liberam
recompensas gradualmente através de streams contínuos,
mantendo estabilidade, previsibilidade e sustentabilidade
da liquidez protocolar.

</p>

</div>

<div>

<h3 className="text-cyan-400 font-semibold text-lg mb-2">

⛽ ecGas & Liquidity Engine

</h3>

<p className="leading-relaxed">

As compras de ecGas alimentam diretamente a infraestrutura
de capacidade de mineração e os Smart Reward Pools.

Isso transforma atividade econômica real do ecossistema
em geração sustentável de liquidez e recompensas
para os participantes do protocolo.

</p>

</div>

<div>

<h3 className="text-cyan-400 font-semibold text-lg mb-2">

🚀 Benefícios da Infraestrutura

</h3>

<ul className="list-disc list-inside space-y-2 leading-relaxed">

<li>Reward Streaming contínuo alimentado pelo ecossistema.</li>

<li>Liquidez dinâmica distribuída automaticamente.</li>

<li>Reciclagem inteligente de taxas e claims.</li>

<li>Infraestrutura sustentável de staking.</li>

<li>Buffers de liquidez inteligentes com distribuição gradual.</li>

<li>Integração automática com Treasury e ecGas.</li>

<li>Participação em pools inteligentes de recompensas.</li>

<li>Maior estabilidade protocolar e eficiência de liquidez.</li>

</ul>

</div>
<p className="mt-2 text-sm sm:text-base italic text-gray-400 leading-relaxed">

“De trader para trader.
De holder para holder.
De participante para participante.
Construindo uma infraestrutura financeira sustentável
para investidores em ativos digitais.”

</p>

{/* INÍCIO DO BOTÃO SAIBA MAIS */}
<div className="mt-8 flex justify-center w-full">
  <Link 
    href="How-Ai-Mining-Works" 
    className="inline-block px-6 py-2 text-sm font-semibold text-cyan-400 border border-cyan-500/40 rounded-xl bg-cyan-500/5 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
  >
    Saiba mais
  </Link>
</div>
{/* FIM DO BOTÃO SAIBA MAIS */}
</div>



{/* SEPARATOR */}

<div className="relative z-10 mt-20 mb-14 flex items-center gap-4">

<div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

<span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-cyan-400/80">

AI Smart Pools

</span>

<div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

</div>

{/* SMART POOL CARD */}

<div className="w-full max-w-5xl mx-auto rounded-2xl border border-cyan-500/20 bg-black/50 backdrop-blur-md p-8 shadow-lg">

<div className="text-center mb-8">

<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400">

Streaming Liquidity Infrastructure

</h3>

<p className="mt-2 text-sm sm:text-base italic text-gray-400">

AI-powered reward distribution and autonomous liquidity routing.

</p>

</div>

<div className="border border-cyan-500/20 rounded-xl overflow-hidden">

<table className="w-full text-left">

<thead className="bg-[#0D0D0D]">

<tr>

<th className="p-4 text-cyan-400 text-lg">

📘 Fluxo da Infraestrutura Inteligente

</th>

</tr>

</thead>

<tbody className="divide-y divide-cyan-500/10 bg-black/50">

<tr>

<td className="p-4">

<ol className="list-decimal list-inside space-y-2">

<li>O utilizador conecta sua carteira Web3.</li>

<li>Participa do ecossistema através de staking ou ecGas.</li>

<li>As taxas do protocolo alimentam os Reward Buffers.</li>

<li>O sistema distribui streams contínuos de liquidez.</li>

<li>Claims reciclados reforçam a sustentabilidade do pool.</li>

<li>Treasury e referral systems recebem distribuição automática.</li>

<li>O protocolo mantém estabilidade e liquidez dinâmica.</li>

</ol>

</td>

</tr>

</tbody>

</table>

<p className="mt-8 italic text-cyan-400 font-semibold text-center leading-relaxed">

“Construído por um trader.
Sustentado por holders.
Empoderando investidores em ativos digitais.”

</p>
</div>

<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

<Link
href="/ecoin-hub"
className="px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all duration-300"
>

Open eCoin Hub

</Link>

<Link
href="/Savings"
className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all duration-300"
>

Open Savings Pools

</Link>

</div>

</div>

</div>

</section>

)

}