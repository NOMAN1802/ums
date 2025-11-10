import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParams, TStudent } from "../../../types";
import { useState } from "react";
import { useGetAllAdminsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

type TTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNo"> & { key: string };

const AdminData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const { data: adminData, isFetching } = useGetAllAdminsQuery([
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = adminData?.meta;

  const tableData = adminData?.result?.map(
    ({ _id, fullName, id, contactNo, email }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Roll No",
      dataIndex: "id",
      width: 100,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Name",
      dataIndex: "fullName",
      width: 180,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      width: 140,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 180,
      render: (_, record) => (
        <Space wrap size={[8, 8]}>
          <Link to={`/admin/admin-data/${record.key}`}>
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
          />
          <Button
            danger
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
          />
        </Space>
      ),
      responsive: ["xs", "sm", "md", "lg"],
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
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <Table<TTableData>
          columns={columns}
          loading={isFetching}
          dataSource={tableData}
          onChange={onChange}
          pagination={false}
          scroll={{ x: "max-content" }}
          className="min-w-[600px]"
        />
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.total}
          responsive
        />
      </div>
    </div>
  );
};

export default AdminData;
