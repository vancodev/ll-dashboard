export interface ChartData {
  date: string;
  linked: number;
  unlinked: number;
}

export interface AppStatus {
  icon: string;
  name: string;
  inactiveCount: number;
  abandonedCount: number;
  totalCount: number;
}

export type AppStatsData = {
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

/* Realistically, the backend should filter the request by start and end time, but since the data is static, filtering is done here*/
export async function getChartData(
  start: string,
  end: string
): Promise<ChartData[]> {
  const res = await fetch("/mock-chart.json");
  if (!res.ok) {
    throw new Error("Failed to fetch app adoption data");
  }
  const data: ChartData[] = await res.json();
  const startDate = new Date(start);
  const endDate = new Date(end);
  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
}

export async function getInactiveApps(): Promise<AppStatus[]> {
  const res = await fetch("/mock-inactive-apps.json");
  if (!res.ok) {
    throw new Error("Failed to fetch inactive apps data");
  }
  return res.json();
}

export async function getAppStats(): Promise<AppStatsData> {
  const res = await fetch("/mock-app-stats.json");

  if (!res.ok) {
    throw new Error("Failed to fetch app stats");
  }

  return res.json();
}
