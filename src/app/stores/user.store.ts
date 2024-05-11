import { create } from "zustand";
import {
  LoginInstructorResponseDTO,
  LoginStudentResponseDTO,
} from "../interfaces/auth/auth.interface";

interface UserStore {
  user: LoginStudentResponseDTO | LoginInstructorResponseDTO | null;
  setUser: (user: LoginStudentResponseDTO | LoginInstructorResponseDTO) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
