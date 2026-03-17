"use client";
import ResourceBreadcrumb from "../components/resource-breadcrumb";
import ResourceDetails from "../components/resource-details";
import ResourceImage from "../components/resource-image";
import { Resource } from "../types/resource";

export default function ResourceDetailsScreen(
    { resource }: { resource: Resource },
) {
    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8">
            <div className="mb-6">
                <ResourceBreadcrumb resource={resource} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-10 items-center">
                <div className="col-span-full lg:col-span-4">
                    <ResourceImage src={resource.image} alt={resource.name} />
                </div>
                <div className="col-span-full lg:col-span-6">
                    <ResourceDetails resource={resource} />
                </div>
            </div>
        </div>
    );
}
