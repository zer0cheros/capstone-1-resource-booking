import {
    Calendar,
    Camera,
    ClipboardList,
    Key,
    Search,
    Wallet,
} from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/shared/components/ui/tabs";
import { StepCard } from "./step-card";

export default function HowItWorks() {
    return (
        <section className="relative bg-white py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none [background-image:radial-gradient(#63BE57_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                        How <span className="text-[#1980D5]">Order</span>
                        <span className="text-[#63BE57]">Ease</span> Works
                    </h2>

                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Whether you&apos;re looking to save money or earn extra
                        income, we&apos;ve got you covered.
                    </p>
                </div>

                <Tabs defaultValue="renters" className="w-full">
                    <div className="flex justify-center mb-16">
                        <TabsList className="grid w-full max-w-md grid-cols-2 !h-14 p-1 items-center bg-slate-100 rounded-full">
                            <TabsTrigger
                                value="renters"
                                className="rounded-full text-lg py-1 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                            >
                                For Renters
                            </TabsTrigger>
                            <TabsTrigger
                                value="owners"
                                className="rounded-full text-lg py-1 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                            >
                                For Owners
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="renters">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <StepCard
                                icon={Search}
                                step="01"
                                title="Browse"
                                description="Search for tools, vehicles, or apartments available for your dates."
                            />
                            <StepCard
                                icon={Calendar}
                                step="02"
                                title="Book"
                                description="Select your time period and submit a booking request for validation."
                            />
                            <StepCard
                                icon={Key}
                                step="03"
                                title="Use"
                                description="Access the resource once confirmed and complete your project with ease."
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="owners">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <StepCard
                                icon={Camera}
                                step="01"
                                title="List"
                                description="Upload photos, set your price, and list your unused equipment."
                            />
                            <StepCard
                                icon={ClipboardList}
                                step="02"
                                title="Manage"
                                description="Accept requests and oversee your resource&apos;s reservation schedule."
                            />
                            <StepCard
                                icon={Wallet}
                                step="03"
                                title="Earn"
                                description="Receive secure payments for assets that would otherwise gather dust."
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
