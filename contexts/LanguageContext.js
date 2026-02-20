"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/utils/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("en");

    useEffect(() => {
        const stored = localStorage.getItem("nextis-lang");
        if (stored === "en" || stored === "de") {
            setLanguage(stored);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("nextis-lang", language);
        document.documentElement.lang = language;
    }, [language]);

    const t = translations[language];

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "de" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
