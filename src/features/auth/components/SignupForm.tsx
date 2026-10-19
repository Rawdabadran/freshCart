"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import registerSchema from "../escames/signup";
import type { SignUpType } from "../escames/signup";
import { SignUpaction } from "@/features/server/signUP.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function SignupForm() {

 const router= useRouter();


const { register, handleSubmit, formState:{errors},setError}  = useForm({
  defaultValues:
  
{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
},
  
resolver:zodResolver( registerSchema)
})

const  SubmitForm:SubmitHandler<SignUpType> =  async function(data){

 const response = await SignUpaction(data)
 if(response.success===true)
 {
  toast.success(response.message);
  router.push("/login")
   
 }
 if(response.success===false)
 {
  if(response.fieldErrors)
  {
    for(const [key,messages] of Object.entries(response.fieldErrors))
    {
      setError(key as keyof SignUpType,{message:messages[0]})
    }

  }

  setError("root",{message:response.message})
 }
}

const  handelerrors:SubmitErrorHandler<SignUpType> = function(errors){
console.log(errors)

}


  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
        <div className="mb-10">
          <h2 className="text-center text-3xl font-semibold mb-2">
            Create Your Account
          </h2>
          <p className="text-center">Start your fresh journey with us today</p>
        </div>

        <form
          className="space-y-7"
          onSubmit={handleSubmit(SubmitForm, handelerrors)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ali"
              id="name"
  {...register("name")}

            />
        {errors.name&&(<p className="text-red-600 bg-red-100 text-sm border-red-200 border p-2 rounded-md">{errors.name?.message}</p>)}  
           
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              className="form-control"
              placeholder="ali@example.com"
              id="email"
  {...register("email")}

            />
        {errors.email&&(<p className="text-red-600 bg-red-100 text-sm border-red-200 border p-2 rounded-md">{errors.email?.message}</p>)}  

           
          </div>

          <div className="flex bg-light flex-col gap-2">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="create a strong password"
              autoComplete="off"
              id="password"
  {...register("password")}

            />
        {errors.password&&(<p className="text-red-600 bg-red-100 text-sm border-red-200 border p-2 rounded-md">{errors.password?.message}</p>)}  


            <div className="password-requirements">
              <div className="flex items-center gap-2">
                <div className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden">
                  <div className={`progress bg-orange-500 w-50 h-full`}></div>
                </div>
                <span>Fair</span>
              </div>
            </div>

           
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rePassword">Confirm Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="confirm your password"
              autoComplete="off"
              id="rePassword"
  {...register("rePassword")}

            />
        {errors.rePassword&&(<p className="text-red-600 bg-red-100 text-sm border-red-200 border p-2 rounded-md">{errors.rePassword?.message}</p>)}  

          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+1 234 567 8900"
              id="phone"
  {...register("phone")}

            />

        {errors.phone&&(<p className="text-red-600 bg-red-100 text-sm border-red-200 border p-2 rounded-md">{errors.phone?.message}</p>)}  

         
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="terms"
                className="size-4 accent-primary-600"
              />
              <label htmlFor="terms" className="ms-2">
                I agree to the{" "}
                <Link href={`/terms`} className="text-primary-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={`/privacy-policy`} className="text-primary-600">
                  Privacy Policy
                </Link>{" "}
                *
              </label>

             
            </div>
          </div>
        {errors.root&&(<p className="text-red-600 bg-red-100 text-sm  border-red-200 border p-5 rounded-md">{errors.root?.message}</p>)}  



          <button
            type="submit"
            className="btn flex gap-2 justify-center bg-primary-600 text-white hover:bg-primary-700 cursor-pointer disabled:cursor-not-allowed w-full"
          >


            <IconUserPlus stroke={2} />

            <span>Create My Account</span>
          </button>
        </form>

        <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
          Already have an account?{" "}
          <Link href={`/login`} className="text-primary-600">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
