'use client';

import React from 'react';

interface PageContentProps {
  children: React.ReactNode;
}

export default function PageContent({ children }: PageContentProps) {
  return <main className="w-full h-full flex flex-col gap-5">{children}</main>;
}