import AttendanceTracker from "../pages/Faculty/AttendanceTracker";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import MyCourses from "../pages/Faculty/MyCourses";
import MyStudents from "../pages/Faculty/MyStudent";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Assignments & Exam handling",
    path: "my-courses",
    element: <MyCourses />,
  },
  {
    name: "Attendance Tracker",
    path: "attendance-tracker",
    element: <AttendanceTracker />,
  },
  {
    path: "courses/:registerSemesterId/:courseId",
    element: <MyStudents />,
  },
];
