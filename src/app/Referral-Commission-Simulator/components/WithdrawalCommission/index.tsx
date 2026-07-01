"use client";

import Hero from "./Hero";
import CommissionCard from "./CommissionCard";
import ReferralChart from "./ReferralChart";
import CommissionTable from "./CommissionTable";
import MonthlySimulator from "./MonthlySimulator";
import NetworkSimulator from "./NetworkSimulator";
import ReferralProgramOverview from "./ReferralProgramOverview";

export default function WithdrawalCommissionSimulator() {
  return (
    <>
      <Hero />
      <CommissionCard />
      <ReferralChart />
      <CommissionTable />
      <MonthlySimulator />
      <NetworkSimulator />
      <ReferralProgramOverview />
    </>
  );
}