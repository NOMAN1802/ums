import {  Flex, Table, TableColumnsType, TableProps, Card, Typography } from "antd";
import { useGetAllAcademicFacultyNameQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { useState } from "react";

const { Title } = Typography;

type TTableData = Pick<TAcademicFaculty, "_id" | "name"> & { key: string };

const AcademicFaculty = () => {
  const [searchText] = useState("");
  const { data: academicFacultyNameData, isFetching } = 
    useGetAllAcademicFacultyNameQuery(undefined);

  // Filter data based on search input
  const filteredData = academicFacultyNameData?.result?.filter(faculty => 
    faculty.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const tableData = filteredData?.map(({ _id, name }) => ({
    key: _id,
    _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Faculty Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: { target: "full-header" },
      render: (name) => <strong>{name}</strong>,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   render: (_) => (
    //     <Space size="middle">
    //       <Button type="link" size="small">Edit</Button>
    //       <Button type="link" size="small" danger>Delete</Button>
    //     </Space>
    //   ),
    // },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Card className="p-4">
      <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
        <Title level={3} style={{ margin: 0 }}>Academic Faculty</Title>
        {/* <Space>
          <Input
            placeholder="Search faculty..."
            prefix={<SearchOutlined />}
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            Add Faculty
          </Button>
        </Space> */}
      </Flex>

      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        scroll={{ x: true }}
        bordered
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          showTotal: (total) => `Total ${total} faculties`,
        }}
        rowClassName={() => "hover-row"}
      />
    </Card>
  );
};

export default AcademicFaculty;