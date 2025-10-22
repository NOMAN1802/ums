/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  Tabs,
  Card,
  Table,
  Tag,
  Button,
  Space,
  Form,
  Statistic,
  Progress,
  List,
  Divider,
  Row,
  Col,
  Timeline,
  Calendar,
  Dropdown,
  Drawer,
  Menu,
} from "antd";
import {
  PlusOutlined,
  BookOutlined,
  TrophyOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  FundOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  AppstoreOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

interface TrainingProgram {
  id: string;
  title: string;
  type: "workshop" | "seminar" | "conference" | "online-course";
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  status: "upcoming" | "ongoing" | "completed";
  participants: number;
  maxParticipants: number;
  description: string;
}

interface Certification {
  id: string;
  name: string;
  provider: string;
  dateObtained: string;
  expirationDate?: string;
  status: "active" | "expired" | "pending";
  credentialId?: string;
}

interface ResearchOpportunity {
  id: string;
  title: string;
  type: "grant" | "collaboration" | "fellowship";
  deadline: string;
  fundingAmount?: number;
  status: "open" | "closed" | "awarded";
  department: string;
}

interface FacultyAchievement {
  id: string;
  facultyName: string;
  achievement: string;
  date: string;
  type: "award" | "publication" | "certification" | "other";
}

const AcademicDevelopmentPage = () => {
  const [activeTab, setActiveTab] = useState("training");
  const [, setIsTrainingModalVisible] = useState(false);
  const [, setIsCertificationModalVisible] = useState(false);
  const [, setCurrentTraining] = useState<TrainingProgram | null>(null);
  const [, setCurrentCertification] = useState<Certification | null>(null);
  const [form] = Form.useForm();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([
    {
      id: "1",
      title: "Innovative Teaching Strategies",
      type: "workshop",
      startDate: "2023-11-15",
      endDate: "2023-11-16",
      location: "Education Building, Room 205",
      organizer: "Center for Teaching Excellence",
      status: "upcoming",
      participants: 24,
      maxParticipants: 30,
      description:
        "Learn cutting-edge teaching methodologies for engaging today's students",
    },
    {
      id: "2",
      title: "Research Ethics and Compliance",
      type: "seminar",
      startDate: "2023-10-25",
      endDate: "2023-10-25",
      location: "Research Hall Auditorium",
      organizer: "Office of Research Integrity",
      status: "ongoing",
      participants: 42,
      maxParticipants: 50,
      description: "Understanding ethical considerations in academic research",
    },
    {
      id: "3",
      title: "Digital Learning Platforms Certification",
      type: "online-course",
      startDate: "2023-09-01",
      endDate: "2023-12-15",
      location: "Online",
      organizer: "EdTech Institute",
      status: "ongoing",
      participants: 18,
      maxParticipants: 25,
      description:
        "Mastering learning management systems and digital teaching tools",
    },
    {
      id: "4",
      title: "International Education Conference",
      type: "conference",
      startDate: "2024-03-10",
      endDate: "2024-03-13",
      location: "San Francisco, CA",
      organizer: "Global Education Network",
      status: "upcoming",
      participants: 8,
      maxParticipants: 15,
      description: "Global trends and innovations in higher education",
    },
  ]);

  // Mock data for certifications
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "Project Management Professional (PMP)",
      provider: "Project Management Institute",
      dateObtained: "2022-05-15",
      expirationDate: "2025-05-15",
      status: "active",
      credentialId: "PMP-123456",
    },
    {
      id: "2",
      name: "Google Certified Educator Level 2",
      provider: "Google for Education",
      dateObtained: "2023-02-20",
      status: "active",
    },
    {
      id: "3",
      name: "Certified Online Instructor",
      provider: "Online Learning Consortium",
      dateObtained: "2020-08-10",
      expirationDate: "2023-08-10",
      status: "expired",
    },
  ]);

  // Mock data for research opportunities
  const [researchOpportunities] = useState<ResearchOpportunity[]>([
    {
      id: "1",
      title: "NSF Research Grant for STEM Education",
      type: "grant",
      deadline: "2023-12-01",
      fundingAmount: 250000,
      status: "open",
      department: "All STEM Departments",
    },
    {
      id: "2",
      title: "Humanities Research Fellowship",
      type: "fellowship",
      deadline: "2024-01-15",
      fundingAmount: 75000,
      status: "open",
      department: "Humanities",
    },
    {
      id: "3",
      title: "Industry-Academia Collaboration Program",
      type: "collaboration",
      deadline: "2023-11-10",
      status: "open",
      department: "Engineering & Business",
    },
    {
      id: "4",
      title: "Climate Change Research Initiative",
      type: "grant",
      deadline: "2023-10-30",
      fundingAmount: 500000,
      status: "open",
      department: "Environmental Science",
    },
  ]);

  // Mock data for faculty achievements
  const [facultyAchievements] = useState<FacultyAchievement[]>([
    {
      id: "1",
      facultyName: "Dr. Sarah Johnson",
      achievement: "Published in Nature Journal",
      date: "2023-09-15",
      type: "publication",
    },
    {
      id: "2",
      facultyName: "Prof. Michael Chen",
      achievement: "Received NSF CAREER Award",
      date: "2023-08-20",
      type: "award",
    },
    {
      id: "3",
      facultyName: "Dr. Emily Rodriguez",
      achievement: "Certified Master Online Instructor",
      date: "2023-10-05",
      type: "certification",
    },
    {
      id: "4",
      facultyName: "Dr. James Wilson",
      achievement: "Patented new medical device",
      date: "2023-07-30",
      type: "other",
    },
  ]);

  // Training program columns
  const trainingColumns = [
    {
      title: "Program Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: TrainingProgram) => (
        <div>
          <div className="font-semibold">{text}</div>
          <div className="text-xs text-gray-500">
            {record.description.substring(0, 70)}...
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag
          color={
            type === "workshop"
              ? "blue"
              : type === "seminar"
              ? "purple"
              : type === "conference"
              ? "orange"
              : "cyan"
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Schedule",
      key: "schedule",
      render: (record: TrainingProgram) => (
        <div>
          <div>
            {new Date(record.startDate).toLocaleDateString()} -{" "}
            {new Date(record.endDate).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">{record.location}</div>
        </div>
      ),
    },
    {
      title: "Participation",
      key: "participation",
      render: (record: TrainingProgram) => (
        <div>
          <Progress
            percent={Math.round(
              (record.participants / record.maxParticipants) * 100
            )}
            size="small"
            status={record.status === "completed" ? "success" : "active"}
          />
          <div className="text-xs text-gray-500">
            {record.participants} of {record.maxParticipants} registered
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "upcoming"
              ? "blue"
              : status === "ongoing"
              ? "green"
              : "gray"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: any, record: TrainingProgram) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditTraining(record)}
            className="text-blue-500"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTraining(record.id)}
            className="text-red-500"
          />
        </Space>
      ),
    },
  ];

  // Certification columns
  const certificationColumns = [
    {
      title: "Certification",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Date Obtained",
      dataIndex: "dateObtained",
      key: "dateObtained",
      render: (date: string) => new Date(date).toLocaleDateString(),
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
              : status === "expired"
              ? "red"
              : "orange"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: any, record: Certification) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCertification(record)}
            className="text-blue-500"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCertification(record.id)}
            className="text-red-500"
          />
        </Space>
      ),
    },
  ];

  // Handlers for training programs
  const handleAddTraining = () => {
    setCurrentTraining(null);
    form.resetFields();
    setIsTrainingModalVisible(true);
  };

  const handleEditTraining = (training: TrainingProgram) => {
    setCurrentTraining(training);
    form.setFieldsValue({
      ...training,
      startDate: training.startDate ? training.startDate : null,
      endDate: training.endDate ? training.endDate : null,
    });
    setIsTrainingModalVisible(true);
  };

  const handleDeleteTraining = (id: string) => {
    setTrainingPrograms(trainingPrograms.filter((t) => t.id !== id));
  };

  // Handlers for certifications
  const handleAddCertification = () => {
    setCurrentCertification(null);
    setIsCertificationModalVisible(true);
  };

  const handleEditCertification = (cert: Certification) => {
    setCurrentCertification(cert);
    setIsCertificationModalVisible(true);
  };

  const handleDeleteCertification = (id: string) => {
    setCertifications(certifications.filter((c) => c.id !== id));
  };

  // ... (mock data remains the same)

  // ... (columns definitions remain the same)

  // ... (handlers remain the same)

  // Responsive layout adjustments
  const isMobile = window.innerWidth < 768;

  // Mobile menu items
  const mobileMenu = (
    <Menu>
      <Menu.Item
        key="training"
        onClick={() => {
          setActiveTab("training");
          setMobileMenuVisible(false);
        }}
      >
        <BookOutlined /> Training
      </Menu.Item>
      <Menu.Item
        key="certifications"
        onClick={() => {
          setActiveTab("certifications");
          setMobileMenuVisible(false);
        }}
      >
        <TrophyOutlined /> Certifications
      </Menu.Item>
      <Menu.Item
        key="research"
        onClick={() => {
          setActiveTab("research");
          setMobileMenuVisible(false);
        }}
      >
        <FundOutlined /> Research
      </Menu.Item>
      <Menu.Item
        key="achievements"
        onClick={() => {
          setMobileMenuVisible(false);
          window.scrollTo(0, document.body.scrollHeight);
        }}
      >
        <UserOutlined /> Achievements
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header */}
        {isMobile && (
          <div className="flex justify-between items-center mb-4">
            <Button
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(true)}
              className="mr-2"
            />
            <h1 className="text-xl font-bold text-gray-800">
              <RiseOutlined className="mr-2 text-blue-500" />
              Academic Development
            </h1>
            <div></div> {/* Spacer */}
          </div>
        )}

        {/* Desktop Header */}
        {!isMobile && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <RiseOutlined className="mr-3 text-blue-500" />
              Academic Development
            </h1>
            <p className="text-gray-600">
              Professional growth opportunities for faculty and staff
            </p>
          </div>
        )}

        {/* Stats Overview - Responsive Grid */}
        <div
          className={`grid ${
            isMobile ? "grid-cols-2" : "grid-cols-1 md:grid-cols-4"
          } gap-4 mb-6`}
        >
          <Card className="shadow-md border-0">
            <Statistic
              title="Training"
              value={trainingPrograms.length}
              prefix={<BookOutlined className="text-blue-500" />}
              className={isMobile ? "text-sm" : ""}
            />
          </Card>
          <Card className="shadow-md border-0">
            <Statistic
              title="Certifications"
              value={certifications.filter((c) => c.status === "active").length}
              prefix={<TrophyOutlined className="text-green-500" />}
              className={isMobile ? "text-sm" : ""}
            />
          </Card>
          <Card className="shadow-md border-0">
            <Statistic
              title="Research"
              value={
                researchOpportunities.filter((r) => r.status === "open").length
              }
              prefix={<FundOutlined className="text-purple-500" />}
              className={isMobile ? "text-sm" : ""}
            />
          </Card>
          <Card className="shadow-md border-0">
            <Statistic
              title="Achievements"
              value={facultyAchievements.length}
              prefix={<CheckCircleOutlined className="text-red-500" />}
              className={isMobile ? "text-sm" : ""}
            />
          </Card>
        </div>

        {/* Mobile Navigation Drawer */}
        <Drawer
          title="Navigation"
          placement="left"
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
          width={250}
        >
          {mobileMenu}
        </Drawer>

        {/* Mobile Tab Navigation */}
        {isMobile && (
          <Dropdown overlay={mobileMenu} trigger={["click"]}>
            <Button className="w-full mb-4 flex items-center justify-center">
              <AppstoreOutlined className="mr-2" />
              {activeTab === "training" && "Training"}
              {activeTab === "certifications" && "Certifications"}
              {activeTab === "research" && "Research"}
              {activeTab === "achievements" && "Achievements"}
            </Button>
          </Dropdown>
        )}

        {/* Main Content */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} md={16}>
            <Card className="shadow-lg border-0">
              {!isMobile ? (
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  className="mb-4"
                >
                  <TabPane
                    tab={
                      <span className="flex items-center">
                        <BookOutlined className="mr-2" />
                        Training
                      </span>
                    }
                    key="training"
                  >
                    <div className="mb-4 flex justify-end">
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddTraining}
                        size={isMobile ? "small" : "middle"}
                      >
                        {isMobile ? "Add" : "Add Training"}
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <Table
                        columns={trainingColumns}
                        dataSource={trainingPrograms}
                        rowKey="id"
                        pagination={{
                          pageSize: 4,
                          size: isMobile ? "small" : "default",
                        }}
                        scroll={{ x: "max-content" }}
                      />
                    </div>
                  </TabPane>

                  <TabPane
                    tab={
                      <span className="flex items-center">
                        <TrophyOutlined className="mr-2" />
                        Certifications
                      </span>
                    }
                    key="certifications"
                  >
                    <div className="mb-4 flex justify-end">
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddCertification}
                        size={isMobile ? "small" : "middle"}
                      >
                        {isMobile ? "Add" : "Add Certification"}
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <Table
                        columns={certificationColumns}
                        dataSource={certifications}
                        rowKey="id"
                        pagination={{
                          pageSize: 5,
                          size: isMobile ? "small" : "default",
                        }}
                        scroll={{ x: "max-content" }}
                      />
                    </div>
                  </TabPane>

                  <TabPane
                    tab={
                      <span className="flex items-center">
                        <FundOutlined className="mr-2" />
                        Research
                      </span>
                    }
                    key="research"
                  >
                    <List
                      itemLayout="vertical"
                      dataSource={researchOpportunities}
                      renderItem={(item) => (
                        <List.Item
                          extra={
                            item.fundingAmount && !isMobile ? (
                              <div className="font-bold text-lg">
                                <DollarOutlined className="text-green-500 mr-1" />
                                {item.fundingAmount.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 0,
                                })}
                              </div>
                            ) : null
                          }
                        >
                          <List.Item.Meta
                            title={
                              <a className="font-semibold">{item.title}</a>
                            }
                            description={
                              <div>
                                <Tag
                                  color={
                                    item.type === "grant"
                                      ? "blue"
                                      : item.type === "fellowship"
                                      ? "purple"
                                      : "orange"
                                  }
                                >
                                  {item.type.toUpperCase()}
                                </Tag>
                                <span className="ml-2">
                                  Deadline:{" "}
                                  {new Date(item.deadline).toLocaleDateString()}
                                </span>
                              </div>
                            }
                          />
                          <div className="flex justify-between flex-wrap">
                            <div className="mb-2 sm:mb-0">
                              <Tag
                                color={item.status === "open" ? "green" : "red"}
                                className="capitalize"
                              >
                                {item.status}
                              </Tag>
                              <span className="ml-2 text-gray-600">
                                {item.department}
                              </span>
                            </div>
                            <Button type="primary" size="small">
                              Apply
                            </Button>
                          </div>
                          {isMobile && item.fundingAmount && (
                            <div className="mt-2 font-bold">
                              <DollarOutlined className="text-green-500 mr-1" />
                              {item.fundingAmount.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                              })}
                            </div>
                          )}
                        </List.Item>
                      )}
                    />
                  </TabPane>
                </Tabs>
              ) : (
                // Mobile tab content without tab headers
                <div>
                  {activeTab === "training" && (
                    <div>
                      <div className="mb-4 flex justify-end">
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={handleAddTraining}
                          size="small"
                        >
                          Add
                        </Button>
                      </div>

                      <div className="overflow-x-auto">
                        <Table
                          columns={trainingColumns}
                          dataSource={trainingPrograms}
                          rowKey="id"
                          pagination={{ pageSize: 4, size: "small" }}
                          scroll={{ x: "max-content" }}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "certifications" && (
                    <div>
                      <div className="mb-4 flex justify-end">
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={handleAddCertification}
                          size="small"
                        >
                          Add
                        </Button>
                      </div>

                      <div className="overflow-x-auto">
                        <Table
                          columns={certificationColumns}
                          dataSource={certifications}
                          rowKey="id"
                          pagination={{ pageSize: 5, size: "small" }}
                          scroll={{ x: "max-content" }}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "research" && (
                    <List
                      itemLayout="vertical"
                      dataSource={researchOpportunities}
                      renderItem={(item) => (
                        <List.Item
                          extra={
                            item.fundingAmount && !isMobile ? (
                              <div className="font-bold text-lg">
                                <DollarOutlined className="text-green-500 mr-1" />
                                {item.fundingAmount.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 0,
                                })}
                              </div>
                            ) : null
                          }
                        >
                          <List.Item.Meta
                            title={
                              <a className="font-semibold">{item.title}</a>
                            }
                            description={
                              <div>
                                <Tag
                                  color={
                                    item.type === "grant"
                                      ? "blue"
                                      : item.type === "fellowship"
                                      ? "purple"
                                      : "orange"
                                  }
                                >
                                  {item.type.toUpperCase()}
                                </Tag>
                                <span className="ml-2">
                                  Deadline:{" "}
                                  {new Date(item.deadline).toLocaleDateString()}
                                </span>
                              </div>
                            }
                          />
                          <div className="flex justify-between flex-wrap">
                            <div className="mb-2 sm:mb-0">
                              <Tag
                                color={item.status === "open" ? "green" : "red"}
                                className="capitalize"
                              >
                                {item.status}
                              </Tag>
                              <span className="ml-2 text-gray-600">
                                {item.department}
                              </span>
                            </div>
                            <Button type="primary" size="small">
                              Apply
                            </Button>
                          </div>
                          {isMobile && item.fundingAmount && (
                            <div className="mt-2 font-bold">
                              <DollarOutlined className="text-green-500 mr-1" />
                              {item.fundingAmount.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                              })}
                            </div>
                          )}
                        </List.Item>
                      )}
                    />
                  )}
                </div>
              )}
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              title="Faculty Achievements"
              className="shadow-lg border-0 mb-4"
            >
              <Timeline mode={isMobile ? "alternate" : "left"}>
                {facultyAchievements.map((achievement) => (
                  <Timeline.Item
                    key={achievement.id}
                    label={new Date(achievement.date).toLocaleDateString()}
                    dot={
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          achievement.type === "award"
                            ? "bg-blue-100"
                            : achievement.type === "publication"
                            ? "bg-purple-100"
                            : achievement.type === "certification"
                            ? "bg-green-100"
                            : "bg-orange-100"
                        }`}
                      >
                        {achievement.type === "award" ? (
                          <TrophyOutlined className="text-blue-500" />
                        ) : achievement.type === "publication" ? (
                          <FileTextOutlined className="text-purple-500" />
                        ) : achievement.type === "certification" ? (
                          <CheckCircleOutlined className="text-green-500" />
                        ) : (
                          <RiseOutlined className="text-orange-500" />
                        )}
                      </div>
                    }
                  >
                    <div className="font-medium text-sm md:text-base">
                      {achievement.facultyName}
                    </div>
                    <div className="text-xs md:text-sm">
                      {achievement.achievement}
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>

            <Card title="Development Calendar" className="shadow-lg border-0">
              <Calendar
                fullscreen={false}
                headerRender={() => null}
                className="border-0"
                style={{ maxHeight: isMobile ? "300px" : "auto" }}
              />
              <Divider className="my-4" />
              <div className="font-medium mb-2">Upcoming Events:</div>
              <List
                size="small"
                dataSource={trainingPrograms
                  .filter((t) => t.status === "upcoming")
                  .slice(0, 3)}
                renderItem={(item) => (
                  <List.Item className="text-xs md:text-sm">
                    <List.Item.Meta
                      avatar={<CalendarOutlined className="text-blue-500" />}
                      title={
                        <span className="text-xs md:text-sm">{item.title}</span>
                      }
                      description={`${new Date(
                        item.startDate
                      ).toLocaleDateString()} • ${item.location}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Recommended Resources */}
        <Card title="Recommended Resources" className="shadow-lg border-0">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card
                title="Online Learning"
                bordered={false}
                className="bg-blue-50 border-0"
                size="small"
              >
                <List size="small">
                  <List.Item className="text-xs md:text-sm">
                    Coursera for Campus
                  </List.Item>
                  <List.Item className="text-xs md:text-sm">
                    edX University Program
                  </List.Item>
                  <List.Item className="text-xs md:text-sm">
                    LinkedIn Learning
                  </List.Item>
                  <List.Item className="text-xs md:text-sm">
                    Academic Earth
                  </List.Item>
                </List>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                title="Funding"
                bordered={false}
                className="bg-green-50 border-0"
                size="small"
              >
                <List size="small">
                  <List.Item className="text-xs md:text-sm">
                    NSF STEM Grants
                  </List.Item>
                  <List.Item className="text-xs md:text-sm">
                    Education Funding
                  </List.Item>
                  <List.Item className="text-xs md:text-sm">
                    Research Foundations
                  </List.Item>
                  <List.Item className="text-xs md:text-sm">
                    Industry Partnerships
                  </List.Item>
                </List>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                title="Associations"
                bordered={false}
                className="bg-purple-50 border-0"
                size="small"
              >
                <List size="small">
                  <List.Item className="text-xs md:text-sm">AAUP</List.Item>
                  <List.Item className="text-xs md:text-sm">NEA</List.Item>
                  <List.Item className="text-xs md:text-sm">
                    Disciplinary Groups
                  </List.Item>
                  <List.Item className="text-xs md:text-sm">
                    Leadership Network
                  </List.Item>
                </List>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      {/* ... (modals remain the same) */}
    </div>
  );
};

export default AcademicDevelopmentPage;
