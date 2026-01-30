"use client";

import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";

interface GithubHeatmapProps {
    username: string;
}

export function GithubHeatmap({ username }: GithubHeatmapProps) {
    // Custom Red Theme to match the site's investigative aesthetic
    const theme = {
        light: ["#161b22", "#39d353", "#26a641", "#006d32", "#0e4429"],
        dark: ["#121212", "#3b0000", "#6b0000", "#8b0000", "#ff0000"],
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full overflow-x-auto custom-scrollbar pb-4 flex justify-center">
                <GitHubCalendar
                    username={username}
                    colorScheme="dark"
                    theme={theme}
                    blockSize={13}
                    blockMargin={4}
                    fontSize={12}
                    labels={{
                        totalCount: "{{count}} contributions in the last year",
                    }}
                />
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #8b0000;
                    border-radius: 10px;
                }
                .react-github-calendar__chart text {
                    fill: #666 !important;
                    font-family: var(--font-special-elite), monospace !important;
                    font-size: 10px !important;
                }
            `}</style>
        </div>
    );
}
