'use client';

import React from 'react';

export default function FooterRight() {
  const links = [
    { label: 'Suporte', href: '#support' },
    { label: 'Privacidade', href: '#privacy' },
    { label: 'Termos', href: '#terms' },
    { label: 'Documentação', href: '#docs' }
  ];

  return (
    <nav className="flex items-center gap-4 text-[10px] font-mono text-neutral-500 select-none">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          className="hover:text-[#D4AF37] transition-colors font-semibold"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}