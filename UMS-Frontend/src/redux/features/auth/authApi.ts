import { TQueryParams, TResponseRedux } from "../../../types";
import { TUserDefaults } from "../../../types/user.type";
import { baseApi } from "../../api/api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    getMe: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users/me",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
      transformResponse: (response: TResponseRedux<TUserDefaults>) => {
        return response?.data;
      },
    }),
    updateMe: builder.mutation({
      query: (userData) => ({
        url: "/users/me",
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response: TResponseRedux<TUserDefaults>) => {
        return response?.data;
      },
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useUpdateMeMutation } = authApi;
