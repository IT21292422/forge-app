import {
  FetchAllCOurseResponeDTO,
  SIngleCourseResponseDTO,
} from "@/app/interfaces/course/course.dto";
import { approveCourse, fetchAllCourses } from "@/app/lib/admin/admin.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useApproveCurse = () => {
  return useMutation({
    mutationFn: (course: SIngleCourseResponseDTO) => approveCourse(course),
    mutationKey: ["approve-course"],
    retry: 3,
  });
};

export const useAdminCourses = () => {
  return useQuery<FetchAllCOurseResponeDTO>({
    queryKey: ["get-unapproved-courses"],
    queryFn: () => fetchAllCourses(),
  });
};
