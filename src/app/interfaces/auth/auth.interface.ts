export interface LoginSchema {
  email: string;
  password: string;
  role: "student" | "instructor" | "admin";
}

export interface LoginResponseError {
  message: string;
}
