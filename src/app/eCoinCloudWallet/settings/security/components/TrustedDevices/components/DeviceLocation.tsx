'use client';

import React from 'react';

export default function DeviceLocation({ location }: { location: string }) {
  return <span className="text-[10px] text-neutral-500 block">{location}</span>;
}