"use client";

import Link from "next/link";

export default function ECoinFutureSimulatorInfo() {

  return (

<main className="min-h-screen bg-white text-black flex flex-col">

{/* ================= HERO ================= */}

<section className="relative flex-1 flex items-center justify-center px-6 py-24 overflow-hidden">

<div
className="absolute inset-0 bg-gradient-to-r
from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10"
/>

<div className="relative z-10 max-w-3xl text-center">

<span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] block mb-4">

E-Coin Analytics

</span>

<h1 className="text-4xl md:text-4xl font-semibold leading-tight mb-6">

📈 <span className="text-[#D4AF37]">
Explore the Future Value of E-Coin
</span>

</h1>

<p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm md:text-base">

O <strong>E-Coin Future Investment Simulator</strong> permite explorar
cenários futuros de crescimento com base no preço atual da E-Coin.
Defina o valor do seu investimento e o preço futuro esperado
para descobrir o potencial retorno.

</p>

<p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">

A ferramenta calcula automaticamente o número de moedas adquiridas,
o valor futuro estimado, ROI e ainda mostra projeções gráficas
para ajudar investidores a visualizar o crescimento do ecossistema.

</p>

</div>

</section>


{/* ================= CTA ================= */}

<section className="py-24 px-6 text-center relative overflow-hidden">

<Link
href="/ecoin-future-simulator"
className="inline-flex items-center gap-2 px-10 py-4 rounded-full
bg-black text-white font-semibold
hover:bg-[#D4AF37] hover:text-black
transition-all duration-300 shadow-lg"
>

Open E-Coin Future Simulator →

</Link>

</section>

</main>

  );
}