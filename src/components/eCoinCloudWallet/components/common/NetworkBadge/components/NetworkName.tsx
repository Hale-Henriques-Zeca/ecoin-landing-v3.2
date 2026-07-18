'use client';

import React from 'react';

interface NetworkNameProps {
  name: string;
  shortName?: string;
  className?: string;
}

export default function NetworkName({ name, shortName, className = '' }: NetworkNameProps) {
  return (
    <span className={`font-mono text-xs font-bold tracking-wider text-neutral-200 ${className}`}>
      {shortName ? (
        <>
          <span className="inline sm:hidden">{shortName}</span>
          <span className="hidden sm:inline">{name}</span>
        </>
      ) : (
        name
      )}
    </span>
  );
}