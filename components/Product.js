"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Product() {
    const { t } = useLanguage();

    return (
        <section className="py-32 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <p className="text-gray-700 leading-relaxed font-light mb-8" style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)" }}>
                    {t.product.text1}
                </p>
                <p className="text-gray-900 leading-relaxed font-medium" style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)" }}>
                    {t.product.text2}
                </p>
            </div>
        </section>
    );
}
