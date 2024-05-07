import { useQuery } from "@tanstack/react-query";
import { CreateLearnerRequestDTO } from "../interfaces/user/dto/users.dto";
import { createLearner } from "../lib/users.api";

//EXAMPLES

// use "useQuery" for non mutation queries (GET requests etc)
export const useCreateUser = (data: ) => {
  return useQuery<CreateLearnerRequestDTO>({
    queryKey: ["apod-image"],
    queryFn: () => createLearner(data),
  });
};

//use "useMutation" for mutation queries (POST, PUT, DELETE etc)
// in the page
// const { data, mutate, isPending } = useMutation({
//     mutationFn: createUser,
//   });
