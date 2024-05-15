"use client"

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Course } from '../interfaces/course/course.dto';

export default function Checkout() {
  const [paymentWindow, setPaymentWindow] = useState<Window | null>(null);
  const [courseId, setCourseId] = useState<String | null>('oc759a67c');
  const [course, setCourse] = useState<Course>()
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const cId = searchParams.get('cId');
  const userId = searchParams.get('userId');

  const payment = {
    learnerId: userId,
    courseId: cId,
    orderId: `${cId}_${new Date().getTime()}`,
    amount: course?.price,
    dateTime: Date.now()
  };

  useEffect(() => {
    setCourseId(cId)
    const fetchCourse = async () => {
      axios.get(`http://localhost:3005/learner/${cId}`).then((res) => {
        setCourse(res.data);
        setIsLoading(false);
      })
        .catch((error) => {
          console.log(error.response.data);
        })
    }
    fetchCourse()
  }, [paymentWindow]);

  const proceedPayment = async () => {
    await axios.post('http://localhost:3005/payment/add', payment).then((result) => {
      //alert('added')
    })
    await axios.put(`http://localhost:3005/learner/${userId}/enrollcourse/${cId}`).then((result) => {
    })
    window.open(`https://sandbox.payhere.lk/pay/${cId}`, '_blank');
    window.location.href = `learner/course/${cId}`;
  };

  const cancelePayment = () => {
    window.history.go(-1)
  }

  if (isLoading) return (
    <>
      <div className='flex justify-center items-center'>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </>
  )
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
        <figure><img src={course?.imgUrl} alt="CourseImg" /></figure>
        <div className="card-body">
          <h2 className="card-title">{course?.courseTitle}</h2>
          <p>{course?.description}</p>
          <h2 className="card-title text-blue-600">${course?.price}</h2>
          <div className="card-actions justify-end">
            <button onClick={cancelePayment} className='btn btn-error'>Cancel</button>
            <button onClick={proceedPayment} className='btn btn-primary'>Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
}