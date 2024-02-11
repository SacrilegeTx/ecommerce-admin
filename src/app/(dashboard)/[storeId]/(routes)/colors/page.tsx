import type { ColorColumn } from "./components/columns";

import { format } from "date-fns";

import { getAllColorsByStoreId } from "@/actions/color/find-color";

import { ColorsClient } from "./components/client";

interface ColorsPageProps {
  params: {
    storeId: string;
  };
}

export default async function ColorsPage({ params }: ColorsPageProps) {
  const { storeId } = params;
  const colors = await getAllColorsByStoreId(storeId);

  const formattedColors: ColorColumn[] =
    colors?.map((color) => ({
      id: color.id,
      name: color.name,
      value: color.value,
      createAt: format(color.createdAt, "MMMM do, yyyy"),
    })) ?? [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
}
