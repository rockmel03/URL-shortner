import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "@tanstack/react-router";

function App() {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}

export default App;
