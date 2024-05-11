import Link from 'next/link';
export default function AllCourseCard({ course }: any) {

    const renderTags = course.tags.slice(0, 5).map((tags: any) => {
        return (
            <p className="badge badge-primary badge-outline badge-lg">{tags}</p>
        )
    })

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={course.imgUrl} alt="Course" /></figure>
            <div className="card-body">
                <div className="flex gap-28">
                    <h2 className="text-gray-500">{course.publishedDate}</h2>
                    <p className="text-right badge badge-warning badge-lg text-white p-4">{course.categories}</p>
                </div>
                <h2 className="card-title py-2">{course.courseTitle}</h2>
                <div className="flex gap-2 items-center text-gray-500 flex-wrap mb-5 p-2">
                    {renderTags}
                </div>
                <div className="flex justify-between items-center mt-auto mb-2">
                    <div>
                        <p className="text-2xl font-bold text-red-500">$<span>{course.price}</span></p>
                    </div>
                    <button className="btn btn-primary"><Link href="/learner/enrollcourse/[courseId]" as={`/learner/enrollcourse/${course.courseId}`}>Enroll Now</Link></button>
                </div>
            </div>
        </div>
    )
}
