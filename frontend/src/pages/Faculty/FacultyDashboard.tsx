import { Col, Row } from "antd";
import AdminDashboardCardTittle from "../../components/Dashboard/Admin/AdminDashboardCardTittle";
import { FacultyDashboardCard } from "../../components/Dashboard/Faculty/FacultyDashboardCard";
import { FacultyDashboardCardTwo } from "../../components/Dashboard/Faculty/FacultyDashboardCardTwo";
import AdminDashboardBarTittle from "../../components/Dashboard/Admin/AdminDashboardBarTittle";
import Chart from "react-google-charts";
import {
  coursePerformanceOnStudentDashboardData,
  coursePerformanceOnStudentDashboardOptions,
  previousSemesterStudentResultsData,
  studentActivitiesData,
  studentActivitiesOptions,
} from "../../components/Dashboard/Student/StudentDashboardData";
import { FacultyDashboardSecondCard } from "../../components/Dashboard/Faculty/FacultyDashboardSecondCard";

const FacultyDashboard = () => {
  return (
    <div className="p-2 sm:p-4">
      {/* Top Dashboard Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Assigned Courses" />
            <FacultyDashboardSecondCard
              value={98}
              total={100}
              mainStat={11}
              label="Total Courses Of this Semester Taken"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Course Completion Rate" />
            <FacultyDashboardCardTwo
              percentage={80}
              label="Course Completion Performance"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Current Semester Total Credit" />
            <FacultyDashboardCard
              value={70}
              total={100}
              mainStat={20}
              label="Credit Of this Semester Taken"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardCardTittle tittle="Pending Evaluations" />
            <FacultyDashboardCardTwo
              percentage={74}
              label="Number of student assessments pending review"
            />
          </div>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} className="mt-6">
        {/* Research & Publications */}
        <Col xs={24} md={12} lg={8}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardBarTittle tittle="Research & Publications" />
            <div className="border-dashed text-gray-300 border-t my-2" />
            <Chart
              chartType="PieChart"
              width="100%"
              height="300px"
              data={studentActivitiesData}
              options={studentActivitiesOptions}
            />
          </div>
        </Col>

        {/* Assign Subject */}
        <Col xs={24} md={12} lg={8}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardBarTittle tittle="Assign Subject" />
            <div className="border-dashed text-gray-300 border-t my-2" />
            <Chart
              chartType="Gantt"
              width="100%"
              height="300px"
              data={coursePerformanceOnStudentDashboardData}
              options={coursePerformanceOnStudentDashboardOptions}
            />
          </div>
        </Col>

        {/* Course Feedback & Satisfaction */}
        <Col xs={24} md={12} lg={8}>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <AdminDashboardBarTittle tittle="Course Feedback & Satisfaction" />
            <div className="border-dashed text-gray-300 border-t my-2" />
            <Chart
              chartType="Gantt"
              width="100%"
              height="300px"
              data={previousSemesterStudentResultsData}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FacultyDashboard;
