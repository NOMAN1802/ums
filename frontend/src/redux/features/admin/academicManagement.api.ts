import { TQueryParams, TResponseRedux } from "../../../types";
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/academicManagement.type";
import { baseApi } from "../../api/api";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: (args) => {
        console.log("args", args);
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["academicDepartment"],
      transformResponse: (response: TResponseRedux<TAcademicSemester>) => {
        return response?.data;
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicDepartment"],
    }),
    getAllAcademicFacultyName: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
            providesTags: ["academicDepartment"],
      transformResponse: (response: TResponseRedux<TAcademicFaculty>) => {
        return response?.data;
      },
    }),
    addAcademicFacultyName: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicDepartment"],
    }),
    getAllAcademicDepartment: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),
      providesTags: ["academicDepartment"],
      transformResponse: (response: TResponseRedux<TAcademicDepartment>) => {
        return response?.data;
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicDepartment"],
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useGetAllAcademicFacultyNameQuery,
  useAddAcademicFacultyNameMutation,
  useGetAllAcademicDepartmentQuery,
  useAddAcademicDepartmentMutation,
} = academicManagementApi;
