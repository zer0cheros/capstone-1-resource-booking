import { Card, CardContent } from "@/shared/components/ui/card";

export default function StatCard({ 
    label, 
    value, 
    description, 
    highlight = false 
}: { 
    label: string; 
    value: string | number; 
    description: string;
    highlight?: boolean;
}) {
    return (
        <Card className="bg-white/70 backdrop-blur-xl border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden border">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <span className="bg-slate-100 text-slate-500 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                    {label}
                </span>
                <span className={`text-4xl font-black tracking-tighter mb-1 ${highlight ? 'text-gb-blue' : 'text-slate-900'}`}>
                    {value}
                </span>
                <span className="text-xs font-medium text-slate-400 italic">
                    {description}
                </span>
            </CardContent>
        </Card>
    );
}