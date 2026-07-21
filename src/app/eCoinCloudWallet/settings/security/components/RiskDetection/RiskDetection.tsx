'use client';

import React from 'react';
import {
  AIRiskMonitor,
  SuspiciousLogin,
  ImpossibleTravel,
  PhishingDetection
} from './components';

export default function RiskDetection() {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono flex flex-col gap-4">
      <AIRiskMonitor />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SuspiciousLogin />
        <ImpossibleTravel />
        <PhishingDetection />
      </div>
    </div>
  );
}