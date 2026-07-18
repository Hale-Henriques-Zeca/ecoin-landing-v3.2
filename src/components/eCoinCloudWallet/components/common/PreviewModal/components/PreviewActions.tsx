'use client';

import React from 'react';
import { ZoomIn, ZoomOut, Download, Check, X } from 'lucide-react';

interface PreviewActionsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function PreviewActions({
  onZoomIn,
  onZoomOut,
  onDownload,
  onConfirm,
  onCancel
}: PreviewActionsProps) {
  return (
    <div className="flex items-center justify-between w-full gap-4 mt-2">
      {/* Botões de Zoom */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onZoomOut}
          className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-neutral-400 hover:text-white transition-all active:scale-95"
          title="Diminuir Zoom"
        >
          <ZoomOut size={14} />
        </button>
        <button
          onClick={onZoomIn}
          className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-neutral-400 hover:text-white transition-all active:scale-95"
          title="Aumentar Zoom"
        >
          <ZoomIn size={14} />
        </button>
        {onDownload && (
          <button
            onClick={onDownload}
            className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-neutral-400 hover:text-white transition-all active:scale-95"
            title="Download"
          >
            <Download size={14} />
          </button>
        )}
      </div>

      {/* Botões de Decisão */}
      {(onConfirm || onCancel) && (
        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold tracking-widest uppercase transition-all active:scale-95"
            >
              <X size={12} />
              <span>Cancelar</span>
            </button>
          )}
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-[#00FF9C]/5 hover:bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-xs font-mono font-bold tracking-widest uppercase transition-all active:scale-95"
            >
              <Check size={12} />
              <span>Confirmar</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}