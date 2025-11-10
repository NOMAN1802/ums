/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  IdcardOutlined,
  BookOutlined,
  SolutionOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Form, Input, Button, message, Upload, Tag } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {
  useGetMeQuery,
  useUpdateMeMutation,
} from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

type NameType = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type ProfileType = {
  id: string;
  email: string;
  name: NameType;
  gender: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  fullName: string;
  user: {
    role: string;
    status: string;
  };
  status: string;
  designation?: string;
  department?: string;
  studentId?: string;
  batch?: string;
  faculty?: string;
};

const roleConfig = {
  admin: {
    color: "bg-gradient-to-r from-red-600 to-red-400",
    icon: <IdcardOutlined className="text-white text-2xl" />,
    specificFields: ["designation"],
  },
  faculty: {
    color: "bg-gradient-to-r from-blue-600 to-blue-400",
    icon: <SolutionOutlined className="text-white text-2xl" />,
    specificFields: ["designation", "department"],
  },
  student: {
    color: "bg-gradient-to-r from-green-600 to-green-400",
    icon: <BookOutlined className="text-white text-2xl" />,
    specificFields: ["studentId", "batch", "faculty"],
  },
};

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const navigate = useNavigate();

  const { data: profileData, isLoading, isError } = useGetMeQuery(undefined);

  const [updateProfile] = useUpdateMeMutation(undefined);

  // console.log(profileData);

  const profile: ProfileType = (profileData && 'id' in profileData) ? profileData as unknown as ProfileType : {
    id: "",
    email: "",
    name: { firstName: "", lastName: "" },
    gender: "",
    dateOfBirth: "",
    contactNo: "",
    emergencyContactNo: "",
    bloodGroup: "",
    presentAddress: "",
    permanentAddress: "",
    profileImg: "",
    fullName: "",
    user: {
      role: "",
      status: "",
    },
    status: "",
  };

  const currentRoleConfig = roleConfig[
    profile.user.role as keyof typeof roleConfig
  ] || {
    color: "bg-gradient-to-r from-gray-600 to-gray-400",
    icon: <UserOutlined className="text-white text-2xl" />,
    specificFields: [],
  };

  const handleEditClick = () => {
    setIsEditing(true);
    form.setFieldsValue({
      ...profile,
      name: profile.name,
      dateOfBirth: profile.dateOfBirth ? dayjs(profile.dateOfBirth) : null,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFileList([]);
    form.resetFields();
  };

  const handleUploadChange = (info: UploadChangeParam<UploadFile>) => {
    const file = info.file.originFileObj;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFileList([info.file]);
    }
  };

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          name: values.name,
          contactNo: values.contactNo,
          emergencyContactNo: values.emergencyContactNo,
          presentAddress: values.presentAddress,
          permanentAddress: values.permanentAddress,
          // profileImg: values.profileImg,
        })
      );

      // Append image file if exists
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("file", values.profileImg);
      }

      // Call the mutation
      await updateProfile(formData).unwrap();

      message.success("Profile updated successfully");
      setIsEditing(false);
      setFileList([]);
    } catch (err) {
      message.error("Failed to update profile");
      console.error("Update error:", err);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-profileImgb-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md w-full rounded-lg shadow-sm">
          <p className="font-bold">Error</p>
          <p>Failed to load profile data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Go Home Button */}
        <div className="mb-6">
          <Button
            onClick={() => navigate("/")}
            icon={<HomeOutlined />}
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm border border-gray-200"
          >
            Go Home
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div
            className={`${currentRoleConfig.color} px-6 py-5 flex justify-between items-center`}
          >
            <div className="flex items-center gap-3">
              {currentRoleConfig.icon}
              <h1 className="text-2xl font-bold text-white capitalize">
                {profile.user.role} Profile
              </h1>
              <Tag
                color={
                  profile.user.role === "admin"
                    ? "red"
                    : profile.user.role === "faculty"
                    ? "blue"
                    : "green"
                }
                className="ml-2 capitalize"
              >
                {profile.user.role}
              </Tag>
            </div>
            {!isEditing ? (
              <Button
                onClick={handleEditClick}
                icon={<EditOutlined />}
                className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm"
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={handleCancel}
                  icon={<CloseOutlined />}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200 shadow-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => form.submit()}
                  icon={<SaveOutlined />}
                  type="primary"
                  className={`${
                    profile.user.role === "admin"
                      ? "bg-red-500 hover:bg-red-600"
                      : profile.user.role === "faculty" ||
                        profile.user.role == "student"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="p-6 md:p-8">
            <Form
              form={form}
              onFinish={onFinish}
              className="flex flex-col lg:flex-row gap-8"
            >
              {/* Left Column - Avatar and Basic Info */}
              {/* Left Column - Avatar and Basic Info */}
              <div className="w-full lg:w-1/3 flex flex-col items-center space-y-6">
                {/* Avatar Section */}
                <div className="relative group w-full flex flex-col items-center mb-10">
                  <div className="relative">
                    <Upload
                      name="avatar"
                      listType="picture-circle"
                      showUploadList={false}
                      disabled={!isEditing}
                      beforeUpload={(file) => {
                        // Only accept image files
                        const isImage = file.type.startsWith("image/");
                        if (!isImage) {
                          message.error("You can only upload image files!");
                        }

                        // Check file size (5MB limit)
                        const isLt5M = file.size / 1024 / 1024 < 5;
                        if (!isLt5M) {
                          message.error("Image must be smaller than 5MB!");
                        }

                        return isImage && isLt5M;
                      }}
                      onChange={handleUploadChange}
                      className={`${
                        isEditing
                          ? "cursor-pointer hover:shadow-lg transition-shadow duration-200"
                          : "cursor-default"
                      }`}
                    >
                      {imageUrl || profile.profileImg ? (
                        <div className="relative">
                          <img
                            src={imageUrl || profile.profileImg}
                            alt="Profile"
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 hover:scale-105"
                          />
                          {isEditing && (
                            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white bg-opacity-80 rounded-full p-2">
                                <EditOutlined className="text-blue-600 text-xl" />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                          <UserOutlined className="text-5xl text-gray-400" />
                        </div>
                      )}
                    </Upload>
                  </div>

                  {isEditing && (
                    <Button
                      onClick={() =>
                        (document.querySelector(".ant-upload-select") as HTMLElement)?.click()
                      }
                      type="default"
                      className="mt-4 w-48 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                      icon={<EditOutlined />}
                    >
                      Change Photo
                    </Button>
                  )}
                </div>

                {/* Profile Info Card */}
                <div className="w-full bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      {profile.fullName}
                    </h2>
                    {profile.designation && (
                      <p className="text-gray-500 font-medium">
                        {profile.designation}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Status Badge */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-500">
                        Status
                      </span>
                      <Tag
                        color={
                          profile.user.status === "active" ? "green" : "orange"
                        }
                        className="px-3 py-1 rounded-full font-medium"
                      >
                        {profile.user.status}
                      </Tag>
                    </div>

                    {/* User Role */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-500">
                        Role
                      </span>
                      <Tag
                        color={
                          profile.user.role === "admin"
                            ? "red"
                            : profile.user.role === "faculty"
                            ? "blue"
                            : "green"
                        }
                        className="px-3 py-1 rounded-full font-medium capitalize"
                      >
                        {profile.user.role}
                      </Tag>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Common fields */}
                  <Form.Item
                    name={["name", "firstName"]}
                    label="First Name"
                    className="mb-4"
                  >
                    {isEditing ? (
                      <Input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                        {profile.name.firstName}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item
                    name={["name", "middleName"]}
                    label="Middle Name"
                    className="mb-4"
                  >
                    {isEditing ? (
                      <Input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                        {profile.name.middleName || "-"}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item
                    name={["name", "lastName"]}
                    label="Last Name"
                    className="mb-4"
                  >
                    {isEditing ? (
                      <Input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                        {profile.name.lastName}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item name="email" label="Email" className="mb-4">
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                      {profile.email}
                    </div>
                  </Form.Item>

                  <Form.Item
                    name="dateOfBirth"
                    label="Date of Birth"
                    className="mb-4"
                  >
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                      {profile.dateOfBirth
                        ? dayjs(profile.dateOfBirth).format("MMMM D, YYYY")
                        : "-"}
                    </div>
                  </Form.Item>

                  <Form.Item name="gender" label="Gender" className="mb-4">
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 capitalize">
                      {profile.gender || "-"}
                    </div>
                  </Form.Item>

                  <Form.Item
                    name="contactNo"
                    label="Contact Number"
                    className="mb-4"
                  >
                    {isEditing ? (
                      <Input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                        {profile.contactNo || "-"}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item
                    name="emergencyContactNo"
                    label="Emergency Contact"
                    className="mb-4"
                  >
                    {isEditing ? (
                      <Input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                        {profile.emergencyContactNo || "-"}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item
                    name="bloodGroup"
                    label="Blood Group"
                    className="mb-4"
                  >
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                      {profile.bloodGroup || "-"}
                    </div>
                  </Form.Item>
                </div>

                {/* Address Fields */}
                <div className="mt-8 space-y-6">
                  <Form.Item
                    name="presentAddress"
                    label="Present Address"
                    className="mb-4"
                  >
                    {isEditing ? (
                      <TextArea
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                        {profile.presentAddress || "-"}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item
                    name="permanentAddress"
                    label="Permanent Address"
                    className="mb-4"
                  >
                    {isEditing ? (
                      <TextArea
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                        {profile.permanentAddress || "-"}
                      </div>
                    )}
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
