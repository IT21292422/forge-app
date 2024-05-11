// 'use client';
// import Script from 'next/script';
// import { useEffect } from 'react';

// export default function Payment() {
//     useEffect(() => {
//         const paymentScript = document.createElement('script');

//         function initPaymentScript() {
//             window.payhere.onCompleted = function onCompleted(orderId: string) {
//                 console.log("Payment completed. OrderID:" + orderId);
//             };

//             window.payhere.onDismissed = function onDismissed() {
//                 console.log("Payment dismissed");
//             };

//             window.payhere.onError = function onError(error: string) {
//                 console.log("Error:" + error);
//             };

//             const payment: PaymentObject = {
//                 "sandbox": true,
//                 "merchant_id": process.env.NEXT_PUBLIC_MERCHANT_ID,
//                 "return_url": undefined,
//                 "cancel_url": undefined,
//                 "notify_url": "http://sample.com/notify",
//                 "order_id": "o593d33df",
//                 "items": "python",
//                 "amount": "1000.00",
//                 "currency": "LKR",
//                 "hash": "45D3CBA93E9F2189BD630ADFE19AA6DC",
//                 "first_name": "Saman",
//                 "last_name": "Perera",
//                 "email": "samanp@gmail.com",
//                 "phone": "0771234567",
//                 "address": "No.1, Galle Road",
//                 "city": "Colombo",
//                 "country": "Sri Lanka",
//                 "delivery_address": "No. 46, Galle road, Kalutara South",
//                 "delivery_city": "Kalutara",
//                 "delivery_country": "Sri Lanka",
//                 "custom_1": "",
//                 "custom_2": ""
//             };

//             const paymentButton = document.getElementById('payhere-payment');
//             paymentButton!.onclick = function (e) {
//                 window.payhere.startPayment(payment);
//             };

//             const scriptCode = `
//                 payhere.onCompleted = ${window.payhere.onCompleted.toString()};
//                 payhere.onDismissed = ${window.payhere.onDismissed.toString()};
//                 payhere.onError = ${window.payhere.onError.toString()};
//                 const payment = ${JSON.stringify(payment)};
//                 const paymentButton = document.getElementById('payhere-payment');
//                 paymentButton.onclick = function (e) {
//                 payhere.startPayment(payment);
//                 };`;

//             paymentScript.innerHTML = scriptCode;
//         }

//         initPaymentScript();
//         document.body.appendChild(paymentScript);

//         return () => {
//             document.body.removeChild(paymentScript);
//         };
//     }, []);

//     return (
//         <>
//             <Script src="https://www.payhere.lk/lib/payhere.js" strategy="beforeInteractive" />
//             <button type="submit" id="payhere-payment">PayHere Pay</button>
//         </>
//     );
// }
"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Checkout() {
  const router = useRouter()

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const proceedPayment = () => {
    document.getElementById('my_modal_1').showModal()
    router.push('https://sandbox.payhere.lk/pay/o593d33df')
  }

  const cancelePayment = () => {
    router.back()
  }

  const handleMessage = (event) => {
    // Check if the message is from the payment gateway's window
    if (event.origin === 'https://sandbox.payhere.lk') {
      // Check if the transaction was successful
      if (event.data === 'success') {
        // Optionally, you can perform any additional actions here
        // For example, update the user's order status in your database

        // Close the payment gateway's window
        event.source.close();
      }
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button onClick={cancelePayment} className='btn btn-error'>Cancel</button>
            <button onClick={proceedPayment} className='btn btn-primary'>Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
}