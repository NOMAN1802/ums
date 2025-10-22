import {
  Card,
  Tabs,
  Tag,
  Button,
  Row,
  Col,
  Statistic,
  List,
  Divider,
  Carousel,
} from "antd";
import {
  LineChartOutlined,
  TeamOutlined,
  BookOutlined,
  LaptopOutlined,
  TrophyOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  UserOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

const DataSciencePage = () => {
  // Mock data for programs
  const programs = [
    {
      id: "1",
      name: "Bachelor of Science in Data Science",
      type: "Undergraduate",
      duration: "4 years",
      credits: 120,
      description:
        "Comprehensive program covering statistics, machine learning, and data visualization",
      courses: [
        "Data Structures",
        "Statistical Modeling",
        "Machine Learning",
        "Big Data Systems",
      ],
    },
    {
      id: "2",
      name: "Master of Science in Data Analytics",
      type: "Graduate",
      duration: "2 years",
      credits: 60,
      description: "Advanced analytics techniques for real-world applications",
      courses: [
        "Advanced ML",
        "Data Mining",
        "Deep Learning",
        "Business Intelligence",
      ],
    },
    {
      id: "3",
      name: "PhD in Machine Learning",
      type: "Doctoral",
      duration: "4-6 years",
      credits: 90,
      description: "Research-focused program in cutting-edge ML algorithms",
      courses: [
        "Reinforcement Learning",
        "NLP",
        "Computer Vision",
        "Research Methods",
      ],
    },
    {
      id: "4",
      name: "Data Engineering Certificate",
      type: "Certificate",
      duration: "6 months",
      credits: 18,
      description: "Focused on building data pipelines and infrastructure",
      courses: [
        "Data Warehousing",
        "ETL Processes",
        "Cloud Data Systems",
        "Distributed Computing",
      ],
    },
  ];

  // Mock data for faculty
  const faculty = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      title: "Professor of Machine Learning",
      expertise: ["Deep Learning", "Computer Vision"],
      email: "s.johnson@university.edu",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      title: "Associate Professor of Statistics",
      expertise: ["Bayesian Statistics", "Causal Inference"],
      email: "m.chen@university.edu",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      title: "Assistant Professor of NLP",
      expertise: ["Natural Language Processing", "AI Ethics"],
      email: "e.rodriguez@university.edu",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      title: "Professor of Data Systems",
      expertise: ["Distributed Systems", "Database Architecture"],
      email: "j.wilson@university.edu",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  ];

  // Mock data for research
  const researchAreas = [
    {
      id: "1",
      name: "Computer Vision",
      description: "Developing algorithms for image and video analysis",
      projects: [
        {
          name: "Medical Image Diagnosis",
          funding: "$450,000",
          status: "ongoing",
        },
        {
          name: "Autonomous Vehicle Perception",
          funding: "$1.2M",
          status: "ongoing",
        },
      ],
    },
    {
      id: "2",
      name: "Natural Language Processing",
      description: "Understanding and generating human language",
      projects: [
        {
          name: "Multilingual Translation Systems",
          funding: "$380,000",
          status: "completed",
        },
        {
          name: "Sentiment Analysis for Social Media",
          funding: "$250,000",
          status: "ongoing",
        },
      ],
    },
    {
      id: "3",
      name: "Big Data Systems",
      description: "Scalable architectures for massive datasets",
      projects: [
        {
          name: "Distributed ML Frameworks",
          funding: "$620,000",
          status: "ongoing",
        },
        {
          name: "Real-time Data Processing",
          funding: "$310,000",
          status: "completed",
        },
      ],
    },
    {
      id: "4",
      name: "AI Ethics",
      description: "Ensuring fairness and transparency in AI systems",
      projects: [
        {
          name: "Bias Detection Algorithms",
          funding: "$280,000",
          status: "ongoing",
        },
        {
          name: "Explainable AI Frameworks",
          funding: "$190,000",
          status: "ongoing",
        },
      ],
    },
  ];

  // Mock data for resources
  const resources = [
    {
      id: "1",
      name: "Data Science Lab",
      type: "Research Facility",
      description: "High-performance computing cluster with GPU acceleration",
      capacity: "50 researchers",
      equipment: ["100 GPU nodes", "5PB storage", "High-speed networking"],
    },
    {
      id: "2",
      name: "Urban Data Center",
      type: "Research Facility",
      description: "Repository of city-level datasets for urban informatics",
      capacity: "Open to all students",
      equipment: ["10TB curated datasets", "Visualization workstations"],
    },
    {
      id: "3",
      name: "Financial Data API",
      type: "Dataset",
      description: "Real-time access to global financial markets data",
      access: "Available to finance courses",
      coverage: "Stocks, commodities, currencies, cryptocurrencies",
    },
    {
      id: "4",
      name: "Cloud Computing Credits",
      type: "Computing Resource",
      description: "AWS and GCP credits for student projects",
      allocation: "$500 per student project",
      terms: "Approved research only",
    },
  ];

  // Mock data for events
  const events = [
    {
      id: "1",
      name: "Annual Data Science Symposium",
      date: "2023-11-15",
      location: "Main Auditorium",
    },
    {
      id: "2",
      name: "ML Workshop with Industry Experts",
      date: "2023-10-28",
      location: "Tech Building",
    },
    {
      id: "3",
      name: "Data Visualization Competition",
      date: "2023-12-05",
      location: "Design Center",
    },
    {
      id: "4",
      name: "AI Ethics Panel Discussion",
      date: "2023-11-30",
      location: "Ethics Hall",
    },
  ];

  // Stats data
  const stats = [
    { name: "Students", value: 850, icon: <TeamOutlined />, color: "#1890ff" },
    { name: "Faculty", value: 32, icon: <UserOutlined />, color: "#52c41a" },
    {
      name: "Research Projects",
      value: 48,
      icon: <ExperimentOutlined />,
      color: "#faad14",
    },
    {
      name: "Industry Partners",
      value: 24,
      icon: <GlobalOutlined />,
      color: "#f5222d",
    },
  ];

  return (
    <div className="data-science-page bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-r from-blue-800 to-purple-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center">
                <LineChartOutlined className="mr-4 text-blue-300" />
                Department of Data Science
              </h1>
              <p className="text-xl mb-6 text-blue-100">
                Transforming data into insights, decisions, and innovation
              </p>
              <div className="flex flex-wrap gap-3">
                <Button type="primary" size="large">
                  Apply Now
                </Button>
                <Button
                  size="large"
                  className="bg-white text-blue-800 hover:bg-gray-100"
                >
                  Explore Programs
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-sm">
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

      {/* Main Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultActiveKey="programs" className="mb-8">
            <TabPane
              tab={
                <span className="flex items-center">
                  <BookOutlined className="mr-2" />
                  Academic Programs
                </span>
              }
              key="programs"
            >
              <Row gutter={[16, 16]}>
                {programs.map((program) => (
                  <Col xs={24} md={12} key={program.id}>
                    <Card
                      title={program.name}
                      extra={<Tag color="blue">{program.type}</Tag>}
                      className="h-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">
                            {program.duration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Credits:</span>
                          <span className="font-medium">{program.credits}</span>
                        </div>
                      </div>
                      <p className="mb-4">{program.description}</p>
                      <div className="mb-4">
                        <div className="font-medium mb-2">Core Courses:</div>
                        <div className="flex flex-wrap gap-2">
                          {program.courses.map((course, idx) => (
                            <Tag key={idx} color="geekblue">
                              {course}
                            </Tag>
                          ))}
                        </div>
                      </div>
                      <Button type="primary">Learn More</Button>
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
              <Row gutter={[16, 16]}>
                {faculty.map((member) => (
                  <Col xs={24} md={12} lg={6} key={member.id}>
                    <Card
                      cover={
                        <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
                          <UserOutlined className="text-4xl text-gray-400" />
                        </div>
                      }
                      className="shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Card.Meta
                        title={member.name}
                        description={member.title}
                        className="mb-4"
                      />
                      <div className="mb-4">
                        <div className="font-medium mb-2">Expertise:</div>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((exp, idx) => (
                            <Tag key={idx} color="purple">
                              {exp}
                            </Tag>
                          ))}
                        </div>
                      </div>
                      <Button block>Contact</Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span className="flex items-center">
                  <ExperimentOutlined className="mr-2" />
                  Research
                </span>
              }
              key="research"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Research Areas</h2>
                <Row gutter={[16, 16]}>
                  {researchAreas.map((area) => (
                    <Col xs={24} md={12} key={area.id}>
                      <Card
                        title={area.name}
                        className="h-full shadow-sm hover:shadow-md transition-shadow"
                      >
                        <p className="mb-4">{area.description}</p>
                        <div className="font-medium mb-2">Projects:</div>
                        <List
                          itemLayout="horizontal"
                          dataSource={area.projects}
                          renderItem={(project) => (
                            <List.Item>
                              <List.Item.Meta
                                title={project.name}
                                description={
                                  <div className="flex justify-between">
                                    <span>{project.funding}</span>
                                    <Tag
                                      color={
                                        project.status === "ongoing"
                                          ? "green"
                                          : "blue"
                                      }
                                    >
                                      {project.status}
                                    </Tag>
                                  </div>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Research Facilities</h2>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                      <LaptopOutlined className="text-5xl text-gray-500" />
                    </div>
                  </Col>
                </Row>
              </div>
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
              <Row gutter={[16, 16]}>
                {resources.map((resource) => (
                  <Col xs={24} md={12} key={resource.id}>
                    <Card
                      title={resource.name}
                      extra={<Tag color="cyan">{resource.type}</Tag>}
                      className="h-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <p className="mb-4">{resource.description}</p>
                      <div className="mb-4">
                        <div className="font-medium mb-2">Features:</div>
                        <ul className="list-disc pl-5">
                          {resource.equipment &&
                            resource.equipment.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          {resource.access && (
                            <li>Access: {resource.access}</li>
                          )}
                          {resource.coverage && (
                            <li>Coverage: {resource.coverage}</li>
                          )}
                          {resource.allocation && (
                            <li>Allocation: {resource.allocation}</li>
                          )}
                          {resource.terms && <li>Terms: {resource.terms}</li>}
                        </ul>
                      </div>
                      <Button type="primary">Request Access</Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>
          </Tabs>

          {/* Events & News Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <CalendarOutlined className="mr-2 text-purple-500" />
                Upcoming Events
              </h2>
              <Button>View All</Button>
            </div>

            <Row gutter={[16, 16]}>
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
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <GlobalOutlined className="mr-2 text-blue-500" />
              Industry Partnerships
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { name: "Google", projects: "Cloud AI Research" },
                { name: "Microsoft", projects: "AI for Healthcare" },
                { name: "Amazon", projects: "Supply Chain Analytics" },
                { name: "IBM", projects: "Quantum Computing" },
              ].map((company, idx) => (
                <Card key={idx} className="text-center border-0 shadow-sm">
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
                Explore Partnership Opportunities
              </Button>
            </div>
          </div>

          {/* Student Projects Showcase */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <TrophyOutlined className="mr-2 text-orange-500" />
              Student Projects Showcase
            </h2>

            <div className="mb-8">
              <Carousel autoplay effect="fade">
                {[
                  {
                    title: "Predictive Maintenance for Manufacturing",
                    team: "Advanced Analytics Group",
                    description:
                      "ML model predicting equipment failures with 92% accuracy",
                  },
                  {
                    title: "AI-Powered Disease Diagnosis",
                    team: "MedAI Research Team",
                    description:
                      "Deep learning system for early detection of diseases from medical images",
                  },
                  {
                    title: "Smart City Traffic Optimization",
                    team: "Urban Data Science Team",
                    description:
                      "Real-time traffic flow prediction and optimization system",
                  },
                ].map((project, idx) => (
                  <div key={idx} className="p-8 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="text-gray-600 mb-4">{project.team}</div>
                    <p className="mb-6">{project.description}</p>
                    <Button type="primary">View Project Details</Button>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <h3 className="text-xl font-bold mb-4">
                Department of Data Science
              </h3>
              <p className="mb-4">
                Transforming data into insights that drive innovation and
                decision-making.
              </p>
              <div className="flex space-x-4">
                <Button
                  shape="circle"
                  icon={<i className="fab fa-twitter" />}
                />
                <Button
                  shape="circle"
                  icon={<i className="fab fa-linkedin" />}
                />
                <Button shape="circle" icon={<i className="fab fa-github" />} />
              </div>
            </Col>
            <Col xs={24} md={8}>
              <h4 className="font-bold mb-4">Contact Information</h4>
              <p className="mb-2">Tech Innovation Building, Room 305</p>
              <p className="mb-2">University Campus</p>
              <p className="mb-2">Email: datascience@university.edu</p>
              <p>Phone: (555) 123-4567</p>
            </Col>
            <Col xs={24} md={8}>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="flex flex-col space-y-2">
                <a href="#" className="hover:text-blue-300">
                  Programs
                </a>
                <a href="#" className="hover:text-blue-300">
                  Faculty Directory
                </a>
                <a href="#" className="hover:text-blue-300">
                  Research Centers
                </a>
                <a href="#" className="hover:text-blue-300">
                  Student Resources
                </a>
                <a href="#" className="hover:text-blue-300">
                  News & Events
                </a>
              </div>
            </Col>
          </Row>
          <Divider className="bg-gray-700" />
          <p className="text-center text-gray-400">
            © 2023 University Data Science Department. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataSciencePage;
