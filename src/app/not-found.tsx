import React from 'react'
import NotFoundImage from "../assets/images/error.png";

export default function not_found() {
  return (
    <div className='flex justify-center items-center flex-col gap-3 '>
      <h1 className='text-2xl text-gray-500 font-medium'>This Page Not Found</h1>
      <img src={NotFoundImage.src} alt="Page not found" style={{ width: "" ,height:"50vh" }} />
    </div>
  );
}
