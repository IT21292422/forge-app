import axios, { AxiosResponse } from "axios";

export interface Course {
  courseId: string;
  courseTitle: string;
  instructorId: string;
  publishedDate: string;
  imgUrl: string;
  price: number;
  categories: string;
  tags: string[];
  description: string;
  WhatWillLearn: string[];
  isApproved: boolean;
  chapters: {
    chapterId: string;
    chapterTitle: string;
    pdfUrl: string;
    videoUrl: string;
    videoLength: string;
  }[];
}

export interface ApprovalRequest {
  courseId: string;
  isApproved: boolean;
}

// crate_course
export async function createCourse(
  course: Course,
  instructorId: string,
): Promise<AxiosResponse<Course>> {
  try {
    return await axios.post<Course>(
      "http://localhost:3005/course/crate_course",
      {
        ...course,
        instructorId: instructorId,
        publishedDate: new Date().toISOString(),
        isApproved: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}

// getAllCourses
export async function getAllCourses(): Promise<AxiosResponse<Course[]>> {
  try {
    return await axios.get<Course[]>(
      "http://localhost:3005/course/getAllCourses",
    );
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}

// getOneCourse/:id
export async function getOneCourse(id: string): Promise<AxiosResponse<Course>> {
  try {
    return await axios.get<Course>(
      `http://localhost:3005/course/getOneCourse/${id}`,
    );
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
}
