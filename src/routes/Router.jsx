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
import CostCalculatorPage from "../pages/CostCalculatorPage";
import BlogDetailsPage from "../components/Animation/BlogDetails/BlogDetailsPage";
import DashboardHome from "../DashboardPage/DashboardHome";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import ActiveUsers from "../DashboardPage/ActiveUsers";
// import Provider from "../DashboardPage/AddDestinations";
import Community from "../pages/Community/Community";
import WeatherAlertsPage from "../pages/WeatherAlert/WeatherAlertsPage";
import TimeZoneConverter from "../pages/TimeZone/TimeZoneConverter";
import InternetSpeed from "../pages/Internet Speed Map/InternetSpeed";

import DestinationsPage from "../pages/Destination/DestinationPage";
import DestinationDetailsPage from "../pages/Destination/DestinationDetailsPage";
import Resources from "../pages/Resources";
import CheckoutPage from "../Payment/CheckoutPage";
import PaymentSuccess from "../Payment/PaymentSuccess";
import AddResource from "../DashboardPage/AddResource";
import AddNewDestination from "../pages/Destination/AddNewDestinatios";
import Error from "../components/Home/Error";
import DataOfCalculator from "../DashboardPage/DataOfCalculator";
import ForbiddenPage from "../components/Home/ForbiddenPage";
import AdminRoutes from "./AdminRoutes";
import ProviderRoutes from "./ProviderRoutes";
import AddDestinations from "../DashboardPage/AddDestinations";
import LocalServices from "../pages/Services/LocalServices";
import UserPaymentHistory from "../Payment/UserPaymentHistory";
import AdminBookings from "../Payment/AdminBookings";

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
        Component: DestinationsPage
      },

      {
        path: "/destinations/:id",
        Component: DestinationDetailsPage
      },
      {
        path: "/payment/:id",
        element: (
          <ProtectedRoutes>
            <CheckoutPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/payment-success/:id",
        element: (
          <ProtectedRoutes>
            <PaymentSuccess />
          </ProtectedRoutes>
        ),
      },

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
        Component: CostCalculatorPage,
      },
      {
        path: "internet-speed",
        element: <ProtectedRoutes><InternetSpeed /></ProtectedRoutes>
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
        path: "admin-booking",
        element:
          <AdminRoutes>
            <AdminBookings></AdminBookings>
          </AdminRoutes>,
      },
      {
        path: "addDestinations",
        element:
          // <AdminRoutes>
            <AddDestinations></AddDestinations>,
          // </AdminRoutes>
      },
      // {
      //   path: "addDestinations",
      //   element: <ProviderRoutes>
      //     <AddDestinations></AddDestinations>
      //   </ProviderRoutes>,
      // },
      {
        path: "add-resource",
        Component: AddResource,
      },
      {
        path: "payment-history",
        Component: UserPaymentHistory,
      },
      {
        path: "data-of-calculator",
        Component: DataOfCalculator,
      },
    ],
  },
]);
