import { getBillboardByBillboardId } from "@/actions/billboard/find-billboard";

import { BillboardForm } from "./components/billboard-form";

interface BillboardPageProps {
  params: {
    billboardId: string;
  };
}

export default async function BillboardPage({ params }: BillboardPageProps) {
  const { billboardId } = params;

  const billboard = await getBillboardByBillboardId(billboardId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}
