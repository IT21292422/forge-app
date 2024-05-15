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