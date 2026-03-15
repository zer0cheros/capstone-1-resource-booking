import { updateResource } from "@/features/resource/server/update-resource";
import { auth } from "@/features/auth/server/auth-server";
import { headers } from "next/headers";
import { getResourceById } from "@/features/resource/server/get-resources";
import { deleteResource } from "@/features/resource/server/delete-resource";


export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    } 
    const { id } = await params;
    const data = await req.json();
    try {
        const updatedResource = await updateResource(id, data, session.user.id);
        return new Response(JSON.stringify(updatedResource), { status: 200 });
    } catch (error) {
        console.error("Error updating resource:", error);
        return new Response(JSON.stringify({ error: "Failed to update resource" }), { status: 500 });
    }
}


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { id } = await params;
    try {
        const resource = await getResourceById(id);
        if (!resource) {
            return new Response(JSON.stringify({ error: "Resource not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(resource), { status: 200 });
    } catch (error) {
        console.error("Error fetching resource:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch resource" }), { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { id } = await params;
    try {
        const resource = await getResourceById(id); 
        if (!resource) {
            return new Response(JSON.stringify({ error: "Resource not found" }), { status: 404 });
        }
        if (resource.userId !== session.user.id) {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }
        await deleteResource(id);
        return new Response(JSON.stringify({ message: "Resource deleted" }), { status: 200 });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return new Response(JSON.stringify({ error: "Failed to delete resource" }), { status: 500 });
    }
}