import React from 'react';
// 1. IMPORTAR O COMPONENTE AQUI
import NeuralArbitragePanel from '../components/NeuralArbitragePanel'; 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 1. SEÇÃO NAVBAR */}
      <nav className="p-4 border-b border-gray-900">
        <span className="text-yellow-500 font-bold tracking-widest">eCOIN ECOSYSTEM</span>
      </nav>

      {/* 2. SEÇÃO HERO PRINCIPAL */}
      <header className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-4">The Next Generation of AI-Driven Liquidity</h1>
        <p className="text-gray-400 text-lg mb-8">Empowering decentralized finance through neural arbitrage network structures.</p>
        <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg">Get Started</button>
      </header>

      {/* ========================================================= */}
      {/* 3. PLACEMENT DO COMPONENTE DO PAINEL (LUGAR IDEAL) */}
      {/* ========================================================= */}
      <section className="py-12 px-4 bg-gradient-to-b from-transparent via-gray-950 to-transparent">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <span className="text-yellow-500 font-bold uppercase tracking-widest text-xs">AI Terminal Dashboard</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Live Institutional Trading Terminal</h2>
          </div>
          
          {/* O painel entra aqui perfeitamente encapsulado */}
          <NeuralArbitragePanel />
          
        </div>
      </section>

      {/* 4. SEÇÃO DE FOOTER / PARCEIROS */}
      <footer className="py-12 border-t border-gray-900 text-center text-gray-600 text-xs">
        &copy; 2026 eCoin Network. Powered by Neural Arbitrage AI Architecture.
      </footer>
    </div>
  );
}