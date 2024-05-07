import { CreateLearnerRequestDTO } from "../interfaces/user/dto/users.dto";

export const createLearner = async (data: CreateLearnerRequestDTO) => {
  try {
    console.log("received learner request in createUser", data);

    const response = await fetch("http://localhost:3001/users/v1", {
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
