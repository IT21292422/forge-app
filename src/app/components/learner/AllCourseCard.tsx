
export default function AllCourseCard({ course }: any) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={course.imgUrl} alt="Course" /></figure>
            <div className="card-body">
                <h2 className="text-gray-500">{course.publishedDate}</h2>
                <h2 className="card-title">{course.courseTitle}</h2>
                <div className="flex justify-between items-baseline mt-5 mb-2">
                    <div>
                        <p className="text-xl font-bold text-red-500">$<span>{course.price}</span></p>
                    </div>
                    <button className="btn btn-primary">Enroll Now</button>
                </div>
            </div>
        </div>
    )
}
