"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { columns, type OrderdColumn } from "./columns";

interface OrderClientProps {
  data: OrderdColumn[];
}

export function OrderClient({ data }: OrderClientProps) {
  return (
    <>
      <Heading description="Manage orders for your store" title={`Orders (${data.length})`} />
      <Separator className="mt-4" />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
}
