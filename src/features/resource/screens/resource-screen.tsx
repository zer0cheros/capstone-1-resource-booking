"use client";
import React, { use } from "react";
import CreateResourceDialog from "../components/create-resource-dialog";
import { Button } from "@/shared/components/ui/button";
import useResourcesQuery from "../hooks/use-resource-query";
import ListResource from "../components/list-resource";
import { IconPlus } from "@tabler/icons-react"

export default function resourceScreen() {
  const { data: resource, isPending } = useResourcesQuery();

  return (
    <div className="bg-[#DDEBF1] flex-1 p-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-bold">Resources</h1>
          <p className="text-2xl">Browse available Shared Resources</p>
        </div>
        
        <Button className="h-15 !px-8 text-lg">
          <IconPlus size={20}/> Add Resource
        </Button>
      </div>
    </div>
  );
}
