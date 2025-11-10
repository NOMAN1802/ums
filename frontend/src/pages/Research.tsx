/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Tabs,
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  DatePicker,
  Modal,
  Form,
  Statistic,
  Progress,
  List,
  Avatar,
  InputNumber,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FileTextOutlined,
  TeamOutlined,
  FundOutlined,
  BookOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

// Research data types
interface ResearchProject {
  id: string;
  title: string;
  principalInvestigator: string;
  status: "active" | "completed" | "pending";
  startDate: string;
  endDate: string;
  fundingAmount: number;
  fundingSource: string;
  department: string;
  progress: number;
  description: string;
}

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  publicationDate: string;
  impactFactor: number;
  citations: number;
  link: string;
}

interface Collaboration {
  id: string;
  projectTitle: string;
  partner: string;
  type: "industry" | "academic" | "government";
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "proposed";
}

interface Grant {
  id: string;
  title: string;
  amount: number;
  agency: string;
  status: "submitted" | "awarded" | "rejected";
  submissionDate: string;
  decisionDate: string;
}

const ResearchPage = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  //   const [setIsPublicationModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState<ResearchProject | null>(
    null
  );
  //   const [setCurrentPublication] = useState<Publication | null>(null);
  const [form] = Form.useForm();

  // Mock data for demonstration
  const [projects, setProjects] = useState<ResearchProject[]>([
    {
      id: "1",
      title: "Quantum Computing Algorithms",
      principalInvestigator: "Dr. Sarah Johnson",
      status: "active",
      startDate: "2023-01-15",
      endDate: "2025-12-31",
      fundingAmount: 1250000,
      fundingSource: "National Science Foundation",
      department: "Computer Science",
      progress: 65,
      description:
        "Developing new quantum algorithms for complex problem solving",
    },
    {
      id: "2",
      title: "Climate Change Impact on Coastal Ecosystems",
      principalInvestigator: "Dr. Michael Chen",
      status: "active",
      startDate: "2022-06-01",
      endDate: "2024-05-31",
      fundingAmount: 850000,
      fundingSource: "Environmental Protection Agency",
      department: "Environmental Science",
      progress: 45,
      description:
        "Studying the effects of rising sea levels on coastal biodiversity",
    },
    {
      id: "3",
      title: "Ancient Language Decipherment",
      principalInvestigator: "Dr. Emily Rodriguez",
      status: "completed",
      startDate: "2020-03-10",
      endDate: "2023-02-28",
      fundingAmount: 350000,
      fundingSource: "Humanities Research Council",
      department: "Linguistics",
      progress: 100,
      description: "Decoding previously undeciphered ancient scripts",
    },
    {
      id: "4",
      title: "Nanomedicine for Cancer Treatment",
      principalInvestigator: "Dr. James Wilson",
      status: "pending",
      startDate: "2024-01-01",
      endDate: "2026-12-31",
      fundingAmount: 0,
      fundingSource: "Pending approval",
      department: "Biomedical Engineering",
      progress: 0,
      description: "Developing nanoparticle-based drug delivery systems",
    },
  ]);

  const [publications] = useState<Publication[]>([
    {
      id: "1",
      title: "Advancements in Neural Network Architectures",
      authors: ["Dr. Sarah Johnson", "Dr. Robert Kim", "Alex Morgan"],
      journal: "Journal of Artificial Intelligence Research",
      publicationDate: "2023-05-15",
      impactFactor: 8.7,
      citations: 42,
      link: "https://example.com/publication/1",
    },
    {
      id: "2",
      title: "Marine Biodiversity in Changing Oceans",
      authors: ["Dr. Michael Chen", "Lisa Thompson", "Dr. James Wilson"],
      journal: "Marine Ecology Progress Series",
      publicationDate: "2023-02-28",
      impactFactor: 4.2,
      citations: 18,
      link: "https://example.com/publication/2",
    },
    {
      id: "3",
      title: "Deciphering the Linear B Script",
      authors: ["Dr. Emily Rodriguez"],
      journal: "Journal of Archaeological Science",
      publicationDate: "2022-11-10",
      impactFactor: 3.8,
      citations: 27,
      link: "https://example.com/publication/3",
    },
  ]);

  const [collaborations] = useState<Collaboration[]>([
    {
      id: "1",
      projectTitle: "Quantum Computing Algorithms",
      partner: "Tech Innovations Inc.",
      type: "industry",
      startDate: "2023-03-01",
      endDate: "2025-12-31",
      status: "active",
    },
    {
      id: "2",
      projectTitle: "Climate Change Impact Study",
      partner: "Oceanic Research Institute",
      type: "academic",
      startDate: "2022-08-15",
      endDate: "2024-05-31",
      status: "active",
    },
    {
      id: "3",
      projectTitle: "Sustainable Agriculture Practices",
      partner: "Department of Agriculture",
      type: "government",
      startDate: "2021-01-10",
      endDate: "2023-06-30",
      status: "completed",
    },
  ]);

  const [grants] = useState<Grant[]>([
    {
      id: "1",
      title: "Quantum Computing Research Grant",
      amount: 1250000,
      agency: "National Science Foundation",
      status: "awarded",
      submissionDate: "2022-10-15",
      decisionDate: "2023-01-10",
    },
    {
      id: "2",
      title: "Environmental Impact Study Funding",
      amount: 850000,
      agency: "Environmental Protection Agency",
      status: "awarded",
      submissionDate: "2022-03-20",
      decisionDate: "2022-06-15",
    },
    {
      id: "3",
      title: "Nanomedicine Research Initiative",
      amount: 2000000,
      agency: "National Institutes of Health",
      status: "submitted",
      submissionDate: "2023-07-01",
      decisionDate: "2023-11-30",
    },
  ]);

  // Filtered projects based on search and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchText.toLowerCase()) ||
      project.principalInvestigator
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    const matchesDepartment =
      filterDepartment === "all" || project.department === filterDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Project table columns
  const projectColumns = [
    {
      title: "Project Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: ResearchProject) => (
        <div>
          <div className="font-semibold">{text}</div>
          <div className="text-xs text-gray-500">
            {record.description.substring(0, 60)}...
          </div>
        </div>
      ),
    },
    {
      title: "Principal Investigator",
      dataIndex: "principalInvestigator",
      key: "principalInvestigator",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
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
              : status === "completed"
              ? "blue"
              : "orange"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress: number) => (
        <div className="flex items-center">
          <Progress
            percent={progress}
            size="small"
            status={progress === 100 ? "success" : "active"}
          />
          <span className="ml-2">{progress}%</span>
        </div>
      ),
    },
    {
      title: "Funding",
      dataIndex: "fundingAmount",
      key: "fundingAmount",
      render: (amount: number) => (
        <div className="font-medium">
          <DollarOutlined className="text-green-500 mr-1" />
          {amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: any, record: ResearchProject) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProject(record)}
            className="text-blue-500"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProject(record.id)}
            className="text-red-500"
          />
        </Space>
      ),
    },
  ];

  // Publication columns
  const publicationColumns = [
    {
      title: "Publication Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Authors",
      dataIndex: "authors",
      key: "authors",
      render: (authors: string[]) => authors.join(", "),
    },
    {
      title: "Journal",
      dataIndex: "journal",
      key: "journal",
    },
    {
      title: "Impact Factor",
      dataIndex: "impactFactor",
      key: "impactFactor",
      sorter: (a: Publication, b: Publication) =>
        a.impactFactor - b.impactFactor,
    },
    {
      title: "Citations",
      dataIndex: "citations",
      key: "citations",
      sorter: (a: Publication, b: Publication) => a.citations - b.citations,
    },
    {
      title: "Date",
      dataIndex: "publicationDate",
      key: "publicationDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  // Collaboration columns
  const collaborationColumns = [
    {
      title: "Project",
      dataIndex: "projectTitle",
      key: "projectTitle",
    },
    {
      title: "Partner",
      dataIndex: "partner",
      key: "partner",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag
          color={
            type === "industry"
              ? "purple"
              : type === "academic"
              ? "blue"
              : "green"
          }
        >
          {type.toUpperCase()}
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
              : status === "completed"
              ? "blue"
              : "orange"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      render: (_text: any, record: Collaboration) => (
        <div>
          {new Date(record.startDate).toLocaleDateString()} -{" "}
          {new Date(record.endDate).toLocaleDateString()}
        </div>
      ),
    },
  ];

  // Grant columns
  const grantColumns = [
    {
      title: "Grant Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Agency",
      dataIndex: "agency",
      key: "agency",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <div className="font-medium">
          <DollarOutlined className="text-green-500 mr-1" />
          {amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
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
            status === "awarded"
              ? "green"
              : status === "submitted"
              ? "blue"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Submitted",
      dataIndex: "submissionDate",
      key: "submissionDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Decision",
      dataIndex: "decisionDate",
      key: "decisionDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  // Handlers for projects
  const handleAddProject = () => {
    setCurrentProject(null);
    form.resetFields();
    setIsProjectModalVisible(true);
  };

  const handleEditProject = (project: ResearchProject) => {
    setCurrentProject(project);
    form.setFieldsValue({
      ...project,
      startDate: project.startDate ? project.startDate : null,
      endDate: project.endDate ? project.endDate : null,
    });
    setIsProjectModalVisible(true);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleProjectSubmit = () => {
    form.validateFields().then((values) => {
      const projectData = {
        ...values,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
        progress: values.progress || 0,
      };

      if (currentProject) {
        // Update project
        setProjects(
          projects.map((project) =>
            project.id === currentProject.id
              ? { ...projectData, id: currentProject.id }
              : project
          )
        );
      } else {
        // Add new project
        const newProject = {
          ...projectData,
          id: `project-${Date.now()}`,
        };
        setProjects([...projects, newProject]);
      }

      setIsProjectModalVisible(false);
    });
  };

  // Publication handlers
  //   const handleAddPublication = () => {
  //     setCurrentPublication(null);
  //     setIsPublicationModalVisible(true);
  //   };

  //   const handleEditPublication = (publication: Publication) => {
  //     setCurrentPublication(publication);
  //     setIsPublicationModalVisible(true);
  //   };

  // Statistics data
  const totalFunding = projects.reduce(
    (sum, project) => sum + project.fundingAmount,
    0
  );
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const highImpactPublications = publications.filter(
    (p) => p.impactFactor > 5
  ).length;

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Research Management
          </h1>
          <p className="text-gray-600">
            Track and manage research projects, publications, and collaborations
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-md border-0">
            <Statistic
              title="Total Projects"
              value={projects.length}
              prefix={<FileTextOutlined className="text-blue-500" />}
            />
          </Card>
          <Card className="shadow-md border-0">
            <Statistic
              title="Active Projects"
              value={activeProjects}
              prefix={<BookOutlined className="text-green-500" />}
            />
          </Card>
          <Card className="shadow-md border-0">
            <Statistic
              title="Total Funding"
              value={totalFunding}
              prefix={<DollarOutlined className="text-purple-500" />}
              valueStyle={{ color: "#3f8600" }}
              formatter={(value) => (
                <span>
                  {(value as number).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                </span>
              )}
            />
          </Card>
          <Card className="shadow-md border-0">
            <Statistic
              title="High-Impact Publications"
              value={highImpactPublications}
              prefix={<FundOutlined className="text-red-500" />}
            />
          </Card>
        </div>

        {/* Tabs Section */}
        <Card className="shadow-lg border-0">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-4">
            <TabPane
              tab={
                <span className="flex items-center">
                  <FileTextOutlined className="mr-2" />
                  Research Projects
                </span>
              }
              key="projects"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
                <Input
                  placeholder="Search projects..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ maxWidth: "300px" }}
                />
                <div className="flex flex-wrap gap-3">
                  <Select
                    placeholder="Filter by status"
                    value={filterStatus}
                    onChange={setFilterStatus}
                    style={{ width: "150px" }}
                    allowClear
                  >
                    <Option value="all">All Statuses</Option>
                    <Option value="active">Active</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="pending">Pending</Option>
                  </Select>
                  <Select
                    placeholder="Filter by department"
                    value={filterDepartment}
                    onChange={setFilterDepartment}
                    style={{ width: "180px" }}
                    allowClear
                  >
                    <Option value="all">All Departments</Option>
                    <Option value="Computer Science">Computer Science</Option>
                    <Option value="Environmental Science">
                      Environmental Science
                    </Option>
                    <Option value="Linguistics">Linguistics</Option>
                    <Option value="Biomedical Engineering">
                      Biomedical Engineering
                    </Option>
                  </Select>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddProject}
                  >
                    New Project
                  </Button>
                </div>
              </div>

              <Table
                columns={projectColumns}
                dataSource={filteredProjects}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                scroll={{ x: "max-content" }}
              />
            </TabPane>

            <TabPane
              tab={
                <span className="flex items-center">
                  <BookOutlined className="mr-2" />
                  Publications
                </span>
              }
              key="publications"
            >
              <div className="mb-4 flex justify-end">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  //   onClick={handleAddPublication}
                >
                  Add Publication
                </Button>
              </div>

              <Table
                columns={publicationColumns}
                dataSource={publications}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </TabPane>

            <TabPane
              tab={
                <span className="flex items-center">
                  <TeamOutlined className="mr-2" />
                  Collaborations
                </span>
              }
              key="collaborations"
            >
              <Table
                columns={collaborationColumns}
                dataSource={collaborations}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </TabPane>

            <TabPane
              tab={
                <span className="flex items-center">
                  <DollarOutlined className="mr-2" />
                  Grants
                </span>
              }
              key="grants"
            >
              <Table
                columns={grantColumns}
                dataSource={grants}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </TabPane>
          </Tabs>
        </Card>

        {/* Active Researchers */}
        <Card title="Top Researchers" className="mt-6 shadow-lg border-0">
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                name: "Dr. Sarah Johnson",
                department: "Computer Science",
                projects: 4,
                publications: 12,
                image: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Dr. Michael Chen",
                department: "Environmental Science",
                projects: 3,
                publications: 8,
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Dr. Emily Rodriguez",
                department: "Linguistics",
                projects: 2,
                publications: 6,
                image: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                name: "Dr. James Wilson",
                department: "Biomedical Engineering",
                projects: 1,
                publications: 9,
                image: "https://randomuser.me/api/portraits/men/22.jpg",
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} size={64} />}
                  title={<a className="text-lg font-semibold">{item.name}</a>}
                  description={
                    <div>
                      <div className="text-gray-600">{item.department}</div>
                      <div className="flex mt-2">
                        <Tag icon={<FileTextOutlined />} color="blue">
                          {item.projects} projects
                        </Tag>
                        <Tag
                          icon={<BookOutlined />}
                          color="green"
                          className="ml-2"
                        >
                          {item.publications} publications
                        </Tag>
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* Project Modal */}
      <Modal
        title={
          currentProject ? "Edit Research Project" : "Add New Research Project"
        }
        open={isProjectModalVisible}
        onOk={handleProjectSubmit}
        onCancel={() => setIsProjectModalVisible(false)}
        okText={currentProject ? "Update" : "Add"}
        cancelText="Cancel"
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Project Title"
            name="title"
            rules={[{ required: true, message: "Please enter project title" }]}
          >
            <Input placeholder="Enter project title" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Principal Investigator"
              name="principalInvestigator"
              rules={[{ required: true, message: "Please enter PI name" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: "Please select department" }]}
            >
              <Select placeholder="Select department">
                <Option value="Computer Science">Computer Science</Option>
                <Option value="Environmental Science">
                  Environmental Science
                </Option>
                <Option value="Linguistics">Linguistics</Option>
                <Option value="Biomedical Engineering">
                  Biomedical Engineering
                </Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: "Please select end date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Funding Source"
              name="fundingSource"
              rules={[
                { required: true, message: "Please enter funding source" },
              ]}
            >
              <Input placeholder="e.g., National Science Foundation" />
            </Form.Item>

            <Form.Item
              label="Funding Amount"
              name="fundingAmount"
              rules={[
                { required: true, message: "Please enter funding amount" },
              ]}
            >
              <InputNumber
                min={0}
                className="w-full"
                placeholder="Enter amount"
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select status">
                <Option value="active">Active</Option>
                <Option value="completed">Completed</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Progress (%)" name="progress">
              <InputNumber min={0} max={100} className="w-full" />
            </Form.Item>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter project description" },
            ]}
          >
            <TextArea rows={4} placeholder="Describe the research project" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResearchPage;
