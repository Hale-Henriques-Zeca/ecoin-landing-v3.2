import { mainItems } from './mainItems';
import { walletItems } from './walletItems';
import { ecosystemItems } from './ecosystemItems';
import { systemItems } from './systemItems';

export const SIDEBAR_GROUPS = [
  {
    id: 'main',
    title: 'Principal',
    items: mainItems,
  },
  {
    id: 'wallet',
    title: 'Carteira',
    items: walletItems,
  },
  {
    id: 'ecosystem',
    title: 'Ecossistema',
    items: ecosystemItems,
  },
  {
    id: 'system',
    title: 'Sistema',
    items: systemItems,
  },
] as const;