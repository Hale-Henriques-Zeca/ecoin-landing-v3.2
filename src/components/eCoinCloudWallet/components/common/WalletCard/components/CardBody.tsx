'use client';

import React from 'react';

interface CardBodyProps {
  children: React.ReactNode;
}

export default function CardBody({ children }: CardBodyProps) {
  return <div className="w-full">{children}</div>;
}