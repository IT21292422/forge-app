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

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Checkout() {
  const [paymentWindow, setPaymentWindow] = useState<Window | null>(null);
  const [courseId, setCourseId] = useState('oc759a67c');
  const searchParams = useSearchParams();
  const cId = searchParams.get('cId');
  const userId = searchParams.get('userId');

  const payment = {
    learnerId: "user123",
    courseId: "course456",
    orderId: "order789",
    amount: 200.00,
    dateTime: Date.now()
  };

  useEffect(() => {
  }, [paymentWindow]);

  const proceedPayment = () => {
    axios.post('http://localhost:3005/payment/add', payment).then((result) => {
      alert('added')
    })
    window.open(`https://sandbox.payhere.lk/pay/${courseId}`, '_blank');
    window.location.href = 'http://localhost:3000/learner';
  };

  const cancelePayment = () => {
    window.history.go(-1)
  }

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
        <figure><img src="https://res.cloudinary.com/dhzgmok7k/image/upload/v1714995565/1695299108743_iyb1h1.png" alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">C For beginners</h2>
          <p>From fundamental to expert level , all aspects of programming styles are covered in single course</p>
          <div className="card-actions justify-end">
            <button onClick={cancelePayment} className='btn btn-error'>Cancel</button>
            <button onClick={proceedPayment} className='btn btn-primary'>Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
}