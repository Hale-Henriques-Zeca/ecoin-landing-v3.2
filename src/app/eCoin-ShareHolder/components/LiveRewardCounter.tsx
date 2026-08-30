"use client";

import { useEffect, useState } from "react";

type Props = {
  pendingUSDT:number;
  pendingEUSD:number;
};

export default function LiveRewardCounter({
  pendingUSDT,
  pendingEUSD
}:Props){

const [liveUSDT,setLiveUSDT] =
useState(pendingUSDT);

const [liveEUSD,setLiveEUSD] =
useState(pendingEUSD);

useEffect(()=>{

 setLiveUSDT(pendingUSDT);
 setLiveEUSD(pendingEUSD);

},[pendingUSDT,pendingEUSD]);

useEffect(()=>{

 const t=setInterval(()=>{

  setLiveUSDT(v=>v+(pendingUSDT*0.0002));
  setLiveEUSD(v=>v+(pendingEUSD*0.0002));

 },1000);

 return ()=>clearInterval(t);

},[pendingUSDT,pendingEUSD]);

return(

<div className="bg-black/50 border border-green-500/20 rounded-xl p-4 text-center space-y-2">

<p className="text-xs text-gray-400">
Balcão de Lucratividade ao Vivo
</p>

<div className="text-lg font-bold text-green-400">
{liveUSDT.toFixed(6)} USDT
</div>

<div className="text-lg font-bold text-blue-400">
{liveEUSD.toFixed(6)} eDollar
</div>

<p className="text-[11px] text-gray-500">
Lucros acumuladas ao vivo
</p>

</div>

);

}