'use client';

import React from 'react';

export default function SessionDuration({ duration }: { duration: string }) {
  return <span className="text-[9px] text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">{duration}</span>;
}