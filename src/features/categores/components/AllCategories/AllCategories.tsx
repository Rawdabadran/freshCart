import { getCategories } from "../../api/getCategoris";
import CategoryCart from "../CategoryCart/CategoryCart";



export default async function AllCategories() {
  const categories = await getCategories();
  const allCategories = categories.data;

  return (
    <>
    <div className="container flex py-6  mt-5 justify-between flex-col  ">
        <h2 className="text-2xl font-semibold  px-3  border-l-4 border-l-primary-700 rounded-s-sm">
            Shop by <span className="text-primary-500 ">Category</span>
        </h2>
 <div className="grid lg:grid-cols-6  md:grid-cols-4 grid-cols-2 gap-4 my-10 ">
        
 {allCategories.map((category) => (
        <CategoryCart key={category._id} {...category} />
      ))}
    </div>
    </div>
   
     
    </>
  );
}