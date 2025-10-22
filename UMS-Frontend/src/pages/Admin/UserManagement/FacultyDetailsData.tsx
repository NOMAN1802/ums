/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleFacultyQuery } from "../../../redux/features/admin/userManagement.api";
import { Button } from "antd";
import { BiLeftArrow } from "react-icons/bi";
import Loader from "../../../utils/Loader";
import { TFaculty } from "../../../types";

export interface FacultyApiResponse {
  success: boolean;
  message: string;
  data: TFaculty;
  isLoading:any;
  isError:any;
}



const FacultyDetailsData = () => {
  const { facultyId } = useParams();
  const navigate = useNavigate();

  console.log(facultyId)

  const {
    data: facultyData,
    isLoading,
    isError,
  } = useGetSingleFacultyQuery<FacultyApiResponse>(facultyId);

  console.log(facultyData)

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className="text-red-500 text-center py-8">Error loading faculty data. Please try again later.</div>;
  }

  // Format date of birth
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 ">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          onClick={() => navigate("/admin/faculty-data")}
          icon={<BiLeftArrow />}
          className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm border border-gray-200"
        >
          Back to Faculty List
        </Button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              {facultyData?.profileImg ? (
                <img
                  src={facultyData.profileImg}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {facultyData.name.firstName} {facultyData.name.middleName}{" "}
                {facultyData.name.lastName}
              </h1>
              <p className="text-blue-100 font-medium">{facultyData.designation}</p>
              <p className="text-blue-100 mt-2">
                {facultyData.academicDepartment?.name || "Department not specified"}
              </p>
              <p className="text-blue-100">ID: {facultyData.id}</p>
            </div>
          </div>
        </div>

        {/* Details Sections */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Gender</span>
                <span className="text-gray-800 capitalize">{facultyData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Date of Birth</span>
                <span className="text-gray-800">{formatDate(facultyData.dateOfBirth)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Blood Group</span>
                <span className="text-gray-800">{facultyData.bloodGroup || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Email</span>
                <span className="text-gray-800 break-all">{facultyData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Contact No</span>
                <span className="text-gray-800">{facultyData.contactNo || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Emergency Contact</span>
                <span className="text-gray-800">{facultyData.emergencyContactNo || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Address Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Present Address</h3>
                <p className="text-gray-800">
                  {facultyData.presentAddress || "Not specified"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Permanent Address</h3>
                <p className="text-gray-800">
                  {facultyData.permanentAddress || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Department Information */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Department Information</h2>
            </div>
            {facultyData.academicDepartment ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Department</span>
                  <span className="text-gray-800">{facultyData.academicDepartment.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Faculty</span>
                  <span className="text-gray-800">
                    {facultyData.academicDepartment.academicFaculty?.name || "N/A"}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No department information available</p>
            )}
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Additional Information</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  facultyData.isDeleted ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                }`}>
                  {facultyData.isDeleted ? "Inactive" : "Active"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetailsData;