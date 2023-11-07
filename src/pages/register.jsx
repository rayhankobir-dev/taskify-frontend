import { Fragment, useEffect } from "react";
import Logo from "../assets/logo.png";
import Clock from "../assets/clock.webp";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate("/");
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Fragment>
      <div className="min-h-screen w-full flex justify-between">
        <div className="hidden md:block bg-gray-100 flex-1">
          <img className="w-full" src={Clock} alt="clock" />
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-4">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-14 w-auto rounded-full"
              src={Logo}
              alt="Your Company"
            />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
            <p className="font-light text-sm">
              Provide your all information and hit enter and here we go. You are
              ready to get our services
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-3"
              method="POST"
              onSubmit={handleSubmit((data) => signup(data))}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    {...register("name", {
                      required: true,
                    })}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jhon Deo"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.name && (
                  <p className="px-1 font-light text-sm text-rose-500">
                    Password is required
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email", {
                      required: true,
                    })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && (
                  <p className="px-1 font-light text-sm text-rose-500">
                    Email is required
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    {...register("password", {
                      required: true,
                    })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="*********"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.password && (
                  <p className="px-1 font-light text-sm text-rose-500">
                    Password is required
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 mt-5 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
