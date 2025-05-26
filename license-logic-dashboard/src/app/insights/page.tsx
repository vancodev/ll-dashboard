"use client";

import { useState } from "react";
import AppTab from "./application/page";
import EmployeePage from "./employee/page";
import ContractsPage from "./contracts/page";
import { FiFileText, FiGrid, FiUsers } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

type TabKey = "contracts" | "application" | "employee";

const tabs: { key: TabKey; label: string; icon: JSX.Element }[] = [
  { key: "contracts", label: "Contracts", icon: <FiFileText className="text-base" /> },
  { key: "application", label: "Application", icon: <FiGrid className="text-base" /> },
  { key: "employee", label: "Employee", icon: <FiUsers className="text-base" /> },
];

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("contracts");

  return (
    <div className="w-full">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Insights</h1>

        {/* Search input with icon */}
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-500 text-base" />
          </div>
          <input
            type="text"
            placeholder="Search here..."
            className="text-gray-900 pl-10 pr-4 py-2 border border-gray-700 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 mb-6">
        {tabs.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-md font-medium capitalize transition ${activeTab === key
              ? "bg-white border border-b-0 border-gray-300 text-blue-600"
              : "text-gray-500 hover:text-blue-600"
              }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Content per tab selection */}
      {activeTab === "application" && <AppTab />}
      {activeTab === "employee" && <EmployeePage />}
      {activeTab === "contracts" && <ContractsPage />}
    </div>
  );
}
