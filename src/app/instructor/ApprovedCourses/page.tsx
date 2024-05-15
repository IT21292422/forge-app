'use client'

import { useRouter } from 'next/navigation';
import ApprovedCourses from "../../components/instructor/ApprovedCourses";

export default function Page() {
  const router = useRouter();

  return (
    <div className=" max-w-[100vw] py-5 px-16 flex flex-col items-center">

      <button className="btn btn-outline w-max my-8 text-xl"
        onClick={() => router.back()}
      >
        🔙
      </button>

      {/* approved courses */}
      <div className="min-w-full mt-10">
        <ApprovedCourses />
      </div>

    </div>
  )
}