"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { getPostBySlug } from "@/content/posts";
import { renderBlock } from "@/utils/renderBlock";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PostContent({ slug }) {
    const { language } = useLanguage();
    const post = getPostBySlug(slug);

    if (!post) return null;

    const blocks = post[language].blocks;
    const backText = language === "de" ? "\u2190 Zur\u00fcck" : "\u2190 Back";

    return (
        <main className="min-h-screen bg-white">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto px-6 py-24"
            >
                <Link
                    href="/blog"
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300 mb-16 inline-block"
                >
                    {backText}
                </Link>

                <article>
                    {blocks.map((block, i) => renderBlock(block, i))}
                </article>
            </motion.div>
        </main>
    );
}
