export interface CreateLearnerRequestDTO {
  firstName: string;
  lastName: string;
  role: "instructor" | "user";
  email: string;
  password: string;
  year: string;
  enrolledCourse: string[];
}
export interface CreateInstructorRequestDTO {
  firstName: string;
  lastName: string;
  role: "instructor" | "user";
  email: string;
  password: string;
  year: string;
  publishedCourses: string[];
}
