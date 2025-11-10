/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../redux/features/admin/userManagement.api";
import { Button } from "antd";
import { BiLeftArrow } from "react-icons/bi";
import Loader from "../../../utils/Loader";
import { TAdmin } from "../../../types";



export interface AdminApiResponse {
  success: boolean;
  message: string;
  data: TAdmin;
  isLoading:any;
  isError:any;
}



const AdminDetailsData = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();

  const {
    data: adminData,
    isLoading,
    isError,
  } = useGetSingleAdminQuery<AdminApiResponse>(adminId);

  console.log(adminData);

  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <div>Error loading student data.</div>;
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
    <div className="container mx-auto ">
      {/* Go Home Button */}
      <div className="mb-6">
        <Button
          onClick={() => navigate("/admin/admin-data")}
          icon={<BiLeftArrow />}
          className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm border border-gray-200"
        > 
        Back to Admin List
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-start mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mr-6">
            {adminData?.profileImg ? (
              <img
                src={adminData.profileImg}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {adminData?.name?.firstName} {adminData?.name?.middleName}{" "}
              {adminData?.name?.lastName}
            </h2>
            <p className="text-gray-600 mb-2">{adminData.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="space-y-3">
              <p>
                <span className="font-medium">Gender:</span>{" "}
                {adminData?.gender}
              </p>
              <p>
                <span className="font-medium">Date of Birth:</span>{" "}
                {formatDate(adminData?.dateOfBirth)}
              </p>
              <p>
                <span className="font-medium">Blood Group:</span>{" "}
                {adminData.bloodGroup}
              </p>
              <p>
                <span className="font-medium">Email:</span> {adminData?.email}
              </p>
              <p>
                <span className="font-medium">Contact No:</span>{" "}
                {adminData?.contactNo}
              </p>
              <p>
                <span className="font-medium">Emergency Contact:</span>{" "}
                {adminData?.emergencyContactNo}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Address Information</h3>
            <div className="space-y-3">
              <p>
                <span className="font-medium">Present Address:</span>{" "}
                {adminData?.presentAddress}
              </p>
              <p>
                <span className="font-medium">Permanent Address:</span>{" "}
                {adminData?.permanentAddress}
              </p>
            </div>
          </div>



          
        </div>
      </div>
    </div>
  );
};

export default AdminDetailsData;
