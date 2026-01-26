"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
    const [isMounted, setIsMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Faster, more responsive springs
    const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        setIsMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!isMounted) return null;

    return (
        <>
            <style jsx global>{`
        body {
          cursor: none !important;
        }
        a, button, [role="button"], .cursor-pointer, .group {
          cursor: none !important;
        }
      `}</style>

            {/* Flashlight Effect - Slightly sharper and more focused */}
            <motion.div
                className="fixed top-0 left-0 w-[800px] h-[800px] pointer-events-none z-[9998]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(232, 220, 181, 0.12) 0%, transparent 60%)",
                }}
            />

            {/* Magnifying Glass Cursor - Hand-held design */}
            <motion.div
                className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <div className="relative w-full h-full">
                    {/* Lens Rim (Metallic) */}
                    <div className="absolute inset-0 border-[3px] border-[#444] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5),inset_0_0_5px_rgba(255,255,255,0.2)] bg-white/5 backdrop-blur-[1px]">
                        {/* Inner Highlight */}
                        <div className="absolute inset-[1px] border border-white/20 rounded-full" />
                    </div>

                    {/* Lens Flare / Reflection */}
                    <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] bg-gradient-to-br from-white/40 to-transparent rounded-full blur-[1px]" />
                    <div className="absolute bottom-[20%] right-[20%] w-[10%] h-[10%] bg-white/20 rounded-full blur-[2px]" />

                    {/* Hand-held Handle */}
                    <div className="absolute top-[80%] left-[80%] w-3 h-12 origin-top rotate-[35deg] shadow-lg">
                        {/* Dark Wood/Plastic Grip */}
                        <div className="w-full h-full bg-gradient-to-b from-[#222] via-[#333] to-[#111] rounded-b-md border-x border-black/50 relative overflow-hidden">
                            {/* Grip Ridges */}
                            <div className="absolute inset-x-0 top-2 h-[1px] bg-black/30" />
                            <div className="absolute inset-x-0 top-4 h-[1px] bg-black/30" />
                            <div className="absolute inset-x-0 top-6 h-[1px] bg-black/30" />
                            <div className="absolute inset-x-0 top-8 h-[1px] bg-black/30" />
                        </div>
                        {/* Metallic Ferrule (Connection) */}
                        <div className="absolute -top-1 inset-x-0 h-3 bg-[#444] rounded-t-sm border border-white/10" />
                    </div>
                </div>
            </motion.div>

            {/* Clean Lens Glass Effect */}
            <motion.div
                className="fixed top-0 left-0 w-32 h-32 rounded-full border border-white/20 pointer-events-none z-[9997]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    backdropFilter: "contrast(1.1) brightness(1.2) blur(0.5px)",
                    boxShadow: "inset 0 0 20px rgba(255,255,255,0.1)",
                }}
            />
        </>
    );
};
