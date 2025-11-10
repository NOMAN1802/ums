import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import Container from "../../../utils/Container";
import { MdPersonAddAlt1 } from "react-icons/md";
import { TbMessages } from "react-icons/tb";
import { popularDepartmentTabData } from "./popularDepartmentData";

const PopularDepartment = () => {
  const [activeTab, setActiveTab] = useState<string>(
    popularDepartmentTabData[0].id
  );

  return (
    <div id="courses" className="bg-[#F5F5F5] text-black py-10">
      <div className="text-center px-4">
        <p className="text-3xl md:text-5xl ">
          Our Popular <span className="text-green-500">Department</span>
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        <p className="text-sm md:text-lg text-gray-500">
          Explore our most sought-after academic departments, offering
          innovative programs, expert faculty, and hands-on learning experiences
          to prepare students for a successful future.
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
      </div>

      <Container>
        <TabGroup className="pt-10 px-4">
          <TabList className="flex flex-wrap justify-center gap-4 md:gap-10">
            {popularDepartmentTabData.map((item, index) => (
              <Tab
                key={index}
                className={`px-3 py-1 transition-all rounded ${
                  activeTab === item.id
                    ? "bg-green-500 text-white"
                    : "text-gray-700 shadow-md bg-white"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="flex flex-col items-center px-4 py-2">
                  <item.icon size={24} />
                  <p className="text-sm">{item.name}</p>
                </div>
              </Tab>
            ))}
          </TabList>

          <TabPanels className="mt-8">
            {popularDepartmentTabData.map((item, index) => (
              <TabPanel key={index}>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 bg-white p-4 rounded-lg shadow-md">
                  <div>
                    <img
                      src={item.content.departmentImage}
                      alt=""
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="text-start">
                    <p className="uppercase text-green-500 font-semibold text-xl md:text-2xl mb-2">
                      {item.content.departmentName}
                    </p>
                    <p className="text-gray-800 text-lg md:text-xl font-semibold mb-2">
                      {item.content.title}
                    </p>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                      {item.content.details}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded">
                        <MdPersonAddAlt1 size={18} />
                        <span>{item.content.studentCount}</span>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded">
                        <TbMessages size={18} />
                        <span>{item.content.facultyCount}</span>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded">
                        <span>${item.content.researchGrants}.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </Container>
    </div>
  );
};

export default PopularDepartment;
