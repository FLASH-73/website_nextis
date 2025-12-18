"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.about.title}</h2>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                    {t.about.description}
                </p>
            </div>
        </section>
    );
}
