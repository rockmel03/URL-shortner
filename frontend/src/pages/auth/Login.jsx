import React from "react";
import LoginForm from "../../features/auth/components/LoginForm";

function login() {
  return (
    <section className="bg-zinc-100 w-full h-screen">
      <div className="w-full h-full grid place-items-center">
        <LoginForm />
      </div>
    </section>
  );
}

export default login;
