"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.contact.title}</h2>
                <p className="text-lg text-gray-600 mb-10">
                    {t.contact.subtitle}
                </p>

                <form
                    className="max-w-md mx-auto flex gap-2"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const email = e.target.email.value;
                        const button = e.target.querySelector('button');
                        const originalText = button.innerText;

                        try {
                            button.innerText = "Joining...";
                            const res = await fetch('/api/waitlist', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email })
                            });
                            if (res.ok) {
                                alert("Thanks! We'll be in touch.");
                                e.target.reset();
                            } else {
                                alert("Something went wrong.");
                            }
                        } catch (err) {
                            console.error(err);
                            alert("Error joining waitlist");
                        } finally {
                            button.innerText = originalText;
                        }
                    }}
                >
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder={t.contact.emailPlaceholder}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button type="submit" className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                        {t.contact.join}
                    </button>
                </form>

                <div className="mt-16 text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Nextis. All rights reserved.
                </div>
            </div>
        </section>
    );
}
