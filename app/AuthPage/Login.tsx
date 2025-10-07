"use client";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import Link from "next/link";
//
import { loginUser } from "../apiFolder/user";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";

const colorTheme = "blue";

const themes = {
  green: {
    background: "bg-green-300",
    button: "bg-green-500",
    buttonHover: "hover:bg-green-800",
    text: "text-green-500",
  },
  blue: {
    background: "bg-blue-300",
    button: "bg-blue-500",
    buttonHover: "hover:bg-blue-800",
    text: "text-blue-500",
  },
};

type FormData = {
  email: string;
  password: string;
};

type LoginProps = {
  setAuth: (auth: boolean) => void;
};

const Login = ({ setAuth }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useAuth();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await loginUser(data);
      login(res.user, res.token);

      console.log("Login successful:", res);

      // Save token in localStorage (or cookie if you prefer)
      // localStorage.setItem("token", res.token);

      // You can also save user info if needed
      // localStorage.setItem("token", JSON.stringify(res.token));
      // document.cookie = `token=${res.token}; path=/`;
      // localStorage.setItem("user", JSON.stringify(res.user));

      // Call parent setAuth so it switches view
      setAuth(true);

      reset();
    } catch (error: any) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message || error.message || "Login failed";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${themes[colorTheme].background} flex flex-col items-center justify-center h-screen`}
    >
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <h1 className="flex justify-center font-bold text-2xl mb-8">Sign In</h1>
        <div className="flex flex-col items-center mb-4">
          <div className="flex w-full justify-around items-center mb-4">
            <Link href="https://www.facebook.com/">
              <FaFacebookF className="text-xl text-blue-600" />
            </Link>
            <Link href="https://www.google.com/">
              <FcGoogle className="text-2xl" />
            </Link>
            <Link href="https://www.linkedin.com/">
              <FaLinkedinIn className="text-xl text-blue-600 " />
            </Link>
          </div>
          <p className={`${themes[colorTheme].text}`}>or use your Account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 -mt-2">Email is required.</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-sm text-red-500 -mt-2">Password is required.</p>
          )}

          {/* Submit Button */}
          <button
            className={`${themes[colorTheme].button} cursor-pointer text-white py-2 px-4 font-semibold rounded ${themes[colorTheme].buttonHover}`}
            type="submit"
          >
            SIGN IN
          </button>
        </form>
        <div className="mt-4 flex space-x-2">
          <p className="space-x-5">Don&apos;t have an account?</p>
          <Link
            href={"/"}
            onClick={(e) => {
              e.preventDefault();
              setAuth(false);
            }}
            className={`${themes[colorTheme].text}  hover:underline`}
          >
            {"  "}
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
