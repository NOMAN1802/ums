/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  Tag,
  Typography,
  Card,
  Button,
  Space,
  Row,
  Col,
  Badge,
} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCoursesFromStudentQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { ColumnsType } from "antd/es/table/interface";
import { toast } from "sonner";
import { TEnrolledCourse, TResponse } from "../../types";

const { Title, Text } = Typography;

const OfferedCourses = () => {
  const { data: offeredCoursesData, isLoading } =
    useGetAllOfferedCoursesFromStudentQuery(undefined);

  const [addEnrolledCourse] = useEnrollCourseMutation();

  const handleEnrolle = async (id: string) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = (await addEnrolledCourse({
        offeredCourse: id,
      })) as TResponse<TEnrolledCourse>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", { id: toastId });
    }
  };

  console.log(offeredCoursesData); // For debugging

  const meta = offeredCoursesData?.meta;
  const data = offeredCoursesData?.data;

  const columns: ColumnsType<any> = [
    {
      title: "Course",
      key: "course",
      fixed: "left",
      width: 200,
      render: (record: any) => (
        <div>
          <Text strong style={{ display: "block" }}>
            {record.course.prefix} {record.course.code}
          </Text>
          <Text type="secondary">{record.course.title}</Text>
        </div>
      ),
    },
    {
      title: "Section",
      key: "section",
      width: 100,
      render: (record: any) => (
        <Badge
          count={`Sec ${record.section}`}
          style={{ backgroundColor: "#1890ff" }}
        />
      ),
    },
    {
      title: "Schedule",
      key: "schedule",
      render: (record: any) => (
        <div>
          <Space size="small" style={{ marginBottom: 4 }}>
            {record.days?.map((day: string) => (
              <Tag key={day} color="blue">
                {day}
              </Tag>
            ))}
          </Space>
          <div>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            <Text>
              {record.startTime} - {record.endTime}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Faculty",
      key: "faculty",
      render: (record: any) => (
        <Text>{record.faculty?.fullName || "Not Assigned"}</Text>
      ),
    },
    {
      title: "Credits",
      key: "credits",
      width: 100,
      align: "center" as const,
      render: (record: any) => (
        <Tag color="geekblue">{record.course.credits}</Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 150,
      render: (record: any) => (
        <Space>
          <Tag color={record.isPreRequisitesFulFilled ? "green" : "red"}>
            {record.isPreRequisitesFulFilled ? "Eligible" : "Not Eligible"}
          </Tag>
          {record.isAlreadyEnrolled && <Tag color="green">Enrolled</Tag>}
        </Space>
      ),
    },
    {
      title: "Seats",
      key: "seats",
      width: 120,
      render: (record: any) => {
        const available =
          record.maxCapacity - (record.currentlyEnrolledStudent || 0);
        const percent = Math.round((available / record.maxCapacity) * 100);
        let status: "success" | "warning" | "error" = "success";

        if (percent < 30) status = "error";
        else if (percent < 60) status = "warning";

        return (
          <div>
            <Text strong>{available}</Text>
            <Text type="secondary"> / {record.maxCapacity}</Text>
            <div
              style={{ width: "100%", background: "#f0f0f0", borderRadius: 2 }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: 4,
                  background:
                    status === "success"
                      ? "#52c41a"
                      : status === "warning"
                      ? "#faad14"
                      : "#f5222d",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "right" as const,
      render: (record: any) => (
        <Button
          type="primary"
          size="small"
          disabled={
            !record.isPreRequisitesFulFilled ||
            record.isAlreadyEnrolled ||
            record.maxCapacity - (record.currentlyEnrolledStudent || 0) <= 0
          }
          onClick={() => handleEnrolle(record._id)}
        >
          <>{record.isAlreadyEnrolled ? "Enrolled" : "Enroll"}</>
        </Button>
      ),
    },
  ];

  return (
    <Card
      loading={isLoading}
      title={
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              Available Courses
            </Title>
          </Col>
          <Col>
            <Text strong>Total Credits: </Text>
            <Text>
              {Array.isArray(data)
                ? data.reduce(
                    (sum: number, course: any) => sum + course.course.credits,
                    0
                  )
                : 0}
            </Text>
          </Col>
        </Row>
      }
    >
      <Table
        columns={columns}
        dataSource={Array.isArray(data) ? data : []}
        rowKey="_id"
        scroll={{ x: 1300 }}
        bordered
        size="middle"
        pagination={
          meta
            ? {
                current: meta.page,
                pageSize: meta.limit,
                total: meta.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} courses`,
              }
            : false
        }
      />

      <div style={{ marginTop: 16 }}>
        <Text type="secondary">
          Note: You can only enroll in courses where prerequisites are fulfilled
          and seats are available.
        </Text>
      </div>
    </Card>
  );
};

export default OfferedCourses;
