"use client";
import { useAdminCourses, useApproveCurse } from "../hooks/admin/use-admin";
import { SIngleCourseResponseDTO } from "../interfaces/course/course.dto";

type Props = {}

const AdminConsole = (props: Props) => {

    const { data, isPending, isError, refetch } = useAdminCourses()

    const { data: approvalResult, mutateAsync, isPending: isApproving, } = useApproveCurse()

    if (isPending) {
        return <div className="flex justify-center "><div className="loading loading-spinner bg-main" /></div>
    }

    if (isError) {
        return <div className="flex justify-center "><div className="loading loading-spinner bg-main" /></div>
    }

    if (!data) {
        return <div className="flex justify-center "><p>No unapproved courses!</p></div>
    }

    const approveCourse = async (course: SIngleCourseResponseDTO) => {
        await mutateAsync(course)
        refetch()
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Course Name</th>
                            <th>Course ID</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((course) => (
                            <tr key={course.courseId} className="hover">
                                <th></th>
                                <th>{course.courseTitle}</th>
                                <td>{course.courseId}</td>
                                <td>{course.description}</td>
                                <td>{course.categories}</td>
                                <td>{course.isApproved === true ? <p className="text-center py-3 rounded-md bg-green-600 text-white">Approved</p> : <p className="text-center text-white py-3 rounded-md bg-error-content">Rejected</p>}</td>
                                <th>

                                    {course.isApproved ?
                                        <button className="btn btn-outline lg:w-[6vw]  hover:bg-red-500" onClick={() => approveCourse(course)}>Reject</button> :
                                        <button className="btn btn-outline lg:w-[6vw] hover:bg-green-500" onClick={() => approveCourse(course)}>Approve</button>
                                    }
                                </th>
                                <th></th>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminConsole