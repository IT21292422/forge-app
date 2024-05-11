import {
  CreateInstructorRequestDTO,
  CreateStudentRequestDTO,
} from "../interfaces/user/dto/users.dto";

export const createUser = async (
  data: CreateStudentRequestDTO | CreateInstructorRequestDTO,
) => {
  try {
    console.log("received learner request in createUser", data);

    const response = await fetch("http://localhost:3005/users/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error creating user");
  }
};

export const loginUser = async (
  email: string,
  password: string,
  role: string,
) => {
  try {
    const response = await fetch("http://localhost:3005/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error logging in user", error);
  }
};
