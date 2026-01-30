"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface CrimeTapeProps {
    yPercent: number;
    rotation?: number; // base rotation in degrees
    text?: string;
    delay?: number;
    className?: string;
    tension?: number; // 0 to 1
}

export function CrimeTape({ yPercent, rotation = -6, text = "POLICE LINE - DO NOT CROSS - CRIME SCENE - ", delay = 0, className, tension = 0 }: CrimeTapeProps) {
    const [width, setWidth] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Tension spring 
    const tensionValue = useMotionValue(tension);
    const tensionSpring = useSpring(tensionValue, { damping: 20, stiffness: 50 });

    useEffect(() => {
        tensionValue.set(tension);
    }, [tension, tensionValue]);

    // Mouse parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 80 };
    const px = useSpring(mouseX, springConfig);
    const py = useSpring(mouseY, springConfig);

    // Sway animation values
    const swayX = useMotionValue(0);
    const swayY = useMotionValue(0);

    useEffect(() => {
        setMounted(true);
        setWidth(window.innerWidth);

        const updateWidth = () => setWidth(window.innerWidth);
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("resize", updateWidth);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("resize", updateWidth);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    useEffect(() => {
        let startTime = Date.now();
        let animationFrame: number;

        const animateSway = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const sX = Math.sin(elapsed * 0.3) * 10 + Math.sin(elapsed * 0.8) * 4;
            const sY = Math.cos(elapsed * 0.25) * 15 + Math.sin(elapsed * 0.6) * 6;
            swayX.set(sX);
            swayY.set(sY);
            animationFrame = requestAnimationFrame(animateSway);
        };

        animateSway();
        return () => cancelAnimationFrame(animationFrame);
    }, [swayX, swayY]);

    // Calculate path points
    // We want the tape to span across the whole screen with some overflow
    const points = useMemo(() => {
        const currentHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
        const yBase = (yPercent * currentHeight) / 100;
        const x1 = -100;
        const x2 = width + 100;

        // Tilt the tape based on rotation
        const angleRad = (rotation * Math.PI) / 180;
        const halfWidth = width / 2;

        const y1 = yBase - Math.tan(angleRad) * halfWidth;
        const y2 = yBase + Math.tan(angleRad) * halfWidth;

        return { x1, y1, x2, y2 };
    }, [yPercent, rotation, width]);

    const pathParallaxX = useTransform([px, swayX], ([p, s]) => (p as number) * 0.3 + (s as number));
    const pathParallaxY = useTransform([py, swayY], ([p, s]) => (p as number) * 0.3 + (s as number));

    const pathD = useTransform(
        [pathParallaxX, pathParallaxY, tensionSpring],
        ([pxVal, pyVal, t]) => {
            const midX = (points.x1 + points.x2) / 2;
            const midY = (points.y1 + points.y2) / 2;
            const baseSag = 60;
            const sagFactor = 1 - (t as number);

            const cx = midX + (pxVal as number);
            const cy = midY + (baseSag * sagFactor) + (pyVal as number);

            return `M ${points.x1} ${points.y1} Q ${cx} ${cy} ${points.x2} ${points.y2}`;
        }
    );

    if (!mounted) return null;

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-[5] ${className}`}>
            <svg className="w-full h-full overflow-visible">
                <defs>
                    <path id="tape-path" d="" />
                    {/* Shadow filter */}
                    <filter id="tape-shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                        <feOffset dx="0" dy="10" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.4" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Tape Gradient for 3D depth */}
                    <linearGradient id="tape-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d97706" />
                        <stop offset="20%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#fef3c7" />
                        <stop offset="80%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>

                    {/* Scratched texture pattern */}
                    <pattern id="tape-texture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <rect width="100" height="100" fill="transparent" />
                        <path d="M0 10 L100 0 M0 50 L100 40 M0 90 L100 80" stroke="black" strokeWidth="0.5" opacity="0.05" />
                    </pattern>
                </defs>

                {/* The Yellow Tape Body */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke="url(#tape-grad)"
                    strokeWidth="48"
                    style={{ filter: "url(#tape-shadow)" }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay, ease: "easeOut" }}
                />

                {/* Texture Layer */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke="url(#tape-texture)"
                    strokeWidth="48"
                    style={{ mixBlendMode: "multiply" }}
                />

                {/* Top/Bottom Black Borders (High contrast) */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="50"
                />
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke="black"
                    strokeWidth="46"
                    style={{ opacity: 0.1, mixBlendMode: "overlay" }}
                />

                {/* Repeating Text */}
                <motion.text
                    fill="black"
                    style={{ fontSize: "16px", fontWeight: 900, fontFamily: "monospace", letterSpacing: "-1px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 1.2, duration: 0.5 }}
                >
                    <textPath xlinkHref="#hidden-path" startOffset="0">
                        {Array(20).fill(text).join(" ")}
                        <animate
                            attributeName="startOffset"
                            from="0"
                            to="-1000"
                            dur="40s"
                            repeatCount="indefinite"
                        />
                    </textPath>
                </motion.text>

                {/* Hidden path for text (centered vertically) */}
                <motion.path
                    id="hidden-path"
                    d={pathD}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="1"
                />
            </svg>
        </div>
    );
}
