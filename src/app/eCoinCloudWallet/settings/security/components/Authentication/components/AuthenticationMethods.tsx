'use client';

import React from 'react';
import GoogleLogin from './GoogleLogin';
import AppleLogin from './AppleLogin';
import MicrosoftLogin from './MicrosoftLogin';
import GitHubLogin from './GitHubLogin';
import EmailLogin from './EmailLogin';
import PhoneLogin from './PhoneLogin';

export default function AuthenticationMethods() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <GoogleLogin />
      <AppleLogin />
      <MicrosoftLogin />
      <GitHubLogin />
      <EmailLogin />
      <PhoneLogin />
    </div>
  );
}