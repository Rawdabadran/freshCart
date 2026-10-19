import { GetProducts } from "../categores/api/getProducts";
import ShopProducts from "./ShopProducts";

export default async function ShopScreen() {
  const AllProducts = await GetProducts();

  return (
    <div className="container my-5 flex flex-col justify-between py-6">
      <h2 className="mb-6 rounded-s-sm border-l-4 border-l-primary-700 px-3 text-2xl font-semibold">
        Featured <span className="text-primary-500">All Products</span>
      </h2>

      <ShopProducts products={AllProducts.data} />
    </div>
  );
}
