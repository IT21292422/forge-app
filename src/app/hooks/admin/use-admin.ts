import {
  approveCourse,
  fetchAllUnapprovedCourses,
} from "@/app/lib/admin/admin.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useApproveCurse = () => {
  return useMutation({
    mutationFn: (courseId: string) => approveCourse(courseId),
    retry: 3,
  });
};

export const useAdminCourses = () => {
  return useQuery({
    queryKey: ["get-unapproved-courses"],
    queryFn: () => fetchAllUnapprovedCourses(),
  });
};
