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
        <section className="relative overflow-hidden py-32">
            <div className="full absolute -right-24 -top-24 h-96 w-96 rounded bg-[#63BE57]/10 blur-[120px]" />

            <div className="full absolute -bottom-24 -left-24 h-96 w-96 rounded bg-[#1980D5]/10 blur-[120px]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:radial-gradient(#1980D5_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-10">
                <div className="mb-16 flex flex-col items-center">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#63BE57]">
                        Safety First
                    </h3>
                    <h2 className="mb-6 text-center text-4xl font-bold md:text-6xl">
                        Built on a Foundation of Trust
                    </h2>
                    <p className="max-w-2xl text-center text-xl text-slate-600">
                        Your safety is our priority. We use industry-standard
                        security to keep your resources and data protected.
                    </p>
                </div>

                <div className="grid grid-cols-1 justify-items-center gap-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-16">
                    {trustFeatures.map((trustFeature) => (
                        <CircularCard
                            key={trustFeature.feature}
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
