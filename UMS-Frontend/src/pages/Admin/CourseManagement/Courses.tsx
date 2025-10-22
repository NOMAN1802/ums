/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Table, Modal, Card, Tag, Spin, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse } from "../../../types/courseManagement.type";
import MYForm from "../../../components/Form/MYForm";
import MYSelect from "../../../components/Form/MYSelect";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { TResponse } from "../../../types";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { 
  UserAddOutlined, 
  BookOutlined,
  TeamOutlined 
} from "@ant-design/icons";

type TTableData = Pick<TCourse, "_id" | "title" | "code" | "prefix">;

const Courses = () => {
  const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courseData?.result?.map(
    ({ _id, title, code, prefix }: TTableData) => ({
      key: _id,
      title,
      code: `${prefix} ${code}`,
      _id,
      prefix,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: <span className="font-semibold">Course Title</span>,
      dataIndex: "title",
      render: (text) => <span className="text-gray-800 font-medium">{text}</span>,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: <span className="font-semibold">Course Code</span>,
      dataIndex: "code",
      render: (code) => <Tag color="blue" className="text-sm">{code}</Tag>,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: <span className="font-semibold">Actions</span>,
      key: "actions",
      render: (item) => (
        <div className="flex space-x-2">
          <AddFacultyModal facultyInfo={item} />
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <Card
        title={
          <div className="flex items-center">
            <BookOutlined className="mr-2 text-xl text-blue-600" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Course Management
            </h2>
          </div>
        }
        bordered={false}
        className="shadow-sm rounded-lg"
      >
        <div className="mb-4">
          <p className="text-gray-600">
            Manage courses and assign faculty members
          </p>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={{
            spinning: isFetching,
            indicator: <Spin size="large" />,
            tip: "Loading courses..."
          }}
          rowKey="_id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            className: "px-4"
          }}
          className="rounded-lg overflow-hidden"
          rowClassName="hover:bg-gray-50 transition-colors"
          scroll={{ x: true }}
          locale={{
            emptyText: (
              <div className="py-8 text-gray-500">
                No courses found
              </div>
            )
          }}
        />
      </Card>
    </div>
  );
};

const AddFacultyModal = ({
  facultyInfo,
}: {
  facultyInfo: { code: string; key: string; title: string };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData, isLoading: sLoading } = useGetAllFacultiesQuery(undefined);
  const [addFaculties, { isLoading }] = useAssignFacultiesMutation();

  const facultiesOption = facultiesData?.result?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Assigning faculties...");
    const facultyData = {
      id: facultyInfo.key,
      data,
    };

    try {
      const res = (await addFaculties(facultyData)) as TResponse<{
        faculties: string;
      }>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Faculties assigned successfully", { id: toastId });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to assign faculties", { id: toastId });
      setIsModalOpen(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Assign faculty to this course">
        <Button 
          type="primary" 
          icon={<UserAddOutlined />}
          onClick={showModal}
          className="flex items-center"
        >
          Assign Faculty
        </Button>
      </Tooltip>

      <Modal
        title={
          <div className="flex items-center">
            <TeamOutlined className="mr-2 text-blue-500" />
            <span>Assign Faculty to {facultyInfo.title}</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        destroyOnClose
        className="rounded-lg"
      >
        <div className="my-4">
          <p className="text-gray-600 mb-4">
            Select faculty members to assign to <strong>{facultyInfo.code}</strong>
          </p>
          
          <MYForm onSubmit={handleSubmit}>
            <MYSelect
              disabled={sLoading}
              mode="multiple"
              nameOptions={facultiesOption}
              name="faculties"
              label="Select Faculty Members"
              title="Search and select faculty"
            />
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button onClick={handleCancel} className="mr-2">
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Assigning...' : 'Assign Faculty'}
              </Button>
            </div>
          </MYForm>
        </div>
      </Modal>
    </>
  );
};

export default Courses;