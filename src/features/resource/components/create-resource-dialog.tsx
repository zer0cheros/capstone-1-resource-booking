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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
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
      category: undefined,
      name: "",
      description: "",
      userId: "123",
      price: 0,
      priceUnit: undefined,
      Image: undefined,
    },
  });
  const onSubmit = async (values: CreateResourceInput) => {
    try {
      const formData = new FormData();
      formData.append("category", values.category);
      formData.append("name", values.name);
      formData.append("description", values.description ?? "");
      formData.append("userId", "123");
      formData.append("price", (values.price ?? 0).toString());
      formData.append("priceUnit", values.priceUnit);
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
                      <SelectContent position="popper" className="bg-white ">
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
                          onChange={(e) => field.onChange(e.target.valueAsNumber | 0)}
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
                        <SelectContent position="popper" className="bg-white">
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
                className="bg-gb-blue rounded-xl px-8 shadow-md"
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
