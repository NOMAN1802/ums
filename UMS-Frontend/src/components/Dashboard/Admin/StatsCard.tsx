import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface StatsCardProps {
  value: number;
  total: number;
  mainStat: number;
  label: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  value,
  total,
  mainStat,
  label,
}) => {
  //   const percentage = (value / total) * 100;

  const data = [
    { name: "Completed", value },
    { name: "Remaining", value: total - value },
  ];

  const COLORS = ["#FF6B6B", "#F3F3F3"];

  return (
    <div className="flex items-center justify-between p-4 h-[100px] ">
      <div className="w-16 h-16 relative">
        <PieChart width={64} height={64}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={20}
            outerRadius={30}
            startAngle={90}
            endAngle={450}
            dataKey="value"
            stroke="none"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
          {value}k
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {mainStat.toLocaleString()}k
        </h2>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );
};
