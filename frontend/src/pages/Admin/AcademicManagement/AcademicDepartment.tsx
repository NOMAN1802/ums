import { Col, Flex, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";

type TTableData = {
  _id: string;
  name: string;
  faculty: string;
};

const AcademicDepartment = () => {
  const { data: academicDepartmentData, isFetching } =
    useGetAllAcademicDepartmentQuery(undefined);

  const tableData = academicDepartmentData?.result?.map(
    ({ _id, name, academicFaculty }) => ({
      _id,
      name,
      faculty: academicFaculty?.name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Faculty Name",
      dataIndex: "faculty",
      showSorterTooltip: { target: "full-header" },
    },
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
    <Flex justify="center" align="center" className="p-4 ">
      <Col xs={24} sm={22} md={20} lg={18} xl={16}>
        <div className="overflow-x-auto">
          <Table<TTableData>
            loading={isFetching}
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
            showSorterTooltip={{ target: "sorter-icon" }}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </Col>
    </Flex>
  );
};

export default AcademicDepartment;
