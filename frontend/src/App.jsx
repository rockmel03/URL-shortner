import React from "react";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

function App() {
  return (
    <>
      {/* <Home /> */}
      {/* <Login /> */}
      <Register />
      <Toaster />
    </>
  );
}

export default App;
