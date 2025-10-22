/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  Tag,
  Typography,
  Card,
  Button,
  Space,
  Descriptions,
  Row,
  Col,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import {
  useGetAllEnrolledCoursesQuery,
  useGetSingleEnrolledCourseQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { TEnrolledCourse } from "../../types/studentCourse.type";

const { Title, Text } = Typography;

// Main MySchedule component with table view
const MySchedule = () => {
  const { data: enrolledCourses, isLoading } =
    useGetAllEnrolledCoursesQuery(undefined);

    console.log(enrolledCourses)


  const columns = [
    {
      title: "Course Code",
      dataIndex: ["course", "prefix", "code"],
      key: "courseCode",
      render: (_: any, record: any) => (
        <Text strong>{`${record.course.prefix} ${record.course.code}`}</Text>
      ),
    },
    {
      title: "Course Title",
      dataIndex: ["course", "title"],
      key: "courseTitle",
    },
    {
      title: "Section",
      dataIndex: ["offeredCourse", "section"],
      key: "section",
      render: (section: number) => `Section ${section}`,
    },
    {
      title: "Faculty",
      dataIndex: ["faculty", "fullName"],
      key: "faculty",
    },
    {
      title: "Days",
      dataIndex: ["offeredCourse", "days"],
      key: "days",
      render: (days: string[]) => (
        <Space size="small">
          {days?.map((day) => (
            <Tag key={day} color="blue">
              {day}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Time",
      key: "time",
      render: (record: any) => (
        <span>
          <ClockCircleOutlined /> {record?.offeredCourse?.startTime} -{" "}
          {record?.offeredCourse?.endTime}
        </span>
      ),
    },
    {
      title: "Credits",
      dataIndex: ["course", "credits"],
      key: "credits",
    },
    {
      title: "Status",
      dataIndex: "isEnrolled",
      key: "status",
      render: (isEnrolled: boolean) => (
        <Tag color={isEnrolled ? "green" : "orange"}>
          {isEnrolled ? "Enrolled" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (grade: string) => (
        <Tag
          color={
            grade === "A"
              ? "green"
              : grade === "B"
              ? "blue"
              : grade === "C"
              ? "orange"
              : "red"
          }
        >
          {grade}
        </Tag>
      ),
    },
    {
      title: "Completed",
      dataIndex: "isCompleted",
      key: "completed",
      render: (isCompleted: boolean) => (
        <Tag color={isCompleted ? "green" : "red"}>
          {isCompleted ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button type="link" size="small">
            <Link to={`/student/courses/${record._id}`}>Details</Link>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="mb-0">
            My Schedule
          </Title>
          {/* <div>
            <Button type="primary">
              <Link to="/student/courses/enroll">Enroll in New Course</Link>
            </Button>
          </div> */}
        </div>

        <Table
          columns={columns}
          dataSource={(enrolledCourses?.data as unknown as TEnrolledCourse[]) || []}
          loading={isLoading}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          bordered
        />

        <div className="mt-4">
          <Text strong>Total Credits: </Text>
          <Text>
            {Array.isArray(enrolledCourses?.data)
              ? enrolledCourses.data.reduce(
                  (sum: number, course: any) => sum + (course?.course?.credits || 0),
                  0
                )
              : 0}
          </Text>
        </div>
      </Card>
    </div>
  );
};

// Course Details component
const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const validCourseId = courseId || ""; // Fallback to an empty string
  const {
    data: courseData,
    isLoading,
  } = useGetSingleEnrolledCourseQuery(validCourseId) as {
    data: TEnrolledCourse | undefined;
    isLoading: boolean;
  };

  console.log(courseData);
  const navigate = useNavigate();


  // For demo purposes, we'll use the first course from the sample data
  // const courseData = {
  //   _id: "680be1c0a68e066c2be26df1",
  //   semesterRegistration: {
  //     _id: "6809ed384442d050c8e8d5b7",
  //     academicSemester: "67de5642675c06e444943dd4",
  //     status: "ENDED",
  //     startDate: "2025-03-31T18:00:00.000Z",
  //     endDate: "2025-07-30T18:00:00.000Z",
  //     minCredit: 6,
  //     maxCredit: 16,
  //     createdAt: "2025-04-24T07:50:16.963Z",
  //     updatedAt: "2025-04-26T06:39:49.627Z",
  //     __v: 0,
  //   },
  //   academicSemester: {
  //     _id: "67de5642675c06e444943dd4",
  //     name: "Fall",
  //     year: "2027",
  //     code: "03",
  //     startMonth: "August",
  //     endMonth: "March",
  //     createdAt: "2025-03-22T06:18:42.627Z",
  //     updatedAt: "2025-03-22T06:18:42.627Z",
  //     __v: 0,
  //   },
  //   academicFaculty: {
  //     _id: "67ac4e97dede91689eaaa71c",
  //     name: "Facultiy of Engineering",
  //     createdAt: "2025-02-12T07:32:39.547Z",
  //     updatedAt: "2025-02-12T08:27:59.318Z",
  //     __v: 0,
  //   },
  //   academicDepartment: {
  //     _id: "67ac5d90583124c31dbfb05c",
  //     name: "Department of Computer Science and Engineering",
  //     academicFaculty: "67ac4e97dede91689eaaa71c",
  //     createdAt: "2025-02-12T08:36:32.537Z",
  //     updatedAt: "2025-02-12T08:40:08.957Z",
  //     __v: 0,
  //   },
  //   offeredCourse: {
  //     _id: "680a74a0d311faed87c95d8d",
  //     semesterRegistration: "6809ed384442d050c8e8d5b7",
  //     academicSemester: "67de5642675c06e444943dd4",
  //     academicFaculty: "67ac4e97dede91689eaaa71c",
  //     academicDepartment: "67ac5d90583124c31dbfb05c",
  //     course: "680a6e6a096d63eef4abc6e8",
  //     faculty: "67d10e3e10e74623f3a6163a",
  //     maxCapacity: 48,
  //     section: 1,
  //     days: ["Thu", "Wed"],
  //     startTime: "10:30",
  //     endTime: "12:30",
  //     createdAt: "2025-04-24T17:28:00.113Z",
  //     updatedAt: "2025-04-25T19:25:52.969Z",
  //     __v: 0,
  //   },
  //   course: {
  //     _id: "680a6e6a096d63eef4abc6e8",
  //     title: "Web Development",
  //     prefix: "WEB",
  //     code: 1101,
  //     credits: 3,
  //     preRequisiteCourses: [],
  //     isDeleted: false,
  //     createdAt: "2025-04-24T17:01:30.604Z",
  //     updatedAt: "2025-04-24T17:01:30.604Z",
  //     __v: 0,
  //   },
  //   student: {
  //     _id: "6809eb3203c4d29ff934b0ad",
  //     id: "2025010001",
  //     user: "6809eb3103c4d29ff934b0ab",
  //     name: {
  //       firstName: "Abdullah",
  //       middleName: "Al",
  //       lastName: "Noman",
  //       _id: "6866132a6a51f0d389b9d5ea",
  //     },
  //     gender: "male",
  //     dateOfBirth: "1992-06-15T00:00:00.000Z",
  //     email: "abdullah@gmail.com",
  //     contactNo: "9876543210",
  //     emergencyContactNo: "8765432109",
  //     bloodGroup: "A+",
  //     presentAddress: "321 Birch Street, Riverside",
  //     permanentAddress: "654 Pine Street, Riverside",
  //     guardian: {
  //       fatherName: "Robert Smith",
  //       fatherOccupation: "Doctor",
  //       fatherContactNo: "3344556688",
  //       motherName: "Sarah Smith",
  //       motherOccupation: "Architect",
  //       motherContactNo: "4455667788",
  //       _id: "6809eb3203c4d29ff934b0af",
  //     },
  //     localGuardian: {
  //       name: "Laura Johnson",
  //       occupation: "Teacher",
  //       contactNo: "5566778899",
  //       address: "111 Maple Avenue, Riverside",
  //       _id: "6809eb3203c4d29ff934b0b0",
  //     },
  //     profileImg:
  //       "https://res.cloudinary.com/dqxhobjwr/image/upload/v1745480496/2025010001Abdullah.jpg",
  //     admissionSemester: "67aaee536f1fead2e7f3fe4b",
  //     academicFaculty: "67ac4e97dede91689eaaa71c",
  //     isDeleted: false,
  //     academicDepartment: "67ac5d90583124c31dbfb05c",
  //     __v: 0,
  //     fullName: "Abdullah Al Noman",
  //   },
  //   faculty: {
  //     _id: "67d10e3e10e74623f3a6163a",
  //     id: "F-0001",
  //     user: "67d10e3d10e74623f3a61638",
  //     designation: "Lecturer",
  //     name: {
  //       firstName: "Taju",
  //       middleName: "Ahmed",
  //       lastName: "Mithu",
  //       _id: "67d10e3e10e74623f3a6163b",
  //     },
  //     gender: "male",
  //     dateOfBirth: "1990-01-01T00:00:00.000Z",
  //     email: "taju.faculty@gmail.com",
  //     contactNo: "12",
  //     emergencyContactNo: "12",
  //     bloodGroup: "A+",
  //     presentAddress: "123 Main St, Cityville",
  //     permanentAddress: "456 Oak St, Townsville",
  //     profileImg:
  //       "https://res.cloudinary.com/dqxhobjwr/image/upload/v1741753860/F-0001Taju.jpg",
  //     academicDepartment: "67ac5d90583124c31dbfb05c",
  //     isDeleted: false,
  //     __v: 0,
  //     fullName: "Taju Ahmed Mithu",
  //   },
  //   isEnrolled: true,
  //   courseMarks: {
  //     classTest1: 7,
  //     midTerm: 4,
  //     classTest2: 9,
  //     finalTerm: 7,
  //   },
  //   grade: "D",
  //   gradePoints: 2,
  //   isCompleted: true,
  // };

  const formatDate = (dateString: string | undefined) => {
      const date = new Date(dateString || "");
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

  if (isLoading) {
    return (
      <>
        <p>Loading....</p>
      </>
    );
  }

  const marksColumns = [
    {
      title: "Assessment",
      dataIndex: "assessment",
      key: "assessment",
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
    },
    {
      title: "Weightage",
      dataIndex: "weightage",
      key: "weightage",
    },
  ];

  const marksData = [
    {
      assessment: "Class Test 1",
      marks: courseData?.courseMarks?.classTest1,
      weightage: "20%",
    },
    {
      assessment: "Mid Term",
      marks: courseData?.courseMarks?.midTerm,
      weightage: "25%",
    },
    {
      assessment: "Class Test 2",
      marks: courseData?.courseMarks?.classTest2,
      weightage: "20%",
    },
    {
      assessment: "Final Term",
      marks: courseData?.courseMarks?.finalTerm,
      weightage: "35%",
    },
  ];

  return (
    <div className="p-4">
      <Card>
        <Button type="link" onClick={() => navigate(-1)} className="mb-4">
          Back to My Schedule
        </Button>

        <Title level={3} className="mb-6">
          Course Details: {courseData?.course?.title}
        </Title>

        {/* Course Information */}
        <Card title="Course Information" className="mb-6">
          <Row gutter={16}>
            <Col span={12}>
              <Descriptions column={1}>
                <Descriptions.Item label="Course Code">
                  {courseData?.course?.prefix} {courseData?.course?.code}
                </Descriptions.Item>
                <Descriptions.Item label="Course Title">
                  {courseData?.course?.title}
                </Descriptions.Item>
                <Descriptions.Item label="Credits">
                  {courseData?.course?.credits}
                </Descriptions.Item>
                <Descriptions.Item label="Semester">
                  {courseData?.academicSemester?.name}{" "}
                  {courseData?.academicSemester?.year}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={12}>
              <Descriptions column={1}>
                <Descriptions.Item label="Faculty">
                  {courseData?.faculty?.fullName} (
                  {courseData?.faculty?.designation})
                </Descriptions.Item>
                <Descriptions.Item label="Faculty Email">
                  {courseData?.faculty?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Max Capacity">
                  {courseData?.offeredCourse?.maxCapacity}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={courseData?.isEnrolled ? "green" : "orange"}>
                    {courseData?.isEnrolled ? "Enrolled" : "Pending"}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>

        {/* Schedule */}
        <Card title="Class Schedule" className="mb-6">
          <Descriptions column={1}>
            <Descriptions.Item label="Days">
              <Space size="small">
                {courseData?.offeredCourse?.days?.map((day) => (
                  <Tag key={day} color="blue">
                    {day}
                  </Tag>
                ))}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Time">
              <ClockCircleOutlined /> {courseData?.offeredCourse?.startTime} -{" "}
              {courseData?.offeredCourse?.endTime}
            </Descriptions.Item>
            <Descriptions.Item label="Section">
              Section {courseData?.offeredCourse?.section}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Academic Performance */}
        <Card title="Academic Performance" className="mb-6">
          <Row gutter={16}>
            <Col span={12}>
              <Table
                columns={marksColumns}
                dataSource={marksData}
                pagination={false}
                summary={() => (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      {Object.values(courseData?.courseMarks || {}).reduce(
                        (a, b) => a + b,
                        0
                      )}{" "}
                      / 100
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>100%</Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
              />
            </Col>
            <Col span={12}>
              <div className="p-4">
                <div className="mb-4">
                  <Text strong>Final Grade: </Text>
                  <Tag
                    color={
                      courseData?.grade === "A"
                        ? "green"
                        : courseData?.grade === "B"
                        ? "blue"
                        : courseData?.grade === "C"
                        ? "orange"
                        : "red"
                    }
                  >
                    {courseData?.grade}
                  </Tag>
                </div>
                <div className="mb-4">
                  <Text strong>Grade Points: </Text>
                  <Text>{courseData?.gradePoints}</Text>
                </div>
                <div className="mb-4">
                  <Text strong>Course Status: </Text>
                  <Tag color={courseData?.isCompleted ? "green" : "orange"}>
                    {courseData?.isCompleted ? "Completed" : "In Progress"}
                  </Tag>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Semester Information */}
        <Card title="Semester Information" className="mb-6">
          <Row gutter={16}>
            <Col span={12}>
              <Descriptions column={1}>
                <Descriptions.Item label="Semester">
                  {courseData?.academicSemester?.name}{" "}
                  {courseData?.academicSemester?.year}
                </Descriptions.Item>
                <Descriptions.Item label="Registration Status">
                  <Tag
                    color={
                      courseData?.semesterRegistration?.status === "ENDED"
                        ? "red"
                        : "green"
                    }
                  >
                    {courseData?.semesterRegistration?.status}
                  </Tag>
                </Descriptions.Item>
                {/* <Descriptions.Item label="Credit Range">
                  {courseData?.semesterRegistration?.minCredit} -{" "}
                  {courseData?.semesterRegistration?.maxCredit} credits
                </Descriptions.Item> */}
              </Descriptions>
            </Col>
            <Col span={12}>
              <Descriptions column={1}>
                <Descriptions.Item label="Start Date">
                  <CalendarOutlined />{" "}
                  {formatDate(courseData?.semesterRegistration?.startDate)}
                </Descriptions.Item>
                <Descriptions.Item label="End Date">
                  <CalendarOutlined />{" "}
                  {formatDate(courseData?.semesterRegistration?.endDate)}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      </Card>
    </div>
  );
};

export { MySchedule, CourseDetails };
