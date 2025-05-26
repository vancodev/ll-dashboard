"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { BsBuilding } from "react-icons/bs";
import { useState } from "react";
import { GoPeople, GoWorkflow } from "react-icons/go";
import { TbContract } from "react-icons/tb";
import { MdOutlineAutorenew, MdApps } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GiArtificialIntelligence } from "react-icons/gi";

import {
  FiHome,
  FiChevronDown,
  FiChevronUp,
  FiSettings,
} from "react-icons/fi";

type NavItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  { label: "Insights", href: "/insights", icon: <FiHome /> },
  {
    label: "Vendors",
    href: "/vendors",
    icon: <BsBuilding />,
    children: [
      { label: "Applications", href: "/vendors/applications", icon: <MdApps /> },
      { label: "Contracts", href: "/vendors/contracts", icon: <TbContract /> },
      { label: "Invoices", href: "/vendors/invoices", icon: <LiaFileInvoiceDollarSolid /> },
      { label: "Price Intelligence", href: "/vendors/price-intelligence", icon: <GiArtificialIntelligence /> },
    ],
  },
  { label: "Employees", href: "/employees", icon: <GoPeople /> },
  { label: "Renewals", href: "/renewals", icon: <MdOutlineAutorenew /> },
  { label: "Workflows", href: "/workflows", icon: <GoWorkflow /> },
];

export default function SideNav() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <aside className="w-64 h-screen bg-white border-r p-4 flex flex-col justify-between fixed shadow-sm">
      <div>
        {/* Logo + Upload */}
        <div className="flex items-center gap-2 mb-6 px-2">
          <Image
            src="/logo.svg"
            alt="License Logic Logo"
            width={24}
            height={24}
          />
          <span className="text-xl font-bold text-blue-900">License Logic</span>
        </div>

        <button className="w-full bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center justify-center gap-2 mb-6">
          <HiOutlineDocumentArrowUp className="text-lg" />
          Upload Documents
        </button>

        {/* Navigation */}
        <nav className="space-y-2 text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isDropdown = !!item.children;

            return (
              <div key={item.label}>
                {isDropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-gray-100 text-left ${openDropdown === item.label
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-800"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {openDropdown === item.label ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 ${isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-800"
                      }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                )}

                {isDropdown && openDropdown === item.label && (
                  <div className="ml-10 mt-1 space-y-1">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href!}
                        className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm hover:bg-gray-100 ${pathname === child.href
                          ? "text-blue-600 font-medium"
                          : "text-gray-600"
                          }`}
                      >
                        <span className="text-base">{child.icon}</span>
                        {child.label}
                      </Link>
                    ))}

                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Buttons */}
      <div className="flex items-center justify-between px-4 pt-6 border-t">
        <button className="w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center">
          J
        </button>
        <button className="w-9 h-9 rounded-full border text-gray-500 flex items-center justify-center hover:bg-gray-100">
          <FiSettings />
        </button>
      </div>
    </aside>
  );
}
