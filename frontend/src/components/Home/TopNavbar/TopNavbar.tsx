import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

const TopNavbar = () => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="w-96 md:w-1/2  bg-green-500 text-white text-lg ">
        <div className="flex flex-wrap justify-center md:justify-between items-center px-4 py-2 ">
          <div className="flex  items-center gap-1">
            <div>
              <FaLocationPin />
            </div>
            <div>123 Main Street Str. London</div>
          </div>
          <div className="flex  items-center gap-1">
            <div>
              <IoMdMail />
            </div>
            <div>Schoolname@mail.com</div>
          </div>
          <div className="flex  items-center gap-1">
            <div>
              <FaPhoneAlt />
            </div>
            <div>(531) 504-200-06</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
