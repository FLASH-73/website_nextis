"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function TextSection({ bgClass = "bg-white", textKey }) {
    const { t } = useLanguage();

    return (
        <section className={`py-32 ${bgClass}`}>
            <div className="max-w-3xl mx-auto px-6 text-center">
                <p className="text-gray-700 leading-relaxed font-light mb-8" style={{ fontSize: "var(--text-body-lg)" }}>
                    {t[textKey].text1}
                </p>
                <p className="text-gray-900 leading-relaxed font-medium" style={{ fontSize: "var(--text-body-lg)" }}>
                    {t[textKey].text2}
                </p>
            </div>
        </section>
    );
}
