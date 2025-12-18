"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import RobotCanvas to avoid SSR issues with Three.js
const RobotCanvas = dynamic(() => import("./RobotCanvas"), { ssr: false });

export default function Hero() {
    const { t } = useLanguage();
    const [showRobot, setShowRobot] = useState(false);

    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            {showRobot && <RobotCanvas onClose={() => setShowRobot(false)} />}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
            >
                <h1 id="nextis-title" className="font-bold tracking-tight text-gray-900 mb-6" style={{ fontSize: 'clamp(3rem, 2.5vw, 6rem)' }}>
                    Nextis
                </h1>
                <p className="text-gray-600 font-light mb-10 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: 'clamp(1rem, 0.7vw, 1.5rem)' }}>
                    {t.hero.title} <br />
                    <span className="font-medium text-gray-900">{t.hero.subtitle}</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => setShowRobot(true)}
                        className="px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
                    >
                        {t.hero.discover}
                    </button>
                    <button className="px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-medium text-lg hover:border-gray-400 transition-all hover:bg-gray-50">
                        {t.hero.watch}
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
