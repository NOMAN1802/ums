/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Button } from "antd";
import { BiLeftArrow } from "react-icons/bi";
import { TStudent } from "../../../types";
import Loader from "../../../utils/Loader";


export interface StudentApiResponse {
  success: boolean;
  message: string;
  data: TStudent;
  isLoading:any;
  isError:any;
}

const StudentDetailsData = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const {
    data: studentData,
    isLoading,
    isError,
  } = useGetSingleStudentQuery<StudentApiResponse>(studentId);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className="text-red-500 text-center py-8">Error loading student data. Please try again later.</div>;
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
          onClick={() => navigate("/admin/student-data")}
          icon={<BiLeftArrow />}
          className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm border border-gray-200"
        >
          Back to Student List
        </Button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              {studentData?.profileImg ? (
                <img
                  src={studentData.profileImg}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {studentData.name.firstName} {studentData.name.middleName}{" "}
                {studentData.name.lastName}
              </h1>
              <p className="text-indigo-100 font-medium">Student ID: {studentData.id}</p>
              <p className="text-indigo-100 mt-2">
                {studentData.academicDepartment?.name || "Department not specified"}
              </p>
              <p className="text-indigo-100">
                {studentData.academicDepartment?.academicFaculty?.name || "Faculty not specified"}
              </p>
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
                <span className="text-gray-800 capitalize">{studentData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Date of Birth</span>
                <span className="text-gray-800">{formatDate(studentData.dateOfBirth)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Blood Group</span>
                <span className="text-gray-800">{studentData.bloodGroup || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Email</span>
                <span className="text-gray-800 break-all">{studentData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Contact No</span>
                <span className="text-gray-800">{studentData.contactNo || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Emergency Contact</span>
                <span className="text-gray-800">{studentData.emergencyContact || "N/A"}</span>
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
                  {studentData.presentAddress || "Not specified"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Permanent Address</h3>
                <p className="text-gray-800">
                  {studentData.permanentAddress || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Guardian Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Father</h3>
                <p className="text-gray-800">{studentData.guardian.fatherName}</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <span className="text-sm text-gray-600">Occupation: {studentData.guardian.fatherOccupation}</span>
                  <span className="text-sm text-gray-600">Contact: {studentData.guardian.fatherContact}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Mother</h3>
                <p className="text-gray-800">{studentData.guardian.motherName}</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <span className="text-sm text-gray-600">Occupation: {studentData.guardian.motherOccupation}</span>
                  <span className="text-sm text-gray-600">Contact: {studentData.guardian.motherContact}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Local Guardian & Academic Info */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Local Guardian & Academic Info</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Local Guardian</h3>
                <p className="text-gray-800">{studentData.localGuardian.name}</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <span className="text-sm text-gray-600">Occupation: {studentData.localGuardian.occupation}</span>
                  <span className="text-sm text-gray-600">Contact: {studentData.localGuardian.contactNo}</span>
                </div>
                <p className="text-sm text-gray-800 mt-1">Address: {studentData.localGuardian.address}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Admission Semester</h3>
                <p className="text-gray-800">
                  {studentData.admissionSemester.name} {studentData.admissionSemester.year}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsData;