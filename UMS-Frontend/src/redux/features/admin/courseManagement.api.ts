import { TFaculty, TQueryParams, TResponseRedux } from "../../../types";
import {
  TCourse,
  TSemesterRegistration,
} from "../../../types/courseManagement.type";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/api";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TSemesterRegistration>) => {
        return response?.data;
      },
    }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<TCourse>) => {
        return response?.data;
      },
    }),
    addCourses: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    assignFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args?.id}/assign-faculties`,
        method: "PUT",
        body: args?.data,
      }),
      invalidatesTags: ["courses"],
    }),
    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: `/offered-courses/create-offered-course`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<TOfferedCourse>) => {
        return {
          meta: response?.meta,
          result: response?.data,
        };
      },
    }),
    getCourseFaculties: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `/courses/${id}/get-faculties`,
          method: "GET",
        };
      },
      providesTags: ["courses"],
      transformResponse: (
        response: TResponseRedux<TFaculty>
      ) => {
        console.log(response);
        return {
          result: response.data,
        };
      },
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
  useGetAllCoursesQuery,
  useAddCoursesMutation,
  useAssignFacultiesMutation,
  useCreateOfferedCourseMutation,
  useGetAllOfferedCoursesQuery,
  useGetCourseFacultiesQuery,
} = courseManagementApi;
