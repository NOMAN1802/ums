/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card,  Divider } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import moment from "moment";
import { weekDaysOptions } from "../../../constants/global";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyNameQuery,
} from "../../../redux/features/admin/academicManagement.api";
import MYForm from "../../../components/Form/MYForm";
import MYSelect from "../../../components/Form/MYSelect";
import MYSelectWithWatch from "../../../components/Form/MySelectWithWatch";
import MYInput from "../../../components/Form/MYInput";
import MYTimePicker from "../../../components/Form/MYTimePicker";
import { TResponse } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { toast } from "sonner";
import { LoadingOutlined, BookOutlined, ClockCircleOutlined } from "@ant-design/icons";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse, { isLoading }] = useCreateOfferedCourseMutation();

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultyNameQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.result?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.result?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.result?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.result?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = Array.isArray(facultiesData?.result)
    ? facultiesData.result.map((item: { _id: string; fullName: string }) => ({
        value: item._id,
        label: item.fullName,
      }))
    : [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating course offering...");
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    
    try {
      const res = (await addOfferedCourse(
        offeredCourseData
      )) as TResponse<TOfferedCourse>;
      
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to create course offering", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card
          title={
            <div className="flex items-center">
              <BookOutlined className="mr-2 text-xl text-blue-600" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Offer New Course
              </h2>
            </div>
          }
          className="shadow-lg rounded-xl border-0"
        >
          <div className="p-4 md:p-6">
            <MYForm onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                    <BookOutlined className="mr-2" />
                    Academic Information
                  </h3>
                  <Divider className="my-2" />
                  
                  <MYSelect
                    title="Semester Registration"
                    name="semesterRegistration"
                    label="Semester Registration"
                    nameOptions={semesterRegistrationOptions}
                  />
                  
                  <MYSelect
                    title="Academic Faculty"
                    name="academicFaculty"
                    label="Academic Faculty"
                    nameOptions={academicFacultyOptions}
                  />
                  
                  <MYSelect
                    title="Academic Department"
                    name="academicDepartment"
                    label="Academic Department"
                    nameOptions={academicDepartmentOptions}
                  />
                </div>

                {/* Course Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                    <BookOutlined className="mr-2" />
                    Course Information
                  </h3>
                  <Divider className="my-2" />
                  
                  <MYSelectWithWatch
                    onValueChange={setCourseId}
                    options={courseOptions}
                    name="course"
                    label="Course"
                    title="Select Course"
                  />
                  
                  <MYSelect
                    title="Faculty"
                    disabled={!courseId || fetchingFaculties}
                    name="faculty"
                    label="Instructor"
                    nameOptions={facultiesOptions}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <MYInput
                      placeholder="Section"
                      type="number"
                      name="section"
                      label="Section"
                    />
                    
                    <MYInput
                      type="number"
                      name="maxCapacity"
                      placeholder="Max Capacity"
                      label="Max Capacity"
                    />
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                    <ClockCircleOutlined className="mr-2" />
                    Schedule Information
                  </h3>
                  <Divider className="my-2" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MYSelect
                      title="Days"
                      mode="multiple"
                      nameOptions={weekDaysOptions}
                      name="days"
                      label="Meeting Days"
                    />
                    
                    <MYTimePicker 
                      name="startTime" 
                      label="Start Time" 
                    />
                    
                    <MYTimePicker 
                      name="endTime" 
                      label="End Time" 
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg shadow-md transition duration-300"
                  loading={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoadingOutlined /> Creating...
                    </span>
                  ) : (
                    "Offer Course"
                  )}
                </Button>
              </div>
            </MYForm>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OfferCourse;