import React, { useState, useEffect } from 'react';
import { Shield, Zap, TrendingUp, Lock, Coins, Cpu, Award, RefreshCw, ChevronRight } from 'lucide-react';

export default function ECoinHub() {
  // Estados para simular interações em tempo real
  const [isStaking, setIsStaking] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [myStake, setMyStake] = useState(1250);
  const [totalNetworkStake, setTotalNetworkStake] = useState(4859203);
  const [rewardsEarned, setRewardsEarned] = useState(34.82);
  const [isLive, setIsLive] = useState(true);



  const [gasCapacity, setGasCapacity] =
  useState(20000);

const [gasConsumed, setGasConsumed] =
  useState(6200);

const [rewardPool, setRewardPool] =
  useState(482000);

const [dailyProjection, setDailyProjection] =
  useState(48.2);

  // Simulação de recompensas subindo ao vivo (Efeito "Vivo" de PoS)
  useEffect(() => {
    const interval = setInterval(() => {
      if (myStake > 0) {
        setRewardsEarned(prev => prev + 0.0001);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [myStake]);

  const handleStake = (e) => {
    e.preventDefault();
    if (!stakeAmount || isNaN(stakeAmount)) return;
    
    setIsStaking(true);
    // Simula delay de validação da rede PoS (Sem gastar energia de mineração)
    setTimeout(() => {
      setMyStake(prev => prev + parseFloat(stakeAmount));
      setTotalNetworkStake(prev => prev + parseFloat(stakeAmount));
      setStakeAmount('');
      setIsStaking(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden font-sans relative">
      
      {/* Efeitos de Luz de Fundo (Exclusividade Visual) */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER DO HUB */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Proof of Stake (PoS) Validated Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
            eCoin Hub
          </h1>
        </div>
        
        {/* Badge de Eficiência Energética vs PoW */}
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl backdrop-blur-md">
          <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-semibold">Eco-Friendly Efficiency</p>
            <p className="text-sm font-bold text-emerald-400">99.9% mais limpo sem consumo de energia</p>
          </div>
        </div>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: PAINEL DE RENDIMENTOS (STAKING) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Seu Stake */}
            <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl transition-all duration-300 hover:border-emerald-500/40 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-3">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Seu Active Stake</p>
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{myStake.toLocaleString()} <span className="text-sm text-slate-500">eCoin</span></p>
              <p className="text-xs text-slate-400">Garantindo a segurança da rede</p>
            </div>

            {/* Rendimentos Vivos */}
            <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl transition-all duration-300 hover:border-blue-500/40 hover:scale-[1.02] relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Recompensas Acumuladas</p>
                <Award className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-blue-400 mb-1 font-mono">
                {rewardsEarned.toFixed(4)}
              </p>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" /> Atualizando ao vivo
              </p>
            </div>

            {/* APY% Global */}
            <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl transition-all duration-300 hover:border-purple-500/40 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-3">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Taxa de Rendimento (APY)</p>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">14.2%</p>
              <p className="text-xs text-purple-400 font-medium">Flexível baseado no Stake Global</p>
            </div>
          </div>


          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl transition-all duration-300 hover:border-cyan-500/40 hover:scale-[1.02]">

  <div className="flex justify-between items-start mb-3">

    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
      Mining Capacity
    </p>

    <Zap className="w-4 h-4 text-cyan-400" />

  </div>

  <p className="text-2xl font-bold text-cyan-400 mb-1">
    {(gasCapacity - gasConsumed).toLocaleString()}
  </p>

  <p className="text-xs text-slate-500">
    Remaining Neural Capacity
  </p>

</div>

          {/* ÁREA DE HISTÓRICO / COMPARAÇÃO RÁPIDA */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Métricas Globais da eCoin Network</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-900/40 rounded-xl border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <Coins className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold">Total de Moedas em Staking</p>
                    <p className="text-xs text-slate-500">Garantia total depositada por validadores</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-white">{totalNetworkStake.toLocaleString()} eCoin</p>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-900/40 rounded-xl border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold">Poder de Processamento Requerido</p>
                    <p className="text-xs text-slate-500">Em comparação com ASICs de Bitcoin/Litecoin</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-1 rounded-full">Praticamente Zero</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-5 rounded-2xl bg-slate-900/40 border border-slate-800">

  <div className="flex items-center gap-4">

    <Award className="w-5 h-5 text-emerald-400" />

    <div>
      <p className="font-bold">
        Streaming Reward Pool
      </p>

      <p className="text-xs text-slate-500">
        Live reward liquidity buffer
      </p>
    </div>

  </div>

  <p className="font-black text-emerald-400">
    {rewardPool.toLocaleString()} eCoin
  </p>

</div>

        {/* CARD 2: INTERAÇÃO DE DELEGATE/STAKE (ESTILO BINANCE PREMIUM) */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
         
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Delegar eCoin</h2>
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>

            <form onSubmit={handleStake} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Quantia para Travar (Stake)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0.00"
                    disabled={isStaking}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400">eCoin</span>
                </div>
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-[11px] text-slate-500">Saldo disponível: 4,500 eCoin</span>
                  <button 
                    type="button" 
                    onClick={() => setStakeAmount('4500')}
                    className="text-[11px] text-emerald-400 font-bold hover:underline"
                  >
                    MAX
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Período de Bloqueio mínimo:</span>
                  <span className="text-white font-medium">Nenhum (Flexível)</span>
                </div>
                <div className="flex justify-between">
                  <span>Tempo de Validação do Bloco:</span>
                  <span className="text-emerald-400 font-medium">~ 2.5 Segundos</span>
                </div>

                <div className="flex justify-between">
  <span>Consumo Energético:</span>

  <span className="text-emerald-400 font-medium">
    Ultra Eficiente
  </span>
</div>

<button
  type="submit"
  disabled={isStaking || !stakeAmount}
  className={`
    w-full
    py-4
    rounded-xl
    font-bold
    tracking-wide
    flex
    items-center
    justify-center
    gap-2
    transition-all
    duration-300
    transform
    active:scale-95

    ${
      isStaking
        ? "bg-slate-800 text-slate-500 cursor-not-allowed"
        : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20"
    }
  `}
>

  {
    isStaking
      ? (
        <>
          <RefreshCw className="w-4 h-4 animate-spin" />
          Validando na Rede PoS...
        </>
      )
      : (
        <>
          <ChevronRight className="w-4 h-4" />
          Iniciar Staking Seguro
        </>
      )
  }

</button>

<p className="
  mt-4
  text-xs
  leading-relaxed
  text-slate-500
">
  Diferente do Bitcoin, você não precisa de mineradores ASIC.
  Na rede eCoin PoS, as suas moedas são o seu poder de validação.
</p>
</div>
</form>
</div>
</div>
</div>
);
}