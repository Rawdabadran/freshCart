"use client"
import AccountHero from "@/features/account/Components/AccountHero";
import AccountSidebar from "@/features/account/Components/AccountSidebar";
import Link from "next/link";
import type { ReactNode } from "react";



export default function layout({ children }: { children: ReactNode }) {


  return (
    <div className=''>
       <AccountHero />
       <div className="container  m-auto mt-6 py-8 lg:flex-row flex-col gap-y-4 flex   justify-start">
      <AccountSidebar/>
          <section className="grow">
      {children}
        
      </section>
       </div>
     
        
    </div>
  )
}
