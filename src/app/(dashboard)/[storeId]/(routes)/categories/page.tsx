import type { CategoryColumn } from "./components/columns";

import { format } from "date-fns";

import { getAllCategoriesByStoreId } from "@/actions/category/find-category";

import { CategoryClient } from "./components/client";

interface CategoriesPageProps {
  params: {
    storeId: string;
  };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { storeId } = params;
  const categories = await getAllCategoriesByStoreId(storeId);

  const formattedCategories: CategoryColumn[] =
    categories?.map((category) => ({
      id: category.id,
      name: category.name,
      billboardLabel: category.billboard.label,
      createAt: format(category.createdAt, "MMMM do, yyyy"),
    })) ?? [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
