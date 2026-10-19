import Link from 'next/link'
import React from 'react'

export default function CategoryCart({name,slug,image}:{name:string,slug:string,image:string}) {
  return (
    
    <Link href={"/shop"} className='py-8 px-2 gap-2  shadow-md hover:scale-105 hover:shadow-2xl  transition duration-300 rounded-3xl bg-white flex-col flex justify-center items-center ' >
      <img src={image} className='rounded-full size-24 ' alt="" />
      <p className='text-sm font-sans font-normal '>{name}</p>
     
    </Link>
  )
}
