'use client';

import React from 'react';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchField({ value, onChange, placeholder = 'Procurar ativos...' }: SearchFieldProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border-0 outline-none p-0 text-xs md:text-sm text-neutral-100 placeholder-neutral-550 font-mono font-semibold"
    />
  );
}