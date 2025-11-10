import { Dropdown, Layout, Menu, MenuProps } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
const { Sider } = Layout;
import Logo from "../../assets/icons/logo.png";
import { IoIosArrowDown } from "react-icons/io";
import { logOut, TUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { UserOutlined } from "@ant-design/icons";
import { VscSignOut } from "react-icons/vsc";
import { UserData } from "../../utils/userData";
import { TSidebarItem } from "../../types";
import { ItemType } from "antd/es/menu/interface";
import { superAdminPaths } from "../../routes/superAdmin.routes";
import { useState } from "react";
import DefaultAvatarImage from "../../assets/images/Dashboard/Admin/AvatarImage/defaultAvatar.jpg";

const Sidebar = () => {
  const { user, userWithDefaults } = UserData();
  const [sideBarItemShow, setSideBarItemShow] = useState<boolean>();

  const dispatch = useAppDispatch();

  const userRole = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
    SUPER_ADMIN: "superAdmin",
  };
  const role = (user as TUser)!.role;

  const mapSidebarItems = (items?: TSidebarItem[]): ItemType[] => {
    if (!items) return [];
    return items
      .filter(
        (item): item is NonNullable<TSidebarItem> =>
          !!item && !!item.label && !!item.key
      )
      .map((item) => {
        const mappedItem: ItemType = {
          key: item.key!,
          label: item.label!,
          icon: item.icon,
        };

        if (item.children && item.children.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (mappedItem as any).children = mapSidebarItems(item.children);
        }

        return mappedItem;
      });
  };

  let sidebarItems: MenuProps["items"];
  switch (role) {
    case userRole.SUPER_ADMIN:
      sidebarItems = mapSidebarItems(
        sidebarItemsGenerator(superAdminPaths, userRole.SUPER_ADMIN)
      );
      break;
    case userRole.ADMIN:
      sidebarItems = mapSidebarItems(
        sidebarItemsGenerator(adminPaths, userRole.ADMIN)
      );
      break;
    case userRole.FACULTY:
      sidebarItems = mapSidebarItems(
        sidebarItemsGenerator(facultyPaths, userRole.FACULTY)
      );
      break;
    case userRole.STUDENT:
      sidebarItems = mapSidebarItems(
        sidebarItemsGenerator(studentPaths, userRole.STUDENT)
      );
      break;
    default:
      sidebarItems = [];
      break;
  }

  //menu for username dropdown
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
    <Sider
      width={280}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={() => {}}
      onCollapse={(collapsed) => {
        setSideBarItemShow(collapsed as boolean);
      }}
      style={{ height: '100vh', position: 'sticky', top: '0', left: '0', background:'#FFFFFF' }}
    >
      <div>
        {sideBarItemShow ? (
          <></>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "white",
                height: "4rem",
              }}
            >
              <NavLink to="/">
                <div className="flex gap-2  items-center">
                  <img src={Logo} alt="" className="size-5" />
                  <h1 className="text-center text-gray-800 font-bold">
                    My University
                  </h1>
                </div>
              </NavLink>
            </div>
            <div>
              <div className="py-2 text-white">
                <div className="text-center text-black">
                  <img
                    src={userWithDefaults?.image || DefaultAvatarImage}
                    className="h-12 w-12 rounded-full mx-auto"
                    alt=""
                  />
                  <div className="mx-auto flex justify-center items-center py-2">
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
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
                </div>
                <h1 className="text-center uppercase text-[10px] text-gray-500 ">
                  {userWithDefaults?.role}
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
