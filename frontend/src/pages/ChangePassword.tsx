import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { TResponse } from "../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import MYForm from "../components/Form/MYForm";
import MYInput from "../components/Form/MYInput";
import { logOut } from "../redux/features/auth/authSlice";
import { toast } from "sonner";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing the password...");
    try {
      const res = (await changePassword(data)) as TResponse<{
        data: string;
        message: string;
      }>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        dispatch(logOut());
        navigate("/login");
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <MYForm onSubmit={onSubmit}>
        <MYInput type="text" name="oldPassword" label="Old Password" />
        <MYInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Login</Button>
      </MYForm>
    </Row>
  );
};

export default ChangePassword;
