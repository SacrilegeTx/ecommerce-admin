import { getProductByProductId } from "@/actions/product/find-product";
import { getAllCategoriesByStoreId } from "@/actions/category/find-category";
import { getAllSizesByStoreId } from "@/actions/size/find-size";
import { getAllColorsByStoreId } from "@/actions/color/find-color";

import { ProductForm } from "./components/product-form";

interface BillboardPageProps {
  params: {
    productId: string;
    storeId: string;
  };
}

export default async function BillboardPage({ params }: BillboardPageProps) {
  const { productId, storeId } = params;

  const product = await getProductByProductId(productId);
  const categories = await getAllCategoriesByStoreId(storeId);
  const sizes = await getAllSizesByStoreId(storeId);
  const colors = await getAllColorsByStoreId(storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm categories={categories} colors={colors} initialData={product} sizes={sizes} />
      </div>
    </div>
  );
}
