'use client';

import React, { useState, useEffect } from 'react';
import { PreviewHeader, PreviewBody, PreviewFooter, PreviewActions } from './components';

export interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footerMetadata?: React.ReactNode;
  onDownload?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function PreviewModal({
  isOpen,
  onClose,
  title,
  children,
  footerMetadata,
  onDownload,
  onConfirm,
  onCancel
}: PreviewModalProps) {
  const [scale, setScale] = useState(1);

  // Fecha o modal ao carregar o ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Esfumado */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Caixa do Modal */}
      <div className="relative w-full max-w-xl bg-[#050505]/95 border border-white/10 rounded-2xl p-5 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 animate-fade-in flex flex-col">
        <PreviewHeader title={title} onClose={onClose} />
        
        <PreviewBody scale={scale}>
          {children}
        </PreviewBody>

        <PreviewActions 
          onZoomIn={handleZoomIn} 
          onZoomOut={handleZoomOut}
          onDownload={onDownload}
          onConfirm={onConfirm}
          onCancel={onCancel || onClose}
        />

        <PreviewFooter>
          {footerMetadata}
        </PreviewFooter>
      </div>
    </div>
  );
}