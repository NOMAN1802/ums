import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import {  Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParams } from "../../../types";

type TTableData = Pick<
  TAcademicSemester,
  "endMonth" | "name" | "startMonth" | "year"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const { data: semesterData, isFetching } =
    useGetAllAcademicSemesterQuery(params);

  const tableData = semesterData?.result?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        { text: "Summer", value: "Summer" },
        { text: "Fall", value: "Fall" },
        { text: "Autumn", value: "Autumn" },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        { text: "2025", value: "2025" },
        { text: "2026", value: "2026" },
        { text: "2027", value: "2027" },
        { text: "2028", value: "2028" },
        { text: "2029", value: "2029" },
        { text: "2030", value: "2030" },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    // {
    //   title: "Action",
    //   render: () => (
    //     <div className="flex justify-center">
    //       <Button size="small">Update</Button>
    //     </div>
    //   ),
    // },
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
    <div className="px-2 sm:px-4 md:px-8 py-4">
      <div className="overflow-x-auto">
        <Table<TTableData>
          columns={columns}
          loading={isFetching}
          dataSource={tableData}
          onChange={onChange}
          showSorterTooltip={{ target: "sorter-icon" }}
          pagination={{ pageSize: 7 }}
          scroll={{ x: 600 }}
        />
      </div>
    </div>
  );
};

export default AcademicSemester;
