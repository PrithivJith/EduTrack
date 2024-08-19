import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const NavigationBar = () => {
  return (
    <div className="bg-rose-400 flex items-center justify-center gap-4 h-16 rounded-bl-lg rounded-br-lg">
      <FaCalendarAlt className="size-8" />
    </div>
  );
};

export default NavigationBar;
