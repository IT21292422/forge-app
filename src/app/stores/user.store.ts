import { create } from "zustand";
import {
  CreateInstructorResponseDTO,
  CreateStudentResponseDTO,
} from "../interfaces/auth/auth.interface";

interface UserStore {
  user: CreateStudentResponseDTO | CreateInstructorResponseDTO | null;
  setUser: (
    user: CreateStudentResponseDTO | CreateInstructorResponseDTO,
  ) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: CreateStudentResponseDTO | CreateInstructorResponseDTO) =>
    set({ user }),
  logout: () => set({ user: null }),
}));
