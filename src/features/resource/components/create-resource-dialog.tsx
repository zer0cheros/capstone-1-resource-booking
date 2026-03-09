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
    defaultValues: { name: "", description: "", userId: "123", Image: "" },
  });
  const onSubmit = async (values: CreateResourceInput) => {
    try {
      await mutateAsync({
        name: values.name,
        description: values.description,
        userId: "123", // TODO: get user id from auth context
        Image: values.Image
      });
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add resource</DialogTitle>
          <DialogDescription>Here you can add resources</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Meeting" {...field} />
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
                  <FormLabel>Discription</FormLabel>
                  <FormControl>
                    <Input placeholder="this is a hotel.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Add url for image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating" : "Create resource"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}