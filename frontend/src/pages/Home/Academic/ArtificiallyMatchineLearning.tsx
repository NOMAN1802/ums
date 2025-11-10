import {
  Card,
  Tabs,
  Tag,
  Button,
  Row,
  Col,
  Statistic,
  Divider,
  Space,
  Collapse,
} from "antd";
import {
  RobotOutlined,
  TeamOutlined,
  BookOutlined,
  TrophyOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  UserOutlined,
  GlobalOutlined,
  ClusterOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import { AiOutlineApi } from "react-icons/ai";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const AIMLPage = () => {
  // Mock data for programs
  const programs = [
    {
      id: "1",
      name: "BSc in Artificial Intelligence",
      type: "Undergraduate",
      duration: "4 years",
      credits: 120,
      description:
        "Foundational program covering core AI principles, algorithms, and applications",
      courses: [
        "AI Fundamentals",
        "Neural Networks",
        "Cognitive Computing",
        "Robotics",
      ],
    },
    {
      id: "2",
      name: "MSc in Machine Learning",
      type: "Graduate",
      duration: "2 years",
      credits: 60,
      description:
        "Advanced study of ML algorithms, deep learning, and real-world applications",
      courses: [
        "Deep Learning",
        "Reinforcement Learning",
        "Probabilistic Models",
        "ML Ops",
      ],
    },
    {
      id: "3",
      name: "PhD in AI Research",
      type: "Doctoral",
      duration: "4-6 years",
      credits: 90,
      description:
        "Research-focused program advancing the frontiers of artificial intelligence",
      courses: [
        "AI Ethics",
        "Advanced NLP",
        "Computer Vision",
        "Autonomous Systems",
      ],
    },
    {
      id: "4",
      name: "AI Engineering Certificate",
      type: "Certificate",
      duration: "8 months",
      credits: 24,
      description: "Practical training in deploying AI systems at scale",
      courses: [
        "ML Engineering",
        "Cloud AI",
        "Model Deployment",
        "AI Infrastructure",
      ],
    },
  ];

  // Mock data for faculty
  const faculty = [
    {
      id: "1",
      name: "Dr. Elena Rodriguez",
      title: "Professor of Deep Learning",
      expertise: ["Transformers", "Generative Models"],
      email: "e.rodriguez@university.edu",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: "2",
      name: "Prof. Kenji Tanaka",
      title: "Associate Professor of Robotics",
      expertise: ["Autonomous Systems", "Computer Vision"],
      email: "k.tanaka@university.edu",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
    },
    {
      id: "3",
      name: "Dr. Sophia Williams",
      title: "Assistant Professor of AI Ethics",
      expertise: ["Responsible AI", "Algorithmic Bias"],
      email: "s.williams@university.edu",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      id: "4",
      name: "Dr. Marcus Johnson",
      title: "Professor of Natural Language Processing",
      expertise: ["Large Language Models", "Conversational AI"],
      email: "m.johnson@university.edu",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  // Research areas
  const researchAreas = [
    {
      id: "1",
      name: "Computer Vision",
      icon: <ClusterOutlined />,
      description: "Developing algorithms for image and video understanding",
      projects: 12,
      funding: "$2.8M",
    },
    {
      id: "2",
      name: "Natural Language Processing",
      icon: <AiOutlineApi />,
      description: "Understanding and generating human language",
      projects: 15,
      funding: "$3.2M",
    },
    {
      id: "3",
      name: "Robotics & Autonomous Systems",
      icon: <RobotOutlined />,
      description:
        "Creating intelligent machines that interact with the physical world",
      projects: 8,
      funding: "$1.9M",
    },
    {
      id: "4",
      name: "AI Safety & Ethics",
      icon: <SecurityScanOutlined />,
      description: "Ensuring AI systems are safe, fair, and transparent",
      projects: 10,
      funding: "$1.5M",
    },
  ];

  // Resources
  const resources = [
    {
      id: "1",
      name: "AI Research Lab",
      description: "State-of-the-art computing facilities for AI research",
      specs: ["100+ GPU nodes", "5PB storage", "Quantum computing access"],
    },
    {
      id: "2",
      name: "Robotics Arena",
      description: "Dedicated space for robotics development and testing",
      specs: ["2000 sq ft", "Motion capture", "Simulation environments"],
    },
    {
      id: "3",
      name: "AI Datasets Repository",
      description: "Curated datasets for machine learning research",
      specs: ["100+ datasets", "Medical imaging", "Multimodal data"],
    },
    {
      id: "4",
      name: "Deep Learning Cluster",
      description: "Specialized hardware for training large models",
      specs: ["A100 GPUs", "Distributed training", "Model optimization"],
    },
  ];

  // Events
  const events = [
    {
      id: "1",
      name: "AI Innovation Summit",
      date: "2023-11-20",
      location: "Tech Hall",
    },
    {
      id: "2",
      name: "ML Hackathon",
      date: "2023-12-05",
      location: "Innovation Lab",
    },
    {
      id: "3",
      name: "Ethics in AI Conference",
      date: "2024-01-15",
      location: "Ethics Center",
    },
    {
      id: "4",
      name: "Robotics Expo",
      date: "2024-02-10",
      location: "Robotics Arena",
    },
  ];

  // Stats
  const stats = [
    { name: "Students", value: 720, icon: <TeamOutlined />, color: "#1890ff" },
    { name: "Faculty", value: 28, icon: <UserOutlined />, color: "#52c41a" },
    {
      name: "Research Projects",
      value: 45,
      icon: <ExperimentOutlined />,
      color: "#faad14",
    },
    {
      name: "Industry Partners",
      value: 18,
      icon: <GlobalOutlined />,
      color: "#f5222d",
    },
  ];

  return (
    <div className="ai-ml-page bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center">
                <RobotOutlined className="mr-4 text-blue-300 animate-pulse" />
                Department of AI & Machine Learning
              </h1>
              <p className="text-xl mb-6 text-blue-100">
                Shaping the future through intelligent systems and algorithms
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="primary"
                  size="large"
                  className="bg-blue-500 border-blue-500"
                >
                  Apply Now
                </Button>
                <Button
                  size="large"
                  className="bg-white text-blue-800 hover:bg-gray-100"
                >
                  Virtual Tour
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl w-full h-64 md:h-80 flex items-center justify-center shadow-xl">
                <div className="grid grid-cols-3 gap-2 p-4">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white bg-opacity-20 rounded-lg w-16 h-16 flex items-center justify-center"
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <Statistic
                  title={stat.name}
                  value={stat.value}
                  valueStyle={{ fontSize: "28px", color: stat.color }}
                />
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Research Highlights */}
      <div className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Research Frontiers
          </h2>

          <Row gutter={[24, 24]}>
            {researchAreas.map((area) => (
              <Col xs={24} md={12} lg={6} key={area.id}>
                <Card
                  className="h-full border-0 shadow-lg hover:shadow-xl transition-all"
                  cover={
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32 flex items-center justify-center">
                      <div className="text-white text-4xl">{area.icon}</div>
                    </div>
                  }
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{area.name}</h3>
                    <p className="text-gray-600 mb-4">{area.description}</p>
                    <div className="flex justify-center space-x-4">
                      <Tag color="blue">{area.projects} projects</Tag>
                      <Tag color="green">{area.funding}</Tag>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultActiveKey="programs" className="mb-8" tabPosition="top">
            <TabPane
              tab={
                <span className="flex items-center">
                  <BookOutlined className="mr-2" />
                  Academic Programs
                </span>
              }
              key="programs"
            >
              <Row gutter={[24, 24]}>
                {programs.map((program) => (
                  <Col xs={24} md={12} key={program.id}>
                    <Card
                      className="h-full border-0 shadow-md hover:shadow-lg transition-all"
                      title={program.name}
                      extra={<Tag color="blue">{program.type}</Tag>}
                    >
                      <div className="flex justify-between mb-4">
                        <div>
                          <div className="text-gray-600">Duration</div>
                          <div className="font-medium">{program.duration}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Credits</div>
                          <div className="font-medium">{program.credits}</div>
                        </div>
                      </div>

                      <p className="mb-4">{program.description}</p>

                      <Collapse ghost className="mb-4">
                        <Panel header="Core Courses" key="1">
                          <div className="grid grid-cols-2 gap-2">
                            {program.courses.map((course, idx) => (
                              <Tag key={idx} color="geekblue" className="mb-2">
                                {course}
                              </Tag>
                            ))}
                          </div>
                        </Panel>
                      </Collapse>

                      <Button type="primary" block>
                        Program Details
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span className="flex items-center">
                  <TeamOutlined className="mr-2" />
                  Faculty
                </span>
              }
              key="faculty"
            >
              <Row gutter={[24, 24]}>
                {faculty.map((member) => (
                  <Col xs={24} md={12} lg={6} key={member.id}>
                    <Card
                      className="h-full border-0 shadow-md hover:shadow-lg transition-all"
                      cover={
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-48 flex items-center justify-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32" />
                        </div>
                      }
                    >
                      <div className="text-center">
                        <h3 className="text-xl font-bold mt-4">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{member.title}</p>

                        <div className="mb-4">
                          <div className="font-medium mb-2">Research Focus</div>
                          <Space wrap>
                            {member.expertise.map((exp, idx) => (
                              <Tag key={idx} color="purple">
                                {exp}
                              </Tag>
                            ))}
                          </Space>
                        </div>

                        <Button block>View Profile</Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span className="flex items-center">
                  <DatabaseOutlined className="mr-2" />
                  Resources
                </span>
              }
              key="resources"
            >
              <Row gutter={[24, 24]}>
                {resources.map((resource) => (
                  <Col xs={24} md={12} key={resource.id}>
                    <Card
                      className="h-full border-0 shadow-md hover:shadow-lg transition-all"
                      title={resource.name}
                    >
                      <p className="mb-4">{resource.description}</p>

                      <div className="mb-4">
                        <div className="font-medium mb-2">Key Features</div>
                        <ul className="list-disc pl-5">
                          {resource.specs.map((spec, idx) => (
                            <li key={idx}>{spec}</li>
                          ))}
                        </ul>
                      </div>

                      <Button type="primary" block>
                        Request Access
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>
          </Tabs>

          {/* Events Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <CalendarOutlined className="mr-2 text-purple-500" />
                Upcoming Events
              </h2>
              <Button>View Calendar</Button>
            </div>

            <Row gutter={[24, 24]}>
              {events.map((event) => (
                <Col xs={24} md={6} key={event.id}>
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">
                      <div className="text-lg font-medium">{event.name}</div>
                      <div className="text-gray-600 flex items-center mt-2">
                        <CalendarOutlined className="mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="text-gray-600 flex items-center">
                        <EnvironmentOutlined className="mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <Button block>Register</Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* Industry Partnerships */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <GlobalOutlined className="mr-2 text-blue-500" />
              Industry Collaborations
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { name: "OpenAI", projects: "LLM Research" },
                { name: "NVIDIA", projects: "GPU Acceleration" },
                { name: "DeepMind", projects: "Reinforcement Learning" },
                { name: "Boston Dynamics", projects: "Robotics Integration" },
              ].map((company, idx) => (
                <Card
                  key={idx}
                  className="text-center border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {company.name.charAt(0)}
                    </span>
                  </div>
                  <div className="font-bold text-lg">{company.name}</div>
                  <div className="text-gray-600 text-sm">
                    {company.projects}
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button type="primary" size="large">
                Partnership Opportunities
              </Button>
            </div>
          </div>

          {/* Student Projects */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <TrophyOutlined className="mr-2 text-orange-500" />
              Student Innovations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Autonomous Campus Delivery Robot",
                  team: "Robotics Club",
                  description:
                    "AI-powered robot for campus deliveries using computer vision and pathfinding",
                  technologies: ["ROS", "TensorFlow", "LiDAR"],
                },
                {
                  title: "Medical Diagnosis Assistant",
                  team: "HealthAI Group",
                  description:
                    "Deep learning system for preliminary medical diagnosis from symptoms and images",
                  technologies: ["PyTorch", "DICOM", "Flutter"],
                },
                {
                  title: "AI-Powered Tutoring System",
                  team: "EdTech Innovators",
                  description:
                    "Adaptive learning platform that personalizes educational content",
                  technologies: ["Transformer Models", "React", "MongoDB"],
                },
                {
                  title: "Predictive Maintenance for Manufacturing",
                  team: "Industry 4.0 Team",
                  description:
                    "ML system predicting equipment failures in industrial settings",
                  technologies: [
                    "Time Series Analysis",
                    "Cloud IoT",
                    "Node-RED",
                  ],
                },
              ].map((project, idx) => (
                <Card
                  key={idx}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <div className="text-blue-600 mb-2">{project.team}</div>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Tag key={i} color="geekblue">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <RobotOutlined className="mr-2 text-blue-400" />
                AI & ML Department
              </h3>
              <p className="mb-4 text-gray-400">
                Advancing the frontier of intelligent systems through education
                and research
              </p>
              <div className="flex space-x-4">
                <Button
                  shape="circle"
                  className="bg-gray-800 text-white border-gray-700"
                >
                  <i className="fab fa-twitter" />
                </Button>
                <Button
                  shape="circle"
                  className="bg-gray-800 text-white border-gray-700"
                >
                  <i className="fab fa-linkedin" />
                </Button>
                <Button
                  shape="circle"
                  className="bg-gray-800 text-white border-gray-700"
                >
                  <i className="fab fa-github" />
                </Button>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <p className="mb-2 flex items-center">
                <EnvironmentOutlined className="mr-2 text-gray-400" />
                AI Research Center, Room 301
              </p>
              <p className="mb-2 flex items-center">
                <i className="fas fa-envelope mr-2 text-gray-400" />
                ai-department@university.edu
              </p>
              <p className="flex items-center">
                <i className="fas fa-phone mr-2 text-gray-400" />
                (555) 123-4567
              </p>
            </Col>
            <Col xs={24} md={8}>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Programs & Degrees
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Research Areas
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Faculty Directory
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Student Resources
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  News & Events
                </a>
              </div>
            </Col>
          </Row>
          <Divider className="bg-gray-700" />
          <p className="text-center text-gray-500">
            © 2023 University AI & Machine Learning Department. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIMLPage;
