import { Layout, Input, Avatar, Dropdown, Menu } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  GlobalOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { VscSignOut } from "react-icons/vsc";
import { useAppDispatch } from "../../redux/hook";
import { IoIosArrowDown } from "react-icons/io";
import { logOut } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { UserData } from "../../utils/userData";

const { Header } = Layout;

const CustomHeader = () => {
  const { userWithDefaults } = UserData();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Logout Successfully", { duration: 1000 });
  };
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <p
          className="text-center flex items-center gap-2 text-red-500 "
          onClick={handleLogout}
        >
          <VscSignOut /> <p>Logout</p>
        </p>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        background: "#FFFFFF",
      }}
      className="m-3 border-rounded rounded-2xl "
    >
      {/* Left - Page Title */}
      <h3 style={{ fontWeight: "600", fontSize: "18px", color: "#475569" }}>
        Dashboard
      </h3>

      {/* Center - Search Bar */}
      <div className="hidden md:block">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search something.."
          style={{
            width: 300,
            borderRadius: "20px",
            background: "#EAEFF3",
            border: "none",
            padding: "8px 12px",
          }}
        />
      </div>
      {/* Right - Icons & User Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        {/* Language Selection */}
        <div className="hidden md:block">
          <GlobalOutlined
          style={{ fontSize: "18px", color: "#64748B" }}
          className="cursor-pointer"
        />
        </div>

        {/* Notifications */}
        <div className="hidden md:block">
          <BellOutlined
          style={{ fontSize: "18px", color: "#64748B" }}
          className="cursor-pointer"
        />
        </div>

        {/* Settings */}
        <div className="hidden md:block">
          <SettingOutlined
          style={{ fontSize: "18px", color: "#64748B" }}
          className="cursor-pointer"
        />
        </div>

        {/* User Profile Dropdown */}
        <Dropdown overlay={menu} trigger={["click"]}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar src={userWithDefaults?.image} size={32} />
            <span
              style={{ marginLeft: "8px", fontWeight: "500" }}
              className="flex items-center gap-2 text-gray-600 text-sm"
            >
              {userWithDefaults?.name}{" "}
              <IoIosArrowDown className="font-semibold" />
            </span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default CustomHeader;
