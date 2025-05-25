import React from "react";
import RegisterForm from "../../features/auth/components/RegisterForm";

function Register() {
  return (
    <section className="bg-zinc-100 w-full h-full">
      <div className="w-full h-full grid place-items-center">
        <RegisterForm />
      </div>
    </section>
  );
}

export default Register;
