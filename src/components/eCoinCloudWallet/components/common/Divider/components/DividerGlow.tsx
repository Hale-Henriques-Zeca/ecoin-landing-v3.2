'use client';

import React from 'react';

export default function DividerGlow() {
  return (
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FF9C]/40 to-transparent blur-[2px]" />
  );
}