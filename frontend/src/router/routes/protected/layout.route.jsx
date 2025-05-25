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
    const auth = store.getState().auth;
    // If auth is still being initialized, don't redirect
    if (auth?.isLoading) {
      return;
    }
    // Only redirect if we're sure user is not authenticated
    if (!auth?.isAuthenticated) {
      return redirect({
        to: "/auth/login",
      });
    }
  },
});

protectedRoute.addChildren([dashboardLayoutRoute]);

export default protectedRoute;
