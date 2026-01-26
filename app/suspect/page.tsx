"use client";

import { motion } from "framer-motion";
import { Polaroid } from "@/components/ui/Polaroid";

export default function SuspectPage() {
    return (
        <div className="container mx-auto p-8 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white text-black p-8 shadow-2xl relative rotate-1"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')" }} // Optional paper texture
            >
                {/* Header */}
                <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-5xl font-display uppercase tracking-tighter">Suspect Profile</h1>
                        <p className="font-typewriter text-sm mt-2">DEPARTMENT OF INVESTIGATION // CASE #404</p>
                    </div>
                    <div className="text-right font-typewriter">
                        <p>DATE: {new Date().toLocaleDateString()}</p>
                        <p>STATUS: <span className="text-red-600 font-bold">AT LARGE</span></p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {/* Mugshot Section */}
                    <div className="col-span-1 flex justify-center md:block overflow-visible mt-4 md:mt-0">
                        <Polaroid
                            src="/images/brook.png"
                            alt="Suspect Mugshot"
                            caption="BROOK SOLOMON"
                            rotation={-2}
                            width={220}
                            height={280}
                            className="max-w-full"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="col-span-2 space-y-6 font-typewriter">
                        <div className="grid grid-cols-2 gap-4 border-b border-dashed border-gray-400 pb-4">
                            <div>
                                <span className="font-bold block text-gray-500 text-xs uppercase">Name</span>
                                <span className="text-xl">Brook Solomon</span>
                            </div>
                            <div>
                                <span className="font-bold block text-gray-500 text-xs uppercase">Alias</span>
                                <span className="text-xl">Full-Stack Dev</span>
                            </div>
                            <div>
                                <span className="font-bold block text-gray-500 text-xs uppercase">Last Seen</span>
                                <span className="text-lg">Shipping Code @ 3AM</span>
                            </div>
                            <div>
                                <span className="font-bold block text-gray-500 text-xs uppercase">Motive</span>
                                <span className="text-lg">Obsession with Building</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-display text-2xl border-b border-black inline-block">Psychological Analysis</h3>
                            <p className="leading-relaxed">
                                Subject displays high aptitude for complex problem solving. Tendency to over-engineer
                                solutions if not monitored. Known to operate across the full stack, showing disregard for
                                frontend/backend boundaries.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-display text-2xl border-b border-black inline-block">Background</h3>
                            <p className="leading-relaxed">
                                History of involvement in competitive programming (ICPC).
                                Recent activity suggests deep involvement with Typescript.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Stamps */}
                <div className="mt-12 flex justify-end space-x-4">
                    <div className="border-4 border-red-700 text-red-700 font-black text-4xl p-2 opacity-50 -rotate-12 select-none">
                        CONFIDENTIAL
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
