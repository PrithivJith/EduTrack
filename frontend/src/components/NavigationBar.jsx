import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";

const NavigationBar = () => {
  return (
    <div className="flex items-center justify-between h-16 fixed w-[100%] top-0 z-10">
      <div className="w-[50%] h-[100%] bg-rose-500 flex justify-center items-center border-r-4 border-rose-300 rounded-bl-lg">
        <Link to="/reports" className="flex justify-center items-center w-full h-full">
          <IoStatsChartSharp size={32} color="white" />
        </Link>
      </div>
      <div className="w-[50%] h-[100%] bg-rose-500 flex justify-center items-center border-r-4 border-rose-300 ">
        <Link to="/events" className="flex justify-center items-center w-full h-full">
          <FaCalendarAlt size={32} color="white" />
        </Link>
      </div>
      <div className="w-[50%] h-[100%] bg-rose-500 flex justify-center items-center rounded-br-lg">
        <Link to="/signup" className="flex justify-center items-center w-full h-full">
          <FaUser size={32} color="white" />
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;

