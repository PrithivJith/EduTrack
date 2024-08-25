import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignUp";
import { IoMdClose } from "react-icons/io";
import { FaUserShield } from "react-icons/fa";
import { useLogout } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaUser } from "react-icons/fa";
const Signup = ({ styles }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const logoutHandle = () => {
    logout();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };
  return (
    <div>
      {!user ? (
        <div
          className={
            styles +
            " " +
            "w-[92%] max-w-[1000px] relative top-20 shadow-lg m-3 lg:pl-2 md:pr-2 pb-16 pt-10 bg-rose-100  rounded-md"
          }
        >
          <div className="flex justify-center flex-col items-center  ">
            <FaUserShield className="ml-8" color="#881337" size={150} />
          </div>
          <form
            className="signup flex justify-start  flex-col gap-10 items-center"
            onSubmit={handleSubmit}
          >
            <h3 className="text-4xl">Sign up</h3>
            <div className=" flex flex-wrap justify-center gap-2 w-[80%]">
              <label htmlFor="username" className="text-2xl hidden">
                Username:{" "}
              </label>
              <input
                className="bg-rose-300 rounded-md h-10 w-[100%] text-[1.2rem] pl-2 placeholder:text-[rgba(0,0,0,0.6)]"
                type="text"
                autoComplete="off"
                required
                id="username"
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className=" flex flex-wrap justify-center w-[80%] gap-2">
              <label htmlFor="password" className="text-2xl hidden">
                &nbsp;Password:{" "}
              </label>
              <input
                className="bg-rose-300 rounded-md h-10 w-[100%] text-[1.2rem] pl-2 placeholder:text-[rgba(0,0,0,0.6)]"
                id="password"
                placeholder="Password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="text-xl w-[80%] rounded-md bg-rose-500 p-[0.7rem]  text-white"
            >
              Sign Up
            </button>
            <p className="text-lg mt-5">
              <span className="text-rose-700 font-[650]">
                Already have an account?{" "}
              </span>
              <Link to="/login">
                <span className="hover:cursor-pointer hover:underline text-blue-900 font-[550]">
                  Login
                </span>
              </Link>
            </p>
            {error && (
              <div className="flex items-center">
                <IoMdClose size={22} color="red" />
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="relative top-40">
          <div className="flex justify-center items-center flex-col ">
            <FaUser size={180} color="#881337" />
            <h1 className="mt-10 text-2xl">
              Logged in as: <span className="text-rose-500">{user.email}</span>{" "}
            </h1>
            <button
              disabled={isLoading}
              onClick={logoutHandle}
              type="submit"
              className="text-xl mt-10 w-[80%] rounded-md bg-red-600 p-[0.7rem]  text-white"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
