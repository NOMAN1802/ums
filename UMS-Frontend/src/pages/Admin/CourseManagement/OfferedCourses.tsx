import { Table, TableColumnsType, Tag } from "antd";
import { useGetAllOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
type TTableData = {
  key: string;
  departmentName: string;
  facultyName: string;
  semesterName: string;
  courseCode: string;
  courseName: string;
  assingFacultyName: string;
  status: string;
};
const OfferedCourses = () => {
  const { data: offeredCourses, isFetching } =
    useGetAllOfferedCoursesQuery(undefined);

  const tableData =
    offeredCourses?.result && Array.isArray(offeredCourses.result)
      ? offeredCourses.result.map((offeredCourse) => ({
          key: offeredCourse?._id,
          departmentName: offeredCourse?.academicDepartment?.name || "",
          facultyName: offeredCourse?.academicFaculty?.name || "",
          semesterName: `${offeredCourse?.academicSemester?.name || ""} ${
            offeredCourse?.academicSemester?.year || ""
          }`,
          courseCode: `${offeredCourse?.course?.prefix || ""} ${
            offeredCourse?.course?.code || ""
          }`,
          courseName: offeredCourse?.course?.title || "",
          assingFacultyName: offeredCourse?.faculty?.fullName || "",
          status: offeredCourse?.semesterRegistration?.status || "",
        }))
      : [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Semester",
      dataIndex: "semesterName",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
    },
    {
      title: "Course Code",
      dataIndex: "courseCode",
    },
    {
      title: "Department",
      dataIndex: "departmentName",
    },
    {
      title: "Faculty Name",
      dataIndex: "facultyName",
    },
    {
      title: "Assign Faculty",
      dataIndex: "assingFacultyName",
    },
  ];
  return (
    <div>
      <Table<TTableData>
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default OfferedCourses;
