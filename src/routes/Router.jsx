import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AboutUs from "../pages/AboutUs";
import Register from "../pages/Register";
import CreateBlog from "../components/CreateBlog/CreateBlog";
import AllBlogs from "../components/CreateBlog/AllBlogs";
import ForgotPassword from "../pages/ForgotPassword";
// import ProtectedRoute from "./ProtectedRoute";
import Blogs from "../pages/Blogs";
import Comparison from "../pages/Comparison";
import CostCalculator from "../pages/CostCalculator";
import Resources from "../pages/Resources";
import BlogDetailsPage from "../components/Animation/BlogDetails/BlogDetailsPage";
import DashboardHome from "../DashboardPage/DashboardHome";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import ActiveUsers from "../DashboardPage/ActiveUsers";
import Provider from "../DashboardPage/Provider";
import Community from "../pages/Community/Community";
import WeatherAlertsPage from "../pages/WeatherAlert/WeatherAlertsPage";


import DestinationsPage from "../pages/Destination/DestinationPage";
import DestinationDetailsPage from "../pages/Destination/DestinationDetailsPage";
import TimeZoneConverter from "../pages/TimeZone/TimeZoneConverter";
import AddResource from "../DashboardPage/AddResource";
import AddNewDestination from "../pages/Destination/AddNewDestinatios";
import Error from "../components/Home/Error";
import ForbiddenPage from "../components/Home/ForbiddenPage";
import AdminRoutes from "./AdminRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error></Error>,
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
        path: "forbidden",
        Component: ForbiddenPage,
      },
      {
        path: "blogs",
        Component: AllBlogs,
      },
      {
        path: "/blogs/:id",
        Component: BlogDetailsPage,
      },
      {
        path: "newDestination",
        Component: AddNewDestination
      },

      {
        path: "/destinations",
        Component: DestinationsPage,
      },

      {
        path: "/destinations/:id",
        Component: DestinationDetailsPage
      }
      ,
      {
        path: "createBlog",
        Component: CreateBlog,
      },
      {
        path: "comparison",
        Component: Comparison,
      },
      {
        path: "time-zone-converter",
        Component: TimeZoneConverter
      },
      {
        path: "/community",
        Component: Community,
      },
      {
        path: "/weather-alerts",
        Component: WeatherAlertsPage
      },
      // my
      {
        path: "/community",
        Component: Community,
      },
      {
        path: "/weather-alerts",
        Component: WeatherAlertsPage,
      },
      // my
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
          <ProtectedRoutes>
            <Home></Home>
          </ProtectedRoutes>
        ),
      },
      {
        path: "resources",
        Component: Resources,
      },
      // {
      //   path: "*",
      //   Component: Login,
      // },
    ],
  },

  {
    path: "dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardLayout></DashboardLayout>
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "home",
        Component: DashboardHome,
      },
      {
        path: "activeUsers",
        element:
          <AdminRoutes>
            <ActiveUsers></ActiveUsers>
          </AdminRoutes>,
      },
      {
        path: "provider",
        Component: Provider,
      },
      {
        path: "add-resource",
        Component: AddResource,
      },
    ],
  },
]);
