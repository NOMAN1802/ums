/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card } from "antd";
import MYForm from "../../../components/Form/MYForm";
import MYSelect from "../../../components/Form/MYSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import MYDatePicker from "../../../components/Form/MYDatePicker";
import MYInput from "../../../components/Form/MYInput";
import { semesterStatusOptions } from "../../../constants/semester";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { toast } from "sonner";
import { TResponse, TSemesterRegistration } from "../../../types";
import { LoadingOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";

const SemesterRegistration = () => {
  const [addSemesterRegistration, { isLoading }] = useAddRegisteredSemesterMutation();
  const { data: academicSemester, isLoading: sLoading } =
    useGetAllAcademicSemesterQuery(undefined);

  const academicSemesterOptions = academicSemester?.result?.map(
    (item: { _id: string; name: string; year: string }) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    const toastId = toast.loading("Registering semester...");
    
    try {
      const res = (await addSemesterRegistration(
        semesterData
      )) as TResponse<TSemesterRegistration>;
      
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className=" bg-gray-50 py-8 px-8 rounded-xl ">
      <div className="max-w-3xl mx-auto">
        <Card
          title={
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <InfoCircleOutlined />
              Semester Registration
            </h2>
          }
          className="shadow-lg rounded-xl border-0"
        >
          <div className="p-4 md:p-6">
            <MYForm onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <MYSelect
                    label="Academic Semester"
                    name="academicSemester"
                    disabled={sLoading}
                    nameOptions={academicSemesterOptions}
                    title="Select semester"
                  />
                  
                  <MYSelect
                    name="status"
                    label="Status"
                    nameOptions={semesterStatusOptions}
                    title="Select status"
                  />
                </div>

                <div className="space-y-4">
                  <MYDatePicker
                    name="startDate"
                    label="Start Date"

                  />
                  
                  <MYDatePicker
                    name="endDate"
                    label="End Date"
                  />
                </div>

                <div className="space-y-4">
                  <MYInput
                    type="number"
                    name="minCredit"
                    label="Minimum Credit"
                    placeholder="Enter minimum credit"
                  />
                </div>

                <div className="space-y-4">
                  <MYInput
                    type="number"
                    name="maxCredit"
                    label="Maximum Credit"
                    placeholder="Enter maximum credit"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoadingOutlined /> Processing...
                    </span>
                  ) : (
                    "Register Semester"
                  )}
                </Button>
              </div>
            </MYForm>
          </div>
        </Card>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Important Notes:</h3>
          <ul className="list-disc pl-5 space-y-1 text-blue-700">
            <li>Please select the correct academic semester</li>
            <li>Ensure the dates don't overlap with existing semesters</li>
            <li>Minimum credit must be less than maximum credit</li>
            <li>Status will determine semester visibility to students</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SemesterRegistration;