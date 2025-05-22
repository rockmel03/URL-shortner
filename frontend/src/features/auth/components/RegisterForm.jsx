import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import useRegister from "../hooks/useRegister";
import toast from "react-hot-toast";
import { login } from "../authSlice";
import { useDispatch } from "react-redux";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const registerMutation = useRegister();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const loaderId = toast.loading("Creating Account");
    registerMutation.mutate(formData, {
      onSuccess: function (data) {
        toast.success(data?.message || "Register success!");
        dispatch(login({ token: data.data.accessToken, user: data.data.user }));
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        router.navigate({ to: "/" });
      },
      onError: function (err) {
        toast.error(err.response?.data?.message || "Creation Failed!");
      },
      onSettled: function () {
        toast.dismiss(loaderId);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-md bg-white p-6 rounded-xl  shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
        autoComplete="off"
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          className="p-2 rounded-md border border-gray-300"
          required
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="p-2 rounded-md border border-gray-300"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="p-2 rounded-md border border-gray-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="p-2 rounded-md border border-gray-300"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Register
        </button>
      </form>
      <p className="text-sm mt-2 text-gray-500">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
