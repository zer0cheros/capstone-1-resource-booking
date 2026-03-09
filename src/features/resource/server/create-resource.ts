import db from "@/db";
import { CreateResourceInput } from "../validation/create-resource-validator";
import { resource } from "../model/resource";
import { createId } from "@paralleldrive/cuid2";

export async function createResource(input: CreateResourceInput) {
    const data = await db.insert(resource).values({
        id: createId(),
        userId: input.userId,
        name: input.name,
        description: input.description,
        image: input.Image
    }).returning();
    if (!data.length) throw new Error("insert-failed");
    return data[0];
}