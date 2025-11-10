import React from "react";

interface StatsCardProps {
  percentage: number;
  totalValue: number;
  label: string;
}

export const TotalDepartmentCard: React.FC<StatsCardProps> = ({
  percentage,
  totalValue,
  label,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg h-[100px]">
      {/* Top section with percentage badge and main stat */}
      <div className="flex items-center justify-between">
        <span className="px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full flex items-center gap-1">
          {percentage}% <span>📈</span>
        </span>
        <h2 className="text-xl font-bold text-gray-800">
          {totalValue.toLocaleString()}{" "}
          <span className="text-sm">Department</span>
        </h2>
      </div>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm mt-1">{label}</p>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="h-2 bg-green-500 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
