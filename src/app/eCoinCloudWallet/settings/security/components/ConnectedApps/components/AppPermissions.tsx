'use client';

import React from 'react';

export default function AppPermissions({ permissions }: { permissions: string }) {
  return <span className="text-[10px] text-neutral-500 block">{permissions}</span>;
}