/* eslint-disable @typescript-eslint/no-unused-vars */
import Logo from "../assets/icons/logo.png";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MYForm from "../components/Form/MYForm";
import MYInput from "../components/Form/MYInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const defaultValues = {
    id: "A-0001",
    password: "123456",
  };

  const [login] = useLoginMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await login(data).unwrap();
      const token = res.data.accessToken;
      const user = verifyToken(token) as TUser;
      dispatch(
        setUser({
          user: user,
          token: token,
        })
      );
      toast.success("Logged In", { id: toastId, duration: 2000 });
      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something Went Wrong", {
        id: toastId,
        duration: 20000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      {/* Login Container */}
      <div className="max-w-md mx-auto bg-white p-8  shadow-md w-full m-4">
        {/* University Header */}
        <div className="flex justify-between items-center pb-10">
          <Link to="/">
            <div>
              <img src={Logo} alt="" className="md:h-20 md:w-20" />
            </div>
          </Link>
          <div>
            <p className="font-semibold md:text-lg">University Management Systems</p>
            <p className="text-sm text-gray-600 mt-2">
              - where leaders are created.
            </p>
          </div>
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-6">
            Sign in with your organizational id number.
          </p>
        </div>

        <MYForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <div className="mb-4">
            <MYInput
              name="id"
              type="text"
              label="User ID"
              className="w-full p-3 border rounded border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <MYInput
              name="password"
              type="password"
              label="Password"
              className=""
            />
          </div>

          <button
            type="submit"
            className="w-full text-white px-4 py-2 text-lg bg-green-700 cursor-pointer"
          >
            Log In
          </button>
        </MYForm>

        <div className="mt-4 text-center">
          <a href="#" className="text-green-900 hover:text-green-700 text-sm">
            Can't access your account?
          </a>
        </div>
      </div>

      {/* Optional Image Section (if you want to keep it) */}
      {/* {false && (
        <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: `url(${LoginImage})` }}>
          <div className="flex items-center h-full bg-gray-900/70 px-20">
            <div>
              <h2 className="text-4xl font-bold text-white">My University</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Login;
