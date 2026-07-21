'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import {
  DeviceCard,
  DeviceIcon,
  DeviceLocation,
  DeviceStatus,
  DeviceActions,
  AddDevice
} from './components';

export default function TrustedDevices() {
  const devices = [
    { name: 'Latitude Station Pro', type: 'desktop' as const, location: 'Nhamatanda, Sofala • Win 11', active: true },
    { name: 'iPhone 15 Pro', type: 'mobile' as const, location: 'Beira, Sofala • iOS 17', active: true },
  ];

  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#D4AF37]" /> Dispositivos de Confiança
        </h3>
        <AddDevice />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {devices.map((dev, idx) => (
          <DeviceCard key={idx}>
            <div className="flex items-center gap-3">
              <DeviceIcon type={dev.type} />
              <div>
                <span className="text-xs font-bold text-white block">{dev.name}</span>
                <DeviceLocation location={dev.location} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DeviceStatus active={dev.active} />
              <DeviceActions />
            </div>
          </DeviceCard>
        ))}
      </div>
    </div>
  );
}