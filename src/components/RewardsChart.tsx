"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function RewardsChart({ data }: any) {
  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="rewards" stroke="#D4AF37" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}