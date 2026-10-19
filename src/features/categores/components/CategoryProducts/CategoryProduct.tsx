import React from 'react'

import ProductCart from '../ProductCart/ProductCart'
import { console } from 'inspector'
import { getCategoryProducts } from '../../api/getCategoris'

export  default async function CategoryProducts({id}: { id: string }) {

const response =await getCategoryProducts(id)
console.log(id)
console.log(response.data)


  return (
    <div className=' container'>

        <h1 className='text-xl text-primary-700 py-4 font-bold'> Category Products </h1>
        {response.data.length==0?(<p className='h-[50vh] font-medium text-xl text-primary-700 flex justify-center items-center'>It will be available soon </p>):(<div className="grid grid-cols-1  gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:h-fit">
            {response.data.map((product)=>(<ProductCart key={product.id} {...product}/>))}
         </div>)}
         
     
    </div>
  )
}
