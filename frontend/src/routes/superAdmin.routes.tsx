import AdminDashboard from "../pages/Admin/AdminDashboard";
import AllUser from "../pages/SuperAdmin/UserManagement/AllUser";

export const superAdminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "All User",
        path: "all-user",
        element: <AllUser />,
      },
    ],
  },
];
