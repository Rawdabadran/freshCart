
import CategoryProducts from '@/features/categores/components/CategoryProducts/CategoryProduct'
type props ={
params:Promise<{categoryId:string}>
}

export default async function page({params}: props) {

     const {categoryId}=await params
  
  return (
    <div>
      <CategoryProducts id={categoryId}/>
    </div>
  )
}
