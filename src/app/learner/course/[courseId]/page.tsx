"use client"
import { useState } from "react"
import image from "../../../../../public/enroll-hero.jpg"

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
                videoUrl: "",
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
                videoUrl: "",
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
                pdfUrl: "",
                videoUrl: "",
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
                videoUrl: "",
                videoLength: "1 hour 30 minutes"
            }
        ]

    }
]

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
            <li className="text-white text-xl lg:text-3xl">{learn}</li>
        )
    })

    return (
        <div className="bg-fixed bg-cover bg-repeat -mt-6 -mb-6 lg:h-screen" style={{ backgroundImage: `url(${image.src})` }}>
            <div className="flex justify-evenly pt-10 gap-5 flex-wrap">
                <img src={course?.imgUrl} />
                <div className="flex flex-col gap-5 flex-wrap">
                    <div className="flex justify-between items-center ml-5 mr-5">
                        <p className="text-gray-200">Published On {course?.publishedDate}</p>
                        <p className="badge badge-warning badge-lg text-white p-4">{course?.categories}</p>
                    </div>
                    <h1 className="text-5xl text-white font-serif text-center">{course?.courseTitle}</h1>
                    <p className="text-xl text-gray-200 text-center">{course?.description}</p>
                    <p className="text-xl text-gray-200 text-center">This course consists of {course?.chapters.length} Chapters</p>
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
                <div className="flex flex-col gap-5 flex-wrap card w-96 bg-base-100 shadow-xl items-center p-5 m-5">
                    <div className="flex items-center">
                        <h1 className="text-6xl text-main font-bold text-center px-5">${course?.price}</h1>
                        <div className="flex-col -ml-4">
                            <p className="text-sm font-bold text-main">One-Time Payment</p>
                            <p className="text-sm font-bold text-gray-500">No hidden charges</p>
                        </div>
                    </div>
                    <a className="btn bg-main text-white w-full">Buy Now</a>
                    <p className="text-sm font-bold text-gray-500 -mt-3">Lifetime Access</p>
                </div>
            </div>
        </div>
    )
}

