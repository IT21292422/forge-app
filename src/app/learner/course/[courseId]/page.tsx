"use client"
import axios from 'axios';
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { useEffect, useState } from "react";

const instructor = {
    firstName: "John",
    lastName: "Doyly",
    email: "johndoyly@gmail.com"
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

export default function page({ params }: any) {
    const { courseId } = params
    const [course, setCourse] = useState<Course>()

    const [isLoading, setIsLoading] = useState(true);

    const retrieveData = () => {
        axios.get(`http://localhost:3005/learner/${courseId}`).then((res) => {
            setCourse(res.data);
            setIsLoading(false);
        })
            .catch((error) => {
                console.log(error.response.data);
            })
    }

    useEffect(() => {
        retrieveData()
    }, [])

    const renderTags = course?.tags.map((tags: any) => {
        return (
            <p className="badge badge-error text-white badge-lg p-4">{tags}</p>
        )
    })

    const renderWhatLearn = course?.WhatWillLearn.map((learn: any) => {
        return (
            <li className="text-xl lg:text-2xl">{learn}</li>
        )
    })

    const renderChapters = course?.chapters.map((chapter) => {
        return (
            <>
                <div className="flex m-10 justify-center">
                    <div className="collapse collapse-plus bg-base-200 lg:w-[80%]">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title flex justify-between text-sm md:text-xl font-medium">
                            <h1>{chapter.chapterTitle}</h1>
                            <h1>{chapter.videoLength}</h1>
                        </div>
                        <div className="collapse-content">
                            <div className="flex flex-col gap-5 mb-10">
                                <div className="flex gap-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                                        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                                    </svg>
                                    <h1>Documents</h1>
                                </div>
                                <a href={chapter.pdfUrl} className="btn-link text-center lg:text-left lg:ml-10">Open Document</a>
                            </div>
                            <div className="flex flex-col gap-5 mb-10">
                                <div className="flex gap-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                                    </svg>
                                    <h1>Video</h1>
                                </div>
                                <CldVideoPlayer
                                    id={chapter.chapterId}
                                    width="1920"
                                    height="1080"
                                    src={chapter.videoUrl}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    })

    return (
        <>
            <div className="bg-[#A2D4F1] text-black -mt-6 -mb-6 lg:h-screen">
                <div className="flex justify-evenly pt-10 gap-5 flex-wrap">
                    <img src={course?.imgUrl} className="rounded-xl" />
                    <div className="flex flex-col gap-5 flex-wrap">
                        <div className="flex justify-between items-center ml-5 mr-5">
                            <p className="text-black">Published On {new Date(course?.publishedDate).toLocaleDateString()}</p>
                            <p className="badge badge-warning badge-lg text-black p-4">{course?.categories}</p>
                        </div>
                        <h1 className="text-5xl text-black font-serif text-center">{course?.courseTitle}</h1>
                        <p className="text-xl text-black text-center">{course?.description}</p>
                        <p className="text-xl text-black text-center">This course consists of {course?.chapters.length} Chapters</p>
                        <div className="flex gap-2 justify-center items-center flex-wrap">
                            {renderTags}
                        </div>
                    </div>
                </div>
                <div className="flex justify-evenly items-center pt-10 gap-5 flex-wrap">
                    <div className="flex flex-col gap-5 items-center flex-wrap">
                        <h1 className="text-5xl text-black text-center font-serif">What You Will Learn?</h1>
                        <ul className="list-disc">
                            {renderWhatLearn}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5 flex-wrap card w-72 bg-base-100 shadow-xl items-center p-5 m-5">
                        <h1 className="text-main font-bold text-xl">Meet Your Instructor</h1>
                        <div className="flex items-center gap-10">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-16">
                                    <span className="text-3xl">{instructor.firstName.slice(0, 1)}</span>
                                </div>
                            </div>
                            <div className="flex-col -ml-4">
                                <p className="text-sm font-bold text-main">{instructor.firstName} {instructor.lastName}</p>
                                <p className="text-sm font-bold text-gray-500"><a href={`mailto:${instructor.email}`} className="hover:btn-link">{instructor.email}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {renderChapters}
        </>
    )
}

