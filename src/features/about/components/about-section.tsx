import { LucideIcon } from "lucide-react";

interface AboutSectionProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
}

export default function AboutSection({ title, icon: Icon, children }: AboutSectionProps) {
    return (
        <section className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-2xl bg-gb-blue/10 flex items-center justify-center text-gb-blue">
                    <Icon size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                {children}
            </div>
        </section>
    );
}