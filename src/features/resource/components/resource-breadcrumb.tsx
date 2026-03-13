"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Resource } from "../types/resource";

export default function ResourceBreadcrumb({ resource }: { resource: Resource}) {
    return (
        <div className="py-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="text-md md:text-xl font-medium text-slate-500">
                        <BreadcrumbLink href="/resources">Resources</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="[&>svg]:size-6"/>
                    <BreadcrumbItem className="text-md md:text-xl font-bold text-slate-900">
                        <BreadcrumbPage className="line-clamp-1">
                            {resource.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
