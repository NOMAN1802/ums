import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  DatePicker,
  TimePicker,
  Upload,
  message,
  Tabs,
  List,
  Divider,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  BellOutlined,
  BookOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const { TextArea } = Input;
const { Option } = Select;

interface Notice {
  id: string;
  title: string;
  content: string;
  category: "academic" | "event" | "holiday" | "exam" | "other";
  priority: "high" | "medium" | "low";
  date: string;
  time: string;
  location?: string;
  author: string;
  createdAt: string;
  attachments?: string[];
  read?: boolean;
}

const NoticeBoardPage = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [form] = Form.useForm();

  // Mock data
  useEffect(() => {
    const mockNotices: Notice[] = [
      {
        id: "1",
        title: "Midterm Exam Schedule Released",
        content:
          "The schedule for midterm examinations has been published. All students are advised to check the examination dates and report to their respective halls 30 minutes before the exam.",
        category: "exam",
        priority: "high",
        date: "2023-10-15",
        time: "09:00",
        author: "Dr. Sarah Johnson",
        createdAt: "2023-10-01T14:30:00",
      },
      {
        id: "2",
        title: "Annual Science Fair",
        content:
          "The university will host its annual science fair on November 5th. Students from all departments are encouraged to participate and showcase their projects.",
        category: "event",
        priority: "medium",
        date: "2023-11-05",
        time: "10:00",
        location: "Main Auditorium",
        author: "Prof. Michael Chen",
        createdAt: "2023-09-28T10:15:00",
        attachments: ["science-fair-guidelines.pdf"],
      },
      {
        id: "3",
        title: "Thanksgiving Holiday",
        content:
          "The university will be closed from November 23rd to 26th for the Thanksgiving holiday. Classes will resume on November 27th.",
        category: "holiday",
        priority: "low",
        date: "2023-11-23",
        time: "00:00",
        author: "Administration Office",
        createdAt: "2023-09-25T09:00:00",
      },
      {
        id: "4",
        title: "Library Maintenance",
        content:
          "The main library will undergo maintenance this weekend (October 7-8). Limited services will be available during this period.",
        category: "academic",
        priority: "medium",
        date: "2023-10-07",
        time: "08:00",
        location: "Central Library",
        author: "Library Department",
        createdAt: "2023-10-03T11:45:00",
      },
      {
        id: "5",
        title: "Scholarship Application Deadline",
        content:
          "The deadline for submitting scholarship applications for the spring semester is October 20th. Late submissions will not be accepted.",
        category: "academic",
        priority: "high",
        date: "2023-10-20",
        time: "17:00",
        author: "Financial Aid Office",
        createdAt: "2023-09-30T15:20:00",
        attachments: ["scholarship-form.docx", "requirements.pdf"],
      },
      {
        id: "6",
        title: "Guest Lecture on AI Ethics",
        content:
          'Dr. Emily Rodriguez will deliver a lecture on "Ethical Considerations in Artificial Intelligence" on October 12th. All computer science students are encouraged to attend.',
        category: "academic",
        priority: "medium",
        date: "2023-10-12",
        time: "14:00",
        location: "Tech Building, Room 305",
        author: "Computer Science Department",
        createdAt: "2023-10-02T10:30:00",
      },
    ];
    setNotices(mockNotices);
    setFilteredNotices(mockNotices);
  }, []);

  // Filter notices by category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(
        notices.filter((notice) => notice.category === activeCategory)
      );
    }
  }, [activeCategory, notices]);

  const handleAddNotice = () => {
    setCurrentNotice(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditNotice = (notice: Notice) => {
    setCurrentNotice(notice);
    form.setFieldsValue({
      ...notice,
      date: dayjs(notice.date),
      time: dayjs(notice.time, "HH:mm"),
    });
    setIsModalVisible(true);
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter((notice) => notice.id !== id));
    message.success("Notice deleted successfully");
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const noticeData = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
        createdAt: new Date().toISOString(),
        author: "Administrator",
      };

      if (currentNotice) {
        // Update notice
        setNotices(
          notices.map((notice) =>
            notice.id === currentNotice.id
              ? { ...noticeData, id: currentNotice.id }
              : notice
          )
        );
        message.success("Notice updated successfully");
      } else {
        // Add new notice
        const newNotice = {
          ...noticeData,
          id: `notice-${Date.now()}`,
        };
        setNotices([...notices, newNotice]);
        message.success("Notice added successfully");
      }

      setIsModalVisible(false);
    });
  };

  const priorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      default:
        return "green";
    }
  };

  const categoryIcon = (category: string) => {
    switch (category) {
      case "academic":
        return <BookOutlined className="text-blue-500" />;
      case "event":
        return <CalendarOutlined className="text-purple-500" />;
      case "holiday":
        return <CheckCircleOutlined className="text-green-500" />;
      case "exam":
        return <FileTextOutlined className="text-red-500" />;
      default:
        return <BellOutlined className="text-gray-500" />;
    }
  };

  const categoryName = (category: string) => {
    switch (category) {
      case "academic":
        return "Academic";
      case "event":
        return "Event";
      case "holiday":
        return "Holiday";
      case "exam":
        return "Exam";
      default:
        return "Other";
    }
  };

  const NoticeItem = ({ notice }: { notice: Notice }) => (
    <Card
      className="mb-4 shadow-sm hover:shadow-md transition-shadow "
      title={
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {categoryIcon(notice.category)}
            <span className="ml-2 font-semibold text-lg">{notice.title}</span>
          </div>
          <Tag color={priorityColor(notice.priority)} className="capitalize">
            {notice.priority}
          </Tag>
        </div>
      }
      extra={
        <div className="text-gray-500 text-sm">
          <ClockCircleOutlined className="mr-1" />
          {dayjs(notice.createdAt).fromNow()}
        </div>
      }
    >
      <div className="mb-3 text-gray-700">{notice.content}</div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center text-gray-600">
          <CalendarOutlined className="mr-1" />
          <span>{dayjs(notice.date).format("MMM D, YYYY")}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <ClockCircleOutlined className="mr-1" />
          <span>{notice.time}</span>
        </div>

        {notice.location && (
          <div className="flex items-center text-gray-600">
            <EnvironmentOutlined className="mr-1" />
            <span>{notice.location}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-500 text-sm">
          <UserOutlined className="mr-1" />
          <span>Posted by {notice.author}</span>
        </div>

        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditNotice(notice)}
            className="text-blue-500"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteNotice(notice.id)}
            className="text-red-500"
          />
        </div>
      </div>

      {notice.attachments && notice.attachments.length > 0 && (
        <div className="mt-4">
          <Divider className="my-3" />
          <div className="font-medium mb-2">Attachments:</div>
          <div className="flex flex-wrap gap-2">
            {notice.attachments.map((file, index) => (
              <Tag key={index} color="blue" className="cursor-pointer">
                {file}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </Card>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <BellOutlined className="mr-3 text-blue-500" />
              University Notice Board
            </h1>
            <p className="text-gray-600">
              Important announcements, events, and updates for students and
              faculty
            </p>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNotice}
            className="flex items-center"
          >
            Add New Notice
          </Button>
        </div>

        <Card className="shadow-lg border-0 mb-6">
          <Tabs
            activeKey={activeCategory}
            onChange={setActiveCategory}
            tabBarStyle={{ marginBottom: 0 }}
          >
            <Tabs.TabPane tab="All Notices" key="all" />
            <Tabs.TabPane
              tab={
                <span>
                  <BookOutlined className="mr-1" />
                  Academic
                </span>
              }
              key="academic"
            />
            <Tabs.TabPane
              tab={
                <span>
                  <CalendarOutlined className="mr-1" />
                  Events
                </span>
              }
              key="event"
            />
            <Tabs.TabPane
              tab={
                <span>
                  <CheckCircleOutlined className="mr-1" />
                  Holidays
                </span>
              }
              key="holiday"
            />
            <Tabs.TabPane
              tab={
                <span>
                  <FileTextOutlined className="mr-1" />
                  Exams
                </span>
              }
              key="exam"
            />
          </Tabs>

          <div className="mt-6">
            {filteredNotices.length > 0 ? (
              <div>
                {filteredNotices.map((notice) => (
                  <NoticeItem key={notice.id} notice={notice} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <BellOutlined className="text-4xl mb-4" />
                <p className="text-lg">No notices found for this category</p>
              </div>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Upcoming Events" className="shadow-lg border-0">
            <List
              itemLayout="horizontal"
              dataSource={notices.filter(
                (n) => n.category === "event" && dayjs(n.date).isAfter(dayjs())
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <CalendarOutlined className="text-xl text-purple-500" />
                    }
                    title={<a>{item.title}</a>}
                    description={
                      <div>
                        <div>
                          {dayjs(item.date).format("MMM D, YYYY")} at{" "}
                          {item.time}
                        </div>
                        {item.location && (
                          <div>
                            <EnvironmentOutlined className="mr-1" />
                            {item.location}
                          </div>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card title="Important Dates" className="shadow-lg border-0">
            <div className="space-y-4">
              {notices
                .filter((n) => n.priority === "high")
                .map((notice) => (
                  <div key={notice.id} className="flex items-start">
                    <div className="bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                      <BellOutlined />
                    </div>
                    <div>
                      <div className="font-medium">{notice.title}</div>
                      <div className="text-gray-500 text-sm">
                        {dayjs(notice.date).format("MMM D")} •{" "}
                        {categoryName(notice.category)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          <Card title="Quick Stats" className="shadow-lg border-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {notices.length}
                </div>
                <div className="text-gray-600">Total Notices</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-600">
                  {notices.filter((n) => n.category === "academic").length}
                </div>
                <div className="text-gray-600">Academic</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {notices.filter((n) => n.priority === "high").length}
                </div>
                <div className="text-gray-600">High Priority</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {notices.filter((n) => dayjs(n.date).isAfter(dayjs())).length}
                </div>
                <div className="text-gray-600">Upcoming</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Notice Form Modal */}
      <Modal
        title={currentNotice ? "Edit Notice" : "Create New Notice"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText={currentNotice ? "Update" : "Create"}
        cancelText="Cancel"
        width={700}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Notice Title"
                name="title"
                rules={[{ required: true, message: "Please enter a title" }]}
              >
                <Input placeholder="Enter notice title" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Priority"
                name="priority"
                rules={[{ required: true, message: "Please select priority" }]}
                initialValue="medium"
              >
                <Select>
                  <Option value="high">High</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="low">Low</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please enter notice content" }]}
          >
            <TextArea rows={4} placeholder="Enter detailed information" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select category" }]}
                initialValue="academic"
              >
                <Select>
                  <Option value="academic">Academic</Option>
                  <Option value="event">Event</Option>
                  <Option value="holiday">Holiday</Option>
                  <Option value="exam">Exam</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Location (Optional)" name="location">
                <Input placeholder="Enter location" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select date" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please select time" }]}
              >
                <TimePicker className="w-full" format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Attachments (Optional)" name="attachments">
            <Upload
              beforeUpload={() => false} // Prevent actual upload for demo
              listType="picture"
              maxCount={3}
            >
              <Button icon={<FileTextOutlined />}>Add Files</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NoticeBoardPage;
