export interface CreateStudentRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  year: string;
  password: string;
  enrolledCourses: string[];
}
export interface CreateInstructorRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  publishedCourses: string[];
}
