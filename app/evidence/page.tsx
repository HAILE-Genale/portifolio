"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Polaroid } from "@/components/ui/Polaroid";
import { X, Search, Filter } from "lucide-react";

// Mock Data
const EVIDENCE = [
    {
        id: 1,
        title: "Totals",
        type: "Mobile App",
        images: ["/images/project-a.png", "/images/project-a-2.png", "/images/project-a-3.png"],
        tech: ["Flutter", "NextJs",],
        desc: "mobile app that automatically tracks your bank transactions by parsing SMS messages from Ethiopian banks. It gives you real-time balance updates, detailed transaction history, smart analytics, and clear financial insights, all stored securely on your device.",
        date: "2025-12-15"
    },
    {
        id: 2,
        title: "The Binger",
        type: "Website",
        images: ["/images/projects/binger/1.png", "/images/projects/binger/2.png",],
        tech: ["Sveltekit", "Firebase", "Tailwind"],
        desc: "a movie streaming platform that also lets you track your watched",
        date: "2024-01-20"
    },
    {
        id: 3,
        title: "System Gamma",
        type: "Internal Tool",
        images: ["/images/project-c.png", "/images/project-c-alt.png"],
        tech: ["React", "Node.js", "Redis"],
        desc: "Real-time dashboard for monitoring server metrics.",
        date: "2023-11-10"
    },
    {
        id: 4,
        title: "Mobile Delta",
        type: "Mobile App",
        images: ["/images/project-d.png"],
        tech: ["React Native", "Firebase", "Redux"],
        desc: "Cross-platform mobile application for incident reporting.",
        date: "2024-02-05"
    },
    {
        id: 5,
        title: "Crawler Epsilon",
        type: "Web Scraper",
        images: ["/images/project-e.png"],
        tech: ["Go", "gRPC", "MongoDB"],
        desc: "High-performance distributed web crawler and indexer.",
        date: "2023-09-28"
    },
    {
        id: 6,
        title: "Analytic Zeta",
        type: "AI/ML",
        images: ["/images/project-f.png"],
        tech: ["Python", "PyTorch", "AWS"],
        desc: "Machine learning pipeline for predictive maintenance analysis.",
        date: "2024-03-12"
    },
    {
        id: 7,
        title: "Secure Omega",
        type: "Security",
        images: ["/images/project-g.png"],
        tech: ["Rust", "Wasm", "OpenSSL"],
        desc: "End-to-end encrypted messaging service with zero-knowledge proof.",
        date: "2024-04-01"
    },
    {
        id: 8,
        title: "Quantum Iota",
        type: "Experiments",
        images: ["/images/project-h.png"],
        tech: ["Qiskit", "Python", "React"],
        desc: "Simulation of quantum gates and algorithms for education.",
        date: "2024-05-15"
    },
    {
        id: 9,
        title: "DEX Kappa",
        type: "Blockchain",
        images: ["/images/project-i.png"],
        tech: ["Solidity", "Ethers.js", "Hardhat"],
        desc: "Decentralized exchange with automated market maker logic.",
        date: "2024-06-10"
    },
    {
        id: 10,
        title: "Cloud Lambda",
        type: "Infrastructure",
        images: ["/images/project-j.png"],
        tech: ["Terraform", "Kubernetes", "Azure"],
        desc: "Self-healing infrastructure as code for microservices.",
        date: "2023-08-14"
    },
    {
        id: 11,
        title: "Vision Mu",
        type: "AI/ML",
        images: ["/images/project-k.png"],
        tech: ["OpenCV", "TensorFlow", "C++"],
        desc: "Real-time object detection and tracking for security cameras.",
        date: "2024-07-02"
    }
];

export default function EvidencePage() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTech, setActiveTech] = useState<string | null>(null);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    const allTech = useMemo(() => {
        const techs = new Set<string>();
        EVIDENCE.forEach(item => item.tech.forEach(t => techs.add(t)));
        return Array.from(techs).sort();
    }, []);

    const filteredEvidence = useMemo(() => {
        return EVIDENCE.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTech = !activeTech || item.tech.includes(activeTech);

            return matchesSearch && matchesTech;
        });
    }, [searchQuery, activeTech]);

    const selectedItem = EVIDENCE.find((e) => e.id === selectedId);

    return (
        <div className="container mx-auto p-8 relative min-h-screen">




            {/* Corkboard Background Effect */}
            <div className="fixed inset-0 z-[-1] opacity-40 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cork-board.png')" }}>
            </div>

            <div className="text-center mb-16 relative">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-block bg-[#f4e4bc] px-12 py-6 shadow-[10px_10px_20px_rgba(0,0,0,0.1)] transform -rotate-1 border border-[#d3c299] relative"
                >
                    {/* Tape on top edges */}
                    <div className="absolute -top-4 left-1/4 w-16 h-8 bg-white/30 backdrop-blur-sm -rotate-3 shadow-sm border border-white/10" />
                    <div className="absolute -top-2 right-1/4 w-12 h-6 bg-white/20 backdrop-blur-sm rotate-6 shadow-sm border border-white/10" />

                    <h1 className="text-6xl font-display text-red-950 drop-shadow-sm tracking-[0.2em] uppercase mb-1">
                        Evidence Board
                    </h1>
                    <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.4em] opacity-80">
                        Classified Archive // Case File #404-B
                    </p>
                </motion.div>
            </div>

            {/* Filter & Search UI */}
            <div className="max-w-5xl mx-auto mb-16 space-y-6">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-black/5 p-6 backdrop-blur-md border border-black/10 rounded-sm relative overflow-hidden group">
                    {/* Decorative tape on corners */}
                    <div className="absolute -top-4 -left-8 w-24 h-8 bg-black/5 rotate-[45deg] pointer-events-none" />
                    <div className="absolute -bottom-4 -right-8 w-24 h-8 bg-black/5 rotate-[45deg] pointer-events-none" />

                    {/* Search Bar */}
                    <div className="relative w-full lg:w-80 group/search">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within/search:text-red-900 transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH EVIDENCE..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/50 border-b-2 border-black/20 focus:border-red-900 p-2 pl-10 font-mono text-sm text-black placeholder:text-gray-400 focus:outline-none transition-all focus:bg-white/80"
                        />
                    </div>

                    {/* Filter Groups */}
                    <div className="flex flex-wrap gap-8 items-center flex-1 justify-end font-mono">
                        {/* Tech Group */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2">TECH STACK:</span>
                            <button
                                onClick={() => setActiveTech(null)}
                                className={`relative px-3 py-1 text-[11px] transition-all group/btn ${!activeTech ? 'text-red-900 font-bold' : 'text-gray-500 hover:text-red-900'}`}
                            >
                                ALL TOOLS
                                <div className={`absolute -bottom-1 left-0 h-[2px] bg-red-900/60 rounded-full transition-all duration-300 ${!activeTech ? 'w-full' : 'w-0 group-hover/btn:w-full'}`} />
                            </button>
                            {allTech.slice(0, 6).map(tech => (
                                <button
                                    key={tech}
                                    onClick={() => setActiveTech(activeTech === tech ? null : tech)}
                                    className={`relative px-3 py-1 text-[11px] transition-all group/btn ${activeTech === tech ? 'text-red-900 font-bold' : 'text-gray-500 hover:text-red-900'}`}
                                >
                                    {tech.toUpperCase()}
                                    <div className={`absolute -bottom-1 left-0 h-[2px] bg-red-900/60 rounded-full transition-all duration-300 ${activeTech === tech ? 'w-full' : 'w-0 group-hover/btn:w-full'}`} />
                                </button>
                            ))}
                        </div>

                        {allTech.length > 6 && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsArchiveOpen(!isArchiveOpen)}
                                    className={`px-3 py-1 text-[10px] font-mono border flex items-center gap-1 transition-all ${isArchiveOpen ? 'bg-red-900 text-white border-red-900' : 'bg-transparent text-gray-400 border-black/10 hover:border-red-900 hover:text-red-900'}`}
                                >
                                    {isArchiveOpen ? 'CLOSE ARCHIVE' : 'EXPAND ARCHIVE'} <Filter className="w-3 h-3" />
                                </button>

                                <AnimatePresence>
                                    {isArchiveOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-64 bg-[#f8f5e9] border border-[#d3c299] shadow-[20px_20px_40px_rgba(0,0,0,0.2)] z-[60] p-4 origin-top-right"
                                        >
                                            <div className="text-[9px] font-bold text-gray-400 mb-2 border-b border-black/5 pb-1 uppercase tracking-widest text-center">Classified Technologies</div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {allTech.slice(6).map(tech => (
                                                    <button
                                                        key={tech}
                                                        onClick={() => {
                                                            setActiveTech(activeTech === tech ? null : tech);
                                                            setIsArchiveOpen(false);
                                                        }}
                                                        className={`px-2 py-1.5 text-[10px] font-mono border text-left truncate transition-all ${activeTech === tech ? 'bg-red-900 text-white border-red-900' : 'hover:bg-red-800/10 hover:border-red-900/30 text-gray-600'}`}
                                                    >
                                                        {tech.toUpperCase()}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Grid of Evidence (Scatter Layout) */}
            <motion.div
                layout
                className="flex flex-wrap justify-center gap-x-12 gap-y-28 relative pb-32"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
            >
                <AnimatePresence mode="popLayout">
                    {filteredEvidence.map((item, index) => {
                        const rotations = [-3, 1, -1.5, 4, -2.5, 2.5, -4, 3];
                        const rot = rotations[index % rotations.length];
                        return (
                            <motion.div
                                layout
                                variants={{
                                    hidden: { opacity: 0, y: 50, rotate: rot - 5, scale: 0.9 },
                                    visible: { opacity: 1, y: 0, rotate: rot, scale: 1 }
                                }}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                key={item.id}
                                className="relative group perspective-1000"
                                style={{
                                    marginTop: index % 3 === 0 ? '40px' : index % 3 === 1 ? '0px' : '20px',
                                }}
                            >
                                <Polaroid
                                    src={item.images[0]}
                                    alt={item.title}
                                    caption={item.title}
                                    rotation={rot}
                                    className="w-[280px] z-10 transition-all duration-500 ease-out group-hover:z-[40]"
                                    onClick={() => setSelectedId(item.id)}
                                />

                                {/* Physical Shadow Effect */}
                                <div className="absolute inset-0 bg-black/5 blur-xl -z-10 group-hover:bg-black/10 transition-all duration-500 translate-y-4 translate-x-2 rounded-full scale-90" />

                                {/* Tech Badges BELOW the Card */}
                                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5 w-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-[50]">
                                    {item.tech.slice(0, 4).map((t, i) => (
                                        <motion.span
                                            key={t}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-white px-2 py-1 text-[9px] font-mono border border-black/10 shadow-sm text-red-950 uppercase tracking-tighter"
                                        >
                                            {t}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {filteredEvidence.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full text-center py-20"
                    >
                        <p className="font-typewriter text-2xl text-red-950/40 uppercase tracking-widest">
                            No evidence found matching requested criteria.
                        </p>
                    </motion.div>
                )}
            </motion.div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedId && selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={`evidence-${selectedId}`}
                            className="bg-[#f0f0f0] text-black w-full max-w-4xl p-2 shadow-2xl rounded-sm overflow-hidden max-h-[90vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="border border-gray-300 p-8 bg-white relative overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-red-900/20 scrollbar-track-transparent">
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <h2 className="text-3xl font-display mb-2 border-b-2 border-red-800 inline-block text-red-900">
                                    INCIDENT REPORT: {selectedItem.title}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6 h-full overflow-y-auto pr-2 pb-8">
                                    <div className="space-y-6">
                                        {selectedItem.images.map((img, idx) => (
                                            <div key={idx} className={`relative bg-gray-200 border border-gray-300 p-2 shadow-md transform ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} transition-transform hover:rotate-0 hover:z-10 group/img`}>
                                                <img
                                                    src={img}
                                                    alt={`${selectedItem.title} ${idx + 1}`}
                                                    className="w-full grayscale border border-black/10 group-hover/img:grayscale-0 transition-all duration-500"
                                                />
                                                <div className="absolute top-2 right-2 bg-black/80 text-white text-[8px] px-1 font-mono uppercase tracking-tighter">
                                                    FILE_{idx + 1}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="text-[10px] font-mono text-gray-400 text-center mt-4">--- END OF VISUAL EVIDENCE ---</div>
                                    </div>

                                    <div className="space-y-4 font-typewriter">
                                        <div>
                                            <h4 className="font-bold bg-black text-white inline-block px-1 mb-1 text-xs">DESCRIPTION</h4>
                                            <p className="text-sm leading-relaxed">{selectedItem.desc}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold bg-black text-white inline-block px-1 mb-1 text-xs">TOOLS USED</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedItem.tech.map(t => (
                                                    <span key={t} className="px-2 py-1 bg-[#f4e4bc] text-[10px] border border-[#d3c299] shadow-sm">{t.toUpperCase()}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <p className="text-xs text-red-700 font-bold uppercase border-2 border-red-700 inline-block p-1 transform -rotate-6">
                                                VERIFIED CASE ARTIFACT
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
