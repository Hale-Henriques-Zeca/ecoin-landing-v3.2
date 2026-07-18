'use client';

import React from 'react';
import NetworkBadge, { NetworkType, NetworkStatus } from './components/NetworkBadge';

interface HeaderCenterProps {
  network?: NetworkType | string;
  networkStatus?: NetworkStatus;
  children?: React.ReactNode; // Permite injeção futura de barras de pesquisa ou filtros
}

export default function HeaderCenter({ 
  network, 
  networkStatus, 
  children 
}: HeaderCenterProps) {
  return (
    <div className="flex items-center justify-center w-full">
      {children ? (
        <div className="w-full max-w-xs">{children}</div>
      ) : (
        <NetworkBadge network={network} status={networkStatus} />
      )}
    </div>
  );
}