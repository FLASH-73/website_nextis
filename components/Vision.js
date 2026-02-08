"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function Vision() {
    const { t } = useLanguage();

    return (
        <section className="py-32 bg-white">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <p className="text-gray-700 leading-relaxed font-light mb-4" style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)" }}>
                    {t.vision.text1}
                </p>
                <p className="text-gray-900 leading-relaxed font-medium mb-10" style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)" }}>
                    {t.vision.text2}
                </p>
                <Link
                    href="/manifesto"
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300 tracking-wide"
                >
                    {t.vision.manifesto}
                </Link>
            </div>
        </section>
    );
}
