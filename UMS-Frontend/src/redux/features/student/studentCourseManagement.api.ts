import { TQueryParams, TResponseRedux } from "../../../types";
import {
  TEnrolledCourse,
  TOfferedCourse,
} from "../../../types/studentCourse.type";
import { baseApi } from "../../api/api";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCoursesFromStudent: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<TOfferedCourse>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllEnrolledCourses: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enrolled-courses/my-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<TEnrolledCourse>) => {
        return {
          data: response.data,
        };
      },
    }),
    getSingleEnrolledCourse: builder.query({
      query: (id: string) => {
        return {
          url: `/enrolled-courses/enrolled-course/${id}`,
          method: "GET",
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<TEnrolledCourse>) => {
        return response.data;
      },
    }),
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
  }),
});

export const {
  useGetAllOfferedCoursesFromStudentQuery,
  useEnrollCourseMutation,
  useGetAllEnrolledCoursesQuery,
  useGetSingleEnrolledCourseQuery,
} = studentCourseApi;
