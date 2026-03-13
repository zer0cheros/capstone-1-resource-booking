export type Resource = {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type ResourceDetailsPageprops = {
    params: Promise<{ resourceId: string}>;
}

export type ResourceImageProps = {
    src: string | null | undefined;
    alt: string;
}