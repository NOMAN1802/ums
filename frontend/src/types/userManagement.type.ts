import {
  TAcademicDepartment,
  TAcademicSemester,
} from "./academicManagement.type";
import { TMeta } from "./global";

export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  dateOfBirth: string;
  email: string;
  gender: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup: string;
  permanentAddress: string;
  presentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: string;
  profileImg?: string;
  isDeleted: boolean;
  fullName: string;
};

export type TUser = {
  _id: string;
  id: string;
  needPasswordChange: boolean;
  role: string;
  email: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TGuardian = {
  fatherName: string;
  fatherContact: string;
  fatherOccupation: string;
  motherName: string;
  motherContact: string;
  motherOccupation: string;
  _id: string;
};

export type TLocalGuardian = {
  address: string;
  contactNo: string;
  name: string;
  occupation: string;
  _id: string;
};

export type TFaculties = {
  meta: TMeta;
  result: TFaculty[];
};

export type TFaculty = {
  _id: string;
  id: string;
  user: string;
  designation: string;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicDepartment: TAcademicDepartment;
  isDeleted: boolean;
  __v: number;
  fullName: string;
};

export type TAdmin = {
  _id: string;
  id: string;
  user: string;
  designation: string;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  admissionSemester: TAcademicSemester;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isDeleted: boolean;
  fullName: string;
};
