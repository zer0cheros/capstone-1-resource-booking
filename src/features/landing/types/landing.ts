import { LucideIcon } from "lucide-react";

export interface StepCardProps {
    icon: LucideIcon;
    step: string;
    title: string;
    description: string;
}

export interface CircularCardProps {
    icon: LucideIcon;
    feature: string;
    description: string;
}