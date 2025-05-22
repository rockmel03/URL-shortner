import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const loginMutation = useLogin();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const loaderId = toast.loading("Loading...");
    loginMutation.mutate(formData, {
      onSuccess: function (data) {
        toast.success(data.message || "Login Success!");
        dispatch(login({ token: data.data.accessToken, user: data.data.user }));
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        router.navigate({ to: "/" });
      },
      onError: function (err) {
        toast.error(err.response?.data?.message || "Login failed!");
      },
      onSettled: function () {
        toast.dismiss(loaderId);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-md bg-white p-6 rounded-xl  shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Username or Email"
          name="username"
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
          Login
        </button>
      </form>
      <p className="text-sm mt-2 text-gray-500">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-blue-500 hover:underline">
          Create here
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
