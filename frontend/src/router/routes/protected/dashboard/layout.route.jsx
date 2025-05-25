import { createRoute } from "@tanstack/react-router";
import DashboardLayout from "../../../../Layouts/DashboardLayout";
import protectedRoute from "../layout.route";

const dashboardLayoutRoute = createRoute({
  path: "dashboard",
  getParentRoute: () => protectedRoute,
  component: DashboardLayout,
});

dashboardLayoutRoute.addChildren([]);

export default dashboardLayoutRoute;
