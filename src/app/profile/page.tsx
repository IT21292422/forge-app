"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginInstructorResponseDTO, LoginStudentResponseDTO } from "../interfaces/auth/auth.interface";
import { useUserStore } from "../stores/user.store";

type Props = {}

const UserProfile = (props: Props) => {

    const router = useRouter()
    const [userData, setUserData] = useState<LoginInstructorResponseDTO | LoginStudentResponseDTO | null>();

    const data = useUserStore(state => state.user)
    const logout = useUserStore(state => state.logout)


    const handleLogout = async () => {
        localStorage.removeItem('token');
        logout()
        router.push('/learner')
    }

    if (!data) {
        return <div className="flex justify-center "><div className="loading loading-spinner bg-main" /></div>
    }


    return (
        <div className="flex flex-col justify-center items-center lg:p-10 bg-blue-600 ">
            <div className="flex items-center my-4 ">
                <div className="flex">
                    <h2 className="text-xl font-bold self-center text-white">My Profile</h2>
                </div>
            </div>
            <div className="flex flex-col my-10 flex-wrap gap-4 lg:w-2/5 border lg:border-8 gap-y-5 p-10  rounded-3xl">
                <div className="overflow-auto bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-2">Firstname</h3>
                    <p>{data?.firstName}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-2">Lastname</h3>
                    <p>{data?.lastName}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-2">Email</h3>
                    <p>{data?.email}</p>
                </div>
                {data?.role === 'student' ? (
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-bold mb-2">My Courses</h3>
                        <p>{(data as LoginStudentResponseDTO).enrolledCourses}</p>
                    </div>) : (
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-bold mb-2">Published Courses</h3>
                        <p>{(data as LoginInstructorResponseDTO).publishedCourses}</p>
                    </div>
                )
                }
                <button className="flex btn w-1/3 self-center" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default UserProfile