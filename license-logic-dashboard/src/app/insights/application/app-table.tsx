"use client";

import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiAsana, SiAtlassian } from "react-icons/si";
import { getInactiveApps, AppStatus } from "@/services/backend-service";

// Icon map
const iconMap: Record<string, JSX.Element> = {
    linkedin: <FaLinkedin className="text-[#0077B5] w-6 h-6" />,
    github: <FaGithub className="text-blue-500 w-6 h-6" />,
    // @note: Cannot find the cohere icon, so just use LinkedIn for now
    cohere: <FaLinkedin className="text-blue-600 w-6 h-6" />,
    asana: <SiAsana className="text-pink-500 w-6 h-6" />,
    atlassian: <SiAtlassian className="text-orange-500 w-6 h-6" />,
};

export default function AppTable() {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const raw: AppStatus[] = await getInactiveApps();
                const transformed: any[] = raw.map((row) => {
                    const { inactiveCount, abandonedCount, totalCount } = row;
                    const inactivePct = (inactiveCount / totalCount) * 100;
                    const abandonedPct = (abandonedCount / totalCount) * 100;
                    const remainingPct = 100 - inactivePct - abandonedPct;
                    const activeCount = totalCount - inactiveCount - abandonedCount;

                    return {
                        ...row,
                        count: `${inactiveCount + abandonedCount}/${totalCount}`,
                        segments: [
                            {
                                color: "bg-purple-300",
                                percentage: inactivePct,
                                label: `Inactive: ${inactiveCount}`,
                            },
                            {
                                color: "bg-rose-300",
                                percentage: abandonedPct,
                                label: `Abandoned: ${abandonedCount}`,
                            },
                            {
                                color: "bg-emerald-300",
                                percentage: remainingPct,
                                label: `Active: ${activeCount}`,
                            },
                        ],
                    };
                });
                setRows(transformed);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
                Inactive or Abandoned accounts in paid apps
            </h2>

            {loading ? (
                <div className="text-sm text-gray-500">Loading...</div>
            ) : error ? (
                <div className="text-sm text-red-600">{error}</div>
            ) : (
                <>
                    <div className="grid grid-cols-[240px_1fr_120px] items-center text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 border-b border-gray-200">
                        <div>Name of app</div>
                        <div>Breakdown</div>
                        <div className="text-right">Inactive or Abandoned vs. all</div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {rows.map((app, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-[240px_1fr_120px] items-center py-4"
                            >
                                <div className="flex items-center gap-3 font-medium text-gray-800">
                                    {iconMap[app.icon]}
                                    <span>{app.name}</span>
                                </div>

                                <div className="px-4">
                                    <div className="relative h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="absolute inset-0 flex">
                                            {app.segments.map((seg, j) => {
                                                const isFirst = j === 0;
                                                const isLast = j === app.segments.length - 1;
                                                return (
                                                    <Tippy
                                                        key={j}
                                                        content={seg.label}
                                                        placement="top"
                                                        animation="fade"
                                                    >
                                                        <div
                                                            className={`${seg.color} h-full inline-block`}
                                                            style={{
                                                                width: `${seg.percentage}%`,
                                                                borderTopLeftRadius: isFirst ? 9999 : undefined,
                                                                borderBottomLeftRadius: isFirst ? 9999 : undefined,
                                                                borderTopRightRadius: isLast ? 9999 : undefined,
                                                                borderBottomRightRadius: isLast ? 9999 : undefined,
                                                                pointerEvents: "auto",
                                                            }}
                                                        />
                                                    </Tippy>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right font-semibold text-gray-800">
                                    {app.count}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
