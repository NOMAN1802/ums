import { Pagination, Table, TableColumnsType, TableProps } from "antd";
import { TQueryParams, TUser } from "../../../types";
import { useState } from "react";
import { useGetAllUsersQuery } from "../../../redux/features/superAdmin/userManagement.api";

type TTableData = Pick<TUser, "_id" | "id" | "email" | "role" | "status">;

const AllUser = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const { data: adminData, isFetching } = useGetAllUsersQuery([
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = adminData?.meta;

  const tableData = adminData?.result?.map(
    ({ _id, id, email, role, status }) => ({
      _id,
      key: _id,
      email,
      role,
      id,
      status,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Roll No",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
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
      <div className="bg-white p-4 rounded shadow overflow-auto">
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

export default AllUser;
