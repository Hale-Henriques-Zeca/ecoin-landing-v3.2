'use client';

import React from 'react';
import { EmptyIcon, EmptyTitle, EmptyDescription, EmptyAction } from './components';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  className?: string;
}

export default function EmptyState({
  title = 'Nenhum ativo encontrado',
  description = 'Não encontramos depósitos ou dados registados nesta carteira para os parâmetros atuais.',
  actionLabel,
  onActionClick,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 bg-[#040404]/30 border border-white/5 rounded-2xl ${className}`}>
      <EmptyIcon />
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
      {actionLabel && onActionClick && (
        <EmptyAction label={actionLabel} onClick={onActionClick} />
      )}
    </div>
  );
}