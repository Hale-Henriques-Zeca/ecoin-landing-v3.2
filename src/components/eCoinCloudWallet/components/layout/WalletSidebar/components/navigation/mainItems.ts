import { LayoutDashboard } from 'lucide-react';
import { WALLET_ROUTES } from '@/components/eCoinCloudWallet/config/wallet/routes';

export const mainItems = [
  { 
    title: 'Dashboard', 
    href: WALLET_ROUTES.dashboard, 
    icon: LayoutDashboard 
  },
] as const;