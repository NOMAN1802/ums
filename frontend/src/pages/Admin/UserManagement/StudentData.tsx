import {
  Button,
  Pagination,
  Space,
  Table,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParams, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

type TTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNo"> & {
  key: string;
};

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TTableData | null>(
    null
  );
  const [form] = Form.useForm();

  const {
    data: studentData,
    isFetching,
    refetch,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentData?.meta;

  const tableData = studentData?.result?.map(
    ({ _id, fullName, id, contactNo, email }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const showModal = (student: TTableData) => {
    setSelectedStudent(student);
    form.setFieldsValue({
      fullName: student.fullName,
      email: student.email,
      contactNo: student.contactNo,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Noman");
    form
      .validateFields()
      .then((values) => {
        // Here you would typically call an API to update the student
        console.log("Updated values:", values);
        
        message.success("Student updated successfully");
        setIsModalOpen(false);
        refetch(); // Refresh the table data
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Roll No",
      dataIndex: "id",
      key: "id",
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      width: 200,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      filterDropdown: ({ confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            onChange={(e) => {
              setParams([{ name: "searchTerm", value: e.target.value }]);
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/student-data/${record.key}`}>
            <Button
              type="primary"
              shape="circle"
              icon={<EyeOutlined />}
              size="small"
            />
          </Link>
          <Button
            type="default"
            shape="circle"
            icon={<EditOutlined />}
            size="small"
            onClick={() => showModal(record)}
          />
          <Button
            danger
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure you want to block this student?",
                onOk: () => {
                  message.success("Student blocked successfully");
                },
              });
            }}
          />
        </Space>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <div className="p-4 w-full">
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <Table<TTableData>
          columns={columns}
          loading={isFetching}
          dataSource={tableData}
          onChange={onChange}
          pagination={false}
          scroll={{ x: 800 }}
          bordered
          rowClassName={() => "hover:bg-gray-50"}
          size="middle"
        />
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.total}
          showSizeChanger={false}
          showQuickJumper
          className="ant-pagination-item-active bg-blue-500 text-white"
        />
      </div>

      <Modal
        title="Update Student Information"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Update
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="student_update_form"
          initialValues={selectedStudent || {}}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please input the full name!" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="contactNo"
            label="Contact Number"
            rules={[
              { required: true, message: "Please input the contact number!" },
            ]}
          >
            <Input placeholder="Enter contact number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentData;
