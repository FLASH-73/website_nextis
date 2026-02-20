"use client";

import { useToast } from "@/contexts/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Toast() {
    const { toast, dismissToast } = useToast();

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(dismissToast, 4000);
        return () => clearTimeout(timer);
    }, [toast, dismissToast]);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
            <AnimatePresence mode="wait">
                {toast && (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-lg text-sm font-medium text-white ${
                            toast.type === "error" ? "bg-red-600" : "bg-green-600"
                        }`}
                    >
                        <span>{toast.message}</span>
                        <button
                            onClick={dismissToast}
                            className="ml-1 opacity-70 hover:opacity-100 transition-opacity"
                            aria-label="Dismiss"
                        >
                            &#x2715;
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
