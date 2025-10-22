import { createBrowserRouter } from "react-router-dom";

import Contact from "../pages/Contact";
import About from "../pages/About";
import HomeLayout from "../components/layout/HomeLayout";
// import Home from "../pages/Home";
import Login from "../pages/Login";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ChangePassword from "../pages/ChangePassword";
import Teacher from "../pages/Teacher";
import { superAdminPaths } from "./superAdmin.routes";
import Home from "../pages/Home";
import Administration from "../pages/Administration";
import WebDevelopment from "../pages/Home/Academic/WebDevelopment";
import FacilitiesPage from "../pages/Facilities";
import DataScience from "../pages/Home/Academic/DataScience";
import ResearchPage from "../pages/Research";
import NoticeBoardPage from "../pages/Notice";
import AIMLPage from "../pages/Home/Academic/ArtificiallyMatchineLearning";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      // {
      //   path: "/",
      //   element: <Home />,
      // },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/teachers",
        element: <Teacher />,
      },
      {
        path: "/administration",
        element: <Administration />,
        // children: [
        //   {
        //     path: "web-development",
        //     element: <About />,
        //   },
        // ],
      },
      {
        path: "/academic",
        // element: <Administration />,
        children: [
          {
            path: "web-development",
            element: <WebDevelopment />,
          },
          {
            path: "data-science",
            element: <DataScience />,
          },
          {
            path: "ai-ml",
            element: <AIMLPage />,
          },
        ],
      },
      {
        path: "/facilities",
        element: <FacilitiesPage />,
      },
      {
        path: "/research",
        element: <ResearchPage />,
      },
      {
        path: "/notice",
        element: <NoticeBoardPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/superAdmin",
    element: (
      <ProtectedRoute role="superAdmin">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(superAdminPaths),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(studentPaths),
  },
]);
