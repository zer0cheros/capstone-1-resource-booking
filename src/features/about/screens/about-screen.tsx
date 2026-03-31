"use client";

import { Info, LifeBuoy, Scale, ShieldCheck } from "lucide-react";
import AboutHeader from "../components/about-header";
import AboutSection from "../components/about-section";
import { Session } from "@/features/auth/types/session";

export default function AboutScreen({ user }: { user?: Session["user"] }) {
    return (
        <div className="flex-1 min-h-screen bg-slate-50/50 py-12 px-6 md:px-10 overflow-x-hidden">
            <div className="max-w-5xl mx-auto space-y-10">
                <AboutHeader user={user}/>

                <div className="grid gap-8">
                    {/* General Info */}
                    <AboutSection title="About the Project" icon={Info}>
                        <p>
                            OrderEase was built during the Spring 2026 semester
                            as a Capstone project at Centria University of
                            Applied Sciences. Our goal is to simplify the way
                            people share and book local resources like
                            apartments, vehicles, and tools.
                        </p>
                    </AboutSection>

                    {/* Support Block */}
                    <AboutSection title="Support & Contact" icon={LifeBuoy}>
                        <p>
                            As this is a development project, technical support
                            is handled through our GitHub repository. If you
                            encounter bugs or have feature suggestions, please
                            open an issue on our project board.
                        </p>
                        <div className="pt-4 flex gap-4">
                            <a
                                href="https://github.com/jahlgren/capstone-1-resource-booking/issues"
                                target="_blank"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gb-blue text-white font-bold text-sm transition-transform hover:-translate-y-1 shadow-lg shadow-gb-blue/20"
                            >
                                Get Help on GitHub
                            </a>
                        </div>
                    </AboutSection>

                    {/* Terms of Use Block */}
                    <AboutSection title="Terms of Service" icon={Scale}>
                        <p>
                            By using OrderEase, you acknowledge that this
                            platform is currently in a{" "}
                            <strong>preview/educational state</strong>.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                All booking data is for demonstration purposes.
                            </li>
                            <li>No real financial transactions take place.</li>
                            <li>
                                Users are responsible for the items they list.
                            </li>
                        </ul>
                    </AboutSection>

                    {/* Privacy Block */}
                    <AboutSection title="Privacy Policy" icon={ShieldCheck}>
                        <p>
                            We value your privacy. Your account data (Name,
                            Email, and Avatar) is stored securely and used only
                            for internal platform functionality such as
                            identifying listing owners and managing bookings.
                        </p>
                        <p>
                            We do not sell your data to third parties. For data
                            deletion requests, please contact the development
                            team.
                        </p>
                    </AboutSection>
                </div>
            </div>
        </div>
    );
}
