import { getColorByColorId } from "@/actions/color/find-color";

import { ColorForm } from "./components/color-form";

interface ColorPageProps {
  params: {
    colorId: string;
  };
}

export default async function ColorPage({ params }: ColorPageProps) {
  const { colorId } = params;

  const color = await getColorByColorId(colorId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}
