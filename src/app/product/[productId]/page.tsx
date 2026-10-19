import ProductDetilsScreen from '@/features/product/Screens/ProductDetilsScreen'
import React from 'react'

type props ={
params:Promise<{productId:string}>
}

export default async function ProductDetailsPage({params}: props) {

  const {productId}=await params
    console.log(productId)
  return (
    <div>
    <ProductDetilsScreen id={productId}/>
    </div>
  )
}
