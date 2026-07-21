'use client';

import React from 'react';

export default function ScoreValue({ score }: { score: number }) {
  return (
    <div className="font-mono">
      <span className="text-3xl font-black text-white tracking-tight">{score}</span>
      <span className="text-xs text-neutral-500 font-bold ml-1">/ 100 PTS</span>
    </div>
  );
}