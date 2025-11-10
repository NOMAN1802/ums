import AvatarOne from "../../../assets/images/Dashboard/Admin/AvatarImage/avatar-3.jpg";
import AvatarTwo from "../../../assets/images/Dashboard/Admin/AvatarImage/avatar-4.jpg";
import AvatarThree from "../../../assets/images/Dashboard/Admin/AvatarImage/avatar-5.jpg";
import AvatarFour from "../../../assets/images/Dashboard/Admin/AvatarImage/avatar-6.jpg";
import AvatarFive from "../../../assets/images/Dashboard/Admin/AvatarImage/avatar-7.jpg";

// studentActivitiesData
export const studentActivitiesData = [
  ["Task", "Hours per Day"],
  ["Attendance", 11],
  ["Performance", 2],
  ["Result", 2],
  ["Sports", 2],
  ["Sleep", 7],
];

export const studentActivitiesOptions = {
  title: "My Activities",
  pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
  is3D: false, // Enables 3D view
  // slices: {
  //   1: { offset: 0.2 }, // Explodes the second slice
  // },
  pieStartAngle: 100, // Rotates the chart
  sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "#233238",
      fontSize: 14,
    },
  },
  colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
};

// previousSemesterResultsData
export const previousSemesterData = [
  ["Semester Name", "Results"],
  ["Fall-24", 2.7],
  ["Autumn-24", 3.7],
  ["Summer-24", 3.65],
  ["Fall-23", 3.23],
];

export const PreviousSemesterDataOptions = {
  title: "Previous Semester Activities",
  pieHole: 0.4,
  is3D: false,
  pieSliceText: "value", label: "percentage", // this will show the value on the slice// this will show the label on the slice
  pieSliceTextStyle: {
    color: "#FFFFFF",
    fontSize: 12,
  },
};

//coursesPerformanceData

const courseFacultyColumns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "isPaymentDone" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Results" },
  { type: "string", label: "Dependencies" },
];

const coursePerformanceRows = [
  ["toTrain", "OOP", "walk", null, null, 5 * 60 * 1000, 100, null],
  ["music", "Programming", "music", null, null, 70 * 60 * 1000, 100, null],
  ["wait", "DBMS", "wait", null, null, 10 * 60 * 1000, 100, "toTrain"],
  [
    "train",
    "Computer Networks",
    "train",
    null,
    null,
    45 * 60 * 1000,
    75,
    "wait",
  ],
  [
    "toWork",
    "Operating Systems",
    "walk",
    null,
    null,
    10 * 60 * 1000,
    0,
    "train",
  ],
  [
    "Introduction to Programming",
    "Theory of Computation",
    null,
    null,
    null,
    2 * 60 * 1000,
    0,
    "toWork",
  ],
];

export const coursePerformanceOnStudentDashboardData = [
  courseFacultyColumns,
  ...coursePerformanceRows,
];

export const coursePerformanceOnStudentDashboardOptions = {
  height: 275,
  gantt: {
    defaultStartDateMillis: new Date(2015, 3, 28),
  },
};

//students Previous Semester Results

const previousSemesterResultsColumns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Results" },
  { type: "string", label: "Dependencies" },
];

const previousSemesterResultsRows = [
  [
    "2014Spring",
    "Spring 2014",
    "spring",
    new Date(2014, 2, 22),
    new Date(2014, 5, 20),
    null,
    100,
    null,
  ],
  [
    "2014Summer",
    "Summer 2014",
    "summer",
    new Date(2014, 5, 21),
    new Date(2014, 8, 20),
    null,
    100,
    null,
  ],
  [
    "2014Autumn",
    "Autumn 2014",
    "autumn",
    new Date(2014, 8, 21),
    new Date(2014, 11, 20),
    null,
    100,
    null,
  ],
  [
    "2014Winter",
    "Fall 2014",
    "winter",
    new Date(2014, 11, 21),
    new Date(2015, 2, 21),
    null,
    100,
    null,
  ],
  [
    "2015Spring",
    "Spring 2015",
    "spring",
    new Date(2015, 2, 22),
    new Date(2015, 5, 20),
    null,
    50,
    null,
  ],
  [
    "2015Summer",
    "Summer 2015",
    "summer",
    new Date(2015, 5, 21),
    new Date(2015, 8, 20),
    null,
    0,
    null,
  ],
  [
    "2015Autumn",
    "Autumn 2015",
    "autumn",
    new Date(2015, 8, 21),
    new Date(2015, 11, 20),
    null,
    0,
    null,
  ],
  [
    "2015Winter",
    "Winter 2015",
    "winter",
    new Date(2015, 11, 21),
    new Date(2016, 2, 21),
    null,
    0,
    null,
  ],
  [
    "Football",
    "Autumn 2025",
    "sports",
    new Date(2014, 8, 4),
    new Date(2015, 1, 1),
    null,
    100,
    null,
  ],
  [
    "Baseball",
    "Summer 2025",
    "sports",
    new Date(2015, 2, 31),
    new Date(2015, 9, 20),
    null,
    14,
    null,
  ],
  [
    "Basketball",
    "Fall 2025",
    "sports",
    new Date(2014, 9, 28),
    new Date(2015, 5, 20),
    null,
    86,
    null,
  ],
  [
    "Hockey",
    "Autumn 2024",
    "sports",
    new Date(2014, 9, 8),
    new Date(2015, 5, 21),
    null,
    89,
    null,
  ],
];

export const previousSemesterStudentResultsData = [
  previousSemesterResultsColumns,
  ...previousSemesterResultsRows,
];

export const StudentDashboardData = [
  {
    name: "Meraj Hossain",
    avatar: AvatarOne,
    rank: "3rd",
    role: "BBA",
  },
  {
    name: "Rahat Hossain",
    avatar: AvatarTwo,
    rank: "4th",
    role: "CSE",
  },
  {
    name: "Tanid Emran",
    avatar: AvatarThree,
    rank: "1st",
    role: "EEE",
  },
  {
    name: "Samid Sid",
    avatar: AvatarFour,
    rank: "2nd",
    role: "ENGLISH",
  },
  {
    name: "Aflan Ahmed Sajid",
    avatar: AvatarFive,
    rank: "1st",
    role: "BANGLA",
  },
];
