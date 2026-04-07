"use client";
import ResourceForm from "@/features/resource/components/resource-form";
import useUpdateResourceMutation from "@/features/resource/hooks/use-resource-update-query";
import { Resource } from "@/features/resource/types/resource";
import { CreateResourceInput } from "@/features/resource/validation/create-resource-validator";
import { Button } from "@/shared/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Edit3 } from "lucide-react";
import { useState } from "react";

export default function ModifyResource(
    { res }: { res: Resource },
) {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending } = useUpdateResourceMutation();

    const onUpdate = async (values: CreateResourceInput) => {
        try {
            const formData = new FormData();
            formData.append("id", res.id);
            formData.append("name", values.name);
            formData.append("category", values.category);
            formData.append("description", values.description ?? "");
            formData.append("price", values.price.toString());
            formData.append("priceUnit", values.priceUnit);

            if (values.removeImage) {
                formData.append("removeImage", "true");
            }

            if (values.image ) {
                formData.append("image", values.image);
            }

            await mutateAsync(formData as any);
            setOpen(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-2xl bg-slate-50 hover:bg-gb-blue hover:text-white border-none shadow-none transition-all duration-300"
                >
                    <Edit3 className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Edit Resource
                    </DialogTitle>
                    <DialogDescription>
                        Modify the details of your listing below.
                    </DialogDescription>
                </DialogHeader>

                <ResourceForm
                    initialData={{
                        ...res,
                        description: res.description ?? "",
                    }}
                    onSubmit={onUpdate}
                    isPending={isPending}
                    submitLabel="Save Changes"
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
