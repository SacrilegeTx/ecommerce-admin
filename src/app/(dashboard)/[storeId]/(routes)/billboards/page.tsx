import type { BillboardColumn } from "./components/columns";

import { format } from "date-fns";

import { getAllBillboardsByStoreId } from "@/actions/billboard/find-billboard";

import { BillboardClient } from "./components/client";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

export default async function BillboardsPage({ params }: BillboardsPageProps) {
  const { storeId } = params;
  const billboards = await getAllBillboardsByStoreId(storeId);

  const formattedBillboards: BillboardColumn[] =
    billboards?.map((billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createAt: format(billboard.createdAt, "MMMM do, yyyy"),
    })) ?? [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}
