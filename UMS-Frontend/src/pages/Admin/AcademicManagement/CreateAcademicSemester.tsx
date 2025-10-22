/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Card } from "antd";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicSemester.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import MYForm from "../../../components/Form/MYForm";
import MYSelect from "../../../components/Form/MYSelect";
import { TAcademicSemester } from "../../../types";
import { CalendarOutlined, LoadingOutlined } from "@ant-design/icons";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((item) => ({
  label: String(currentYear + item),
  value: String(currentYear + item),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester, { isLoading }] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");
    const semester = semesterOptions[Number(data.name - 1)];

    const semesterData = {
      name: semester.label,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to create academic semester", { id: toastId });
    }
  };

  return (
    <div className="py-2 md:py-10 bg-gray-50 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md shadow-lg rounded-xl border-0"
        title={
          <div className="flex ">
            <CalendarOutlined className="mr-2 text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-800">
              Create Academic Semester
            </h2>
          </div>
        }
      >
        <div className="p-4">
          <MYForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicSemesterSchema)}
          >
            <div className="space-y-4">
              <div>
                <MYSelect
                  label="Semester"
                  name="name"
                  nameOptions={semesterOptions}
                  title="Select semester"
                />
              </div>

              <div>
                <MYSelect
                  label="Year"
                  name="year"
                  nameOptions={yearOptions}
                  title="Select year"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <MYSelect
                    label="Start Month"
                    name="startMonth"
                    nameOptions={monthOptions}
                    title="Select start month"
                  />
                </div>

                <div>
                  <MYSelect
                    label="End Month"
                    name="endMonth"
                    nameOptions={monthOptions}
                    title="Select end month"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300"
                  loading={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoadingOutlined /> Creating...
                    </span>
                  ) : (
                    "Create Semester"
                  )}
                </Button>
              </div>
            </div>
          </MYForm>
        </div>
      </Card>
    </div>
  );
};

export default CreateAcademicSemester;