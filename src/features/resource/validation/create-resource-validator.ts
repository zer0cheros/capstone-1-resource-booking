import { z } from "zod";

export const createResourceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    userId: z.string().min(1, "User ID is required"),
    Image: z.instanceof(File).optional(),
});

export type CreateResourceInput = z.infer<typeof createResourceSchema>;

/** Server/API input - Image is URL string, not File */
export type CreateResourceServerInput = Omit<CreateResourceInput, "Image"> & {
    Image?: string;
};

// Keep typo alias for backward compatibility during migration
export const createRoesourceSchema = createResourceSchema;