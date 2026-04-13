import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Features from "./pages/Features.jsx";
import Pricing from "./pages/Pricing.jsx";
import Error from "./pages/Error.jsx";
import MainLayOut from "./layouts/MainLayOut.jsx";
import Blogs from "./pages/Blogs.jsx";
import Users from "./pages/Users.jsx";
import Home from "./pages/Home.jsx";
import UserLayOut from "./layouts/UserLayOut.jsx";
import Notification from "./pages/Notification.jsx";

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
    ],
    errorElement: Error,
  },
  {
    path: "/user",
    Component: UserLayOut,
    children: [
      {
        path: "notification",
        Component: Notification,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
