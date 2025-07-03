"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface CalorieComparisonChartProps {
  data: Array<{
    food: string;
    calories: number;
  }>;
  config: {
    calories: { label: string };
  };
}

export function CalorieComparisonChart({
  data,
  config,
}: CalorieComparisonChartProps) {
  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="food" tick={{ fontSize: 12, fill: "#64748b" }} />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            label={{
              value: "Calories",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />{" "}
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="calories" fill="#8B4513" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
