'use client';

import React from 'react';

export default function LoginDevice({ device }: { device: string }) {
  return <span className="text-neutral-400">{device}</span>;
}