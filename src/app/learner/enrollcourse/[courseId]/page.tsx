"use client"
import axios from "axios";
import { useEffect, useState } from "react";

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
            <li className="text-black text-xl lg:text-3xl">{learn}</li>
        )
    })

    return (
        <div className="bg-[#A2D4F1] text-black -mt-6 -mb-10 lg:h-screen">
            <div className="flex justify-evenly pt-10 gap-5 flex-wrap">
                <img src={course?.imgUrl} className="rounded-xl" />
                <div className="flex flex-col gap-5 flex-wrap">
                    <div className="flex justify-between items-center ml-5 mr-5">
                        <p className="text-black">Published on &nbsp;
                            {
                                isLoading ? (
                                    <span className="loading loading-bars loading-lg"></span>
                                ) : (
                                    new Date(course?.publishedDate).toLocaleDateString()
                                )
                            }
                        </p>
                        <p className="badge badge-warning badge-lg text-black p-4">
                            {course?.categories}
                        </p>
                    </div>
                    <h1 className="text-5xl text-black font-serif text-center">
                        {
                            isLoading ? (
                                <span className="loading loading-bars loading-lg"></span>
                            ) : (
                                course?.courseTitle
                            )
                        }
                    </h1>
                    <p className="text-xl text-black text-center">
                        {
                            isLoading ? (
                                <span className="loading loading-bars loading-lg"></span>
                            ) : (
                                course?.description
                            )
                        }
                    </p>
                    <p className="text-xl text-black text-center">This course consists of {course?.chapters.length} Chapters</p>
                    <div className="flex gap-2 justify-center items-center flex-wrap">
                        {
                            isLoading ? (
                                <span className="loading loading-bars loading-lg"></span>
                            ) : (
                                renderTags
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-evenly items-center pt-10 gap-5 flex-wrap">
                <div className="flex flex-col gap-5 items-center flex-wrap">
                    <h1 className="text-5xl text-black text-center">What You Will Learn?</h1>
                    <ul className="list-disc">
                        {
                            isLoading ? (
                                <span className="loading loading-bars loading-lg"></span>
                            ) : (
                                renderWhatLearn
                            )
                        }
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

