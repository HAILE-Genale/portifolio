"use client";

import { motion } from "framer-motion";
import { GithubHeatmap } from "@/components/ui/GithubHeatmap";
import { Terminal, Activity, Database, ShieldAlert, Monitor } from "lucide-react";

const TIMELINE = [
    { year: "NOW", event: "The Current Suspect", desc: "Building independent projects and seeking new challenges.", status: "ACTIVE", type: "CRITICAL" },
    { year: "2023", event: "Senior Developer", desc: "Led a team of 5. Shipped production code to 1M+ users.", status: "RESOLVED", type: "MAJOR" },
    { year: "2021", event: "Computer Science Degree", desc: "Enrolled in University. Learned the theory behind the madness.", status: "COMPLETED", type: "INTEL" },
    { year: "2019", event: "First Freelance Gig", desc: "Built a WordPress site for a local bakery. Paid in croissants.", status: "ARCHIVED", type: "MINOR" },
    { year: "2018", event: "Discovered Programming", desc: "First encounter with Python. The obsession began.", status: "ARCHIVED", type: "ORIGIN" },
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
                <aside className="lg:col-span-3 space-y-6">
                    <div className="border-l-2 border-accent-red pl-4 mb-8">
                        <h2 className="text-lg font-display text-paper-yellow uppercase tracking-tight">Access Logs</h2>
                        <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Temporal Sequence</p>
                    </div>

                    <div className="relative space-y-4">
                        {TIMELINE.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ x: 4 }}
                                className="group relative bg-[#121212] border border-white/5 p-4 transition-all hover:border-accent-red/30 hover:bg-accent-red/5 cursor-default"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${item.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-gray-500'
                                        }`}>
                                        {item.status}
                                    </span>
                                    <span className="font-mono text-[9px] text-accent-red opacity-50">{item.year}</span>
                                </div>

                                <h3 className="text-white font-display text-sm uppercase tracking-wider mb-1 group-hover:text-accent-red transition-colors">
                                    {item.event}
                                </h3>

                                <p className="text-gray-500 font-sans text-[11px] leading-relaxed line-clamp-2 italic">
                                    "{item.desc}"
                                </p>

                                {/* ID Ticker */}
                                <div className="mt-3 pt-2 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="font-mono text-[8px] text-gray-600">REF:00{index + 1}</span>
                                    <span className="font-mono text-[8px] text-gray-600">TYPE:{item.type}</span>
                                </div>

                                {/* Active Pulse Indicator */}
                                {item.status === 'ACTIVE' && (
                                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-4 bg-accent-red shadow-[0_0_10px_rgba(139,0,0,0.5)]" />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Meta Data Footer for Sidebar */}
                    <div className="pt-8 opacity-20 hidden lg:block">
                        <div className="font-mono text-[9px] text-gray-500 space-y-1">
                            <p>// End of Stream</p>
                            <p>// Buffer cleared</p>
                            <p>// System ready...</p>
                        </div>
                    </div>
                </aside>

                {/* Right Column: GitHub & Analysis (9/12 - 75%) */}
                <main className="lg:col-span-9 space-y-8">

                    {/* Activity Monitor Section */}
                    <section className="relative">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <div className="flex items-center gap-3">
                                <Activity className="w-4 h-4 text-accent-red animate-pulse" />
                                <h2 className="text-2xl font-display text-white uppercase tracking-tighter italic">Live Surveillance Feed</h2>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 border border-white/10 px-3 py-1 bg-black/40">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    <span className="font-mono text-[10px] text-gray-400 uppercase">Uplink: Stable</span>
                                </div>
                                <div className="flex items-center gap-2 border border-white/10 px-3 py-1 bg-black/40">
                                    <Monitor className="w-3 h-3 text-gray-400" />
                                    <span className="font-mono text-[10px] text-gray-400 uppercase">V_Source: GitHub</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0a0a0a] border border-white/10 p-10 relative overflow-hidden shadow-2xl">
                            {/* Scanning Line UI Decoration */}
                            <motion.div
                                animate={{ top: ["0%", "100%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[1px] bg-accent-red/20 z-0 pointer-events-none"
                            />

                            {/* Heatmap Container */}
                            <div className="relative z-10 w-full flex justify-center py-8 bg-[#111]/50 backdrop-blur-sm border border-white/5 rounded-sm">
                                <GithubHeatmap username="brooksolomon" />
                            </div>

                            {/* Data Overlays */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-black/60 border border-white/5 p-4 font-mono">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Database className="w-3 h-3 text-accent-red" />
                                        <span className="text-[10px] text-gray-500 uppercase">Core_Data</span>
                                    </div>
                                    <div className="text-lg text-white font-display">OPTIMIZED</div>
                                    <p className="text-[9px] text-gray-600 mt-1 uppercase">Node clusters operational at 100% capacity.</p>
                                </div>

                                <div className="bg-black/60 border border-white/5 p-4 font-mono">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShieldAlert className="w-3 h-3 text-yellow-500" />
                                        <span className="text-[10px] text-gray-500 uppercase">Threat_Analysis</span>
                                    </div>
                                    <div className="text-lg text-yellow-500 font-display">ELEVATED</div>
                                    <p className="text-[9px] text-gray-600 mt-1 uppercase">Rapid code injection detected in multiple sectors.</p>
                                </div>

                                <div className="bg-black/60 border border-white/5 p-4 font-mono relative overflow-hidden group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Terminal className="w-3 h-3 text-green-500" />
                                        <span className="text-[10px] text-gray-500 uppercase">Kernel_Status</span>
                                    </div>
                                    <div className="text-lg text-green-500 font-display">RUNNING</div>
                                    <p className="text-[9px] text-gray-600 mt-1 uppercase group-hover:text-green-500 transition-colors">Process ID: PID_SOLO_992</p>

                                    {/* Small Ticker Decoration */}
                                    <div className="absolute -bottom-2 -right-2 text-[20px] font-black opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-opacity">
                                        EXEC_
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Detailed Analysis Footer */}
                    <div className="bg-accent-red/5 border border-accent-red/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
                        <div className="relative z-10">
                            <h3 className="text-accent-red font-display text-xl uppercase italic tracking-tighter mb-1">Investigation Summary</h3>
                            <p className="text-gray-400 font-sans text-xs leading-relaxed max-w-2xl uppercase font-bold tracking-wide">
                                The subject exhibits highly focused creative output. Contribution frequency remains consistent
                                throughout operational hours. No significant security breaches reported. Status: <span className="text-white">UNDER CONTINUOUS MONITORING</span>.
                            </p>
                        </div>

                        <div className="flex-shrink-0 relative z-10">
                            <div className="w-24 h-24 border-4 border-accent-red/30 flex items-center justify-center p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="w-full h-full bg-accent-red/20 flex flex-col items-center justify-center text-accent-red font-black text-xs text-center leading-none">
                                    <span>TOP</span>
                                    <span>SECRET</span>
                                </div>
                            </div>
                        </div>

                        {/* Background stylized numbers */}
                        <div className="absolute inset-0 pointer-events-none text-white opacity-[0.02] font-mono text-5xl flex items-center justify-around select-none">
                            <span>0101</span><span>1010</span><span>1100</span><span>0011</span>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}
