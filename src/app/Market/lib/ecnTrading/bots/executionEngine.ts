import { TradeActivity } from '../../../types/ecnTrading';

export const INITIAL_TRADE_ACTIVITIES: TradeActivity[] = [
  {
    id: 'tx-101',
    timestamp: '20:41:08',
    botName: 'USDT BOT',
    pair: 'E-Coin / USDT',
    type: 'BUY',
    amount: '1,000 USDT',
    status: 'EXECUTED',
  },
  {
    id: 'tx-102',
    timestamp: '20:40:52',
    botName: 'BNB BOT',
    pair: 'E-Coin / BNB',
    type: 'SELL',
    amount: '0.84 BNB',
    status: 'PROFITABLE',
  },
  {
    id: 'tx-103',
    timestamp: '20:39:31',
    botName: 'E-Coin BOT',
    pair: 'E-Coin / EUSD',
    type: 'BUY',
    amount: '125,000 ECOIN',
    status: 'EXECUTED',
  },
  {
    id: 'tx-104',
    timestamp: '20:38:15',
    botName: 'EUSD BOT',
    pair: 'EUSD / E-Coin',
    type: 'SELL',
    amount: '500 EUSD',
    status: 'PROFITABLE',
  },
];