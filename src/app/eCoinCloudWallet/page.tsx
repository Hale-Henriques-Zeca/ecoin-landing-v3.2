'use client';

import React from 'react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import DashboardView from '@/components/eCoinCloudWallet/components/dashboard/DashboardView';

export default function WalletPage() {
  return (
    <ResponsiveShell>
      <DashboardView />
    </ResponsiveShell>
  );
}