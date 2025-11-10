import { TQueryParams, TResponseRedux, TUser } from "../../../types";
import { baseApi } from "../../api/api";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users/getAllUser",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TUser>) => {
        return response?.data;
      },
    }),
  }),
});

export const { useGetAllUsersQuery } = userManagementApi;
