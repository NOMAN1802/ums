import { TAdmin } from "./../../../types/userManagement.type";
import {
  TFaculty,
  TQueryParams,
  TResponseRedux,
  TStudent,
} from "../../../types";
import { baseApi } from "../../api/api";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      providesTags:['user'],
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return response?.data;
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
      invalidatesTags:['user'],
    }),
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },
      providesTags:['user'],
      transformResponse: (response: TResponseRedux<TAdmin>) => {
        return response?.data;
      },
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags:['user'],
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags:['user'],
    }),
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      providesTags:['user'],
      transformResponse: (response: TResponseRedux<TFaculty>) => {
        return response?.data;
      },
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    getSingleStudent: builder.query({
      query: (id) => {
        const params = new URLSearchParams();
        return {
          url: `/students/${id}`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return response?.data;
      },
    }),
    getSingleAdmin: builder.query({
      query: (id) => {
        const params = new URLSearchParams();
        return {
          url: `/admins/${id}`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin>) => {
        return response?.data;
      },
    }),
    getSingleFaculty: builder.query({
      query: (id) => {
        const params = new URLSearchParams();
        return {
          url: `/faculties/${id}`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty>) => {
        return response?.data;
      },
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useAddStudentMutation,
  useGetAllAdminsQuery,
  useAddAdminMutation,
  useAddFacultyMutation,
  useGetAllFacultiesQuery,
  useChangePasswordMutation,
  useGetSingleStudentQuery,
  useGetSingleAdminQuery,
  useGetSingleFacultyQuery,
} = userManagementApi;
