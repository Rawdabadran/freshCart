import React from 'react'

import BrandProducts from "../../../features/brands/brandProducts"
type props ={
params:Promise<{brandId:string}>
}

export default async function page({params}: props) {

     const {brandId}=await params
  
  return (
    <div>
      <BrandProducts id={brandId}/>
    </div>
  )
}
