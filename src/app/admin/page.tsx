"use client";
import { useEffect } from "react";
import AdminConsoleSkeleton from "../components/skeletons/AdminConsole";
import { useAdminCourses, useApproveCurse } from "../hooks/admin/use-admin";
import { SIngleCourseResponseDTO } from "../interfaces/course/course.dto";
import { useUserStore } from "../stores/user.store";

type Props = {}

const AdminConsole = (props: Props) => {

    const { data, isPending, isError, refetch, status } = useAdminCourses()

    const { data: approvalResult, mutateAsync, isPending: isApproving, } = useApproveCurse()

    const user = useUserStore(state => state.user)

    const approveCourse = async (course: SIngleCourseResponseDTO) => {
        await mutateAsync(course)
        refetch()
    }

    useEffect(() => {
        refetch()
    }, [user])

    if (!user) {
        return <div className="flex justify-center ">
            <div className="flex flex-col h-[50vh] justify-center items-center text-center">
                <p className="text-xl">You need to be logged in to view this content</p>
            </div>
        </div>
    }

    if (isPending) {
        return <div className="flex justify-center mx-10"><AdminConsoleSkeleton /></div>
    }

    if (isError) {
        return <div className="flex justify-center ">Error: Could not connect to server</div>
    }

    if (!data || data === undefined || data.length === 0) {
        return <div className="flex justify-center "><p>No unapproved courses!</p></div>
    }

    if (data.statusCode === 401) {
        return <div className="flex justify-center ">
            <div className="flex flex-col h-[50vh] justify-center items-center text-center">
                <p className="text-xl">You do not have permission to view this content.</p>
                <p>If you think this is an error, plese call our support page</p></div>
        </div>
    }

    if (!Array.isArray(data)) {
        return <div className="flex justify-center "><p>Error: Could not connect to server</p></div>;
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