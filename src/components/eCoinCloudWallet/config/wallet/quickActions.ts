import { ArrowDownLeft, ArrowUpRight, RefreshCw, Layers, Coins } from 'lucide-react';
import { WALLET_ROUTES } from './routes';

export const QUICK_ACTIONS_SECTIONS = [
  {
    title: "Wallet",
    items: [
      { 
        title: "Receive Assets", 
        href: WALLET_ROUTES.receive, 
        icon: ArrowDownLeft, 
        desc: "Gerar QR Code ou link" 
      },
      { 
        title: "Send Crypto", 
        href: WALLET_ROUTES.send, 
        icon: ArrowUpRight, 
        desc: "Transferência instantânea" 
      },
      { 
        title: "Convert", 
        href: WALLET_ROUTES.convert, 
        icon: RefreshCw, 
        desc: "Troca com taxa zero" 
      },
    ]
  },
  {
    title: "Ecossistema",
    items: [
      { 
        title: "Ecosystem Modules", 
        href: WALLET_ROUTES.ecosystem, 
        icon: Layers, 
        desc: "Mineração, Ads & Launchpad" 
      },
      { 
        title: "NFTs Gallery", 
        href: WALLET_ROUTES.nfts, 
        icon: Coins, 
        desc: "Coleções digitais ativas" 
      },
    ]
  }
] as const;