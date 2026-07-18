import { Wallet, ArrowDownLeft, ArrowUpRight, RefreshCw, Clock } from 'lucide-react';
import { WALLET_ROUTES } from '@/components/eCoinCloudWallet/config/wallet/routes';

export const walletItems = [
  { 
    title: 'Assets', 
    href: WALLET_ROUTES.assets, 
    icon: Wallet 
  },
  { 
    title: 'Receber', 
    href: WALLET_ROUTES.receive, 
    icon: ArrowDownLeft 
  },
  { 
    title: 'Enviar', 
    href: WALLET_ROUTES.send, 
    icon: ArrowUpRight 
  },
  { 
    title: 'Convert', 
    href: WALLET_ROUTES.convert, 
    icon: RefreshCw 
  },
  { 
    title: 'Histórico', 
    href: WALLET_ROUTES.history, 
    icon: Clock,
    badge: 'NEW'
  },
] as const;