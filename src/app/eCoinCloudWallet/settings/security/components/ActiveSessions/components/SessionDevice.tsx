'use client';

import React from 'react';

export default function SessionDevice({ device }: { device: string }) {
  return <span className="text-xs font-bold text-white block">{device}</span>;
}