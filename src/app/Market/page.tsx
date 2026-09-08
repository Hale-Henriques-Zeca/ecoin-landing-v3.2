'use client';

import React, { Suspense } from 'react';
import MarketHeader from './components/MarketHeader';
import MarketDesktop from './components/Desktop/MarketDesktop';
import MarketMobile from './components/Mobile/MarketMobile';
import MarketFooter from './components/MarketFooter';
import Loading from './Loading';

export default function MarketPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <MarketHeader />

        <Suspense fallback={<Loading />}>
          <MarketDesktop />
          <MarketMobile />
        </Suspense>

        <MarketFooter />
      </div>
    </main>
  );
}