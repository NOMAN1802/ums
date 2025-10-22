import { useCallback } from "react";
import { useGetMeQuery } from "../redux/features/auth/authApi";
import { useAppSelector } from "../redux/hook";
import { selectCurrentToken } from "../redux/store";
import { verifyToken } from "./verifyToken";

type UserResponse = {
  profileImg?: string;
  fullName?: string;
  user: {
    role: string;
  };
};

export const UserData = () => {
  const token = useAppSelector(selectCurrentToken);
  const { data: userCheck } = useGetMeQuery(undefined) as {
    data: UserResponse | undefined;
  };

  let user;

  if (token) {
    user = verifyToken(token);
  }


  const clearUserData = useCallback(() => {
    localStorage.removeItem('persist:auth'); // or whatever key you use
    sessionStorage.removeItem('persist:auth');
    // Clear any other storage locations
  }, []);
  const userWithDefaults = {
    ...user,
    image: userCheck?.profileImg,
    name: userCheck?.fullName,
    role: userCheck?.user?.role,
  };
  return { user, userWithDefaults , clearUserData};
};
