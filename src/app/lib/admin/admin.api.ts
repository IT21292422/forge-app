export const approveCourse = async (courseId: string) => {
  try {
    const response = await fetch(`http://localhost:3005/course/approved/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error approving course", error);
  }
};

export const fetchAllUnapprovedCourses = async () => {
  try {
    const response = await fetch("http://localhost:3005/courses/unapproved", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error fetching unapproved courses", error);
  }
};
