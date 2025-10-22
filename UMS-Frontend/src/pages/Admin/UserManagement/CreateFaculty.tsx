import { Button, Divider } from "antd";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MYInput from "../../../components/Form/MYInput";
import MYSelect from "../../../components/Form/MYSelect";
import { bloodGrouopOptions, genderOptions } from "../../../constants/global";
import MYDatePicker from "../../../components/Form/MYDatePicker";
import MYForm from "../../../components/Form/MYForm";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { TFaculty, TResponse } from "../../../types";
import { toast } from "sonner";

const CreateFaculty = () => {
  const { data: dData, isLoading: dLoading } = 
    useGetAllAcademicDepartmentQuery(undefined);
  const [addFaculty] = useAddFacultyMutation(undefined);
  const { reset } = useForm(); // For form reset functionality

  const academicDepartmentOptions = dData?.result?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Faculty...");
    const facultyData = {
      password: "admin123",
      faculty: data,
    };
    
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.profileImg);
    
    try {
      const res = (await addFaculty(formData)) as TResponse<TFaculty>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
        reset(); // Reset form after successful submission
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", { id: toastId });
    }
  };

  return (
    <div className="p-4 md:p-6  mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Faculty</h1>
        
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

          {/* Academic Information Section */}
          <div className="mb-8">
            <Divider className="text-lg font-semibold text-gray-700">Academic Information</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              Create Faculty Member
            </Button>
          </div>
        </MYForm>
      </div>
    </div>
  );
};

export default CreateFaculty;