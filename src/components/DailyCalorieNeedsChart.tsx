"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface DailyCalorieNeedsChartProps {
  data: Array<{
    age: string;
    sedentary: number;
    active: number;
    veryActive: number;
  }>;
  config: {
    sedentary: { label: string };
    active: { label: string };
    veryActive: { label: string };
  };
}

export function DailyCalorieNeedsChart({ data, config }: DailyCalorieNeedsChartProps) {
  return (
    <ChartContainer
      config={config}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="age" 
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748b' }}
            label={{ value: 'Calories', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey="veryActive" 
            stroke="#DC2626" 
            strokeWidth={3}
            dot={{ fill: "#DC2626", strokeWidth: 2, r: 4 }}
            connectNulls={false}
          />
          <Line 
            type="monotone" 
            dataKey="active" 
            stroke="#EA580C" 
            strokeWidth={3}
            dot={{ fill: "#EA580C", strokeWidth: 2, r: 4 }}
            connectNulls={false}
          />
          <Line 
            type="monotone" 
            dataKey="sedentary" 
            stroke="#D97706" 
            strokeWidth={3}
            dot={{ fill: "#D97706", strokeWidth: 2, r: 4 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
