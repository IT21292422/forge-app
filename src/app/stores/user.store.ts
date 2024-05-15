import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  LoginInstructorResponseDTO,
  LoginStudentResponseDTO,
} from "../interfaces/auth/auth.interface";

interface UserStore {
  user: LoginStudentResponseDTO | LoginInstructorResponseDTO | null;
  setUser: (user: LoginStudentResponseDTO | LoginInstructorResponseDTO) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      },
    }),
    {
      name: "user",
    },
  ),
);
