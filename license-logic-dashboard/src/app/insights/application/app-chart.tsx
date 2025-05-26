"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { getChartData } from "@/services/backend-service";
import { format, subMonths, subDays, differenceInDays } from "date-fns";

export default function AppChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState("1 month");
  const [percentageChange, setPercentageChange] = useState<number | null>(null);

  const getStartDateFromRange = (range: string): string => {
    const today = new Date();
    if (range === "3 months") return format(subMonths(today, 3), "yyyy-MM-dd");
    if (range === "6 months") return format(subMonths(today, 6), "yyyy-MM-dd");
    return format(subMonths(today, 1), "yyyy-MM-dd");
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const end = format(today, "yyyy-MM-dd");
        const startDate = new Date(getStartDateFromRange(range));
        const start = format(startDate, "yyyy-MM-dd");

        // Current range data
        const currentData = await getChartData(start, end);
        setData(currentData);

        // Previous range data
        const days = differenceInDays(today, startDate);
        const previousEnd = format(subDays(startDate, 1), "yyyy-MM-dd");
        const previousStart = format(subDays(startDate, days), "yyyy-MM-dd");
        const previousData = await getChartData(previousStart, previousEnd);

        // Calculate totals
        const totalCurrent = currentData.reduce((sum, d) => sum + d.linked + d.unlinked, 0);
        const totalPrevious = previousData.reduce((sum, d) => sum + d.linked + d.unlinked, 0);

        // Calculate % change
        if (totalPrevious === 0) {
          setPercentageChange(null); 
        } else {
          const change = ((totalCurrent - totalPrevious) / totalPrevious) * 100;
          setPercentageChange(change);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [range]);

  const formatChange = (value: number | null): string => {
    if (value === null) return "N/A";
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  const changeColor = percentageChange === null
    ? "text-gray-500"
    : percentageChange >= 0
    ? "text-green-600"
    : "text-red-600";

  const changeIcon = percentageChange === null
    ? null
    : percentageChange >= 0
    ? <FiArrowUpRight className="text-base" />
    : <FiArrowDownRight className="text-base" />;

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">App Adoption Overview</h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-sm text-gray-500">
              {data.length} New apps added in the last{" "}
              <span className="text-blue-600 font-medium">{range}</span>
            </span>
            <span className={`flex items-center gap-1 text-sm font-semibold ${changeColor}`}>
              {changeIcon}
              {formatChange(percentageChange)} vs. previous
            </span>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700"
            >
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 sm:mt-0 flex gap-4 items-center pr-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="w-3 h-3 rounded bg-blue-600" />
            Linked Apps
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="w-3 h-3 rounded bg-blue-300" />
            Unlinked Apps
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="bg-white border border-gray-100 rounded-lg shadow-inner p-4">
        {loading ? (
          <div className="text-gray-500 text-center">Loading chart...</div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="unlinkedFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#93c5fd" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="unlinked"
                stroke="#93c5fd"
                fill="url(#unlinkedFill)"
                name="Unlinked Apps"
                dot={{ r: 5 }}
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="linked"
                stroke="#2563eb"
                fill="transparent"
                name="Linked Apps"
                dot={{ r: 5, stroke: "#2563eb", strokeWidth: 2, fill: "#fff" }}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
