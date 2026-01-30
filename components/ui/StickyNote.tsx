"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyNoteProps {
    children: React.ReactNode;
    className?: string;
    rotation?: number;
    color?: string;
}

export function StickyNote({
    children,
    className,
    rotation = 0,
    color = "bg-paper-yellow",
}: StickyNoteProps) {
    // Random slight texture/shadow simulation could be added here
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ rotate: rotation }}
            className={cn(
                "p-6 shadow-md text-black font-hand text-lg min-w-[200px] min-h-[200px] flex flex-col items-start justify-start text-left",
                color,
                className
            )}
        >
            <div className="opacity-90 leading-tight w-full">
                {children}
            </div>
        </motion.div>
    );
}
