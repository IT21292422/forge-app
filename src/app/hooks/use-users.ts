import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginSchema } from "../interfaces/auth/auth.interface";
import {
  CreateInstructorRequestDTO,
  CreateStudentRequestDTO,
} from "../interfaces/user/dto/users.dto";
import { createUser, loginUser } from "../lib/users.api";

//EXAMPLES

// use "useQuery" for non mutation queries (GET requests etc)
export const useCreateUser = (
  data: CreateStudentRequestDTO | CreateInstructorRequestDTO,
) => {
  return useQuery<CreateStudentRequestDTO | CreateInstructorRequestDTO>({
    queryKey: ["create-user"],
    queryFn: () => createUser(data),
  });
};

//use "useMutation" for mutation queries (POST, PUT, DELETE etc)
// in the page
// const { data, mutate, isPending } = useMutation({
//     mutationFn: createUser,
//   });

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["login-user"],
    mutationFn: ({ email, password, role }: LoginSchema) =>
      loginUser(email, password, role),
  });
};

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: (data: CreateStudentRequestDTO | CreateInstructorRequestDTO) =>
      createUser(data),
    retry: 5,
  });
};
