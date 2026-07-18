'use client';

import React from 'react';
import { PageHeader, PageContent } from './components';

export interface PageContainerProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  title,
  subtitle,
  headerActions,
  children,
  className = ''
}: PageContainerProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 md:px-6 py-6 min-h-screen ${className}`}>
      <PageHeader title={title} subtitle={subtitle} actions={headerActions} />
      <PageContent>{children}</PageContent>
    </div>
  );
}