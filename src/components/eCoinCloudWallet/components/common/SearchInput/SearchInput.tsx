'use client';

import React from 'react';
import { SearchIcon, SearchField, ClearButton } from './components';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
  className = ''
}: SearchInputProps) {
  return (
    <div className={`
      flex items-center gap-2.5 w-full h-10 px-3.5 rounded-xl
      bg-[#090909]/65 border border-white/5 
      focus-within:border-[#D4AF37]/45 focus-within:bg-[#090909]/95
      transition-all duration-300 group ${className}
    `}>
      <SearchIcon />
      <SearchField value={value} onChange={onChange} placeholder={placeholder} />
      {value && <ClearButton onClick={() => onChange('')} />}
    </div>
  );
}