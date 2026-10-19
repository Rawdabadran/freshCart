
import { GetProductDetails } from '../api/getProductDetails'
import ProductInfo from '../Components/ProductInfo';

import UserOverView from '../Components/userOverView';








export default async function ProductDetilsScreen({id}:{id:string}) {

    const data = await GetProductDetails(id);
      console.log(data)
  return (

   
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
      {/* Breadcrumb */}
      <ProductInfo ProductData={data.data}  />
      {/* Tabs card */}
      <UserOverView ProductData={data.data} />
  
    </main>
  );
}





