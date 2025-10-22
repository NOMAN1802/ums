import { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  message,
  DatePicker,
  InputNumber,
  Upload,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  UploadOutlined,
  EnvironmentOutlined,
  DesktopOutlined,
  BookOutlined,
  CarOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Option } = Select;
const { TextArea } = Input;

interface Facility {
  id: string;
  name: string;
  type: "classroom" | "lab" | "library" | "sports" | "hostel" | "other";
  capacity: number;
  location: string;
  status: "available" | "under-maintenance" | "unavailable";
  lastMaintenanceDate: string;
  description?: string;
  image?: string;
}

const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFacility] = useState<Facility | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [form] = Form.useForm();

  // Mock data - replace with API calls in a real application
  useEffect(() => {
    const mockFacilities: Facility[] = [
      {
        id: "1",
        name: "Computer Lab A",
        type: "lab",
        capacity: 30,
        location: "Science Building, Room 101",
        status: "available",
        lastMaintenanceDate: "2023-05-15",
        description: "Equipped with 30 high-end computers and projector",
        image: "https://example.com/lab-a.jpg",
      },
      {
        id: "2",
        name: "Main Library",
        type: "library",
        capacity: 200,
        location: "Central Campus",
        status: "available",
        lastMaintenanceDate: "2023-04-20",
        description:
          "Main university library with study areas and book collection",
      },
      {
        id: "3",
        name: "Basketball Court",
        type: "sports",
        capacity: 50,
        location: "Sports Complex",
        status: "under-maintenance",
        lastMaintenanceDate: "2023-06-10",
        description: "Outdoor basketball court with lighting",
      },
      {
        id: "4",
        name: "Lecture Hall B",
        type: "classroom",
        capacity: 120,
        location: "Main Building, Room 205",
        status: "available",
        lastMaintenanceDate: "2023-03-05",
      },
      {
        id: "5",
        name: "Chemistry Lab",
        type: "lab",
        capacity: 25,
        location: "Science Building, Room 203",
        status: "unavailable",
        lastMaintenanceDate: "2023-06-01",
        description: "Advanced chemistry laboratory with safety equipment",
      },
    ];
    setFacilities(mockFacilities);
    setFilteredFacilities(mockFacilities);
  }, []);

  // Filter facilities based on search and filters
  useEffect(() => {
    let result = facilities;

    if (searchText) {
      result = result.filter(
        (facility) =>
          facility.name.toLowerCase().includes(searchText.toLowerCase()) ||
          facility.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterType !== "all") {
      result = result.filter((facility) => facility.type === filterType);
    }

    if (filterStatus !== "all") {
      result = result.filter((facility) => facility.status === filterStatus);
    }

    setFilteredFacilities(result);
  }, [searchText, filterType, filterStatus, facilities]);

  //   const handleAddFacility = () => {
  //     setEditingFacility(null);
  //     form.resetFields();
  //     setIsModalVisible(true);
  //   };

  //   const handleEditFacility = (facility: Facility) => {
  //     setEditingFacility(facility);
  //     form.setFieldsValue({
  //       ...facility,
  //       lastMaintenanceDate: dayjs(facility.lastMaintenanceDate),
  //     });
  //     setIsModalVisible(true);
  //   };

  //   const handleDeleteFacility = (id: string) => {
  //     setFacilities(facilities.filter((facility) => facility.id !== id));
  //     message.success("Facility deleted successfully");
  //   };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const facilityData = {
        ...values,
        lastMaintenanceDate: values.lastMaintenanceDate.format("YYYY-MM-DD"),
      };

      if (editingFacility) {
        // Update existing facility
        setFacilities(
          facilities.map((facility) =>
            facility.id === editingFacility.id
              ? { ...facilityData, id: editingFacility.id }
              : facility
          )
        );
        message.success("Facility updated successfully");
      } else {
        // Add new facility
        const newFacility = {
          ...facilityData,
          id: `facility-${Date.now()}`,
        };
        setFacilities([...facilities, newFacility]);
        message.success("Facility added successfully");
      }

      setIsModalVisible(false);
    });
  };

  const uploadProps: UploadProps = {
    name: "image",
    action: "https://your-api-endpoint/upload",
    showUploadList: false,
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        form.setFieldsValue({ image: info.file.response.url });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const facilityTypeIcon = (type: string) => {
    switch (type) {
      case "lab":
        return <DesktopOutlined className="text-blue-500" />;
      case "library":
        return <BookOutlined className="text-green-500" />;
      case "sports":
        return <CarOutlined className="text-orange-500" />;
      case "hostel":
        return <EnvironmentOutlined className="text-purple-500" />;
      default:
        return <EnvironmentOutlined className="text-gray-500" />;
    }
  };

  const columns = [
    {
      title: "Facility Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Facility) => (
        <div className="flex items-center">
          {facilityTypeIcon(record.type)}
          <span className="ml-2 font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string) => (
        <Tag
          color={
            text === "lab"
              ? "blue"
              : text === "library"
              ? "green"
              : text === "sports"
              ? "orange"
              : text === "hostel"
              ? "purple"
              : "gray"
          }
        >
          {text.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      render: (text: number) => `${text} people`,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <Tag
          color={
            text === "available"
              ? "success"
              : text === "under-maintenance"
              ? "warning"
              : "error"
          }
        >
          {text.replace("-", " ").toUpperCase()}
        </Tag>
      ),
    },
    // {
    //   title: "Last Maintenance",
    //   dataIndex: "lastMaintenanceDate",
    //   key: "lastMaintenanceDate",
    //   render: (text: string) => dayjs(text).format("MMM D, YYYY"),
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_: any, record: Facility) => (
    //     <Space size="middle">
    //       <Button
    //         type="text"
    //         icon={<EditOutlined />}
    //         onClick={() => handleEditFacility(record)}
    //         className="text-blue-500 hover:text-blue-700"
    //       />
    //       <Popconfirm
    //         title="Are you sure to delete this facility?"
    //         onConfirm={() => handleDeleteFacility(record.id)}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <Button
    //           type="text"
    //           danger
    //           icon={<DeleteOutlined />}
    //           className="hover:text-red-700"
    //         />
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];
  // ... (existing state and hooks remain the same)

  return (
    <div className=" mt-16 max-w-7xl mx-auto">
      <Card
        title="University Facilities Management"
        bordered={false}
        className="shadow-sm"
        // extra={
        //   <Button
        //     type="primary"
        //     icon={<PlusOutlined />}
        //     onClick={handleAddFacility}
        //   >
        //     Add Facility
        //   </Button>
        // }
      >
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <Input
            placeholder="Search by name or location"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: "300px" }}
          />

          <div className="flex flex-wrap gap-3">
            <Select
              placeholder="Filter by type"
              value={filterType}
              onChange={setFilterType}
              style={{ width: "180px" }}
              allowClear
            >
              <Option value="all">All Types</Option>
              <Option value="classroom">Classroom</Option>
              <Option value="lab">Laboratory</Option>
              <Option value="library">Library</Option>
              <Option value="sports">Sports Facility</Option>
              <Option value="hostel">Hostel</Option>
              <Option value="other">Other</Option>
            </Select>

            <Select
              placeholder="Filter by status"
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: "200px" }}
              allowClear
            >
              <Option value="all">All Statuses</Option>
              <Option value="available">Available</Option>
              <Option value="under-maintenance">Under Maintenance</Option>
              <Option value="unavailable">Unavailable</Option>
            </Select>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredFacilities}
          rowKey="id"
          pagination={{ pageSize: 8 }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal
        title={editingFacility ? "Edit Facility" : "Add New Facility"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText={editingFacility ? "Update" : "Add"}
        cancelText="Cancel"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Facility Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter facility name" },
                ]}
              >
                <Input placeholder="e.g., Computer Lab A" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select type" }]}
              >
                <Select placeholder="Select type">
                  <Option value="classroom">Classroom</Option>
                  <Option value="lab">Laboratory</Option>
                  <Option value="library">Library</Option>
                  <Option value="sports">Sports Facility</Option>
                  <Option value="hostel">Hostel</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Capacity"
                name="capacity"
                rules={[{ required: true, message: "Please enter capacity" }]}
              >
                <InputNumber
                  min={1}
                  className="w-full"
                  placeholder="e.g., 30"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Select status">
                  <Option value="available">Available</Option>
                  <Option value="under-maintenance">Under Maintenance</Option>
                  <Option value="unavailable">Unavailable</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Input placeholder="e.g., Science Building, Room 101" />
          </Form.Item>

          <Form.Item
            label="Last Maintenance Date"
            name="lastMaintenanceDate"
            rules={[
              {
                required: true,
                message: "Please select last maintenance date",
              },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Description of the facility" />
          </Form.Item>

          <Form.Item label="Facility Image" name="image">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FacilitiesPage;
