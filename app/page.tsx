"use client";

import { motion } from "framer-motion";
import { StickyNote } from "@/components/ui/StickyNote";
import { Polaroid } from "@/components/ui/Polaroid";
import Link from "next/link";
import { RedString } from "@/components/ui/RedString";

export default function Home() {
  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_#333_0%,_#0e0e0e_70%)]" />

      {/* Central Title */}
      <motion.div
        className="z-20 text-center relative pointer-events-auto cursor-pointer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.02, rotate: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md p-10 md:p-14 rounded-sm border-2 border-[#333] shadow-[0_0_50px_rgba(139,0,0,0.2)] relative overflow-hidden group">
          {/* Decorative Corner Brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent-red opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent-red opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent-red opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent-red opacity-50 group-hover:opacity-100 transition-opacity" />

          {/* Pulse animation overlay */}
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent-red pointer-events-none"
          />

          <h1 className="text-6xl md:text-8xl font-display text-accent-red tracking-tighter drop-shadow-[0_0_15px_rgba(139,0,0,0.5)] mb-2">
            CASE #404
          </h1>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent-red to-transparent mb-4 opacity-50" />
          <h2 className="text-xl md:text-2xl font-display text-paper-yellow opacity-90 tracking-[0.2em] uppercase">
            SOLO CODES : THE DEVELOPER
          </h2>

          {/* "Classified" stamp appearance on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 2 }}
            whileHover={{ opacity: 0.8, scale: 1, rotate: -15 }}
            className="absolute -top-2 -right-6 border-4 border-accent-red text-accent-red font-black px-4 py-2 text-4xl select-none pointer-events-none"
          >
            TOP SECRET
          </motion.div>
        </div>
      </motion.div>

      {/* --- ARTIFACTS --- */}

      {/* 1. Suspect Profile (Top Left) */}
      <div className="absolute top-12 left-4 md:top-20 md:left-20 z-10">
        <Link href="/suspect">
          <Polaroid
            src="/images/brook.png"
            alt="Suspect"
            caption="THE SUSPECT"
            rotation={-6}
            width={180}
            height={220}
            className="hidden md:block hover:z-50"
          />
          {/* Mobile Fallback or alternative */}
          <div className="md:hidden bg-white text-black p-2 font-hand text-sm -rotate-3 border border-gray-400">
            PROFILE
          </div>
        </Link>
      </div>

      {/* 2. Timeline (Top Right) */}
      <div className="absolute top-12 right-4 md:top-24 md:right-24 z-10">
        <Link href="/timeline">
          <StickyNote rotation={4} className="w-40 h-40 md:w-48 md:h-48 cursor-pointer hover:z-50 transition-transform duration-300 hover:scale-110 shadow-2xl">
            <span className="font-display text-xl text-red-800">TIMELINE OF<br />EVENTS</span>
            <p className="text-xs mt-2 font-mono text-gray-600 uppercase tracking-widest opacity-60">Historical Record</p>
          </StickyNote>
        </Link>
      </div>

      {/* 3. Skills / MO (Bottom Left) */}
      <div className="absolute bottom-20 left-4 md:bottom-32 md:left-32 z-10">
        <Link href="/modus-operandi">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 6, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            className="bg-[#e0e0e0] w-40 h-24 border-l-8 border-blue-800 p-4 shadow-xl cursor-pointer flex flex-col justify-center items-center rotate-3 border border-gray-300"
          >
            <span className="font-display text-lg text-black leading-none text-center">MODUS<br />OPERANDI</span>
            <span className="text-[10px] font-mono mt-1 text-gray-500 uppercase tracking-[0.2em]">Methods</span>
          </motion.div>
        </Link>
      </div>

      {/* 4. Evidence (Bottom Right) */}
      <div className="absolute bottom-20 right-4 md:bottom-32 md:right-32 z-10">
        <Link href="/evidence">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -4, y: -10 }}
            className="relative w-48 h-32 bg-[#d4c598] rounded-lg shadow-2xl flex items-center justify-center cursor-pointer group -rotate-2 border border-black/20"
          >
            <div className="absolute -top-4 left-0 w-16 h-6 bg-[#d4c598] rounded-t-lg border-t border-l border-r border-black/20 shadow-sm" />
            <span className="text-red-900 font-display text-xl font-bold tracking-widest z-10 drop-shadow-sm">EVIDENCE</span>
            <div className="absolute top-2 right-4 w-32 h-24 bg-white/90 shadow-sm rotate-3 group-hover:rotate-12 transition-transform duration-500 z-0 border border-black/5" />
          </motion.div>
        </Link>
      </div>

      {/* --- STRINGS --- */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {/* Strings connected to center hub (50/50) */}
        {/* Suspect (centered at roughly 18/28) */}
        <RedString x1Percent={16} y1Percent={28} x2Percent={50} y2Percent={50} delay={0.5} />

        {/* Timeline (centered at roughly 83/30) */}
        <RedString x1Percent={87} y1Percent={32} x2Percent={50} y2Percent={50} delay={0.7} />

        {/* Modus Operandi (centered at roughly 20/75) */}
        <RedString x1Percent={20} y1Percent={76} x2Percent={50} y2Percent={50} delay={0.9} />

        {/* Evidence (centered at roughly 80/75) */}
        <RedString x1Percent={82} y1Percent={76} x2Percent={50} y2Percent={50} delay={1.1} />
      </div>

    </div>
  );
}
