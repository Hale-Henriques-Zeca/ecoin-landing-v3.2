"use client";

import { useState } from "react";
import { useReadContract } from "wagmi";
import { priceEngineAbi } from "@/lib/abis/priceEngineAbi";
import { CONTRACTS } from "@/lib/contracts";
import { formatUnits } from "viem";
import EcoinFutureSimulator from "@/components/EcoinFutureSimulator"
import CryptoGrowthSimulator from "@/components/CryptoGrowthSimulator";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Filler
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Filler
)

export default function EcoinFlexibleFutureSimulator(){

const { data: ecoinPriceRaw } = useReadContract({
 address: CONTRACTS.PRICE_ENGINE,
 abi: priceEngineAbi,
 functionName: "ecoinPriceUSDT",
 query:{ refetchInterval:5000 }
})

const ecoinPrice =
typeof ecoinPriceRaw === "bigint"
? Number(formatUnits(ecoinPriceRaw,18))
: 0


/* USER INPUT */

const [investment,setInvestment] = useState(100)
const [futurePrice,setFuturePrice] = useState(10)
const [marketMode,setMarketMode] = useState("balanced")
const [timeMode,setTimeMode] = useState("year")
const [duration,setDuration] = useState(5)



const timeMultipliers:any = {
second: 1,
minute: 60,
hour: 3600,
day: 86400,
week: 604800,
month: 2592000,
sixMonths: 15552000,
year: 31536000
}

/* CALCULATIONS */

const coins =
ecoinPrice ? investment / ecoinPrice : 0


/* PRICE PROJECTION */

const steps = []

for(let i=1; i<=duration; i++){
steps.push(i)
}

const secondsTotal =
timeMultipliers[timeMode] * duration

const growthData = steps.map(step => {

const elapsedTime =
(timeMultipliers[timeMode] * step)

const timeProgress =
elapsedTime / secondsTotal

let curve = timeProgress

// Ajuste baseado no tempo
if(timeMode === "second" || timeMode === "minute"){
  curve = Math.pow(timeProgress, 0.3) // crescimento rápido
}

if(timeMode === "hour"){
  curve = Math.pow(timeProgress, 0.5)
}

if(timeMode === "day"){
  curve = Math.pow(timeProgress, 0.7)
}

// depois aplica cenário
if(marketMode === "conservative"){
  curve = Math.pow(curve, 1.5)
}

if(marketMode === "aggressive"){
  curve = Math.pow(curve, 0.7)
}

if(marketMode === "conservative"){
curve = Math.pow(timeProgress, 2)
}

if(marketMode === "balanced"){
curve = timeProgress
}

if(marketMode === "aggressive"){
curve = Math.pow(timeProgress, 0.5)
}

const simulatedPrice =
ecoinPrice * Math.pow(
(futurePrice / ecoinPrice),
curve
)

const coins = investment / ecoinPrice

return coins * simulatedPrice
})

/* ✅ AGORA SIM PODES USAR */

const finalValue =
growthData[growthData.length - 1] || 0


/* ROI */

const roi =
investment > 0
? ((finalValue - investment) / investment) * 100
: 0


const chartData = {
labels: steps.map(s => {
  const unit =
    timeMode === "second" ? "sec" :
    timeMode === "minute" ? "min" :
    timeMode === "hour" ? "hr" :
    timeMode === "day" ? "day" :
    timeMode === "week" ? "wk" :
    timeMode === "month" ? "mo" :
    timeMode === "sixMonths" ? "6mo" :
    "yr"

  return `${s}${unit}`
}),
datasets:[{
label:"Investment Growth",
data: growthData,
borderColor:"#D4AF37",
backgroundColor:"rgba(212,175,55,0.15)",
fill:true,
tension:0.4
}]
}


/* MARKET CAP SIMULATION */

const ethereumMarketCap = 420000000000

const ecoinSupply = 1000000000

const priceIfEthCap =
ethereumMarketCap / ecoinSupply


return(

<section className="w-full max-w-6xl mx-auto mt-20 space-y-12">

<EcoinFutureSimulator />

{/* HEADER */}

<div className="text-center space-y-3">

<h2 className="text-3xl font-bold text-[#D4AF37]">
💎 What if you invested in E-Coin today?
</h2>


<p className="text-gray-400 max-w-xs mx-auto">

Create your own investment scenario and explore the potential
future value of E-Coin.

</p>

</div>


{/* CURRENT PRICE */}

<div className="text-center text-gray-400">

Current E-Coin Price:

<span className="text-[#D4AF37] ml-2 font-semibold">

${ecoinPrice.toFixed(6)}

</span>

</div>


{/* INPUTS */}

<div className="grid md:grid-cols-2 gap-6">

<div>

<label className="text-gray-400 text-sm">

Investment Amount ($)

</label>

<input
type="number"
value={investment}
onChange={(e)=>setInvestment(Number(e.target.value))}
className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white"
/>

</div>


<div>

<label className="text-gray-400 text-sm">

Future E-Coin Price ($)

</label>

<input
type="number"
value={futurePrice}
onChange={(e)=>setFuturePrice(Number(e.target.value))}
className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white"
/>

</div>

</div>






<div className="grid md:grid-cols-2 gap-6">

<div>
<label className="text-gray-400 text-sm">
Duration
</label>

<input
type="number"
value={duration}
onChange={(e)=>setDuration(Number(e.target.value))}
className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white"
/>
</div>

<div>
<label className="text-gray-400 text-sm">
Time Unit
</label>

<select
value={timeMode}
onChange={(e)=>setTimeMode(e.target.value)}
className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white"
>

<option value="second">Seconds</option>
<option value="minute">Minutes</option>
<option value="hour">Hours</option>
<option value="day">Days</option>
<option value="week">Weeks</option>
<option value="month">Months</option>
<option value="sixMonths">6 Months</option>
<option value="year">Years</option>

</select>
</div>

</div>

<div>

<label className="text-gray-400 text-sm">
Market Scenario
</label>

<select
value={marketMode}
onChange={(e)=>setMarketMode(e.target.value)}
className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white"
>

<option value="conservative">Conservative</option>
<option value="balanced">Balanced</option>
<option value="aggressive">Aggressive</option>

</select>

</div>



{/* RESULTS */}

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-[#0D0D0D] border border-gray-800 rounded-xl p-6 text-center">

<p className="text-gray-400">

Coins Purchased

</p>

<p className="text-[#D4AF37] text-xl font-semibold">

{coins.toLocaleString()}

</p>

</div>


<div className="bg-[#0D0D0D] border border-gray-800 rounded-xl p-6 text-center">

<p className="text-gray-400">

Future Value

</p>

<p className="text-green-400 text-2xl font-bold">

${finalValue.toLocaleString()}

</p>

</div>


<div className="bg-[#0D0D0D] border border-gray-800 rounded-xl p-6 text-center">

<p className="text-gray-400">

ROI

</p>

<p className="text-[#D4AF37] text-2xl font-bold">

{roi.toFixed(0)} %

</p>

</div>

</div>


{/* CHART */}

<div className="bg-[#0D0D0D] border border-gray-800 rounded-xl p-6">

<p className="text-gray-400 text-center mb-4">

E-Coin Growth Projection ({duration} {timeMode})

</p>

<Line data={chartData} />

</div>


{/* MARKET CAP SIMULATION */}

<div className="bg-[#0D0D0D] border border-gray-800 rounded-xl p-6 text-center space-y-2">

<p className="text-gray-400">

If E-Coin reaches Ethereum Market Cap

</p>

<p className="text-[#D4AF37] text-xl font-semibold">

Potential Price: ${priceIfEthCap.toFixed(2)}

</p>

</div>
<CryptoGrowthSimulator />
</section>



)

}