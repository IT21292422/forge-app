import { SIngleCourseResponseDTO } from "@/app/interfaces/course/course.dto";

export const approveCourse = async (course: SIngleCourseResponseDTO) => {
  try {
    const response = await fetch(`http://localhost:3005/course/setapproved`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        courseId: course.courseId,
        isApproved: !course.isApproved,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error approving course", error);
  }
};

export const fetchAllCourses = async (): Promise<SIngleCourseResponseDTO[]> => {
  try {
    const response = await fetch("http://localhost:3005/course/getAllCourses", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    });
    const result: SIngleCourseResponseDTO[] = await response.json();

    return result;
  } catch (error) {
    console.log("Error fetching unapproved courses", error);
    return [];
  }
};
