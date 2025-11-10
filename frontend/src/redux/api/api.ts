//NOTE check that this import from has the query/react
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logOut, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

type TApiError = {
  status: number;
  data: {
    message: string;
  };
};

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  //NOTE if you want to add cookies on your browser you need to change it to be credentials:'include'
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    const error = result.error as TApiError;
    if (result?.error?.status === 404) {
      toast.error(error?.data?.message);
    }
    if (result?.error?.status === 403) {
      toast.error(error?.data?.message);
    }
  }
  if (result?.error?.status === 401) {
    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: data?.data?.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "semester",
    "courses",
    "offeredCourse",
    "user",
    "academicDepartment",
  ],
  endpoints: () => ({}),
});
