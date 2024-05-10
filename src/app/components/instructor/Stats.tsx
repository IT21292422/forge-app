'use client'

import { useRouter } from 'next/navigation';

export default function Stats() {
  const router = useRouter();

  return (
    <div className="stats shadow">

      <div className="stat place-items-center hover:cursor-pointer"
        onClick={() => router.push('instructor/ApprovedCourses')}
      >
        <div className="stat-title">Courses</div>
        <div className="stat-value text-main2">8</div>
        <div className="stat-desc text-main2">click to see all courses</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Students</div>
        <div className="stat-value text-main3">4,200</div>
        <div className="stat-desc text-main3">total students in you courses</div>
      </div>

    </div>
  )
}