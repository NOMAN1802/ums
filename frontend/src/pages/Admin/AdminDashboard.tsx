import { Col, Row } from "antd";
import { Chart } from "react-google-charts";
import { StatsCard } from "../../components/Dashboard/Admin/StatsCard";
import { FaArrowRightLong } from "react-icons/fa6";
import { StatsTwoCard } from "../../components/Dashboard/Admin/StatsTwoCard";
import {
  FacultyData,
  FacultyDataOptions,
  FacultyDataWithRole,
  studentLocationOptions,
  studentsLocationData,
  universityPerformanceData,
  universityPerformanceOptions,
} from "../../components/Dashboard/Admin/AdminDashboardData";
import AdminDashboardBarTittle from "../../components/Dashboard/Admin/AdminDashboardBarTittle";
import AdminDashboardCardTittle from "../../components/Dashboard/Admin/AdminDashboardCardTittle";
import { TotalStudentsCard } from "../../components/Dashboard/Admin/TotalStudentsCard";
import { useGetAllStudentsQuery } from "../../redux/features/admin/userManagement.api";
import { useGetAllAcademicDepartmentQuery } from "../../redux/features/admin/academicManagement.api";
import { TotalDepartmentCard } from "../../components/Dashboard/Admin/TotalDepartmentCard";

const AdminDashboard = () => {
  const { data: studentData } = useGetAllStudentsQuery(undefined);
  const { data: academicDepartmentData } = useGetAllAcademicDepartmentQuery(undefined);

  const countStudent = Number(studentData?.meta?.total);
  const countDepartment = Number(academicDepartmentData?.meta?.total);

  return (
    <div style={{ padding: 10 }}>
      {/* Top Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Total Students" />
            <TotalStudentsCard
              totalStudents={countStudent || 0}
              capacity={30}
              label="Total Students"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Total Faculties" />
            <StatsTwoCard percentage={32} totalValue={5.42} label="Since last month" />
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Total Staff" />
            <StatsCard value={75} total={100} mainStat={45.3} label="Since last month" />
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="No Of Department" />
            <TotalDepartmentCard
              percentage={79}
              totalValue={countDepartment || 0}
              label="No Of Department"
            />
          </div>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12} lg={8}>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <AdminDashboardBarTittle tittle="Attendence Activities" />
            <div className="border-dashed text-gray-300 border-t my-2"></div>
            <div className="overflow-x-auto">
              <Chart
                chartType="PieChart"
                width="100%"
                height="300px"
                data={FacultyData}
                options={FacultyDataOptions}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <AdminDashboardBarTittle tittle="Financial Statistics" />
            <div className="border-dashed text-gray-300 border-t my-2"></div>
            <div className="overflow-x-auto">
              <Chart
                chartType="Bar"
                width="100%"
                height="300px"
                data={universityPerformanceData}
                options={universityPerformanceOptions}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <AdminDashboardBarTittle tittle="Students Statistics" />
            <div className="border-dashed text-gray-300 border-t my-2"></div>
            <div className="overflow-x-auto">
              <Chart
                chartType="BarChart"
                width="100%"
                height="300px"
                data={studentsLocationData}
                options={studentLocationOptions}
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* Faculty Information Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
        {FacultyDataWithRole.map((faculty, index) => (
          <div key={index}>
            <div className="bg-white p-2 rounded-lg shadow-md mt-4 h-[130px]">
              <div className="flex items-center mt-4">
                <img
                  src={faculty.avatar}
                  alt="avatar"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gray-200 p-0.5"
                />
                <div className="ml-3 sm:ml-4">
                  <p className="text-gray-700 font-semibold text-sm sm:text-base">
                    {faculty.name}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">{faculty.role}</p>
                  <div className="flex items-center text-gray-400 gap-2 mt-1 cursor-pointer text-xs sm:text-sm">
                    <p>{faculty?.feedBack}+ Feedbacks</p>
                    <FaArrowRightLong />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Chart Row */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={24} lg={12}>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <AdminDashboardBarTittle tittle="Previous Semester Financial Statistics" />
            <div className="border-dashed text-gray-300 border-t my-2"></div>
            <div className="overflow-x-auto">
              <Chart
                chartType="Bar"
                width="100%"
                height="300px"
                data={universityPerformanceData}
                options={universityPerformanceOptions}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
