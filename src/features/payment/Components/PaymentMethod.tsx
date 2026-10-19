import {
  IconCash,
  IconCheck,
  IconCreditCard,
  IconLock,
  IconWallet,
} from "@tabler/icons-react";

type PaymentMethod = {
  Selected:"cash"|"online",
  setPaymentWay: (method:"cash"|"online") => void

}

export default function PaymentMethod({Selected, setPaymentWay}:PaymentMethod) {
 

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Section header */}
      <div className="flex items-center gap-3 bg-primary-700 px-5 py-4 text-white">
        <IconWallet className="size-6" />
        <div>
          <h2 className="font-bold">Payment Method</h2>
          <p className="text-xs text-white">Choose how you&apos;d like to pay</p>
        </div>
      </div>

      <div  className="flex flex-col gap-4 p-5">
        {/* Cash on delivery */}
        <label className="cursor-pointer">
          <button onClick={()=>setPaymentWay("cash")} className={`flex  w-full  text-start items-center gap-4 rounded-xl border border-gray-200 p-4 transition-colors ${Selected=="cash"?"  bg-primary-50  border-primary-500 opacity-100":" "}`}>
            <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 ${Selected=="cash"?"bg-primary-500 text-white":""}`}>
           
              <IconCash className="size-6" />
            </span>
            <div className="flex-1 text-sm">
              <p className="font-semibold text-gray-900">Cash on Delivery</p>
              <p className="text-xs text-gray-500">Pay when your order arrives at your doorstep</p>
            </div>
            <span className={`check flex size-6 items-center justify-center ${Selected=="cash"?"bg-green-600 border-none":""} rounded-full border-2 border-gray-300`}>
           
              <IconCheck className={`tick size-6 text-gray-900 opacity-0 ${Selected=="cash"?"text-white  opacity-100":""} `} />
            </span>
          </button>
        </label>

        {/* Pay online */}
        <label className="cursor-pointer">
         
          <button onClick={()=>setPaymentWay("online")} className={`flex  w-full  text-start items-center gap-4 rounded-xl border border-gray-200 p-4 transition-colors ${Selected=="online"?"bg-primary-50  border-primary-500 opacity-100":" "}`}>
         
            <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 ${Selected=="online"?"bg-primary-500 text-white":""}`}>
              <IconCreditCard className="size-6" />
            </span>
            <div className="flex-1 text-sm">
              <p className="font-semibold text-gray-900">Pay Online</p>
              <p className="text-xs text-gray-500">
                Secure payment with Credit/Debit Card via Stripe
              </p>
              <div className="mt-2 flex gap-1.5">
                <span className="h-4 w-6 rounded-sm bg-blue-600" />
                <span className="h-4 w-6 rounded-sm bg-orange-500" />
                <span className="h-4 w-6 rounded-sm bg-sky-500" />
              </div>
            </div>
            <span className={`check flex size-6 items-center justify-center ${Selected=="online"?"bg-green-600 border-none":""} rounded-full border-2 border-gray-300`}>
              <IconCheck className={`tick size-6 text-gray-900 opacity-0 ${Selected=="online"?"text-white  opacity-100":""} `} />
           
            </span>
          </button>
        </label>

        {/* Secure box */}
        <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
          <IconLock className="mt-0.5 size-5 shrink-0 text-primary-800" />
          <div className="text-sm">
            <p className="font-semibold text-gray-800">Secure &amp; Encrypted</p>
            <p className="text-xs text-gray-500">
              Your payment info is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}