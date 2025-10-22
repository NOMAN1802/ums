import { NoticeData } from "./NoticeData";
import { MdOutlineDateRange } from "react-icons/md";
import degreeVerificationImage from "../../../assets/images/NoticeAndEvents/degree-verification.png";
import careerOpportunityLogoOne from "../../../assets/images/NoticeAndEvents/logoOne.png";
import careerOpportunityLogoTwo from "../../../assets/images/NoticeAndEvents/logoTwo.png";
import careerOpportunityLogoThree from "../../../assets/images/NoticeAndEvents/logoThree.png";
import careerOpportunityLogoBottom from "../../../assets/images/NoticeAndEvents/careerOpportunityBottom.png";
import { BsFillSave2Fill } from "react-icons/bs";
const Notice = () => {
  return (
    <div className="md:col-span-1 text-start w-full ">
      <div className="border-blue-950 border-2"></div>
      {/* notice  */}
      <p className="text-xl font-semibold text-gray-600 py-2 md:text-start text-center">
        Notice
      </p>
      <hr className="text-gray-200 " />
      <div>
        {NoticeData.map((item) => (
          <div className="py-2">
            <p className="cursor-pointer font-semibold text-[12px] text-blue-800">
              {item?.noticeTitle}
            </p>
            <div className="flex gap-0.5  text-green-500 items-center text-[12px] pb-2">
              <MdOutlineDateRange />
              <span>{item?.date}</span>
            </div>
            <hr className="text-gray-200" />
          </div>
        ))}
        <button className="relative  rounded-sm  flex items-center gap-1 w-full px-3 py-1 text-white text-[14px] overflow-hidden bg-green-500 transition-all duration-700 before:absolute before:inset-0 before:bg-green-700 before:-translate-y-full before:transition-transform before:duration-700 hover:before:translate-y-0 before:z-0 cursor-pointer">
          <span className="relative z-10 flex items-center gap-3 mx-auto">
            <BsFillSave2Fill /> <p>View All Notices</p>
          </span>
        </button>
        {/* events and degree verification button  */}
        <div className="md:py-12 py-2">
          {/* Scheduled Events button  */}
          <button className="relative  rounded-sm  flex items-center gap-1 w-full px-3 py-3 text-white text-[18px] font-semibold  overflow-hidden bg-green-500 transition-all duration-700 before:absolute before:inset-0 before:bg-green-700 before:-translate-y-full before:transition-transform before:duration-700 hover:before:translate-y-0 before:z-0 cursor-pointer ">
            <span className="relative z-10 flex items-center gap-3 mx-auto">
              <p>Scheduled Events</p>
            </span>
          </button>
          {/* degree verification button  */}
          <div className="py-2">
            <img
              src={degreeVerificationImage}
              className="bg-gray-200  cursor-pointer rounded-sm "
              alt=""
            />
          </div>
          {/* admission online button  */}
          <button className="relative  rounded-sm  flex items-center gap-1 w-full px-1 py-1 text-white text-[12px]   overflow-hidden bg-green-500 transition-all duration-700 before:absolute before:inset-0 before:bg-green-700 before:-translate-y-full before:transition-transform before:duration-700 hover:before:translate-y-0 before:z-0 cursor-pointer ">
            <span className="relative z-10 flex items-center gap-3 mx-auto">
              <p>
                Admissions : <span className="font-semibold">Apply Online</span>
              </p>
            </span>
          </button>
          {/* career opportunity section  */}
          <div className="py-3 border border-gray-200  rounded my-2 cursor-pointer">
            <div className="flex size-12 mx-auto items-center justify-center ">
              <img src={careerOpportunityLogoOne} alt="" />
              <img src={careerOpportunityLogoTwo} alt="" />
              <img src={careerOpportunityLogoThree} alt="" />
            </div>
            <div>
              <img
                src={careerOpportunityLogoBottom}
                alt=""
                className="size-full "
              />
            </div>
          </div>
          {/* career opportunity button  */}
          <button className="relative  rounded-sm  flex items-center gap-1 w-full px-1 py-1 text-white text-[12px]  font-semibold overflow-hidden bg-green-500 transition-all duration-700 before:absolute before:inset-0 before:bg-green-700 before:-translate-y-full before:transition-transform before:duration-700 hover:before:translate-y-0 before:z-0 cursor-pointer ">
            <span className="relative z-10 flex items-center gap-3 mx-auto">
              <p>Career Opportunity</p>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notice;
