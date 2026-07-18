'use client';

import React from 'react';
import { ErrorIcon, ErrorTitle, ErrorDescription, RetryButton } from './components';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  title = 'Erro de Conectividade',
  description = 'Não foi possível ler as informações de saldo do RPC. Verifique a sua ligação com a blockchain.',
  retryLabel = 'Tentar Novamente',
  onRetry,
  className = ''
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 bg-[#040404]/30 border border-red-500/10 rounded-2xl ${className}`}>
      <ErrorIcon />
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorDescription>{description}</ErrorDescription>
      {onRetry && (
        <RetryButton label={retryLabel} onClick={onRetry} />
      )}
    </div>
  );
}