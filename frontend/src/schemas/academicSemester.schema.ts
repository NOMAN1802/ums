import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ message: "Please select a semester name" }),
  year: z.string({ message: "Please select a year" }),
  startMonth: z.string({ message: "Please select a start month" }),
  endMonth: z.string({ message: "Please select end month" }),
});

export const academicFacultyNameSchema = z.object({
  name: z.string({ message: "Please enter a faculty name" }),
});

export const academicDepartmentSchema = z.object({
  name: z.string({ message: "Please enter a course name" }),
  academicFaculty: z.string({
    message: "Please select a Academic Faculty name",
  }),
});
