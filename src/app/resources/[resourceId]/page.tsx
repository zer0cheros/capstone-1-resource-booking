import { getResourceById } from "@/features/resource/server/get-resources";
import { ResourceDetailsPageprops } from "@/features/resource/types/resource";
import { notFound } from "next/navigation";
import ResourceDetailsScreen from "@/features/resource/screens/resource-details-screen";

export default async function ResourceDetailsPage ({ params }: ResourceDetailsPageprops) {
    const { resourceId } = await params;

    const resource = await getResourceById(resourceId);

    if(!resource){
        notFound();
    }

    return(
        <div>
            <ResourceDetailsScreen resource={resource} />
        </div>
    );
}