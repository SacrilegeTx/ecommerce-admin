"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { columns, type BillboardColumn } from "./columns";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export function BillboardClient({ data }: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  const { storeId } = params;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage billboards for your store"
          title={`Billboards (${data.length})`}
        />
        <Button
          className="text-sm"
          onClick={() => router.push(`/${storeId.toString()}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Billboard
        </Button>
      </div>
      <Separator className="mt-4" />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading description="API calls for billboards" title="API" />
      <Separator className="mt-4" />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  );
}
