export interface LoginSchema {
  email: string;
  password: string;
  role: "student" | "instructor" | "admin";
}

export interface SignUpSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "student" | "instructor" | "admin";
  year?: string;
}

export interface LoginResponseError {
  message: string;
}

export interface CreateStudentResponseDTO {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: string;
  year: string;
  enrolledCourses: string[];
  _id: string;
}

export interface CreateInstructorResponseDTO {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: string;
  publishedCourses: string[];
  _id: Types.ObjectId;
}

export interface LoginStudentResponseDTO {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: string;
  year: string;
  enrolledCourses: string[];
  _id?: string;
}

export interface LoginInstructorResponseDTO {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: string;
  publishedCourses: string[];
  _id?: Types.ObjectId;
}
