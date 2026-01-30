"use client";

import { GitHubCalendar } from "react-github-calendar";

interface GithubHeatmapProps {
    username: string;
}

export function GithubHeatmap({ username }: GithubHeatmapProps) {
    // Custom Red Theme to match the site's investigative aesthetic
    const theme = {
        light: ["#161b22", "#39d353", "#26a641", "#006d32", "#0e4429"],
        dark: ["#121212", "#3b0000", "#6b0000", "#a50000", "#ff1a1a"],
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            {/* 
                Drastically reduced base block size and implemented more aggressive scaling 
                to ensure the 52-week calendar fits in the 75% column width.
            */}
            <div className="w-full flex justify-center py-4">
                <div className="scale-[0.65] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 xl:scale-[1.1] transform-gpu origin-center">
                    <GitHubCalendar
                        username={username}
                        colorScheme="dark"
                        theme={theme}
                        blockSize={10} // Reduced from 12/13 to 10
                        blockMargin={3} // Slightly reduced margin
                        fontSize={10}   // Smaller font
                        labels={{
                            totalCount: "{{count}} activities tracked",
                        }}
                    />
                </div>
            </div>

            <style jsx global>{`
                .react-github-calendar__chart text {
                    fill: #888 !important;
                    font-family: var(--font-special-elite), monospace !important;
                    font-size: 9px !important;
                }
                /* Force reset any parent overflow issues */
                .react-github-calendar {
                    width: auto !important;
                    max-width: none !important;
                }
                .react-github-calendar svg {
                    overflow: visible !important;
                }
            `}</style>
        </div>
    );
}
