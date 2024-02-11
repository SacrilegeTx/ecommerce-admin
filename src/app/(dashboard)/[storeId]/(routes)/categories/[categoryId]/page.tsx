import { getCategoryByCategoryId } from "@/actions/category/find-category";
import { getAllBillboardsByStoreId } from "@/actions/billboard/find-billboard";

import { CategoryForm } from "./components/category-form";

interface CategoryPageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId, storeId } = params;

  const category = await getCategoryByCategoryId(categoryId);
  const billboards = await getAllBillboardsByStoreId(storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
}
