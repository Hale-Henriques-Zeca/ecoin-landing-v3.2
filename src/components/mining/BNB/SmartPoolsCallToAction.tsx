"use client";

import Link from "next/link";

export default function SmartPoolsCallToAction() {
  return (
    <div className="mt-8 flex justify-center w-full">
      <Link 
        href="ecoin-buyback-engine" 
        className="inline-block px-6 py-2.5 text-xs font-semibold text-cyan-400 border border-cyan-500/20 rounded-xl bg-cyan-500/5 hover:bg-cyan-500 hover:text-white transition-all duration-300"
      >
        Saiba mais de Smart Pools
      </Link>
    </div>
  );
}