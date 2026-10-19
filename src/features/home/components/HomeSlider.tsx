
"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation,Pagination } from 'swiper/modules'

import 'swiper/css'

import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react'
import HomeSliderPhoto from "../../../assets/images/HomeSliderCartBallon.png"
import HomeSliderPhoto2 from "../../../assets/images/MainHomeSlider.png"
import HomeSliderPhoto3 from "../../../assets/images/HomeSlider.png"
import HomeSliderPhoto4 from "../../../assets/images/HomeSliderCart.png"
import Link from 'next/link';

export default function HomeSlider() {

  return (
    <>
   <section className='relative'>
      <Swiper
        loop={true}
        modules={[Navigation,Pagination]}
        navigation={{
          prevEl: '.left-btn',
          nextEl: '.right-btn',
        }}
        pagination={
          {
            clickable:true
          }
        }
      >
      <SwiperSlide>
      <div  style={{backgroundImage:`linear-gradient(
  to right bottom,
  rgb(61 6 15 / 0.60) 0%,     /* --color-primary-950: #3d060f */
  rgb(138 15 36 / 0.60) 100%   /* --color-primary-800: #8a0f24 */
),url("${HomeSliderPhoto2.src}")`
        ,height:"40vh",
        backgroundSize:"cover",
        backgroundPosition:"center"
        }}>
          <div className="container flex h-full items-center pt-6 pl-9 ">
           <div className='xl:w-1/2 w-full lg:p-6 lg:pl-12 pl-5  '>
             <h1  className='lg:text-3xl text-2xl font-bold text-white lg:w-80 w-64 '>
              Fresh Products Deliverd to your Door
            </h1>
            <p className='text-sm font-light text-white py-3'>Get 20% Off on your frist order </p>
            <div className="buttons flex gap-4 text-sm p-2 *:hover:scale-110 *:transition-transform *:duration-300">
              <Link href="/shop" className='btn btn-white  hover:bg-white shadow-amber-50 text-primary-500'>Shop Now</Link>
              <button className='btn bg-transparent border text-white border-white '>view Details</button>
            </div>
           </div>
          </div>
        </div>
       
          </SwiperSlide>

          <SwiperSlide>
        <div  style={{backgroundImage:`linear-gradient(
  to right bottom,
  rgb(61 6 15 / 0.60) 0%,     /* --color-primary-950: #3d060f */
  rgb(138 15 36 / 0.60) 100%   /* --color-primary-800: #8a0f24 */
),url("${HomeSliderPhoto3.src}")`
        ,height:"40vh",
        backgroundSize:"cover",
        backgroundPosition:"center"
        }}>
          <div className="container flex h-full items-center pt-6 pl-9 ">
           <div className='xl:w-1/2 w-full lg:p-6 lg:pl-12 pl-5  '>
             <h1  className='lg:text-3xl text-2xl font-bold text-white lg:w-80 w-64 '>
              Fresh Products Deliverd to your Door
            </h1>
            <p className='text-sm font-light text-white py-3'>Get 20% Off on your frist order </p>
            <div className="buttons flex gap-4 text-sm p-2  *:hover:scale-110 *:transition-transform *:duration-300">
              <Link href="/shop" className='btn btn-white  hover:bg-white shadow-amber-50 text-primary-500'>Shop Now</Link>
              <button className='btn bg-transparent border text-white border-white '>view Details</button>
            </div>
           </div>
          </div>
        </div>
       
          </SwiperSlide>
          <SwiperSlide>
       <div  style={{backgroundImage:`linear-gradient(
  to right bottom,
  rgb(61 6 15 / 0.60) 0%,     /* --color-primary-950: #3d060f */
  rgb(138 15 36 / 0.60) 100%   /* --color-primary-800: #8a0f24 */
),url("${HomeSliderPhoto.src}")`
        ,height:"40vh",
        backgroundSize:"cover",
        backgroundPosition:"center"
        }}>
          <div className="container flex h-full items-center pt-6 pl-9 ">
           <div className='xl:w-1/2 w-full lg:p-6 lg:pl-12 pl-5  '>
             <h1  className='lg:text-3xl text-2xl font-bold text-white lg:w-80 w-64 '>
              Fresh Products Deliverd to your Door
            </h1>
            <p className='text-sm font-light text-white py-3'>Get 20% Off on your frist order </p>
            <div className="buttons flex gap-4 text-sm p-2 *:hover:scale-110 *:transition-transform *:duration-300">
              <Link href="/shop" className='btn btn-white  hover:bg-white shadow-amber-50 text-primary-500'>Shop Now</Link>
              <button className='btn bg-transparent border text-white border-white '>view Details</button>
            </div>
           </div>
          </div>
        </div>
       
          </SwiperSlide>
          

     </Swiper>

     <button className='bg-white left-btn  shadow-md absolute lg:left-5 left-2 hover:scale-110 transition-transform duration-300 top-1/2 z-20 lg:p-2 p-1 rounded-full btn' ><IconChevronLeft stroke={2} color="#a80d26" /></button>
     <button className='bg-white right-btn shadow-md absolute lg:right-5 right-2  hover:scale-110 transition-transform duration-300 top-1/2 lg:p-2 p-1 z-20 rounded-full btn' > <IconChevronRight stroke={2} color="#a80d26" /> </button>
   
   </section>
    </>
  )
}
