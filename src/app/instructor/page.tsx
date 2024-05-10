import Stats from "../components/instructor/Stats";

export default function Page() {
  return (
    <div className="p-5 flex flex-col items-center">
      <h1 className="justify-center text-center">instructor dashboard</h1>

      {/* stats */}
      <Stats />

      <button className="btn btn-info w-max my-8">+ New Course</button>

      {/* approved courses */}
    </div>
  )
}