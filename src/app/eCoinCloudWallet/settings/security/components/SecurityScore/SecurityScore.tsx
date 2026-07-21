'use client';

import React from 'react';
import {
  ProgressCircle,
  ScoreValue,
  SecurityLevel,
  LastSecurityScan,
  SecurityTips,
  ImprovementList,
  AIRecommendation,
  ScoreLabel
} from './components';

export default function SecurityScore() {
  const score = 96;

  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-6 font-mono relative overflow-hidden backdrop-blur-xl flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <ProgressCircle score={score} />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <SecurityLevel level="Excelente" />
              <LastSecurityScan date="Há 2 minutos" />
            </div>
            <ScoreLabel />
            <ScoreValue score={score} />
          </div>
        </div>

        <div className="w-full md:w-auto md:max-w-xs">
          <AIRecommendation />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
        <SecurityTips />
        <ImprovementList />
      </div>
    </div>
  );
}