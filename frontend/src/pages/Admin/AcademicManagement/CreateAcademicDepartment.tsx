/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyNameQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";
import { toast } from "sonner";
import { academicDepartmentSchema } from "../../../schemas/academicSemester.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import MYForm from "../../../components/Form/MYForm";
import MYInput from "../../../components/Form/MYInput";
import MYSelect from "../../../components/Form/MYSelect";
import { TAcademicDepartment } from "../../../types";
import { LoadingOutlined, BankOutlined } from "@ant-design/icons";

const CreateAcademicDepartment = () => {
  const { data: academicFaculties } = 
    useGetAllAcademicFacultyNameQuery(undefined);
  const [addAcademicDepartment, { isLoading }] = useAddAcademicDepartmentMutation();

  const academicFacultyOptions = academicFaculties?.result?.map(
    ({ _id, name }: { _id: string; name: string }) => ({
      value: _id,
      label: name,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic department...");
    try {
      const res = (await addAcademicDepartment(data)) as TResponse<TAcademicDepartment>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to create academic department", { id: toastId });
    }
  };

  return (
    <div className="py-3 md:py-10 bg-gray-50 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md shadow-lg rounded-xl border-0"
        title={
          <div className="flex items-center">
            <BankOutlined className="mr-2 text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-800">
              Create Academic Department
            </h2>
          </div>
        }
      >
        <div className="p-4">
          <MYForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <div className="space-y-4">
              <div>
                <MYInput
                  label="Department Name"
                  name="name"
                  type="text"
                  placeholder="Enter department name"
                />
              </div>

              <div>
                <MYSelect
                  label="Academic Faculty"
                  name="academicFaculty"
                  nameOptions={academicFacultyOptions}
                  title="Select academic faculty"
                />
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
                    "Create Department"
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

export default CreateAcademicDepartment;