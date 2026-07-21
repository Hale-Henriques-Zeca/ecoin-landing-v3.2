'use client';

import React from 'react';

export default function LoginTimeline({ date }: { date: string }) {
  return <span className="text-neutral-500 text-[10px]">{date}</span>;
}