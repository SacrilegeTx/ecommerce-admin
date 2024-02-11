import type { SizeColumn } from "./components/columns";

import { format } from "date-fns";

import { getAllSizesByStoreId } from "@/actions/size/find-size";

import { SizesClient } from "./components/client";

interface SizesPageProps {
  params: {
    storeId: string;
  };
}

export default async function SizesPage({ params }: SizesPageProps) {
  const { storeId } = params;
  const sizes = await getAllSizesByStoreId(storeId);

  const formattedSizes: SizeColumn[] =
    sizes?.map((size) => ({
      id: size.id,
      name: size.name,
      value: size.value,
      createAt: format(size.createdAt, "MMMM do, yyyy"),
    })) ?? [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
}
