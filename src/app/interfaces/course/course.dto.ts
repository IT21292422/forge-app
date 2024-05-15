export interface SIngleCourseResponseDTO {
  _id: string;
  courseId: string;
  courseTitle: string;
  instructorId: string;
  publishedDate: string;
  imgUrl: string; // cover for card
  price: number;
  categories: string;
  tags: string[];
  description: string;
  WhatWillLearn: string[];
  isApproved: boolean;
  chapters: Chapter[];
}

interface Chapter {
  chapterId: string;
  chapterTitle: string;
  pdfUrl: string;
  videoUrl: string;
  videoLength: string;
}

export type FetchAllCOurseResponeDTO =
  | SIngleCourseResponseDTO[]
  | {
      statusCode: number;
      message: string;
    };

export interface Course {
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
