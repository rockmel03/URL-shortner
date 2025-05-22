import { createRoute } from "@tanstack/react-router";
import Home from "../../pages/Home";
import rootRoute from "./__root.route";

export const homeRoute = createRoute({
  path: "/",
  component: Home,
  getParentRoute: () => rootRoute,
});

export default homeRoute;
