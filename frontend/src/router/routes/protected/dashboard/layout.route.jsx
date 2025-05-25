import { createRoute } from "@tanstack/react-router";
import DashboardLayout from "../../../../Layouts/DashboardLayout";
import protectedRoute from "../layout.route";
import urlsRoute from "./Urls.route";

const dashboardLayoutRoute = createRoute({
  path: "dashboard",
  getParentRoute: () => protectedRoute,
  component: DashboardLayout,
});

dashboardLayoutRoute.addChildren([urlsRoute]);

export default dashboardLayoutRoute;
