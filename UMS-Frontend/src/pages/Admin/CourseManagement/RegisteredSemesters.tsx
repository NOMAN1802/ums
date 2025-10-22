/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dropdown, Table, Tag, Card, Spin, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { TSemesterRegistration } from "../../../types/courseManagement.type";
import {
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";

type TTableData = Pick<
  TSemesterRegistration,
  "_id" | "academicSemester" | "startDate" | "endDate" | "status"
> & {
  key: string;
  name: string;
  daysRemaining: number;
};

const statusItems = [
  {
    label: "Upcoming",
    key: "UPCOMING",
    icon: <ExclamationCircleOutlined />,
  },
  {
    label: "Ongoing",
    key: "ONGOING",
    icon: <SyncOutlined spin />,
  },
  {
    label: "Ended",
    key: "ENDED",
    icon: <CheckCircleOutlined />,
  },
];

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemestersQuery(undefined);

  const [updateSemesterStatus, { isLoading: isUpdating }] = useUpdateRegisteredSemesterMutation();

  const tableData = semesterData?.result?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      _id,
      academicSemester,
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM Do, YYYY"),
      endDate: moment(new Date(endDate)).format("MMMM Do, YYYY"),
      daysRemaining: moment(endDate).diff(moment(), 'days')
    })
  );

  interface IHandleStatusUpdateData {
    key: string;
  }

  interface IUpdateData {
    id: string;
    data: {
      status: string;
    };
  }

  const handleStatusUpdate = async (data: IHandleStatusUpdateData) => {
    const toastId = toast.loading("Updating semester status...");
    const updateData: IUpdateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    try {
      const res = (await updateSemesterStatus(updateData)) as TResponse<{
        status: string;
      }>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to update semester status", { id: toastId });
    }
  };

  const statusMenuProps = {
    items: statusItems,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: <span className="font-semibold">Semester</span>,
      dataIndex: "name",
      render: (text) => <span className="text-gray-800 font-medium">{text}</span>,
    },
    {
      title: <span className="font-semibold">Status</span>,
      dataIndex: "status",
      render: (status) => {
        let color, icon;
        if (status === "UPCOMING") {
          color = "blue";
          icon = <ExclamationCircleOutlined className="mr-1" />;
        } else if (status === "ONGOING") {
          color = "green";
          icon = <SyncOutlined spin className="mr-1" />;
        } else {
          color = "red";
          icon = <CloseCircleOutlined className="mr-1" />;
        }
        return (
          <Tag
            color={color}
            className="flex items-center px-3 py-1 rounded-full"
          >
            {icon}
            {status}
          </Tag>
        );
      },
      filters: [
        { text: "Upcoming", value: "UPCOMING" },
        { text: "Ongoing", value: "ONGOING" },
        { text: "Ended", value: "ENDED" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: <span className="font-semibold">Start Date</span>,
      dataIndex: "startDate",
      sorter: (a, b) => moment(a.startDate).unix() - moment(b.startDate).unix(),
    },
    {
      title: <span className="font-semibold">End Date</span>,
      dataIndex: "endDate",
      sorter: (a, b) => moment(a.endDate).unix() - moment(b.endDate).unix(),
      render: (endDate, record) => (
        <div>
          <div>{endDate}</div>
          {record.status === "ONGOING" && (
            <div className="text-xs text-gray-500">
              {record.daysRemaining > 0 
                ? `${record.daysRemaining} days remaining`
                : "Ending today"}
            </div>
          )}
        </div>
      ),
    },
    {
      title: <span className="font-semibold">Actions</span>,
      key: "actions",
      render: (item) => (
        <Dropdown 
          menu={statusMenuProps} 
          trigger={["click"]}
          disabled={isUpdating}
        >
          <Tooltip title="Change status">
            <Button 
              type="default" 
              onClick={() => setSemesterId(item.key)}
              className="flex items-center"
              loading={isUpdating && semesterId === item.key}
            >
              <MoreOutlined />
              <span className="ml-1">Status</span>
            </Button>
          </Tooltip>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <Card
        title={
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Registered Semesters
          </h2>
        }
        bordered={false}
        className="shadow-sm rounded-lg"
      >
        <div className="mb-4">
          <p className="text-gray-600">
            Manage and update the status of academic semesters
          </p>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={{
            spinning: isFetching,
            indicator: <Spin size="large" />,
            tip: "Loading semesters..."
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
                No registered semesters found
              </div>
            )
          }}
        />

        <div className="mt-4 text-sm text-gray-500 flex items-center">
          <InfoCircleOutlined className="mr-2" />
          Click the status button to change a semester's status
        </div>
      </Card>
    </div>
  );
};

export default RegisteredSemesters;