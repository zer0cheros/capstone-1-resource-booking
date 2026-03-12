"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
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
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateResourceMutation from "../hooks/use-resource-create-query";
import {
  CreateResourceInput,
  createRoesourceSchema,
} from "../validation/create-resource-validator";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";

export default function createResourceDialog(
  { children }: { children: React.ReactNode },
) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateResourceMutation();
  const hasSingleElementChild = React.isValidElement(children);
  const form = useForm<CreateResourceInput>({
    resolver: zodResolver(createRoesourceSchema),
    defaultValues: {
      name: "",
      description: "",
      userId: "123",
      Image: undefined,
    },
  });
  const onSubmit = async (values: CreateResourceInput) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description ?? "");
      formData.append("userId", "123"); // TODO: get user id from auth context
      if (values.Image instanceof File) {
        formData.append("image", values.Image);
      }

      await mutateAsync(formData);

      form.reset();
      setOpen(false);
    } catch (e) {
      // toast handled in mutation
      console.error(e);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {hasSingleElementChild
        ? (
          // If user provided a single element trigger, forward via asChild
          <DialogTrigger asChild>
            {children as React.ReactElement}
          </DialogTrigger>
        )
        : (
          // Default trigger: *no* asChild, so Radix renders its own button element
          <DialogTrigger>Add resource</DialogTrigger>
        )}
      <DialogContent className="sm:max-w-lg rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add resource</DialogTitle>
          <DialogDescription>Here you can add resources</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-4"
          >
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
            <FormField
              control={form.control}
              name="Image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700">
                    Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl h-12 bg-white/50 pt-2 cursor-pointer"
                      type="file"
                      accept="image/*"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    The image is optional
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-row items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#1980D5] hover:bg-[#1181c4] rounded-xl px-8 shadow-md"
              >
                {isPending ? "Creating..." : "Create resource"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
