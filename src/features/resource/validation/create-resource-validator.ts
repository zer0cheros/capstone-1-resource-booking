import { z } from "zod";

export const createResourceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    userId: z.string().min(1, "User ID is required"),
    image: z.string().optional(),
    removeImage: z.boolean().optional(),
    price: z.number().min(0, "Price must be a positive number"),
    priceUnit: z.enum(["hour", "day", "week", "month"]),
    category: z.enum(["Apartments & Spaces", "Vehicles & Transport", "Tools & Equipment", "Office & Tech"]),
});

export type CreateResourceInput = z.infer<typeof createResourceSchema>;

export type CreateResourceServerInput = Omit<CreateResourceInput, "Image"> & {
    Image?: string;
};

export const createRoesourceSchema = createResourceSchema;