import { FaBookOpen } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaFlask } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import DeptImgOne from "../../../assets/images/Courses/course-1.jpg";
import DeptImgTwo from "../../../assets/images/Courses/course-2.jpg";
import DeptImgThree from "../../../assets/images/Courses/course-3.jpg";
import DeptImgFour from "../../../assets/images/Courses/course-4.jpg";
import DeptImgFive from "../../../assets/images/Courses/course-5.jpg";

export const popularDepartmentTabData = [
  {
    id: "1",
    icon: FaBookOpen,
    name: "Humanities",
    content: {
      departmentName: "Department of Humanities",
      departmentImage: DeptImgOne,
      title: "Explore Culture and History",
      details:
        "The Humanities Department focuses on literature, philosophy, history, and the arts, helping students develop critical thinking and analytical skills.",
      facultyCount: "30",
      studentCount: "500",
      researchGrants: "$200K",
    },
  },
  {
    id: "2",
    icon: FaLaptopCode,
    name: "Computer Science",
    content: {
      departmentName: "Department of Computer Science",
      departmentImage: DeptImgTwo,
      title: "Innovate with Technology",
      details:
        "The Computer Science Department offers programs in software engineering, artificial intelligence, and cybersecurity, preparing students for the tech industry.",
      facultyCount: "40",
      studentCount: "800",
      researchGrants: "$500K",
    },
  },
  {
    id: "3",
    icon: FaChartBar,
    name: "Business Administration",
    content: {
      departmentName: "Department of Business Administration",
      departmentImage: DeptImgThree,
      title: "Lead the Future of Business",
      details:
        "Offering courses in management, marketing, and finance, this department prepares students for leadership roles in the corporate world.",
      facultyCount: "35",
      studentCount: "700",
      researchGrants: "$300K",
    },
  },
  {
    id: "4",
    icon: FaFlask,
    name: "Biochemistry",
    content: {
      departmentName: "Department of Biochemistry",
      departmentImage: DeptImgFour,
      title: "Unravel the Mysteries of Life",
      details:
        "This department specializes in molecular biology, genetics, and biotechnology, advancing research in medicine and healthcare.",
      facultyCount: "25",
      studentCount: "400",
      researchGrants: "$600K",
    },
  },
  {
    id: "5",
    icon: FaBuilding,
    name: "Civil Engineering",
    content: {
      departmentName: "Department of Civil Engineering",
      departmentImage: DeptImgFive,
      title: "Build the Future of Infrastructure",
      details:
        "Students in this department learn about structural design, urban planning, and sustainable construction technologies.",
      facultyCount: "50",
      studentCount: "900",
      researchGrants: "$400K",
    },
  },
];
