'use client';

import React from 'react';

export default function LoginLocation({ location }: { location: string }) {
  return <span className="text-neutral-300">{location}</span>;
}