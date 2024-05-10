import CourseList from "../components/instructor/CourseList";
import Stats from "../components/instructor/Stats";

export default function Page() {
  return (
    <div className=" max-w-[100vw] py-5 px-16 flex flex-col items-center">
      <h1 className="justify-center text-center">instructor dashboard</h1>

      {/* stats */}
      <Stats />

      <button className="btn btn-info w-max my-8">+ New Course</button>

      {/* approved courses */}
      <div className="min-w-full mt-40">
        <CourseList title={'Approved courses'} isApproved={true} />
      </div>

      {/* pending courses */}
      <div className="min-w-full mt-40">
        <CourseList title={'Pending courses'} isApproved={false} />
      </div>
    </div>
  )
}