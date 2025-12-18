"use client";

import { motion } from "framer-motion";
import { Cpu, Bot, Zap } from "lucide-react";

const features = [
    {
        icon: <Cpu className="w-8 h-8 text-blue-600" />,
        title: "AI-Native",
        description: "Built from the ground up with neural networks for adaptive control and learning.",
    },
    {
        icon: <Bot className="w-8 h-8 text-purple-600" />,
        title: "Precision Control",
        description: "Sub-millimeter accuracy for delicate assembly and sorting tasks.",
    },
    {
        icon: <Zap className="w-8 h-8 text-yellow-500" />,
        title: "Fast Setup",
        description: "Unbox and start automating in under 15 minutes. No coding required.",
    },
];

export default function FeatureSection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Technology that moves you.
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Our robotic arms combine state-of-the-art hardware with advanced AI to solve real-world problems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="mb-6 bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
