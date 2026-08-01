'use client';

import React, { useState } from 'react';
import { ShieldAlert, Lock, AlertTriangle, LogOut, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmergencyLock() {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Função disparada ao confirmar o Bloqueio de Emergência
  const handleEmergencyLock = async () => {
    setIsProcessing(true);

    try {
      // 1. Aqui farias a chamada API para o teu backend/smart contract para revogar JWTs/Sessões
      // await fetch('/api/security/emergency-lock', { method: 'POST' });

      // Simulação de latência de rede
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 2. Marcação local de estado
      setIsLocked(true);
      setShowConfirmModal(false);

      // 3. Limpeza de Tokens / Storage local
      localStorage.setItem('eCoin_wallet_status', 'FROZEN');
      // localStorage.removeItem('authToken');

      // 4. Redirecionamento forçado para a tela de Login / Recuperação após 2 segundos
      setTimeout(() => {
        router.push('/auth/login?reason=emergency_lock');
      }, 2000);

    } catch (error) {
      console.error('Erro ao acionar bloqueio de emergência:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* CARD DO BLOQUEIO DE EMERGÊNCIA */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 font-mono relative overflow-hidden">
        <div className="flex gap-4 items-start mb-4">
          <div className="p-2.5 bg-red-500/10 text-red-500 rounded-xl shrink-0">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              Bloqueio de Emergência <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold">Panic Mode</span>
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mt-1">
              Se suspeitar de invasão ou comprometimento de dispositivo, congele instantaneamente todas as movimentações on-chain, invalide tokens de acesso e force o logout em todos os dispositivos conectados.
            </p>
          </div>
        </div>

        {/* Status do Bloqueio */}
        {isLocked ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center justify-between text-red-400 mb-2">
            <div className="flex items-center gap-3">
              <Lock size={18} className="animate-pulse" />
              <div>
                <span className="text-xs font-bold block">CARTEIRA CONGELADA GLOBALMENTE</span>
                <span className="text-[10px] text-neutral-400">Redirecionando para autenticação segura do proprietário...</span>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full h-11 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-mono font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
          >
            <ShieldAlert size={16} /> LOCK WALLET AGORA
          </button>
        )}
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE SEGURANÇA */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-red-500/30 rounded-2xl p-6 max-w-md w-full font-mono space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-red-500 border-b border-white/10 pb-4">
              <AlertTriangle size={28} />
              <div>
                <h4 className="text-base font-black uppercase text-white">Confirmar Bloqueio?</h4>
                <p className="text-[10px] text-neutral-400">Ação imediata de proteção de ativos</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <p>Ao ativar o **Lock Wallet**, o sistema irá:</p>
              <ul className="space-y-1.5 text-[11px] text-neutral-400 list-disc list-inside">
                <li>Encerrar **todas** as sessões ativas (PC, Mobile, dApps).</li>
                <li>Pausar execução de Smart Contracts e autorizações pendentes.</li>
                <li>Exigir validação de Passkey/2FA do dono para restabelecer acesso.</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isProcessing}
                className="flex-1 h-10 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleEmergencyLock}
                disabled={isProcessing}
                className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  'Congelando...'
                ) : (
                  <>
                    <LogOut size={14} /> Confirmar & Sair
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}