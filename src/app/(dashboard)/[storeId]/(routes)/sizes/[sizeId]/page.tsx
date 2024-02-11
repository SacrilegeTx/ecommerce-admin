import { getSizeBySizeId } from "@/actions/size/find-size";

import { SizeForm } from "./components/size-form";

interface SizePageProps {
  params: {
    sizeId: string;
  };
}

export default async function SizePage({ params }: SizePageProps) {
  const { sizeId } = params;

  const size = await getSizeBySizeId(sizeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}
