import { Col, Row } from "antd";
import { Chart } from "react-google-charts";
import { FaArrowRightLong } from "react-icons/fa6";
import AdminDashboardBarTittle from "../../components/Dashboard/Admin/AdminDashboardBarTittle";
import AdminDashboardCardTittle from "../../components/Dashboard/Admin/AdminDashboardCardTittle";
import { StudentDashboardCard } from "../../components/Dashboard/Student/StudentDashboardCard";
import {
  coursePerformanceOnStudentDashboardData,
  coursePerformanceOnStudentDashboardOptions,
  previousSemesterData,
  PreviousSemesterDataOptions,
  previousSemesterStudentResultsData,
  StudentDashboardData,
} from "../../components/Dashboard/Student/StudentDashboardData";
import { usedFullLinks } from "../../utils/studentDashboardStaticData";

const StudentDashboard = () => {
  return (
    <div className="p-2 sm:p-4">
      {/* Cards Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Waiver" />
            <StudentDashboardCard
              value={65}
              total={100}
              mainStat={45}
              label="Waiver for this semester"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Faculty Assign" />
            <div className="h-[100px] flex flex-col justify-center gap-2 sm:gap-4 sm:flex-row sm:justify-between items-center">
              <p className="text-gray-500 font-semibold text-center sm:text-left">
                Faculty assigned for this semester
              </p>
              <p className="font-semibold">11 Faculty</p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Results" />
            <div className="h-[100px] flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
              <p className="text-gray-500 font-semibold text-center sm:text-left">
                Average results of all semester
              </p>
              <p className="font-semibold text-xl">3.56</p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Student Financial" />
            <div className="py-2 space-y-1">
              <p>
                Total Payable:{" "}
                <span className="font-semibold text-lg">5,20,000 Tk</span>
              </p>
              <p>
                Total Paid:{" "}
                <span className="font-semibold text-lg">2,88,000 Tk</span>
              </p>
              <p>
                Total Due:{" "}
                <span className="font-semibold text-lg">2,32,000 Tk</span>
              </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} md={12} lg={8}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardBarTittle tittle="Previous Semester Results" />
            <div className="border-dashed text-gray-300 border-t my-2"></div>
            <Chart
              chartType="PieChart"
              width="100%"
              height="300px"
              data={previousSemesterData}
              options={PreviousSemesterDataOptions}
            />
          </div>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardBarTittle tittle="Courses Performance" />
            <div className="border-dashed text-gray-300 border-t my-2"></div>
            <Chart
              chartType="Gantt"
              width="100%"
              height="300px"
              data={coursePerformanceOnStudentDashboardData}
              options={coursePerformanceOnStudentDashboardOptions}
            />
          </div>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardBarTittle tittle="Students Semester Wise Cost" />
            <div className="border-dashed text-gray-300 border-t my-2"></div>
            <Chart
              chartType="Gantt"
              width="100%"
              height="300px"
              data={previousSemesterStudentResultsData}
            />
          </div>
        </Col>
      </Row>

      {/* Extra Sections */}
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 bg-gray-100">
        {/* Semester Schedule */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Semester Schedule Info</h2>
          <div className="border-dashed text-gray-300 border-t mb-2"></div>
          <ul className="space-y-2">
            {[
              ["Registration Start Date", "24/12/2025"],
              ["Class Start Date", "01/02/2025"],
              ["Add Drop Start Date", "20/12/2025"],
              ["Mid Term Start Date", "11/03/2025"],
              ["Final Exam Start Date", "24/12/2025"],
              ["Registration End Date", "15/01/2025"],
            ].map(([label, date], i) => (
              <li key={i} className="flex justify-between items-center">
                <p className="font-semibold">{label}</p>
                <p>{date}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-purple-600 font-semibold cursor-pointer hover:underline text-right">
            More Details →
          </div>
        </div>

        {/* Dropped Semesters */}
        <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Dropped Semester List</h2>
          <div className="border-dashed text-gray-300 border-t mb-2"></div>
          <table className="w-full min-w-[300px] text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">Semester</th>
                <th className="py-2 px-4">Cause</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="even:bg-teal-100 odd:bg-white">
                  <td className="py-2 px-4">-</td>
                  <td className="py-2 px-4">-</td>
                  <td className="py-2 px-4">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Useful Links */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-4">Useful Links</h2>
          <div className="border-dashed text-gray-300 border-t mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {usedFullLinks.map((link, i) => (
              <div
                key={i}
                className="text-center py-4 rounded hover:bg-gray-200 transition cursor-pointer"
              >
                <img
                  src={link.icon}
                  alt={link.link}
                  className="w-16 h-12 mx-auto mb-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Students */}
      <div className="mt-6 overflow-x-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-w-[300px]">
          {StudentDashboardData.map((faculty, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded-lg shadow-md h-[120px]"
            >
              <div className="flex items-center mt-2">
                <img
                  src={faculty.avatar}
                  alt="avatar"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gray-200 p-0.5"
                />
                <div className="ml-3">
                  <p className="text-gray-700 font-semibold">{faculty.name}</p>
                  <p className="text-gray-500">{faculty.role}</p>
                  <div className="flex items-center text-gray-400 gap-2 cursor-pointer">
                    <p>Rank {faculty.rank}</p>
                    <FaArrowRightLong />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
