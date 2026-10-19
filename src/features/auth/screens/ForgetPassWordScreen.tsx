
import ForgetHero from '../components/ForgetPasswordHero copy'

import ForgotPasswordForm from '../components/ForgetPassForm'

export default function ForgotPasswordScreen() {
  return (
    <>
   <div className='grid  grid-cols-1 items-start gap-18  lg:grid-cols-2 xl:w-2/3 w-[90%]  m-auto  py-18'>
       <ForgetHero/>
      <ForgotPasswordForm/>
   </div>
    </>
  )
}
