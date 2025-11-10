import React from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Statistic,
  Divider,
  Typography,
  Space,
  List,
  Tag,
} from "antd";
import {
  BookOutlined,
  UserOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  TrophyOutlined,
  TeamOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

interface StatisticItem {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const AboutPage: React.FC = () => {
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Professor of Computer Science",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "This system has revolutionized how we manage student records and coursework.",
    },
    {
      id: 2,
      name: "James Wilson",
      role: "Alumni, Class of 2022",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "The portal made it easy to access grades and register for classes.",
    },
  ];

  // Statistics data
  const statistics: StatisticItem[] = [
    { title: "Courses Offered", value: "120+", icon: <BookOutlined /> },
    { title: "Students Enrolled", value: "10,000+", icon: <UserOutlined /> },
    {
      title: "Years of Excellence",
      value: "50+",
      icon: <ClockCircleOutlined />,
    },
    { title: "Global Partnerships", value: "30+", icon: <GlobalOutlined /> },
  ];

  // Features data
  const features = [
    { title: "Student Portal", icon: <UserOutlined />, color: "blue" },
    { title: "Course Management", icon: <BookOutlined />, color: "green" },
    { title: "Faculty Dashboard", icon: <TeamOutlined />, color: "orange" },
    {
      title: "Achievement Tracking",
      icon: <TrophyOutlined />,
      color: "purple",
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Hero Section */}
      <Row justify="center" style={{ marginBottom: "40px" }} className="mt-16">
        <Col span={24} style={{ textAlign: "center" }}>
          <Title level={2}>About Our University</Title>
          <Paragraph
            style={{ fontSize: "16px", maxWidth: "800px", margin: "0 auto" }}
          >
            Founded in 1970, our university has been a pioneer in delivering
            quality education and fostering innovation. Our management system
            streamlines academic processes for students, faculty, and
            administrators.
          </Paragraph>
        </Col>
      </Row>

      {/* Statistics Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "40px" }}>
        {statistics.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Divider orientation="left">
        <Title level={4}>Key Features</Title>
      </Divider>

      {/* Features Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "40px" }}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              hoverable
              actions={[
                <Tag color={feature.color} key={index}>
                  Learn More
                </Tag>,
              ]}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    icon={feature.icon}
                    style={{ backgroundColor: "#f0f2f5" }}
                  />
                }
                title={feature.title}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Divider orientation="left">
        <Title level={4}>What People Say</Title>
      </Divider>

      {/* Testimonials Section */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={testimonials}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<Text strong>{item.name}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text type="secondary">{item.role}</Text>
                      <Paragraph italic>"{item.quote}"</Paragraph>
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <StarOutlined key={i} style={{ color: "#faad14" }} />
                        ))}
                      </div>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AboutPage;
