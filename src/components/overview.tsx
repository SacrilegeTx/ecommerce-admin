"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export function Overview({ data }: OverviewProps) {
  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart data={data}>
        <XAxis axisLine={false} dataKey="name" fontSize={12} stroke="#8884d8" tickLine={false} />
        <YAxis
          axisLine={false}
          fontSize={12}
          stroke="#8884d8"
          tickFormatter={(value) => `$${value}`}
          tickLine={false}
        />
        <Bar dataKey="revenue" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
