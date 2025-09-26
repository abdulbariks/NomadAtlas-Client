import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AboutUs from "../pages/AboutUs";
import Register from "../pages/Register";
import CreateBlog from "../components/CreateBlog/CreateBlog";
import AllBlogs from "../components/CreateBlog/AllBlogs";
import BlogDetailsPage from "../components/Animation/BlogDetails/BlogDetailsPage";

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
        path: "createBlog",
        Component: CreateBlog,
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
        path: "*",
        Component: Login,
      },
    ],
  },
]);
