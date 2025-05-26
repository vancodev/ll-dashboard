"use client";

import { useEffect, useState } from "react";
import { FiGrid, FiClock, FiDollarSign } from "react-icons/fi";
import StatsCard from "@/components/stats-card";
import { getAppStats } from "@/services/backend-service";

type AppStatsData = {
  stats: {
    applications: {
      total: number;
      unlinked: number;
    };
    utilization: {
      average: number;
      change: number;
    };
    savings: {
      potential: number;
    };
  };
};

export default function AppStats() {
  const [stats, setStats] = useState<AppStatsData["stats"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data: AppStatsData = await getAppStats();
        setStats(data.stats);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading stats...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!stats) return null;

  const change = stats.utilization.change;
  const changeDirection = change >= 0 ? "🟢" : "🔻";
  const formattedChange = `${changeDirection} ${Math.abs(change * 100).toFixed(1)}%`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Total Applications"
          value={stats.applications.total.toLocaleString()}
          subtext={`Unlinked: ${stats.applications.unlinked.toLocaleString()}`}
          icon={<FiGrid className="text-white" />}
          iconBgColor="bg-blue-500"
        />
        <StatsCard
          title="Average L30 Utilization"
          value={`${(stats.utilization.average * 100).toFixed(0)}%`}
          subtext={`MoM: ${formattedChange}`}
          icon={<FiClock className="text-white" />}
          iconBgColor="bg-purple-500"
        />
        <StatsCard
          title="Saving Potential"
          value={`$${(stats.savings.potential / 1000).toFixed(0)}k`}
          icon={<FiDollarSign className="text-white" />}
          iconBgColor="bg-teal-500"
        />
      </div>
    </div>
  );
}
