'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  RefreshCw, 
  ShoppingCart, 
  History, 
  Landmark,
  Coins, 
  Award, 
  Activity as TxIcon, 
  Network, 
  Image as ImageIcon, 
  Database 
} from 'lucide-react';

import PageContainer from '../common/PageContainer';
import SectionHeader from '../common/SectionHeader';
import BalanceCard from './BalanceCard';
import QuickActions from './QuickActions';
import AssetOverview from './AssetOverview';
import WalletStatistics from './WalletStatistics';
import RewardsSummary from './RewardsSummary';
import RecentActivity from './RecentActivity';

export default function DashboardView() {
  const router = useRouter();
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(false);

  // --- MOCK DATA PREMIUM ---

  const balanceData = {
    amount: 752420.50,
    symbol: 'ECOIN',
    fiatAmount: 11286.30,
    fiatSymbol: 'USD',
    trend: 14.85,
    lastUpdated: 'Há 1 min',
  };

  const quickActions = [
    { id: 'receive', label: 'Receber', icon: ArrowDownLeft },
    { id: 'send', label: 'Enviar', icon: ArrowUpRight },
    { id: 'convert', label: 'convert', icon: RefreshCw },
    { id: 'buy', label: 'Comprar', icon: ShoppingCart },
    { id: 'investment', label: 'investir', icon: Landmark }, 
    { id: 'history', label: 'Histórico', icon: History },
  ];

  const assets = [
    { name: 'eCoin', symbol: 'E-Coin', balance: 752420.50, fiatBalance: 7524.20, price: 0.010, trend24h: 14.85 },
    { name: 'eDollar', symbol: 'E-USD', balance: 3762.10, fiatBalance: 3762.10, price: 1.000, trend24h: 0.00 },
    { name: 'Bitcoin', symbol: 'BTC', balance: 0.145, fiatBalance: 9425.00, price: 65000.000, trend24h: 3.20 },
    { name: 'Ethereum', symbol: 'ETH', balance: 1.620, fiatBalance: 5670.00, price: 3500.000, trend24h: -1.45 },
    { name: 'Binance Coin', symbol: 'BNB', balance: 5.400, fiatBalance: 3132.00, price: 580.000, trend24h: 0.85 },
    { name: 'Tether', symbol: 'USDT', balance: 145.00, fiatBalance: 145.00, price: 1.000, trend24h: -0.05 },
  ];

  const stats = [
    { label: 'Ativos', value: '6 Tokens', icon: Coins },
    { label: 'Rewards', value: '1.450 eUSD', icon: Award },
    { label: 'Transações', value: '142 Tx', icon: TxIcon },
    { label: 'Redes', value: 'EVM Core', icon: Network },
    { label: 'NFTs', value: '12 Items', icon: ImageIcon },
    { label: 'Storage', value: 'Cloud Active', icon: Database },
  ];

  const rewards = [
    { id: 'mining', title: 'Mineração Cloud', earned: 450.75, maxCapacity: 1000, symbol: 'ECOIN' },
    { id: 'trading', title: 'Bot Arbitragem IA', earned: 320.10, maxCapacity: 500, symbol: 'EUSD' },
    { id: 'referral', title: 'Sistema Referências', earned: 180.00, maxCapacity: 1000, symbol: 'ECOIN' },
    { id: 'staking', title: 'Staking Ativo', earned: 500.00, maxCapacity: 2000, symbol: 'EUSD' },
  ];

  const activities = [
    { id: 'act-1', type: 'reward' as const, status: 'connected' as const, date: 'Hoje, 14:32', amount: 25.50, symbol: 'ECOIN', address: '0x3f5...71a9' },
    { id: 'act-2', type: 'convert' as const, status: 'sponsored' as const, date: 'Ontem, 18:15', amount: 150.00, symbol: 'EUSD' },
    { id: 'act-3', type: 'send' as const, status: 'connected' as const, date: '14 Jul, 09:12', amount: 500.00, symbol: 'ECOIN', address: '0x71C...4291' },
    { id: 'act-4', type: 'deposit' as const, status: 'connected' as const, date: '12 Jul, 11:04', amount: 1000.00, symbol: 'EUSD', address: '0x996...124a' },
    { id: 'act-5', type: 'claim' as const, status: 'pending' as const, date: '10 Jul, 21:44', amount: 85.20, symbol: 'ECOIN' },
  ];

  // --- FUNÇÕES DE NAVEGAÇÃO E INTERAÇÃO ---
  const handleToggleHide = () => setIsBalanceHidden(prev => !prev);
  
  const handleSend = () => router.push('/eCoinCloudWallet/send');
  const handleReceive = () => router.push('/eCoinCloudWallet/receive');
  
  const handleActionClick = (id: string) => {
    switch (id) {
      case 'receive':
        router.push('/eCoinCloudWallet/receive');
        break;
      case 'send':
        router.push('/eCoinCloudWallet/send');
        break;
      case 'convert':
        router.push('/eCoinCloudWallet/convert');
        break;
      case 'buy':
        router.push('/eCoinCloudWallet/buy');
        break;
      case 'investment':
        router.push('/eCoinCloudWallet/investment'); 
        break;
      case 'history':
        router.push('/eCoinCloudWallet/history');
        break;
      default:
        console.log(`Ação não mapeada: ${id}`);
    }
  };

  const handleAssetClick = (symbol: string) => {
    // Redireciona dinamicamente para o ativo específico se necessário ou para a página geral
    router.push(`/eCoinCloudWallet/assets?token=${symbol.toLowerCase()}`);
  };

  const handleClaimAll = () => console.log('Iniciando o claim consolidado de todas as rewards');

  return (
    <PageContainer>
      <SectionHeader
        title="Dashboard"
        subtitle="Bem-vindo à eCoin Cloud Wallet"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-2">
        {/* Coluna Principal */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BalanceCard
              amount={balanceData.amount}
              symbol={balanceData.symbol}
              fiatAmount={balanceData.fiatAmount}
              fiatSymbol={balanceData.fiatSymbol}
              trend={balanceData.trend}
              lastUpdated={balanceData.lastUpdated}
              isBalanceHidden={isBalanceHidden}
              onToggleHide={handleToggleHide}
              onSend={handleSend}
              onReceive={handleReceive}
            />
            <QuickActions
              actions={quickActions}
              onActionClick={handleActionClick}
            />
          </div>

          <AssetOverview
            assets={assets}
            onAssetClick={handleAssetClick}
            onViewAll={() => router.push('/eCoinCloudWallet/assets')}
          />

          <RecentActivity
            activities={activities}
            onViewAll={() => router.push('/eCoinCloudWallet/history')}
          />
        </div>

        {/* Coluna de Apoio */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <RewardsSummary
            rewards={rewards}
            totalEarned={1450.85}
            totalSymbol="EUSD"
            onClaimAll={handleClaimAll}
          />

          <WalletStatistics
            stats={stats}
          />
        </div>
      </div>
    </PageContainer>
  );
}