import { createRoute, Outlet } from "@tanstack/react-router";
import React from "react";
import registerRoute from "./register.route";
import loginRoute from "./login.route";
import rootRoute from "../__root.route";

const authRoute = createRoute({
  path: "auth",
  getParentRoute: () => rootRoute,
  component: () => <Outlet />,
});

authRoute.addChildren([registerRoute, loginRoute]);

export default authRoute;
