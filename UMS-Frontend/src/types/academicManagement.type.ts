export type TAcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    _v: number;
  };
  _v: number;
};

export type TEnrolledCourse = {
  offeredCourse: string;
};
