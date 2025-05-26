import AppStats from "./app-stats";
import AppChart from "./app-chart";
import AppTable from "./app-table";

export default function AppTab() {
  return (
    <div className="space-y-6">
      <AppStats />
      <AppChart />
      <AppTable />
    </div>
  );
}
