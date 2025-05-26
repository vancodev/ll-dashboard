"use client";
import { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: ReactNode;
  iconBgColor?: string;
};

export default function StatsCard({
  title,
  value,
  subtext,
  icon,
  iconBgColor = "bg-gray-200",
}: StatsCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg w-full">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
      {icon && (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor}`}>
          {icon}
        </div>
      )}
    </div>
  );
}
