'use client';

import React from 'react';
import Link from 'next/link';

export default function ECoinOffRampPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 lg:p-8 relative overflow-hidden w-full">
      {/* 🌟 Glows Ambientais ePay */}
      <div className="absolute -top-24 -right-20 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">

        {/* HERO */}
        <section className="py-12 md:py-16 text-center space-y-4 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">
              Rede Oficial ePay Agent
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500">
            CONVERTA E-COIN EM DINHEIRO FÍSICO / FIAT
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base">
            Faça saques e depósitos instantâneos com total segurança através da nossa <span className="text-emerald-400 font-bold">Rede de Agentes ePay</span> presenciais e autorizados. Sem intermediários ou burocracias de terceiros.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="https://efte.edenkingdom.org/financial-suite/ePay/agent/map"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <span>📍 Encontrar Agente Próximo</span>
            </Link>
            <Link
              href="https://efte.edenkingdom.org/financial-suite/ePay/agent/commissions"
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-400 font-bold text-sm transition-all"
            >
              💼 Tornar-se um Agente ePay
            </Link>
          </div>
        </section>

        {/* REGRAS E VANTAGENS DO EPAY AGENT */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-black">
              ⚡
            </div>
            <h3 className="text-base font-bold text-slate-100">Liquidação Instantânea</h3>
            <p className="text-xs text-slate-400">
              Troque eCoin ou eDollar diretamente com um ePay Agent e receba dinheiro físico, M-Pesa ou transferência bancária na hora.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-black">
              🛡️
            </div>
            <h3 className="text-base font-bold text-slate-100">Garantia de Custódia ePay</h3>
            <p className="text-xs text-slate-400">
              Todas as transações P2P com ePay Agents utilizam nosso sistema protegido por Smart Contracts no ecossistema ePay.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xl font-black">
              💎
            </div>
            <h3 className="text-base font-bold text-slate-100">Taxas Competitivas (10%)</h3>
            <p className="text-xs text-slate-400">
              Redistribuição transparente de taxas da rede, garantindo alta lucratividade aos agentes e menores custos aos usuários.
            </p>
          </div>
        </section>

        {/* GUIA PASSO A PASSO OFICIAL EPAY */}
        <section className="bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl md:text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
            COMO LEVANTAR / SACAR VIA EPAY AGENT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">Passo 1</span>
              <h3 className="text-sm font-bold text-slate-200">Acesse o Painel ePay Agent</h3>
              <p className="text-xs text-slate-400">
                Selecione a opção <b>Levantamento (Vender)</b> no menu de navegação da sua eCoin Wallet ou Portal ePay.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">Passo 2</span>
              <h3 className="text-sm font-bold text-slate-200">Escolha o Agente Cadastrado</h3>
              <p className="text-xs text-slate-400">
                Consulte o <b>Mapa de Agentes ePay</b> e escolha o agente presencial ou parceiro verificado mais conveniente para você.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">Passo 3</span>
              <h3 className="text-sm font-bold text-slate-200">Confirme a Transferência</h3>
              <p className="text-xs text-slate-400">
                Envie os tokens eCoin / eDollar para o endereço oficial do agente no ecossistema ePay sob custódia de protocolo.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">Passo 4</span>
              <h3 className="text-sm font-bold text-slate-200">Receba o Valor em Fiat</h3>
              <p className="text-xs text-slate-400">
                O Agente ePay realiza o pagamento imediato em numerário (espécie) ou via sua carteira/conta local preferida.
              </p>
            </div>
          </div>
        </section>

        {/* BANNER DE INCENTIVO */}
        <section className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-black text-slate-100">
            Deseja rentabilizar operando como um <span className="text-emerald-400">Agente ePay</span>?
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto">
            Ganhe comissões atrativas em cada depósito e levantamento efetuado na sua região com a nossa política oficial de repasse de 10%.
          </p>
          <div>
            <Link
              href="https://efte.edenkingdom.org/financial-suite/ePay/agent"
              className="inline-block px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-xl"
            >
              Abrir Conta Agente ePay Agora
            </Link>
          </div>
        </section>
        

      </div>
    </div>
  );
}