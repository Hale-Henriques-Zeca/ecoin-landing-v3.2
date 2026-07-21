'use client';

import React from 'react';
import { LogOut } from 'lucide-react';

export default function LogoutSession() {
  return (
    <button className="text-neutral-500 hover:text-red-400 p-1">
      <LogOut size={14} />
    </button>
  );
}