import Link from "next/link"

export default function MyCourseCard({ course, courseProgress }: any) {

    var newProgress = 0
    console.log(courseProgress)
    if (courseProgress) {
        newProgress = courseProgress.students[0].progress
    }

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
                    <h2 className="text-gray-500">{new Date(course?.publishedDate).toLocaleDateString()}</h2>
                    <p className="text-right badge badge-warning badge-lg text-white p-4">{course.categories}</p>
                </div>
                <h2 className="card-title py-2">{course.courseTitle}</h2>
                <div className="flex gap-2 items-center text-gray-500 flex-wrap mb-5 p-2">
                    {renderTags}
                </div>
                <div className="flex justify-between items-center mt-auto mb-2">
                    <div>
                        <div
                            className="radial-progress text-primary"
                            style={{ '--value': `${newProgress}`, "--size": "4rem" } as any}
                            role="progressbar"
                        >
                            {newProgress}%
                        </div>
                    </div>
                    <button className="btn btn-primary"><Link href="../learner/course/[courseId]" as={`../learner/course/${course.courseId}`}>View</Link></button>
                </div>
            </div>
        </div>
    )
}
