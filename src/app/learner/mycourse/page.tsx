"use client"
import MyCourseCard from '@/app/components/learner/MyCourseCard';
import { useUserStore } from '@/app/stores/user.store';
import axios from 'axios';
import { useEffect, useState } from 'react';

const user = {
    _id: "663f420981c794b74836631a",
    enrolledCourse: ["C201", "C103"]
}

interface Course {
    courseId: string;
    courseTitle: string;
    publishedDate: any;
    imgUrl: string;
    price: number;
    categories: string;
    tags: string[];
    description: string;
    WhatWillLearn: string[];
    isApproved: boolean;
    chapters: [
        {
            chapterId: string;
            chapterTitle: string;
            pdfUrl: string;
            videoUrl: string;
            videoLength: string;
        },
    ];
}

export default function MyCourse() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [progresses, setProgresses] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [Keyword, setKeyword] = useState('')

    const data = useUserStore(state => state.user)
    console.log(data);
    console.log(data?._id);

    const filteredCourses = courses.filter((course) => {
        const courseTitle = course.courseTitle.toLowerCase()
        const categories = course.categories.toLowerCase()
        const description = course.description.toLowerCase()
        const tags = course.tags.map((tag) => tag.toLowerCase());
        const whatwilllearn = course.WhatWillLearn.map((what) => what.toLowerCase());
        const keyword = Keyword.toLowerCase()

        return courseTitle.includes(keyword) || categories.includes(keyword) || description.includes(keyword) || tags.includes(keyword) || whatwilllearn.includes(keyword)
    })


    const retrieveData = () => {
        axios.get(`http://localhost:3005/learner`).then((res) => {
            setCourses(res.data);
            setIsLoading(false);
        })
            .catch((error) => {
                console.log(error.response.data);
            })
    }

    const retrieveProgress = () => {
        axios.get(`http://localhost:3005/learner/getprogress/${user._id}`).then((res) => {
            console.log("Data from API:", res.data);
            setProgresses(res.data);
        })
            .catch((error) => {
                console.log(error.response.data);
            })
    }


    useEffect(() => {
        retrieveData()
        retrieveProgress()
    }, [])

    const enrolledCourses = filteredCourses.filter(course => user.enrolledCourse.includes(course.courseId));

    const renderCourses = enrolledCourses.map((course, index) => {

        const courseProgress = progresses?.courses.find((data: any) => data.courseId === course.courseId)

        return (
            <MyCourseCard key={index} course={course} courseProgress={courseProgress} />
        )
    })
    return (
        <>
            <div className="bg-main flex flex-col">
                <h1 className="text-4xl text-center text-white pt-10 font-serif">Enrolled Courses</h1>
                <div className="flex w-screen justify-center px-16 pb-16 pt-10">
                    <label className="input input-bordered flex items-center gap-2 w-[300px] md:w-[80%]">
                        <input type="text" className="grow truncate" placeholder="What Do You Want To Learn?" value={Keyword} onChange={(e) => setKeyword(e.target.value)} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                </div>
            </div>
            <div className="flex justify-center mt-20 mb-20 gap-10 flex-wrap px-5">
                {
                    isLoading ? (
                        <div className="flex flex-col gap-4 w-52">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    ) : (
                        renderCourses
                    )
                }
            </div>
        </>
    )
}
