'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CourseList from "../components/instructor/CourseList";
import Stats from "../components/instructor/Stats";
import { useUserStore } from '../stores/user.store';
import { Course, getAllCourses } from './apiFunctions';

export default function Page() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [count, setCount] = useState<number>(0);

  const instructor = useUserStore(state => state.user?._id)
  console.log('instructor: ', instructor);


  useEffect(() => {
    async function fetchData() {
      const res = await getAllCourses();

      // Filter courses based on instructor
      let data = res.data.filter((c) => { return c.instructorId === instructor });

      setCount(data.filter((c) => c.isApproved === true).length);
      setCourses(data);
      console.log('data:', data);
    }
    fetchData()
  }, [instructor]);

  return (
    <div className=" max-w-[100vw] py-5 px-16 flex flex-col items-center">
      <h1 className="justify-center text-center">instructor dashboard</h1>

      {/* stats */}
      <Stats count={count} />

      <button className="btn btn-info w-max my-8"
        onClick={() => router.push('instructor/NewCourse')}
      >
        + New Course
      </button>

      {/* approved courses */}
      <div className="min-w-full mt-32">
        <CourseList title={'Approved courses'} isApproved={true} courses={courses} />
      </div>

      {/* pending courses */}
      <div className="min-w-full mt-40">
        <CourseList title={'Pending courses'} isApproved={false} courses={courses} />
      </div>
    </div>
  )
}