"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import {
    CreateResourceInput,
    createRoesourceSchema,
} from "../validation/create-resource-validator";
import { ResourceFormProps } from "../types/resource";
import { DialogFooter } from "@/shared/components/ui/dialog";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { UploadButton } from "@/shared/lib/uploadThing";
import toast from "react-hot-toast";
export default function ResourceForm(
    { initialData, onSubmit, isPending, submitLabel, onCancel }:
        ResourceFormProps,
) {
    const [removeExistingImage, setRemoveExistingImage] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const form = useForm<CreateResourceInput>({
        resolver: zodResolver(createRoesourceSchema),
        defaultValues: {
            category: initialData?.category || undefined,
            name: initialData?.name || "",
            description: initialData?.description || "",
            userId: initialData?.userId || "",
            price: initialData?.price || undefined,
            priceUnit: initialData?.priceUnit || undefined,
            image: initialData?.image || uploadedImage || '', // Files can't be set as default values easily
            removeImage: false,
        },
    });

    const currentImageFile = form.watch("image");

    useEffect(()=> {
        form.setValue("removeImage", false);
        form.setValue("image", uploadedImage || '');
    },[uploadedImage, currentImageFile, form])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 pt-4"
            >
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-slate-700">
                                Category
                            </FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-full rounded-xl !h-12 bg-white/50">
                                        <SelectValue placeholder="Choose a category" />
                                    </SelectTrigger>
                                    <SelectContent
                                        position="popper"
                                        className="bg-white "
                                    >
                                        <SelectGroup>
                                            <SelectItem value="Apartments & Spaces">
                                                Apartments & Spaces
                                            </SelectItem>
                                            <SelectItem value="Vehicles & Transport">
                                                Vehicles & Transport
                                            </SelectItem>
                                            <SelectItem value="Tools & Equipment">
                                                Tools & Equipment
                                            </SelectItem>
                                            <SelectItem value="Office & Tech">
                                                Office & Tech
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-slate-700">
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="rounded-xl h-12 bg-white/50"
                                    placeholder="e.g. MacBook Pro M3 #04"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-slate-700">
                                Description
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="rounded-xl h-12 bg-white/50"
                                    placeholder="e.g. 16-inch model, 32GB RAM, includes charger..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-slate-700">
                                    Price
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                                            $
                                        </span>

                                        <Input
                                            type="number"
                                            className="rounded-xl h-12 bg-white/50 pl-8"
                                            placeholder="0.00"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.valueAsNumber | 0,
                                                )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="priceUnit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-slate-700">
                                    Rent Duration
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full rounded-xl !h-12 bg-white/50">
                                            <SelectValue placeholder="Select period..." />
                                        </SelectTrigger>
                                        <SelectContent
                                            position="popper"
                                            className="bg-white"
                                        >
                                            <SelectGroup>
                                                <SelectItem value="hour">
                                                    Hour
                                                </SelectItem>
                                                <SelectItem value="day">
                                                    Day
                                                </SelectItem>
                                                <SelectItem value="week">
                                                    Week
                                                </SelectItem>
                                                <SelectItem value="month">
                                                    Month
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-slate-700">
                                Image
                            </FormLabel>
                            <FormControl>
                                <div className="space-y-4">
                                    {(currentImageFile ||
                                        (initialData?.image &&
                                            !removeExistingImage)) && (
                                        <div className="relative group aspect-video w-40 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm">
                                            <NextImage
                                                src={currentImageFile
                                                    ? URL.createObjectURL(
                                                        currentImageFile,
                                                    )
                                                    : (initialData
                                                        ?.image as string)}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                          
                                            <button
                                                type="button"
                                                onClick={clearImage}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                            >
                                                <X size={14} strokeWidth={3} />
                                            </button>
                                        </div>
                                    )}

                                    <Input
                                        className="rounded-xl h-12 bg-white/50 pt-2 cursor-pointer"
                                        type="file"
                                        accept="image/*"
                                        {...field}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setRemoveExistingImage(false);
                                                form.setValue("removeImage", false);
                                                onChange(file);
                                            }
                                        }}
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>
                                The image is optional
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                 <UploadButton className="bg-gb-blue rounded-xl px-8 shadow-md"
                  endpoint="imageUploader"
                   content={{
                    button({ ready }) {
                    if (ready) return "Upload image"; // your custom text (no 4MB)
                    return "Loading...";
                    },
                }}
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      setUploadedImage(res[0].url);
                      toast.success("Image uploaded successfully!", { id: "upload" });
                    }
                  }}
                  onUploadProgress={(progress)=> {
                    toast.loading(`Uploading: ${progress}%`, { id: "upload" });
                  }}
                  onUploadError={(error) => {
                    console.error(error);
                  }}
                />
				{uploadedImage && (
				<img
					src={uploadedImage}
					alt="Uploaded profile"
					className="w-24 h-24 mt-2 shadow-2xl object-cover"
				/>
				)}
                <DialogFooter className="flex flex-row items-center justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onCancel}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-gb-blue rounded-xl px-8 shadow-md"
                    >
                        {isPending ? "Processing..." : submitLabel}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
