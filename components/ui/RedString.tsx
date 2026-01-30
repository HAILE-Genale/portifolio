"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";

interface RedStringProps {
    x1Percent: number; // 0-100
    y1Percent: number; // 0-100
    x2Percent: number; // 0-100
    y2Percent: number; // 0-100
    delay?: number;
    className?: string;
    tension?: number; // 0 (slack) to 1 (tight)
}

export function RedString({ x1Percent, y1Percent, x2Percent, y2Percent, delay = 0, className, tension = 0 }: RedStringProps) {
    const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<SVGSVGElement>(null);

    // Tension spring for smooth tightening
    const tensionValue = useMotionValue(tension);
    const tensionSpring = useSpring(tensionValue, { damping: 15, stiffness: 60 });

    // Mouse parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 100 };
    const px = useSpring(mouseX, springConfig);
    const py = useSpring(mouseY, springConfig);

    // Sway animation values
    const swayX = useMotionValue(0);
    const swayY = useMotionValue(0);

    useEffect(() => {
        tensionValue.set(tension);
    }, [tension, tensionValue]);

    useEffect(() => {
        setMounted(true);
        const updateCoords = () => {
            setCoords({
                x1: (x1Percent * window.innerWidth) / 100,
                y1: (y1Percent * window.innerHeight) / 100,
                x2: (x2Percent * window.innerWidth) / 100,
                y2: (y2Percent * window.innerHeight) / 100,
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Parallax intensity
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            mouseX.set(x);
            mouseY.set(y);
        };

        updateCoords();
        window.addEventListener("resize", updateCoords);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("resize", updateCoords);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [x1Percent, y1Percent, x2Percent, y2Percent, mouseX, mouseY]);

    useEffect(() => {
        let startTime = Date.now();
        let animationFrame: number;

        const animateSway = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            // Multiple sine waves for organic sway - subtle thread-like movement
            const sX = Math.sin(elapsed * 0.4) * 5 + Math.sin(elapsed * 1.1) * 2;
            const sY = Math.cos(elapsed * 0.3) * 8 + Math.sin(elapsed * 0.7) * 3;
            swayX.set(sX);
            swayY.set(sY);
            animationFrame = requestAnimationFrame(animateSway);
        };

        animateSway();
        return () => cancelAnimationFrame(animationFrame);
    }, [swayX, swayY]);

    // Calculate Bezier control point (midpoint + sag)
    const controlPoint = useMemo(() => {
        const midX = (coords.x1 + coords.x2) / 2;
        const midY = (coords.y1 + coords.y2) / 2;
        // Natural sag based on distance
        const dist = Math.sqrt(Math.pow(coords.x2 - coords.x1, 2) + Math.pow(coords.y2 - coords.y1, 2));
        const maxSag = Math.min(dist * 0.2, 80);

        return { midX, midY, maxSag };
    }, [coords]);

    // Parallax transforms for the path and circles
    const pathParallaxX = useTransform([px, swayX], ([p, s]) => (p as number) * 0.5 + (s as number));
    const pathParallaxY = useTransform([py, swayY], ([p, s]) => (p as number) * 0.5 + (s as number));

    // Dynamic path string using tensionSpring
    const pathD = useTransform(
        [pathParallaxX, pathParallaxY, tensionSpring],
        ([pxVal, pyVal, t]) => {
            const sagFactor = 1 - (t as number);
            const cx = controlPoint.midX + (pxVal as number);
            const cy = controlPoint.midY + (controlPoint.maxSag * sagFactor) + (pyVal as number);
            return `M ${coords.x1} ${coords.y1} Q ${cx} ${cy} ${coords.x2} ${coords.y2}`;
        }
    );

    if (!mounted) return null;

    return (
        <svg
            ref={containerRef}
            className={`absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-10 ${className}`}
            style={{ filter: "drop-shadow(4px 12px 15px rgba(0,0,0,0.7))" }}
        >
            <defs>
                <linearGradient id={`string-grad-${x1Percent}-${y1Percent}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5a0000" />
                    <stop offset="50%" stopColor="#9b0000" />
                    <stop offset="100%" stopColor="#5a0000" />
                </linearGradient>
                <filter id="string-glow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Back Glow Layer (3D perspective feel) */}
            <motion.path
                d={pathD}
                stroke="#4a0000"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                style={{ opacity: 0.15, filter: "blur(6px)" }}
            />

            {/* Main String Layer */}
            <motion.path
                d={pathD}
                stroke={`url(#string-grad-${x1Percent}-${y1Percent})`}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay, ease: "easeInOut" }}
            />

            {/* Fiber/Texture Layer (The "real thread" look) */}
            <motion.path
                d={pathD}
                stroke="#ff4444"
                strokeWidth="0.5"
                strokeDasharray="2 6"
                strokeLinecap="round"
                fill="none"
                style={{ opacity: 0.4, filter: "url(#string-glow)" }}
            />

            <motion.path
                d={pathD}
                stroke="#ff0000"
                strokeWidth="1.2"
                strokeDasharray="1 10"
                strokeDashoffset="5"
                strokeLinecap="round"
                fill="none"
                style={{ opacity: 0.2 }}
            />

            {/* End Pins (The nodes) */}
            <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
            >
                <circle
                    cx={coords.x1}
                    cy={coords.y1}
                    r="6"
                    fill="#1a0000"
                    stroke="#4a0000"
                    strokeWidth="1"
                />
                <circle
                    cx={coords.x1}
                    cy={coords.y1}
                    r="2.5"
                    fill="#ff0000"
                    style={{ filter: "blur(0.5px) drop-shadow(0 0 2px #ff0000)" }}
                />
                <circle
                    cx={coords.x1 - 1.5}
                    cy={coords.y1 - 1.5}
                    r="1"
                    fill="white"
                    style={{ opacity: 0.5 }}
                />
            </motion.g>

            <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.5, type: "spring", stiffness: 200 }}
            >
                <circle
                    cx={coords.x2}
                    cy={coords.y2}
                    r="6"
                    fill="#1a0000"
                    stroke="#4a0000"
                    strokeWidth="1"
                />
                <circle
                    cx={coords.x2}
                    cy={coords.y2}
                    r="2.5"
                    fill="#ff0000"
                    style={{ filter: "blur(0.5px) drop-shadow(0 0 2px #ff0000)" }}
                />
                <circle
                    cx={coords.x2 - 1.5}
                    cy={coords.y2 - 1.5}
                    r="1"
                    fill="white"
                    style={{ opacity: 0.5 }}
                />
            </motion.g>
        </svg>
    );
}
