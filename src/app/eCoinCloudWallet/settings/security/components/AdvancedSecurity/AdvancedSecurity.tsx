'use client';

import React from 'react';
import {
  AdvancedStatus,
  PrivateRpcNode,
  IPWhitelisting,
  APIKeyManagement,
  HardwareEnclave,
  TimelockConfig,
  QuantumEncryption,
} from './components';

export default function AdvancedSecurity() {
  return (
    <div className="space-y-6">
      {/* Banner de Estado Global de Infraestrutura */}
      <AdvancedStatus />

      {/* Grid de Configurações Avançadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PrivateRpcNode />
        <TimelockConfig />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IPWhitelisting />
        <APIKeyManagement />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HardwareEnclave />
        <QuantumEncryption />
      </div>
    </div>
  );
}