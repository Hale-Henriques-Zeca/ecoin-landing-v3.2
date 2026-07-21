'use client';

import React from 'react';
import WindowsHello from './WindowsHello';
import FaceID from './FaceID';
import TouchID from './TouchID';
import AndroidBiometrics from './AndroidBiometrics';

export default function RegisteredPasskeys() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <WindowsHello />
      <FaceID />
      <TouchID />
      <AndroidBiometrics />
    </div>
  );
}