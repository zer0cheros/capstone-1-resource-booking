import { createResource } from "@/features/resource/server/create-resource";
import { getResources } from "@/features/resource/server/get-resources";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { createId } from "@paralleldrive/cuid2";

export async function GET() {
    const resources = await getResources();
    return new Response(JSON.stringify(resources), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const description = (formData.get("description") as string) ?? "";
        const userId = formData.get("userId") as string;
        const imageFile = formData.get("image") as File | null;
        const priceRaw = formData.get("price");
        const priceUnit = formData.get("priceUnit") as string | null;
        const category = formData.get("category") as string | null;

        if (!name?.trim()) {
            return new Response(
                JSON.stringify({ message: "Name is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const price =
            typeof priceRaw === "string"
                ? Number.parseFloat(priceRaw)
                : typeof priceRaw === "number"
                    ? priceRaw
                    : 0;

        let imageUrl: string | undefined;

        if (imageFile && imageFile.size > 0) {
            const ext = path.extname(imageFile.name) || ".jpg";
            const filename = `${createId()}${ext}`;
            const uploadsDir = path.join(process.cwd(), "public", "uploads");
            await mkdir(uploadsDir, { recursive: true });
            const filepath = path.join(uploadsDir, filename);
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            await writeFile(filepath, buffer);
            imageUrl = `/uploads/${filename}`;
        }

        const newResource = await createResource({
            name: name.trim(),
            description,
            userId,
            Image: imageUrl,
            price,
            priceUnit: (priceUnit ?? "hour") as any,
            category: (category ?? "Apartments & Spaces") as any,
        });

        return new Response(JSON.stringify(newResource), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (err: unknown) {
        console.error('CREATE RESOURCE ERROR:', err);
        const message = err instanceof Error ? err.message : "Failed to create resource";
        return new Response(
            JSON.stringify({ message }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
}