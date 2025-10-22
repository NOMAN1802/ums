import { TQueryParams, TResponseRedux } from "../../../types";
import { TEnrolledCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/api";

const facultyCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacultyCourses: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<TEnrolledCourse>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addMark: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/update-enrolled-course-marks",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllFacultyCoursesQuery, useAddMarkMutation } =
  facultyCourseApi;
