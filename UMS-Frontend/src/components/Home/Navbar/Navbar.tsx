/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from "react";
import Logo from "../../../assets/icons/logo.png";
import NavItem from "./NavItem";
import { Link, useLocation } from "react-router-dom";
import ToggleNavbar from "./ToggleNavbar";
import { FaBars } from "react-icons/fa6";
import { TfiClose } from "react-icons/tfi";
import { TbDashboard } from "react-icons/tb";
import { navLinks } from "../../../utils/navItems";
import { useAppDispatch } from "../../../redux/hook";
import { Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { VscSignOut } from "react-icons/vsc";
import { logOut } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { UserData } from "../../../utils/userData";
import { baseApi } from "../../../redux/api/api";

const Navbar = () => {
  const { userWithDefaults, clearUserData } = UserData();
  const dispatch = useAppDispatch();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);
 const handleLogout = async () => {
    try {
      clearUserData();

      dispatch(baseApi.util.resetApiState());

      await dispatch(logOut());
      
  
      toast.success("Logged out successfully", { duration: 2000 });
    } catch (error) {
      toast.error("Failed to logout", { duration: 2000 });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="dashboard" icon={<TbDashboard />}>
        <Link to={`${userWithDefaults?.role}/dashboard`}>Dashboard</Link>
      </Menu.Item>
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
    <div className="">
      {/* Main Navbar */}
      <div
        className={`transition cursor-pointer flex container max-w-full justify-around md:justify-center items-center duration-300 h-20 lg:h-24 fixed top-0 left-0 w-full z-[100] bg-white shadow-md"
        }`}
      >
        <Link to="/">
          <img src={Logo} className="relative h-12 w-12" alt="logo" />
        </Link>
        <div className="relative h-full">
          <div className="container mx-auto h-full flex justify-between items-center lg:grid lg:grid-cols-3 gap-5 px-1 md:px-2">
            <div className="col-span-1 flex justify-start items-center"></div>
            <div className="hidden md:flex justify-center items-center gap-3">
              {navLinks.map((navItem, index) => (
                <nav
                  key={index}
                  className=" bg-opacity-70 text-black px-6 py-3 flex space-x-6  "
                >
                  <NavItem navItem={navItem} />
                </nav>
              ))}
            </div>
          </div>
        </div>

        {userWithDefaults?.role ? (
          <div className="relative flex justify-center items-center gap-3">
            <Dropdown overlay={menu} trigger={["click"]}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={userWithDefaults?.image}
                  className="size-10 rounded-full"
                  alt="userImage"
                />
              </div>
            </Dropdown>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="relative flex text-black hover:text-gray-500 gap-x-0.5"
            >
              Login
            </Link>
          </div>
        )}
        <div className="md:hidden z-[110]">
          {" "}
          {/* Increased z-index */}
          {isMobileMenuOpen ? (
            <TfiClose
              className={`font-bold text-xl hover:text-brandColor cursor-pointer text-gray-600`}
              size={24}
              onClick={() => setMobileMenuOpen(false)}
            />
          ) : (
            <FaBars
              className={`font-bold text-xl hover:text-brandColor cursor-pointer text-gray-600`}
              size={24}
              onClick={toggleMobileMenu}
            />
          )}
        </div>
      </div>
      {/* Mobile Toggle Navbar */}
      // In your Navbar component, update the ToggleNavbar usage:
      <ToggleNavbar
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathName={location?.pathname}
      />
    </div>
  );
};

export default Navbar;
