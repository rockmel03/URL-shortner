import { createRouter } from "@tanstack/react-router";

import NotFound from "../pages/NotFound";
import routeTree from "./routes";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPendingComponent: () => <div>Loading...</div>,
  defaultNotFoundComponent: NotFound,
});
