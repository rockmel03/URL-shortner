import { createRoute } from "@tanstack/react-router";
import PublicLayout from "../../../Layouts/PublicLayout";
import rootRoute from "../__root.route";
import homeRoute from "./home.route";

const publicLayoutRoute = createRoute({
  id: "public",
  component: PublicLayout,
  getParentRoute: () => rootRoute,
});

publicLayoutRoute.addChildren([homeRoute]);

export default publicLayoutRoute;
