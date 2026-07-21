'use client';

import React from 'react';

export default function LoginMethod({ method }: { method: string }) {
  return <span className="text-[#00FF9C] font-bold">{method}</span>;
}