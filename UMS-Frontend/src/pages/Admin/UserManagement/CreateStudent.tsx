import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Divider } from "antd";
import MYForm from "../../../components/Form/MYForm";
import MYInput from "../../../components/Form/MYInput";
import MYDatePicker from "../../../components/Form/MYDatePicker";
import MYSelect from "../../../components/Form/MYSelect";
import { bloodGrouopOptions, genderOptions } from "../../../constants/global";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse, TStudent } from "../../../types";

const CreateStudent = () => {
  const [addStudent] = useAddStudentMutation(undefined);

  const { data: sData, isLoading: sLoading } =
    useGetAllAcademicSemesterQuery(undefined);

  const { data: dData, isLoading: dLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const semestersOptions = sData?.result?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const academicDepartmentOptions = dData?.result?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Student...");
    const studentData = {
      password: "student123",
      student: data,
    };

    console.log(studentData);

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImg);
    try {
      const res = (await addStudent(formData)) as TResponse<TStudent>;
      console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", { id: toastId });
    }
  };

  return (
    <div className="p-4 md:p-6  max-w-8xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Student</h1>
        
        <MYForm onSubmit={onSubmit}>
          {/* Personal Information Section */}
          <div className="mb-8">
            <Divider className="text-lg font-semibold text-gray-700">Personal Information</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <MYInput
                  name="name.firstName"
                  type="text"
                  placeholder="First Name"
                  label="First Name"
                />
              </div>
              <div>
                <MYInput
                  name="name.middleName"
                  type="text"
                  placeholder="Middle Name"
                  label="Middle Name"
                />
              </div>
              <div>
                <MYInput
                  name="name.lastName"
                  type="text"
                  placeholder="Last Name"
                  label="Last Name"
                />
              </div>
              <div>
                <MYDatePicker
                  name="dateOfBirth"
                  placeholder="Date Of Birth"
                  label="Date Of Birth"
                />
              </div>
              <div>
                <MYSelect
                  name="bloodGroup"
                  title="Blood Group"
                  label="Blood Group"
                  nameOptions={bloodGrouopOptions}
                />
              </div>
              <div>
                <MYSelect
                  name="gender"
                  nameOptions={genderOptions}
                  title="Gender"
                  label="Gender"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <Controller
                  name="profileImg"
                  render={({ field: { onChange, value, ...field } }) => (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                        value={value?.fileName}
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="mb-8">
            <Divider className="text-lg font-semibold text-gray-700">Contact Information</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <MYInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  label="Email"
                />
              </div>
              <div>
                <MYInput
                  name="contactNo"
                  type="number"
                  placeholder="Contact No"
                  label="Contact No"
                />
              </div>
              <div>
                <MYInput
                  name="emergencyContactNo"
                  type="number"
                  placeholder="Emergency Contact No"
                  label="Emergency Contact No"
                />
              </div>
              <div>
                <MYInput
                  name="permanentAddress"
                  type="text"
                  placeholder="Permanent Address"
                  label="Permanent Address"
                />
              </div>
              <div>
                <MYInput
                  name="presentAddress"
                  type="text"
                  placeholder="Present Address"
                  label="Present Address"
                />
              </div>
            </div>
          </div>

          {/* Guardian Information Section */}
          <div className="mb-8">
            <Divider className="text-lg font-semibold text-gray-700">Guardian Information</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <MYInput
                  name="guardian.fatherName"
                  type="text"
                  placeholder="Father Name"
                  label="Father Name"
                />
              </div>
              <div>
                <MYInput
                  name="guardian.fatherOccupation"
                  type="text"
                  placeholder="Father Occupation"
                  label="Father Occupation"
                />
              </div>
              <div>
                <MYInput
                  name="guardian.fatherContactNo"
                  type="number"
                  placeholder="Father Contact No"
                  label="Father Contact No"
                />
              </div>
              <div>
                <MYInput
                  name="guardian.motherName"
                  type="text"
                  placeholder="Mother Name"
                  label="Mother Name"
                />
              </div>
              <div>
                <MYInput
                  name="guardian.motherOccupation"
                  type="text"
                  placeholder="Mother Occupation"
                  label="Mother Occupation"
                />
              </div>
              <div>
                <MYInput
                  name="guardian.motherContactNo"
                  type="number"
                  placeholder="Mother Contact No"
                  label="Mother Contact No"
                />
              </div>
            </div>
          </div>

          {/* Local Guardian Information Section */}
          <div className="mb-8">
            <Divider className="text-lg font-semibold text-gray-700">Local Guardian Information</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <MYInput
                  name="localGuardian.name"
                  type="text"
                  placeholder="Name"
                  label="Name"
                />
              </div>
              <div>
                <MYInput
                  name="localGuardian.occupation"
                  type="text"
                  placeholder="Occupation"
                  label="Occupation"
                />
              </div>
              <div>
                <MYInput
                  name="localGuardian.contactNo"
                  type="number"
                  placeholder="Contact No"
                  label="Contact No"
                />
              </div>
              <div>
                <MYInput
                  name="localGuardian.address"
                  type="text"
                  placeholder="Address"
                  label="Address"
                />
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="mb-8">
            <Divider className="text-lg font-semibold text-gray-700">Academic Information</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <MYSelect
                  name="admissionSemester"
                  label="Academic Semester"
                  disabled={sLoading}
                  nameOptions={semestersOptions}
                  title="Academic Semester"
                />
              </div>
              <div>
                <MYSelect
                  name="academicDepartment"
                  label="Academic Department"
                  disabled={dLoading}
                  nameOptions={academicDepartmentOptions}
                  title="Academic Department"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <Button
              htmlType="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Create Student
            </Button>
          </div>
        </MYForm>
      </div>
    </div>
  );
};

export default CreateStudent;