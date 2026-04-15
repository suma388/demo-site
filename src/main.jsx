import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Features from "./pages/Features.jsx";
import Pricing from "./pages/Pricing.jsx";
import MainLayOut from "./layouts/MainLayOut.jsx";
import Blogs from "./pages/Blogs.jsx";
import Users from "./pages/Users.jsx";
import Home from "./pages/Home.jsx";
import UserLayOut from "./layouts/UserLayOut.jsx";
import Notification from "./pages/Notification.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import { Toaster } from "sonner";
import Subscription from "./pages/Subscription.jsx";
import ErorrPage from "./pages/ErorrPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        path: "/",
        Component: Home,
      },
      { path: "features", Component: Features },
      {
        path: "pricing",
        Component: Pricing,
      },
      {
        path: "blogs",
        Component: Blogs,
      },
      {
        path: "users",
        Component: Users,
      },
      {
        path: "subscription",
        Component: Subscription,
      },
    ],
    errorElement: ErorrPage,
  },
  {
    path: "/user",
    Component: UserLayOut,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "notification",
        Component: Notification,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-center" richColors />
    <RouterProvider router={router} />
  </StrictMode>,
);
