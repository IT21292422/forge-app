export interface LoginSchema {
  email: string;
  password: string;
  role: "student" | "instructor" | "admin" | "";
  serverError?: string;
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
  _id: string;
}

export interface LoginStudentResponseDTO {
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  role: string;
  year: string;
  enrolledCourses: string[];
  _id?: string;
}

export interface LoginInstructorResponseDTO {
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  role: string;
  publishedCourses: string[];
  _id?: string;
}

// export interface CreateStudentRequestDTO {
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   year: string;
//   password: string;
//   enrolledCourses: string[];
// }
// export interface CreateInstructorRequestDTO {
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   password: string;
//   publishedCourses: string[];
// }
