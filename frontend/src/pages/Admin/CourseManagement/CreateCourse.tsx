/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card } from "antd";
import MYForm from "../../../components/Form/MYForm";
import MYInput from "../../../components/Form/MYInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import MYSelect from "../../../components/Form/MYSelect";
import {
  useAddCoursesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse, TResponse } from "../../../types";
import { LoadingOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";

const CreateCourse = () => {
  const [addCourse, { isLoading }] = useAddCoursesMutation();
  const { data: Courses, isLoading: sLoading } = useGetAllCoursesQuery(undefined);

  const coursesOptions = Courses?.result?.map((course) => ({
    value: course._id,
    label: course.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating course...");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((course: { course: TCourse }) => ({
            course: course,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = (await addCourse(courseData)) as TResponse<TCourse>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to create course", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card
          title={
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <InfoCircleOutlined />
              Create New Course
            </h2>
          }
          className="shadow-lg rounded-xl border-0"
        >
          <div className="p-4 md:p-6">
            <MYForm onSubmit={onSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MYInput
                    label="Course Title"
                    name="title"
                    type="text"
                    placeholder="Introduction to Computer Science"
                  />
                  <MYInput
                    label="Course Prefix"
                    name="prefix"
                    type="text"
                    placeholder="CS"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MYInput
                    label="Course Code"
                    name="code"
                    type="number"
                    placeholder="101"
                  />
                  <MYInput
                    label="Credit Hours"
                    name="credits"
                    type="number"
                    placeholder="3"
                  />
                </div>

                <MYSelect
                  disabled={sLoading}
                  nameOptions={coursesOptions}
                  label="Prerequisite Courses"
                  name="preRequisiteCourses"
                  title="Select prerequisite courses"
                  mode="multiple"
                />
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
                      <LoadingOutlined /> Creating...
                    </span>
                  ) : (
                    "Create Course"
                  )}
                </Button>
              </div>
            </MYForm>
          </div>
        </Card>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Course Creation Guidelines:</h3>
          <ul className="list-disc pl-5 space-y-1 text-blue-700">
            <li>Course code must be unique within the same prefix</li>
            <li>Standard credit hours range from 1 to 4</li>
            <li>Prefix should be 2-4 uppercase letters (e.g., CS, MATH)</li>
            <li>Select all prerequisite courses if applicable</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;