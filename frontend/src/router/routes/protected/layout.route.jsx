import { createRoute, redirect } from "@tanstack/react-router";
import PublicLayout from "../../../Layouts/PublicLayout";
import rootRoute from "../__root.route";
import dashboardLayoutRoute from "./dashboard/layout.route";
import store from "../../../app/store";

const protectedRoute = createRoute({
  id: "protected",
  getParentRoute: () => rootRoute,
  component: PublicLayout,
  beforeLoad: () => {
    const isAuthenticated = store.getState().auth?.isAuthenticated;
    if (!isAuthenticated) {
      return redirect({
        to: "/auth/login",
        replace: true,
      });
    }
  },
});

protectedRoute.addChildren([dashboardLayoutRoute]);

export default protectedRoute;
