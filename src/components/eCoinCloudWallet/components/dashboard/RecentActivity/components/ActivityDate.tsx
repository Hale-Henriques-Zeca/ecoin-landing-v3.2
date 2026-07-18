'use client';

import React from 'react';

interface ActivityDateProps {
  date: string;
}

export default function ActivityDate({ date }: ActivityDateProps) {
  return (
    <span className="text-[10px] font-mono font-semibold text-neutral-500 uppercase tracking-wide">
      {date}
    </span>
  );
}