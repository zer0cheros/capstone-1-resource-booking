"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateResourceMutation from "../hooks/use-resource-create-query";
import {
  CreateResourceInput,
  createRoesourceSchema,
} from "../validation/create-resource-validator";

import { useForm } from "react-hook-form";
import { Session } from "@/features/auth/types/session";
import ResourceForm from "./resource-form";

export default function CreateResourceDialog(
  { children, user }: { children: React.ReactNode, user: NonNullable<Session["user"]>; },
) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateResourceMutation();
  const hasSingleElementChild = React.isValidElement(children);
  const form = useForm<CreateResourceInput>({
    resolver: zodResolver(createRoesourceSchema),
    defaultValues: {
      category: undefined,
      name: "",
      description: "",
      userId: user.id,
      price: undefined,
      priceUnit: undefined,
      image: undefined,
    },
  });
  const onSubmit = async (values: CreateResourceInput) => {
    try {
      const formData = new FormData();
      formData.append("category", values.category);
      formData.append("name", values.name);
      formData.append("description", values.description ?? "");
      formData.append("userId", user.id);
      formData.append("price", (values.price ?? 0).toString());
      formData.append("priceUnit", values.priceUnit);
      if (values.image instanceof File) {
        formData.append("image", values.image);
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
        
        <ResourceForm
          initialData={{ userId: user.id }}
          onSubmit={onSubmit}
          isPending={isPending}
          submitLabel="Create resource"
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
