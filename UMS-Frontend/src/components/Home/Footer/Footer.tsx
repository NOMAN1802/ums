import Container from "../../../utils/Container";
import { PiTagChevronLight } from "react-icons/pi";
import { FaTwitter } from "react-icons/fa";
import { RiFacebookFill } from "react-icons/ri";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";

const icons = [
  {
    icon: FaTwitter,
  },
  {
    icon: RiFacebookFill,
  },
  {
    icon: FaLinkedin,
  },
  {
    icon: FaGooglePlusG,
  },
  {
    icon: FaPinterestP,
  },
];

const Footer = () => {
  return (
    <div className="bg-[#000000] text-white">
      <Container>
        {/* Title Section */}
        <div className="text-center pt-20">
          <p className="text-5xl font-thin">
            Now <span className="text-green-500">Subscribe</span> Us!
          </p>
          <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
          <p className="text-md text-white">
            Stay updated with the latest news, events, and announcements from
            our school community.
          </p>
          <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        </div>
        {/* form  */}
        <div className="">
          <div className="flex justify-center">
            <input
              className="bg-white text-black mt-6 px-4"
              type="email"
              name="email"
              placeholder="Enter your email here..."
              id=""
            />
            <button
              type="submit"
              className="relative mt-6 flex items-center gap-1 px-6 py-3 text-white text-lg overflow-hidden bg-green-500 transition-all duration-700 before:absolute before:inset-0 before:bg-green-700 before:-translate-y-full before:transition-transform before:duration-700 hover:before:translate-y-0 before:z-0 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-3">
                <IoIosRocket size={20} />
                <span className="uppercase">submit</span>
              </span>
            </button>
          </div>
        </div>
        {/* content  */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 py-10">
          <div className="text-start">
            <div>
              <h1 className="text-2xl">About us</h1>
            </div>
            <div className="border w-[180px] font-thin my-2 text-green-500 "></div>
            <p className="py-8 text-gray-200">
              Our school is dedicated to nurturing students in a supportive and
              innovative environment. We focus on academic excellence, personal
              growth, and community involvement to prepare learners for a bright
              future.
            </p>
          </div>
          <div className="text-start">
            <div>
              <h1 className="text-2xl">School links</h1>
            </div>
            <div className="border w-[180px] font-thin my-2 text-green-500 "></div>
            <div className="grid grid-cols-2 gap-4 py-8">
              <ul>
                <li className="flex items-center gap-2 cursor-pointer">
                  <PiTagChevronLight />
                  About Us
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <PiTagChevronLight />
                  Pricing
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <PiTagChevronLight />
                  FAQs
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <PiTagChevronLight />
                  Services
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <PiTagChevronLight />
                  Sustainability
                </li>
              </ul>
              <ul>
                <li className="flex items-center gap-2 cursor-pointer">
                  <PiTagChevronLight />
                  History
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <PiTagChevronLight />
                  Awards
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <PiTagChevronLight />
                  Community
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <PiTagChevronLight />
                  Events
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <PiTagChevronLight />
                  Methods
                </li>
              </ul>
            </div>
          </div>
          <div className="text-start">
            <div>
              <h1 className="text-2xl">Contact info</h1>
            </div>
            <div className="border w-[180px] font-thin my-2 text-green-500 "></div>
            <div className="py-8">
              <p className="py-2">Address: 123 Main Street, London, UK</p>
              <p className="py-2">Phone: (531) 504-200-06</p>
              <p className="py-2">Email: contact@schoolname.com</p>
            </div>
            <div className="flex gap-3">
              {icons.map((icon, index) => (
                <div
                  key={index}
                  className="bg-[#222222] p-3 hover:bg-green-500 duration-1000 cursor-pointer"
                >
                  <icon.icon size={15} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
