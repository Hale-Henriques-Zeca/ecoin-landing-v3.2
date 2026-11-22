import { BotMarket } from '../../types/ecnTrading';

export const BOT_MARKETS: BotMarket[] = [
  {
    id: 'eCoinBot',
    pair: 'E-Coin Bot',
    description: 'Arbitragem de alta frequência & Staking em eCoin Smart Chain',
    icon: '⚡',
    badge: 'POPULAR',
  },
  {
    id: 'usdtBot',
    pair: 'USDT Bot',
    description: 'Pools de liquidez estável DEX com execução neural',
    icon: '₮',
    badge: 'HOT',
  },
  {
    id: 'eDollarBot',
    pair: 'eDollar Bot',
    description: 'Operações de liquidez interna e estabilidade eDollar',
    icon: '$',
  },
  {
    id: 'buybackBot',
    pair: 'BuyBack Bot',
    description: 'Pool de Recompensa Nativa (Compra na Baixa e venda na alta)',
    icon: '🪙',
  },
];