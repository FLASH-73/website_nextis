"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
    const { t } = useLanguage();
    const { showToast } = useToast();
    const [mode, setMode] = useState("waitlist");
    const [submitting, setSubmitting] = useState(false);

    return (
        <section id="contact" className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="font-bold text-gray-900 mb-6" style={{ fontSize: "var(--text-section-title)" }}>{t.contact.title}</h2>
                <p className="text-lg text-gray-600 mb-10">
                    {t.contact.subtitle}
                </p>

                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-full border border-gray-200 inline-flex shadow-sm">
                        <button
                            onClick={() => setMode("waitlist")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${mode === "waitlist" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            {t.contact.waitlistTab}
                        </button>
                        <button
                            onClick={() => setMode("automate")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${mode === "automate" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            {t.contact.automateTab}
                        </button>
                    </div>
                </div>

                <form
                    className="max-w-md mx-auto flex flex-col gap-4"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const email = e.target.email.value;
                        if (!EMAIL_REGEX.test(email)) {
                            showToast(t.forms.invalidEmail, "error");
                            return;
                        }

                        const body = { email };
                        if (mode === "automate") {
                            body.taskDescription = e.target.taskDescription?.value;
                            body.videoLink = e.target.videoLink?.value;
                        }

                        setSubmitting(true);
                        try {
                            const res = await fetch('/api/waitlist', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(body)
                            });
                            if (res.ok) {
                                showToast("Thanks! We'll be in touch.", "success");
                                e.target.reset();
                                setMode("waitlist");
                            } else {
                                showToast("Something went wrong.", "error");
                            }
                        } catch (err) {
                            console.error(err);
                            showToast("Something went wrong. Please try again.", "error");
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    <label htmlFor="email-contact" className="sr-only">{t.forms.emailLabel}</label>
                    <input
                        id="email-contact"
                        type="email"
                        name="email"
                        required
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
                    />

                    <AnimatePresence mode="popLayout">
                        {mode === "automate" && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex flex-col gap-4 overflow-hidden"
                            >
                                <label htmlFor="task-description" className="sr-only">{t.forms.taskDescLabel}</label>
                                <textarea
                                    id="task-description"
                                    name="taskDescription"
                                    required
                                    rows={4}
                                    placeholder={t.contact.taskDescPlaceholder}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white resize-none"
                                />
                                <label htmlFor="video-link" className="sr-only">{t.forms.videoLinkLabel}</label>
                                <input
                                    id="video-link"
                                    type="url"
                                    name="videoLink"
                                    placeholder={t.contact.videoLinkPlaceholder}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? t.forms.submitting : (mode === "waitlist" ? t.contact.join : t.contact.submitAutomate)}
                    </button>
                </form>

                <div className="mt-16 text-gray-500" style={{ fontSize: "var(--text-small)" }}>
                    &copy; {new Date().getFullYear()} Nextis
                </div>
            </div>
        </section>
    );
}
