import { TMeta } from "./global";

export type TSemester = {
  year: string | number;
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
  _v: number;
};

export type TSemesterRegistration = {
  _id: string;
  academicSemester: TSemester;
  status: string;
  startDate: string;
  endDate: string;
  minDate: number;
  maxDate: number;
  createdAt: string;
  updatedAt: string;
};

export type TCourses = {
  meta: TMeta;
  result: TCourse[];
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: string;
  credits: number;
  preRequisiteCourses: PreRequisiteCourse[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface PreRequisiteCourse {
  course: Course;
  isDeleted: boolean;
}

export interface Course {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: PreRequisiteCourse[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
