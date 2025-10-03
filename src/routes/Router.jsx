import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AboutUs from "../pages/AboutUs";
import Register from "../pages/Register";
import CreateBlog from "../components/CreateBlog/CreateBlog";
import AllBlogs from "../components/CreateBlog/AllBlogs";
import ForgotPassword from "../pages/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import Blogs from "../pages/Blogs";
import Comparison from "../pages/Comparison";
import CostCalculator from "../pages/CostCalculator";
import BlogDetailsPage from "../components/Animation/BlogDetails/BlogDetailsPage";
import AddNewDestination from "../pages/AddNewDestination";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "blogs",
        Component: AllBlogs,
      },
      {
        path:"/blogs/:id",
        Component:BlogDetailsPage,
      },
      {
        path: "newDestination",
        Component: AddNewDestination
      },
      {
        path: "createBlog",
        Component: CreateBlog
      },
      {
        path: "comparison",
        Component: Comparison,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "blogs",
        Component: Blogs,
      },
      {
        path: "cost-calculator",
        Component: CostCalculator,
      },
      {
        path: "cost-calculator",
        element: (
          <ProtectedRoute>
            <Home></Home>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        Component: Login,
      },
    ],
  },
]);
