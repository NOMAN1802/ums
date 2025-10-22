import { AiOutlineDashboard } from "react-icons/ai";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { FaUserGraduate } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { SiGoogleclassroom } from "react-icons/si";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { AiFillBell } from "react-icons/ai";

export const getIcon = (name: string | undefined) => {
  // console.log(name);
  switch (name?.toLowerCase()) {
    case "dashboard":
      return <AiOutlineDashboard />;
    case "academic management":
      return <HiMiniAcademicCap />;
    case "user management":
      return <FaUserGraduate />;
    case "offered course":
      return <SiCoursera />;
    case "course management":
      return <SiGoogleclassroom />;
    case "my schedule":
      return <RiCalendarScheduleFill />;
    case "assignments & exam handling":
      return <RiCalendarScheduleFill />;
    case "attendance tracker":
      return <AiFillBell />;
    default:
      return null;
  }
};
