'use client';

import React from 'react';

export default function SessionLocation({ location, ip }: { location: string; ip: string }) {
  return <span className="text-[10px] text-neutral-500">{location} • IP: {ip}</span>;
}