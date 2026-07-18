'use client';

import React from 'react';

interface LoadingSkeletonProps {
  rows?: number;
}

export default function LoadingSkeleton({ rows = 3 }: LoadingSkeletonProps) {
  return (
    <div className="w-full space-y-3.5">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-2 animate-pulse w-full">
          <div className="h-4 w-1/3 bg-white/5 rounded" />
          <div className="h-10 w-full bg-white/5 rounded-lg border border-white/[0.03]" />
        </div>
      ))}
    </div>
  );
}