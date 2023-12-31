import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { login } from "../Redux/authSlice";
import LoginImage from "../Assets/Images/LoginImage.jpg"


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // function to handle the user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // function to login
  const handleLogin = async (event) => {
    event.preventDefault();

    // checking the empty fields
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    // calling login action
    const res = await dispatch(login(loginData));

    // redirect to the home page if true
    if (res?.payload?.success) navigate("/");

    // clearing the login inputs
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-[100vh]">
        {/* Image added to the left */}
        <img
          src={LoginImage} // Replace with the actual path to your image
          alt="Login Image"
          className="h-[28rem] w-96  rounded-l-lg shadow-[0_0_10px_black]" // Adjust the size as needed
        />

        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-4 rounded-r-lg p-4 text-white w-96 h-[28rem] shadow-[0_0_10px_black] bg-white/10  ring-1 ring-black/5"
        >
          <h1 className="text-center text-2xl font-bold">Login </h1>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent px-2 py-1 border"
              value={loginData.email}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="password">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-transparent px-2 py-1 border"
              value={loginData.password}
              onChange={handleUserInput}
            />
          </div>

          {/* guest account access */}
          <div
            onClick={() =>
              setLoginData({ email: "test@gmail.com", password: "Test@123" })
            }
            className="text-center link text-accent cursor-pointer"
          >
            Guest Login
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Login
          </button>

          <Link to={"/forgetpassword"}>
            <p className="text-center link text-accent cursor-pointer">
              Forget Password
            </p>
          </Link>

          <p className="text-center">
            Don't have an account ?{" "}
            <Link to={"/signup"} className="link text-accent cursor-pointer">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
