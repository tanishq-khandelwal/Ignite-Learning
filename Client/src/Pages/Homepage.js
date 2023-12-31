import React from "react";
import Layout from "../Layout/Layout";
import homePageMainImage from "../Assets/Images/homePageMainImage.png";
import { Link } from "react-router-dom";
import logo from "../Assets/Images/logo.png";

const Homepage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-[5rem] w-15 ml-[60rem]"
        />

        {/* Ignite Learning */}
        <span className="text-center ml-[2rem] font-bold text-5xl text-white">
          Ignite Learning
        </span>
      </div>

      <div className="pt-10 text- flex items-center justify-center gap-10 mx-16 h-[90vh]">
        {/* for platform details */}
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-semibold">
            Find out the best{" "}
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-xl text-white-200">
            Start, switch, or advance your career with more than 5,000+ courses,
            Professional Certificates, and degrees from world-class universities
            and companies.
          </p>

          {/* for buttons */}
          <div className="space-x-6">
            <Link to={"/courses"}>
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 text-white">
                Explore Courses
              </button>
            </Link>
            <Link to={"/contact"}>
              <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:border-yellow-600 transition-all ease-in-out duration-300 text-white">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* right section for image */}
        <div className="w-1/2 flex items-center justify-center">
          <img src={homePageMainImage} alt="home page image" />
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
