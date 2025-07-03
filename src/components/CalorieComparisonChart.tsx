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
  Legend,
} from "recharts";

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    value: number;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border border-border rounded-lg shadow-lg">
        <p className="font-semibold text-foreground">{`${label}`}</p>
        {payload.map((entry, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {`${entry.dataKey === "calories" ? "Calories" : "Quantity"}: ${
              entry.value
            }${entry.dataKey === "quantity" ? "g" : ""}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom legend component
const CustomLegend = ({ payload }: {
  payload?: Array<{
    color: string;
    value: string;
  }>;
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      {payload?.map((entry, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

interface CalorieComparisonChartProps {
  data: Array<{
    food: string;
    calories: number;
    quantity?: number;
  }>;
  config: {
    calories: { label: string };
    quantity?: { label: string };
  };
}

export function CalorieComparisonChart({
  data,
  config,
}: CalorieComparisonChartProps) {
  // Check if any data has quantity
  const hasQuantity = data.some((item) => item.quantity !== undefined);

  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="food" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
          <YAxis
            tick={{ fontSize: 12 }}
            className="fill-muted-foreground"
            label={{
              value: "Values",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<CustomTooltip />} />
          {hasQuantity && (
            <Legend 
              content={<CustomLegend />}
            />
          )}
          <Bar
            dataKey="calories"
            fill="#8B4513"
            radius={[4, 4, 0, 0]}
            name="Calories"
          />
          {hasQuantity && (
            <Bar
              dataKey="quantity"
              fill="#D2691E"
              radius={[4, 4, 0, 0]}
              name="Quantity (g)"
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
