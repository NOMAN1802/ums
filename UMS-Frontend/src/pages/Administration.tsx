import React, { useState } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Avatar,
  Button,
  Dropdown,
  Space,
  Tabs,
  Badge,
  Input,
  Divider,
  Modal,
  Form,
  Select,
  DatePicker,
  message,
  Drawer,
  Grid,
  Menu,
} from "antd";
import {
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  DashboardOutlined,
  NotificationOutlined,
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Option } = Select;
const { useBreakpoint } = Grid;

interface User {
  key: string;
  name: string;
  email: string;
  role: "Admin" | "Professor" | "Student";
  status: "active" | "inactive" | "pending";
  lastActive: string;
}

interface Course {
  key: string;
  title: string;
  code: string;
  instructor: string;
  students: number;
  status: "published" | "draft" | "archived";
}

interface RecentActivity {
  id: string;
  action: string;
  user: string;
  time: string;
  status: "completed" | "pending" | "failed";
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  // Sample data
  const users: User[] = [
    {
      key: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah@univ.edu",
      role: "Professor",
      status: "active",
      lastActive: "2 mins ago",
    },
    {
      key: "2",
      name: "Admin User",
      email: "admin@univ.edu",
      role: "Admin",
      status: "active",
      lastActive: "10 mins ago",
    },
    {
      key: "3",
      name: "Student Demo",
      email: "student@univ.edu",
      role: "Student",
      status: "pending",
      lastActive: "1 hour ago",
    },
  ];

  const courses: Course[] = [
    {
      key: "1",
      title: "Computer Science 101",
      code: "CS101",
      instructor: "Dr. Johnson",
      students: 120,
      status: "published",
    },
    {
      key: "2",
      title: "Advanced Mathematics",
      code: "MATH301",
      instructor: "Prof. Smith",
      students: 85,
      status: "published",
    },
    {
      key: "3",
      title: "New Literature Course",
      code: "LIT202",
      instructor: "Dr. Williams",
      students: 0,
      status: "draft",
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      action: "User created",
      user: "admin@univ.edu",
      time: "Just now",
      status: "completed",
    },
    {
      id: "2",
      action: "Course updated",
      user: "prof@univ.edu",
      time: "5 mins ago",
      status: "completed",
    },
    {
      id: "3",
      action: "System backup",
      user: "System",
      time: "30 mins ago",
      status: "pending",
    },
    {
      id: "4",
      action: "Email notification failed",
      user: "System",
      time: "1 hour ago",
      status: "failed",
    },
  ];

  const userColumns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: User) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    ...(screens.md
      ? [
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: string) => (
              <Tag
                color={
                  role === "Admin"
                    ? "red"
                    : role === "Professor"
                    ? "blue"
                    : "green"
                }
              >
                {role}
              </Tag>
            ),
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
              <Tag
                color={
                  status === "active"
                    ? "green"
                    : status === "inactive"
                    ? "orange"
                    : "blue"
                }
              >
                {status.toUpperCase()}
              </Tag>
            ),
          },
        ]
      : []),
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: "edit", label: "Edit", icon: <EditOutlined /> },
              { key: "delete", label: "Delete", icon: <DeleteOutlined /> },
            ],
          }}
        >
          <Button shape="circle" icon={<EllipsisOutlined />} size="small" />
        </Dropdown>
      ),
    },
  ];

  const activityColumns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      ellipsis: true,
    },
    ...(screens.sm
      ? [
          {
            title: "User",
            dataIndex: "user",
            key: "user",
          },
        ]
      : []),
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: screens.xs ? 100 : undefined,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          icon={
            status === "completed" ? (
              <CheckCircleOutlined />
            ) : status === "pending" ? (
              <ClockCircleOutlined />
            ) : (
              <WarningOutlined />
            )
          }
          color={
            status === "completed"
              ? "green"
              : status === "pending"
              ? "orange"
              : "red"
          }
        >
          {screens.sm ? status.toUpperCase() : ""}
        </Tag>
      ),
      width: screens.xs ? 80 : undefined,
    },
  ];

  const handleAddUser = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("New user:", values);
        message.success("User added successfully");
        setIsUserModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };

  const tabItems = [
    {
      key: "overview",
      label: screens.md ? "Overview" : <DashboardOutlined />,
      children: (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {[
              {
                title: "Total Users",
                value: 1245,
                icon: <TeamOutlined />,
                color: "#1890ff",
              },
              {
                title: "Active Courses",
                value: 56,
                icon: <BookOutlined />,
                color: "#52c41a",
              },
              {
                title: "Pending Requests",
                value: 12,
                icon: <ClockCircleOutlined />,
                color: "#faad14",
              },
              {
                title: "System Health",
                value: "Good",
                icon: <CheckCircleOutlined />,
                color: "#52c41a",
              },
            ].map((item, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card>
                  <Statistic
                    title={item.title}
                    value={item.value}
                    prefix={item.icon}
                    valueStyle={{ color: item.color }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card
                title="Recent Users"
                extra={
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsUserModalVisible(true)}
                    size={screens.xs ? "small" : "middle"}
                  >
                    {screens.sm && "Add User"}
                  </Button>
                }
              >
                <Table
                  columns={userColumns}
                  dataSource={users}
                  pagination={false}
                  size="small"
                  scroll={screens.xs ? { x: true } : undefined}
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Recent Activities">
                <Table
                  columns={activityColumns}
                  dataSource={recentActivities}
                  pagination={false}
                  size="small"
                  scroll={screens.xs ? { x: true } : undefined}
                />
              </Card>
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: "users",
      label: screens.md ? "User Management" : <UserOutlined />,
      children: (
        <Card
          title={screens.xs ? "Users" : "User Management"}
          extra={
            <Space>
              <Input
                placeholder="Search users"
                prefix={<SearchOutlined />}
                size={screens.xs ? "small" : "middle"}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size={screens.xs ? "small" : "middle"}
                onClick={() => setIsUserModalVisible(true)}
              >
                {screens.sm && "Add User"}
              </Button>
            </Space>
          }
        >
          <Table
            columns={userColumns}
            dataSource={users}
            rowSelection={{}}
            size="small"
            scroll={screens.xs ? { x: true } : undefined}
          />
        </Card>
      ),
    },
    {
      key: "courses",
      label: screens.md ? "Course Management" : <BookOutlined />,
      children: (
        <Card
          title={screens.xs ? "Courses" : "Course Management"}
          extra={
            <Space>
              <Input
                placeholder="Search courses"
                prefix={<SearchOutlined />}
                size={screens.xs ? "small" : "middle"}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size={screens.xs ? "small" : "middle"}
              >
                {screens.sm && "Add Course"}
              </Button>
            </Space>
          }
        >
          <Table
            columns={[
              {
                title: "Course",
                dataIndex: "title",
                key: "title",
                render: (text, record) => (
                  <Space>
                    <BookOutlined />
                    <div>
                      <div>{text}</div>
                      {screens.sm && (
                        <div style={{ fontSize: 12, color: "#888" }}>
                          {record.code}
                        </div>
                      )}
                    </div>
                  </Space>
                ),
              },
              ...(screens.sm
                ? [
                    {
                      title: "Instructor",
                      dataIndex: "instructor",
                      key: "instructor",
                    },
                  ]
                : []),
              {
                title: "Students",
                dataIndex: "students",
                key: "students",
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status) => (
                  <Tag
                    color={
                      status === "published"
                        ? "green"
                        : status === "draft"
                        ? "orange"
                        : "red"
                    }
                  >
                    {status.toUpperCase()}
                  </Tag>
                ),
              },
            ]}
            dataSource={courses}
            size="small"
            scroll={screens.xs ? { x: true } : undefined}
          />
        </Card>
      ),
    },
    {
      key: "settings",
      label: screens.md ? "Settings" : <SettingOutlined />,
      children: (
        <Card title="System Configuration">
          <Form layout="vertical">
            <Form.Item label="University Name">
              <Input placeholder="Enter university name" />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Academic Year">
                  <DatePicker.RangePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Default Timezone">
                  <Select defaultValue="est">
                    <Option value="est">Eastern Time (EST)</Option>
                    <Option value="pst">Pacific Time (PST)</Option>
                    <Option value="gmt">GMT</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="System Maintenance Mode">
              <Select defaultValue="off">
                <Option value="off">Disabled</Option>
                <Option value="on">Enabled</Option>
              </Select>
            </Form.Item>

            <Divider />

            <Form.Item>
              <Button type="primary">Save Settings</Button>
              {screens.sm && (
                <Button style={{ marginLeft: 8 }}>Reset to Defaults</Button>
              )}
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }} className="mt-16 max-w-7xl mx-auto">
      <Header
        style={{
          background: "#fff",
          padding: screens.xs ? "0 12px" : "0 24px",
          boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: screens.xs ? 48 : 64,
          lineHeight: screens.xs ? "48px" : "64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {screens.xs && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(true)}
              style={{ marginRight: 8 }}
            />
          )}
          <DashboardOutlined
            style={{
              fontSize: screens.xs ? 20 : 24,
              marginRight: screens.xs ? 8 : 16,
              color: "#1890ff",
            }}
          />
          <h2
            style={{
              margin: 0,
              fontSize: screens.xs ? 16 : 20,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: screens.xs ? 150 : "none",
            }}
          >
            University Administration
          </h2>
        </div>
        <Space size={screens.xs ? "small" : "large"}>
          <Badge count={5} size="small">
            <NotificationOutlined style={{ fontSize: screens.xs ? 16 : 18 }} />
          </Badge>
          {/* <Avatar
            style={{
              backgroundColor: "#1890ff",
              width: screens.xs ? 28 : 32,
              height: screens.xs ? 28 : 32,
              lineHeight: screens.xs ? "28px" : "32px",
            }}
          >
            AD
          </Avatar> */}
        </Space>
      </Header>

      <Content
        style={{
          padding: screens.xs ? "12px" : "24px",
          background: "#f0f2f5",
          marginTop: screens.xs ? 0 : undefined,
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          tabBarExtraContent={
            screens.md ? (
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
                size={screens.xs ? "small" : "middle"}
              />
            ) : null
          }
          tabPosition={screens.xs ? "top" : "top"}
          type={screens.xs ? "card" : "line"}
          size={screens.xs ? "small" : "middle"}
        />

        {/* Mobile Menu Drawer */}
        <Drawer
          // title="Menu"
          placement="left"
          closable={true}
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
          width={250}
        >
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            onClick={({ key }) => {
              setActiveTab(key);
              setMobileMenuVisible(false);
            }}
            items={[
              {
                key: "overview",
                icon: <DashboardOutlined />,
                label: "Overview",
              },
              {
                key: "users",
                icon: <UserOutlined />,
                label: "User Management",
              },
              {
                key: "courses",
                icon: <BookOutlined />,
                label: "Course Management",
              },
              { key: "settings", icon: <SettingOutlined />, label: "Settings" },
            ]}
          />
        </Drawer>

        {/* Add User Modal */}
        <Modal
          title="Add New User"
          open={isUserModalVisible}
          onOk={handleAddUser}
          onCancel={() => setIsUserModalVisible(false)}
          width={screens.xs ? "90%" : 520}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input size={screens.xs ? "small" : "middle"} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input the email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input size={screens.xs ? "small" : "middle"} />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select size={screens.xs ? "small" : "middle"}>
                <Option value="Admin">Administrator</Option>
                <Option value="Professor">Professor</Option>
                <Option value="Student">Student</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
