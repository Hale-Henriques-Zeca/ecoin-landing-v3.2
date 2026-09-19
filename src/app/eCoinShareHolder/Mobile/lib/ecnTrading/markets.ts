import { BotMarket } from '../../types/ecnTrading';

export const BOT_MARKETS: BotMarket[] = [
  {
    id: 'ecoin-bnb',
    pair: 'E-Coin/BNB',
    description: 'Arbitragem de alta frequência & Staking em BNB Smart Chain',
    icon: '⚡',
    badge: 'POPULAR',
  },
  {
    id: 'ecoin-usdt',
    pair: 'E-Coin/USDT',
    description: 'Pools de liquidez estável DEX com execução neural',
    icon: '₮',
    badge: 'HOT',
  },
  {
    id: 'ecoin-edollar',
    pair: 'E-Coin/eDollar',
    description: 'Operações de liquidez interna e estabilidade eDollar',
    icon: '$',
  },
  {
    id: 'ecoin-ecoin',
    pair: 'E-Coin/E-Coin',
    description: 'Pool de Recompensa Nativa (Compra na Baixa e venda na alta)',
    icon: '🪙',
  },
];