import React from 'react'
import SignupHero from '../components/SignupHero'
import SignupForm from '../components/SignupForm'
import LoginHero from '../components/LoginHero'
import LoginForm from '../components/LoginForm'

export default function LogInScreen() {
  return (
    <>
   <div className='grid  grid-cols-1 items-start gap-18  lg:grid-cols-2 xl:w-2/3 w-[90%]  m-auto  py-18'>
       <LoginHero/>
      <LoginForm/>
   </div>
    </>
  )
}
