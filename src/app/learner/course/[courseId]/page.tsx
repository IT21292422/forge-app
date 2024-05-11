"use client"
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { useState } from "react";
import image from "../../../../../public/enroll-hero.jpeg";

const courses = [
    {
        courseId: "1",
        courseTitle: "C Programming For beginners",
        publishedDate: "12/2/2024",
        price: 100,
        imgUrl: "https://res.cloudinary.com/dhzgmok7k/image/upload/v1714995565/1695299108743_iyb1h1.png",
        description: "This will give an overview of C programming",
        categories: "Programming",
        tags: ["C", "programming", "introduction", "IOT", "Networking"],
        WhatWillLearn: ["How to Program In C", "OOP concepts", "Threads", "Deploy to AWS"],
        chapters: [
            {
                chapterId: "1",
                chapterTitle: "Introduction",
                pdfUrl: "",
                videoUrl: "https://res.cloudinary.com/dhzgmok7k/video/upload/v1715341625/10_CSS_Pro_Tips_-_Code_this_NOT_that_a6rpql.mp4",
                videoLength: "1 hour 30 minutes"
            },
            {
                chapterId: "",
                chapterTitle: "Practical",
                pdfUrl: "",
                videoUrl: "",
                videoLength: "1 hour 30 minutes"
            }
        ]
    },
    {
        courseId: "2",
        courseTitle: "C Programming For Advanced",
        publishedDate: "12/2/2024",
        price: 200,
        imgUrl: "https://res.cloudinary.com/dhzgmok7k/image/upload/v1714995565/1695299108743_iyb1h1.png",
        description: "This will give an overview of C programming",
        categories: "Programming",
        tags: ["C", "programming", "introduction"],
        WhatWillLearn: ["How to Program In C", "OOP concepts", "Threads", "Deploy to AWS"],
        chapters: [
            {
                chapterId: "1",
                chapterTitle: "Introduction",
                pdfUrl: "",
                videoUrl: "https://res.cloudinary.com/dhzgmok7k/video/upload/v1715341625/10_CSS_Pro_Tips_-_Code_this_NOT_that_a6rpql.mp4",
                videoLength: "1 hour 30 minutes"
            }
        ]

    },
    {
        courseId: "3",
        courseTitle: "C Programming For beginners",
        publishedDate: "12/2/2024",
        price: 300,
        imgUrl: "https://res.cloudinary.com/dhzgmok7k/image/upload/v1714995565/1695299108743_iyb1h1.png",
        description: "This will give an overview of C programming",
        categories: "Programming",
        tags: ["C", "programming", "introduction"],
        WhatWillLearn: ["How to Program In C", "OOP concepts", "Threads", "Deploy to AWS"],
        chapters: [
            {
                chapterId: "1",
                chapterTitle: "Introduction",
                pdfUrl: "https://res.cloudinary.com/dhzgmok7k/image/upload/v1715343587/DS-Assignment_2024_uuba9j.pdf",
                videoUrl: "https://res.cloudinary.com/dhzgmok7k/video/upload/v1715341625/10_CSS_Pro_Tips_-_Code_this_NOT_that_a6rpql.mp4",
                videoLength: "1 hour 30 minutes"
            },
            {
                chapterId: "2",
                chapterTitle: "Basic",
                pdfUrl: "",
                videoUrl: "https://res.cloudinary.com/dhzgmok7k/video/upload/v1715341625/10_CSS_Pro_Tips_-_Code_this_NOT_that_a6rpql.mp4",
                videoLength: "1 hour 30 minutes"
            },
            {
                chapterId: "3",
                chapterTitle: "Advanced",
                pdfUrl: "",
                videoUrl: "https://res.cloudinary.com/dhzgmok7k/video/upload/v1715341625/10_CSS_Pro_Tips_-_Code_this_NOT_that_a6rpql.mp4",
                videoLength: "1 hour 30 minutes"
            }
        ]

    },
    {
        courseId: "4",
        courseTitle: "C Programming For beginners",
        publishedDate: "12/2/2024",
        price: 200,
        imgUrl: "https://res.cloudinary.com/dhzgmok7k/image/upload/v1714995565/1695299108743_iyb1h1.png",
        description: "This will give an overview of C programming",
        categories: "Programming",
        tags: ["C", "programming", "introduction"],
        WhatWillLearn: ["How to Program In C", "OOP concepts", "Threads", "Deploy to AWS"],
        chapters: [
            {
                chapterId: "1",
                chapterTitle: "Introduction",
                pdfUrl: "",
                videoUrl: "https://res.cloudinary.com/dhzgmok7k/video/upload/v1715341625/10_CSS_Pro_Tips_-_Code_this_NOT_that_a6rpql.mp4",
                videoLength: "1 hour 30 minutes"
            }
        ]

    }
]

const instructor = {
    firstName: "John",
    lastName: "Doyly",
    email: "johndoyly@gmail.com"
}

export default function page({ params }: any) {
    const { courseId } = params
    const [course, setCourse] = useState(courses.find(course => courseId === course.courseId))

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
            <div className="bg-fixed bg-cover bg-repeat -mt-6 -mb-6 lg:h-screen" style={{ backgroundImage: `url(${image.src})` }}>
                <div className="flex justify-evenly pt-10 gap-5 flex-wrap">
                    <img src={course?.imgUrl} />
                    <div className="flex flex-col gap-5 flex-wrap">
                        <div className="flex justify-between items-center ml-5 mr-5">
                            <p className="text-gray-100">Published On {course?.publishedDate}</p>
                            <p className="badge badge-warning badge-lg text-white p-4">{course?.categories}</p>
                        </div>
                        <h1 className="text-5xl text-white font-serif text-center">{course?.courseTitle}</h1>
                        <p className="text-xl text-gray-100 text-center">{course?.description}</p>
                        <p className="text-xl text-gray-100 text-center">This course consists of {course?.chapters.length} Chapters</p>
                        <div className="flex gap-2 justify-center items-center flex-wrap">
                            {renderTags}
                        </div>
                    </div>
                </div>
                <div className="flex justify-evenly items-center pt-10 gap-5 flex-wrap">
                    <div className="flex flex-col gap-5 items-center flex-wrap">
                        <h1 className="text-5xl text-white text-center">What You Will Learn?</h1>
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

