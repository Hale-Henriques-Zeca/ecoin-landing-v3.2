'use client';

import React from 'react';

interface ProgressCircleProps {
  score: number;
}

export default function ProgressCircle({ score }: ProgressCircleProps) {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center shrink-0 font-mono">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-neutral-900"
          strokeWidth="3.5"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-[#00FF9C] transition-all duration-1000 ease-out"
          strokeDasharray={`${score}, 100`}
          strokeWidth="3.5"
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <span className="absolute text-2xl font-black text-white">{score}%</span>
    </div>
  );
}