"use client";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import Link from "next/link";

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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterProps = {
  setAuth: (auth: boolean) => void;
};

const Register = ({ setAuth }: RegisterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <div
      className={`${themes[colorTheme].background} flex flex-col items-center justify-center h-screen`}
    >
      <div className="bg-white p-10 rounded-xl shadow-lg w-96">
        <h1 className="flex justify-center font-bold text-2xl mb-8">
          Create Account
        </h1>

        {/* Social login icons */}
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
          <p className={`${themes[colorTheme].text}`}>
            or use your Email for Registration
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-sm text-red-500 -mt-2">Name is required.</p>
          )}

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

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 -mt-2">
              Confirm Password is required.
            </p>
          )}

          {/* Submit button */}
          <button
            className={`${themes[colorTheme].button} cursor-pointer  text-white py-2 px-4 font-semibold rounded ${themes[colorTheme].buttonHover}`}
            type="submit"
          >
            SIGN UP
          </button>
        </form>

        {/* Link to login */}
        <div className="mt-4 flex space-x-2">
          <p>Already have an account?</p>
          <Link
            href={"/"}
            onClick={(e) => {
              e.preventDefault();
              setAuth(true);
            }}
            className={`${themes[colorTheme].text} hover:underline`}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
