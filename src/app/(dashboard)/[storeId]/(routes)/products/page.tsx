import type { ProductColumn } from "./components/columns";

import { format } from "date-fns";

import { getAllProductsByStoreId } from "@/actions/product/find-product";
import { formatter } from "@/lib/utils";

import { ProductClient } from "./components/client";

interface ProductPageProps {
  params: {
    storeId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { storeId } = params;
  const products = await getAllProductsByStoreId(storeId);

  const formattedProducts: ProductColumn[] =
    products?.map((product) => ({
      id: product.id,
      name: product.name,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      price: formatter.format(product.price.toNumber()),
      category: product.category.name,
      size: product.size.name,
      color: product.color.value,
      createAt: format(product.createdAt, "MMMM do, yyyy"),
    })) ?? [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}
