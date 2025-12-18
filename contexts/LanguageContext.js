"use client";

import { createContext, useContext, useState } from "react";
import { translations } from "@/utils/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("en");

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
