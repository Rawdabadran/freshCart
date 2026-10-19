import React from 'react'
import NotFoundImage from "../assets/images/404 DinoStyle.gif";

export default function not_found() {
  return (
    <div className='flex justify-center items-center flex-col gap-3 '>
      <img src={NotFoundImage.src} alt="Page not found" style={{ width: "" ,height:"50vh" }} />
    </div>
  );
}
