import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  user: null | { id: string; role: string; name: string; image: string };
  token: null | string;
};

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
