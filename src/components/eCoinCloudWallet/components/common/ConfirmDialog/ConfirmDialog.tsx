'use client';

import React, { useEffect } from 'react';
import { DialogHeader, DialogBody, DialogFooter, ConfirmButton, CancelButton } from './components';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  severity?: 'warning' | 'danger' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export default function ConfirmDialog({
  isOpen,
  title = 'Confirmação Requerida',
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  severity = 'warning',
  onConfirm,
  onCancel,
  className = ''
}: ConfirmDialogProps) {
  
  // Trancar scroll em background quando aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop de Luxo */}
      <div 
        onClick={onCancel}
        className="absolute inset-0 bg-[#020202]/85 backdrop-blur-md animate-fade-in" 
      />

      {/* Caixa de Diálogo */}
      <div className={`
        relative w-full max-w-sm rounded-xl bg-[#080808] border border-white/10 p-4 
        shadow-[0_15px_40px_rgba(0,0,0,0.85)] z-10 animate-scale-up ${className}
      `}>
        {/* Glow de Acentuação Superior */}
        <div className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent ${severity === 'danger' ? 'via-red-500' : severity === 'warning' ? 'via-[#D4AF37]' : 'via-[#00FF9C]'} to-transparent`} />

        <DialogHeader title={title} severity={severity} onClose={onCancel} />
        <DialogBody>{message}</DialogBody>
        <DialogFooter>
          <CancelButton label={cancelLabel} onClick={onCancel} />
          <ConfirmButton label={confirmLabel} severity={severity} onClick={onConfirm} />
        </DialogFooter>
      </div>
    </div>
  );
}