"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { columns, type ProductColumn } from "./columns";

interface ProductClientProps {
  data: ProductColumn[];
}

export function ProductClient({ data }: ProductClientProps) {
  const router = useRouter();
  const params = useParams();

  const { storeId } = params;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading description="Manage products for your store" title={`Products (${data.length})`} />
        <Button
          className="text-sm"
          onClick={() => router.push(`/${storeId.toString()}/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Product
        </Button>
      </div>
      <Separator className="mt-4" />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading description="API calls for products" title="API" />
      <Separator className="mt-4" />
      <ApiList entityIdName="productId" entityName="products" />
    </>
  );
}
