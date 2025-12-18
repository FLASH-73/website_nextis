"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="fixed top-8 right-8 z-50 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 hover:bg-white transition-all shadow-sm border border-gray-100"
        >
            {language === "en" ? "DE" : "EN"}
        </button>
    );
}
