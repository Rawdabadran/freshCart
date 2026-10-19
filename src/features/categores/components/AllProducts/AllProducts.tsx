import { GetProducts } from "../../api/getProducts";
import ProductCart from "../ProductCart/ProductCart";


export default  async function AllProducts() {
  const  AllProducts = await GetProducts()
  const Products =AllProducts.data;

  return (
    <div className="container flex py-6  my-5 justify-between flex-col  ">
        <h2 className="text-2xl font-semibold  px-3  mb-6 border-l-4 border-l-primary-700 rounded-s-sm">
          Featured <span className="text-primary-500  ">Products</span>
        </h2>
 <div className="grid grid-cols-1  gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:h-fit">
    {Products.map((product)=>(<ProductCart key={product.id} {...product}/>))}
 </div>
    
      
    </div>
  )
}
