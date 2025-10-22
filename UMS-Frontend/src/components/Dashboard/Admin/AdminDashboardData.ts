import AvatarOne from "../../../assets/images/Dashboard/Admin/AvatarImage/avatar-3.jpg";
import AvatarTwo from "../../../assets/images/Dashboard/Admin/AvatarImage/avatar-4.jpg";
import AvatarThree from "../../../assets/images/Dashboard/Admin/AvatarImage/avatar-5.jpg";
import AvatarFour from "../../../assets/images/Dashboard/Admin/AvatarImage/avatar-6.jpg";
import AvatarFive from "../../../assets/images/Dashboard/Admin/AvatarImage/avatar-7.jpg";

export const FacultyData = [
  ["Task", "Hours per Day"],
  ["Student 1000", 70],
  ["Faculty 75", 20],
  ["Staff 25", 15],
];

export const FacultyDataOptions = {
  title: "Attendence Activities",
  pieHole: 0.4,
  is3D: false,
  pieSliceText: "value",
};

export const universityPerformanceData = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 300],
  ["2016", 660, 1120, 400],
  ["2017", 1030, 540, 200],
];

export const universityPerformanceOptions = {
  chart: {
    subtitle: "Sales and Expenses over the Years",
  },
};

export const studentsLocationData = [
  ["Semester", "2024 Students", "2025 Students"],
  ["Autumn", 8175000, 8008000],
  ["Summer", 3792000, 3694000],
  ["Fall", 2695000, 2896000],
  // ["Gazipur", 2099000, 1953000],
  // ["Old Dhaka", 1526000, 1517000],
];

// Different options for non-material charts
export const studentLocationOptions = {
  title: "Students Of Our Different Cities",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Total Students",
    minValue: 0,
  },
  vAxis: {
    title: "Semester Name",
  },
};

export const FacultyDataWithRole = [
  {
    name: "Rayhan Mojumder",
    avatar: AvatarOne,
    feedBack: 80,
    role: "BBA Head",
  },
  {
    name: "Ayesha Siddiqua",
    avatar: AvatarTwo,
    feedBack: 75,
    role: "CSE Lecturer",
  },
  {
    name: "Farhan Ahmed",
    avatar: AvatarThree,
    feedBack: 85,
    role: "EEE Professor",
  },
  {
    name: "Nusrat Jahan",
    avatar: AvatarFour,
    feedBack: 90,
    role: "CSE Head",
  },
  {
    name: "Tanvir Hasan",
    avatar: AvatarFive,
    feedBack: 78,
    role: "Mechanical Engineering Lecturer",
  },
];
