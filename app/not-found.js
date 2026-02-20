"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
    const { t } = useLanguage();

    return (
        <main id="main-content" className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
                {t.notFound.title}
            </h1>
            <p className="text-gray-600 mb-8 max-w-md" style={{ fontSize: "var(--text-body)" }}>
                {t.notFound.text}
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
                {t.notFound.goHome} &rarr;
            </Link>
        </main>
    );
}
