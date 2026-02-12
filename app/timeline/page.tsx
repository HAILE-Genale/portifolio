"use client";

import { motion } from "framer-motion";
import { GithubHeatmap } from "@/components/ui/GithubHeatmap";
import { Terminal, Activity, ShieldAlert, Monitor, Fingerprint } from "lucide-react";

const TIMELINE = [
    { date: "OCT 2025 - PRESENT", event: "RONIN GLOBAL", desc: "Creating AI driven full stack apps and crafting the future of marketing and Advertisement", status: "ACTIVE", type: "CRITICAL" },
    { date: "APR 2025 - SEP 2025", event: "BOXSY", desc: "Full stack development using next.js and python and AI to build a modern web solutions.", status: "RESOLVED", type: "MAJOR" },
    { date: "OCT 2024 - PRESENT", event: "GDG Lead at Google Developers Group", desc: "As a GDG Lead, I serve as a community organizer and ecosystem builder, officially recognized by Google Developers.", status: "ACTIVE", type: "MAJOR" },
    { date: "JAN 2024 - JUL 2024", event: "Full Stack Developer at Malefia", desc: "Building a full stack application for a local brand.", status: "RESOLVED", type: "MAJOR" },
    { date: "OCT 2023 - OCT 2025", event: "Full stack developer at M.A.D technology", desc: "Building a full stack application for a local startup.", status: "RESOLVED", type: "MAJOR" },
    { date: "MAR 2023 - OCT 2025", event: "Head of Education at A2SV", desc: "To educate the next generation in the world of computer science.", status: "RESOLVED", type: "MAJOR" },
    { date: "OCT 2022- JUL 2024", event: "Full Stack Developer at Chakka", desc: "Worked on a full stack application for a local brand.", status: "RESOLVED", type: "MAJOR" },
    { date: "SEP 2022-SEP 2026", event: "Computer Science Degree", desc: "Enrolled in University. Learned the theory behind the madness.", status: "COMPLETED", type: "INTEL" },
    { date: "MAR 2019", event: "First Freelance Gig", desc: "Built a WordPress site for a local bakery. Paid in croissants.", status: "ARCHIVED", type: "MINOR" },
    { date: "JUN 2018", event: "Discovered Programming", desc: "First encounter with Python. The obsession began.", status: "ARCHIVED", type: "ORIGIN" },
];

export default function TimelinePage() {
    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen max-w-7xl">
            {/* Header */}
            <header className="mb-12 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start justify-start"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px w-12 bg-accent-red opacity-50" />
                        <span className="text-accent-red font-mono text-[10px] uppercase tracking-[0.5em] opacity-80">
                            Deep_Archive // System_Logs
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display text-white mb-2 tracking-tighter">
                        CHRONOLOGY
                    </h1>
                    <div className="flex items-center gap-6 mt-2 text-paper-yellow/40 font-mono text-[10px] uppercase tracking-widest">
                        <span>Terminal: 0x404</span>
                        <span>Status: Online</span>
                        <span>Connection: Secured</span>
                    </div>
                </motion.div>

                {/* Background Grid Pattern */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#8b0000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative pb-20">

                {/* Left Column: History Log (3/12 - 25%) */}
                <aside className="lg:col-span-3 space-y-6 relative">
                    {/* The Red String (Vertical Line) */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-red-600/60 z-0 shadow-[0_0_10px_rgba(255,0,0,0.3)]" />

                    <div className="border-l-4 border-accent-red pl-4 mb-10">
                        <h2 className="text-xl font-display text-paper-yellow uppercase tracking-tight">Access Logs</h2>
                        <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Temporal Sequence</p>
                    </div>

                    <div className="relative space-y-8 pl-6">
                        {TIMELINE.map((item, index) => (
                            <motion.div
                                key={item.date}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ x: 4 }}
                                className={`group relative border border-white/5 p-5 transition-all cursor-default z-10 shadow-lg ${item.status === 'ACTIVE'
                                    ? 'bg-green-950/20 hover:bg-green-900/30 hover:border-green-500/30'
                                    : 'bg-[#121212] hover:border-accent-red/30 hover:bg-accent-red/5'
                                    }`}
                            >
                                {/* Connection Line to String */}
                                <div className={`absolute left-[-24px] top-1/2 w-6 h-px transition-colors ${item.status === 'ACTIVE' ? 'bg-green-600/40 group-hover:bg-green-500' : 'bg-red-600/40 group-hover:bg-red-600'
                                    }`} />

                                <div className="flex justify-start items-start mb-3">
                                    <span className={`font-display text-lg font-bold tracking-tighter drop-shadow-[0_0_8px_rgba(255,0,0,0.6)] ${item.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                        {item.date}
                                    </span>
                                </div>

                                <h3 className="text-white font-display text-base uppercase tracking-wider mb-2 group-hover:text-accent-red transition-colors leading-none">
                                    {item.event}
                                </h3>

                                <p className="text-gray-500 font-sans text-xs leading-relaxed italic opacity-80">
                                    "{item.desc}"
                                </p>

                                {/* ID Ticker */}
                                <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                                    <span className="font-mono text-[8px] text-gray-600 uppercase">REF:00{index + 1}</span>
                                    <span className="font-mono text-[8px] text-gray-600 uppercase tracking-tighter">TYPE:{item.type}</span>
                                </div>

                                {/* Active Pulse Indicator */}
                                {item.status === 'ACTIVE' && (
                                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-6 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,1)] z-20" />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-12 opacity-10 hidden lg:block filter grayscale">
                        <Fingerprint className="w-16 h-16 text-white" />
                        <div className="font-mono text-[8px] text-gray-500 mt-2 space-y-1 uppercase tracking-widest">
                            <p>Authorized access only</p>
                            <p>Tracking enabled</p>
                        </div>
                    </div>
                </aside>

                {/* Right Column: GitHub & Analysis (9/12 - 75%) */}
                <main className="lg:col-span-9 space-y-8">

                    {/* Activity Monitor Section */}
                    <section className="relative">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <div className="flex items-center gap-3">
                                <Activity className="w-5 h-5 text-accent-red animate-pulse" />
                                <h2 className="text-3xl font-display text-white uppercase tracking-tighter italic">Live Surveillance Feed</h2>
                            </div>
                            <div className="flex gap-4">
                                <div className="hidden sm:flex items-center gap-2 border border-white/10 px-4 py-1.5 bg-black/40 rounded-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Uplink: Stable</span>
                                </div>
                                <div className="flex items-center gap-2 border border-white/10 px-4 py-1.5 bg-black/40 rounded-sm">
                                    <Monitor className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">GitHub_Uptime</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0a0a0a] border border-white/10 p-4 md:py-12 md:px-4 relative overflow-hidden shadow-2xl rounded-sm">
                            {/* Scanning Line UI Decoration */}
                            <motion.div
                                animate={{ top: ["0%", "100%"] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-accent-red/30 z-20 pointer-events-none blur-[1px]"
                            />

                            {/* Heatmap Container */}
                            <div className="relative z-10 w-full flex justify-center py-12 md:py-20 bg-[#080808] backdrop-blur-md border border-white/5 shadow-inner min-h-[400px]">
                                <GithubHeatmap username="hailegenale" />

                                {/* Corner Brackets for Scanner look */}
                                <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-accent-red/20" />
                                <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-accent-red/20" />
                                <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-accent-red/20" />
                                <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-accent-red/20" />
                            </div>

                            {/* Replaced Cards with Investigation Summary */}
                            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                                <div className="lg:col-span-3 bg-accent-red/[0.03] border border-accent-red/20 p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group rounded-sm">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <ShieldAlert className="w-4 h-4 text-accent-red" />
                                            <h3 className="text-accent-red font-display text-2xl uppercase italic tracking-tighter">Investigation Summary</h3>
                                        </div>
                                        <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-2xl uppercase font-bold tracking-wide mb-2 opacity-90">
                                            The subject exhibits highly focused creative output. Contribution frequency remains consistent
                                            throughout operational hours. No significant security breaches reported.
                                        </p>
                                        <div className="flex items-center gap-2 mt-4">
                                            <span className="text-white text-xs font-mono bg-accent-red px-2 py-0.5">STATUS:</span>
                                            <span className="text-white text-xs font-mono animate-pulse">UNDER CONTINUOUS MONITORING</span>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0 relative z-10">
                                        <div className="w-28 h-28 border-4 border-accent-red/30 flex items-center justify-center p-3 opacity-60 group-hover:opacity-100 transition-opacity rotate-3">
                                            <div className="w-full h-full bg-accent-red/20 flex flex-col items-center justify-center text-accent-red font-black text-sm text-center leading-none">
                                                <span>TOP</span>
                                                <span>SECRET</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Background stylized numbers */}
                                    <div className="absolute inset-0 pointer-events-none text-white opacity-[0.03] font-mono text-6xl flex items-center justify-around select-none overflow-hidden">
                                        <span>0101</span><span>1010</span><span>1100</span>
                                    </div>
                                </div>

                                <div className="lg:col-span-1 bg-black/40 border border-white/10 p-8 flex flex-col justify-center items-center text-center relative rounded-sm group">
                                    <Terminal className="w-8 h-8 text-green-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="font-display text-white text-lg tracking-widest mb-1">DATA_SECURE</div>
                                    <div className="font-mono text-[9px] text-gray-500 uppercase">Verification Hash: 0xF72A</div>

                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <div className="w-1 h-3 bg-accent-red/30" />
                                        <div className="w-1 h-3 bg-accent-red/50" />
                                        <div className="w-1 h-3 bg-accent-red" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

            </div>
        </div>
    );
}

