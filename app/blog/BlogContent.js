"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { getAllPosts } from "@/content/posts";
import Link from "next/link";
import { motion } from "framer-motion";

const localeMap = { en: "en-US", de: "de-DE" };

export default function BlogContent() {
    const { language } = useLanguage();
    const posts = getAllPosts();

    const subtitle =
        language === "de"
            ? "Gedanken zum Bau des universellen Konstruktors."
            : "Thoughts on building the universal constructor.";
    const readMore = language === "de" ? "Lesen \u2192" : "Read \u2192";
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
                    href="/"
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300 mb-16 inline-block"
                >
                    {backText}
                </Link>

                <h1
                    className="font-light tracking-tight text-gray-900 mb-4"
                    style={{ fontSize: "var(--text-section-title)" }}
                >
                    Blog
                </h1>
                <p
                    className="text-gray-500 font-light mb-16"
                    style={{ fontSize: "var(--text-body-lg)" }}
                >
                    {subtitle}
                </p>

                <div>
                    {posts.map((post, i) => {
                        const localized = post[language];
                        const date = new Intl.DateTimeFormat(
                            localeMap[language],
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        ).format(new Date(post.publishedAt));

                        return (
                            <div
                                key={post.slug}
                                className={
                                    i < posts.length - 1
                                        ? "pb-10 mb-10 border-b border-gray-100"
                                        : "pb-10"
                                }
                            >
                                <p className="text-sm text-gray-400 mb-2 font-light">
                                    {date}
                                </p>
                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-xl font-light text-gray-900 hover:text-gray-600 transition-colors duration-300 mb-2">
                                        {localized.title}
                                    </h2>
                                </Link>
                                <p
                                    className="text-gray-500 leading-relaxed font-light mb-3"
                                    style={{ fontSize: "var(--text-body)" }}
                                >
                                    {localized.description}
                                </p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300"
                                >
                                    {readMore}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </main>
    );
}
