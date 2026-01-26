"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const items = [
    { name: "CRIME SCENE", href: "/" },
    { name: "SUSPECT", href: "/suspect" },
    { name: "EVIDENCE", href: "/evidence" },
    { name: "MODUS OPERANDI", href: "/modus-operandi" },
    { name: "TIMELINE", href: "/timeline" },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] flex justify-center pt-2 pointer-events-none">
            <div className="flex -space-x-1 pointer-events-auto">
                {items.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                className={cn(
                                    "relative px-4 md:px-6 py-3 font-display text-xs md:text-sm tracking-widest transition-all duration-300",
                                    "border-t-2 border-x border-black/20",
                                    "rounded-t-xl group cursor-none",
                                    isActive
                                        ? "bg-[#d4c598] text-red-900 shadow-[0_-8px_20px_rgba(0,0,0,0.3)] z-10 -translate-y-1"
                                        : "bg-[#2a2a2a] text-gray-500 hover:text-gray-300 z-0"
                                )}
                                style={{
                                    clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                                    zIndex: isActive ? 50 : 10 - idx
                                }}
                            >
                                <span className="relative">
                                    {item.name}
                                    {/* Red underline on hover or active */}
                                    <div className={cn(
                                        "absolute -bottom-1 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full",
                                        isActive && "w-full opacity-50"
                                    )} />
                                </span>

                                {/* Folder Lip effect */}
                                <div className={cn(
                                    "absolute top-0 left-0 w-full h-1 opacity-20",
                                    isActive ? "bg-white" : "bg-black"
                                )} />
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
