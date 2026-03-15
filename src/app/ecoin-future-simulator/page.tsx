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
const [startYear,setStartYear] = useState(2025)
const [endYear,setEndYear] = useState(2030)
const [marketMode,setMarketMode] = useState("balanced")

/* CALCULATIONS */

const coins =
ecoinPrice ? investment / ecoinPrice : 0

const futureValue =
coins * futurePrice


/* ROI */

const roi =
investment > 0
? ((futureValue - investment) / investment) * 100
: 0


/* PRICE PROJECTION */

const years = []

for(let y=startYear; y<=endYear; y++){
years.push(String(y))
}

const priceGrowth = years.map((_,i)=>{

const progress = (i+1)/years.length

let curve = progress

if(marketMode==="conservative"){

curve = Math.pow(progress,1.8)

}

if(marketMode==="balanced"){

curve = progress

}

if(marketMode==="aggressive"){

curve = Math.pow(progress,0.6)

}

return ecoinPrice +
(futurePrice - ecoinPrice) * curve

})


const chartData = {

labels: years,

datasets:[{

label:"E-Coin Price Projection",

data: priceGrowth,

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

<div className="grid md:grid-cols-3 gap-6">

<div>

<label className="text-gray-400 text-sm">
Start Year
</label>

<input
type="number"
value={startYear}
onChange={(e)=>setStartYear(Number(e.target.value))}
className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white"
/>

</div>


<div>

<label className="text-gray-400 text-sm">
End Year
</label>

<input
type="number"
value={endYear}
onChange={(e)=>setEndYear(Number(e.target.value))}
className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white"
/>

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

${futureValue.toLocaleString()}

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

E-Coin Price Projection ({startYear} → {endYear})

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