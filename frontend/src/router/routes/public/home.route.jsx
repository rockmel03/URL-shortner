import { createRoute } from "@tanstack/react-router";
import Home from "../../../pages/Home";
import publicLayoutRoute from "./layout.route";

export const homeRoute = createRoute({
  path: "/",
  component: Home,
  getParentRoute: () => publicLayoutRoute,
});

export const homeAliasRoute = createRoute({
  path: "/home",
  component: Home,
  getParentRoute: () => publicLayoutRoute,
});

export default homeRoute;
