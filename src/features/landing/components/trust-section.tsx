"use client";

import { Lock, ShieldCheck, UserCog } from "lucide-react";
import { CircularCard } from "./circular-card";

const trustFeatures = [
    {
        icon: ShieldCheck,
        feature: "Verified Users",
        description:
            "Every user is authenticated via Better Auth, ensuring a community of real, verified people.",
    },
    {
        icon: Lock,
        feature: "Secure Payments",
        description:
            "Transactions are processed securely via Stripe. We never store your credit card information.",
    },
    {
        icon: UserCog,
        feature: "Active Moderation",
        description:
            "Our admin team monitors the platform to ensure a safe and respectful environment for everyone.",
    },
];

export default function TrustSection() {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#63BE57]/10 blur-[120px] rounded full" />

            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1980D5]/10 blur-[120px] rounded full" />

            <div className="absolute inset-0 opacity-[0.1] pointer-events-none [background-image:radial-gradient(#1980D5_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-10">
                <div className="flex flex-col items-center mb-16">
                    <h3 className="text-sm text-[#63BE57] font-bold tracking-[0.2em] uppercase">
                        Safety First
                    </h3>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
                        Built on a Foundation of Trust
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl text-center">
                        Your safety is our priority. We use industry-standard
                        security to keep your resources and data protected.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 xl:gap-16 justify-items-center">
                    {trustFeatures.map((trustFeature) => (
                        <CircularCard
                            icon={trustFeature.icon}
                            feature={trustFeature.feature}
                            description={trustFeature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
