import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import EventList from "./EventList";
import AddEvent from "./AddEvent";

const NavigationBar = ({ data }) => {
  const [mode, setMode] = useState("report");

  return (
    <>
      <div className=" flex items-center justify-between  h-16  fixed w-[100%] top-0">
        <div
          className="w-[50%] h-[100%] bg-rose-500 flex justify-center items-center border-r-4 rounded-bl-lg "
          onClick={() => setMode("report")}
        >
          <IoStatsChartSharp size={32} color="white" />
        </div>

        <div
          className="w-[50%] h-[100%] bg-rose-500 flex justify-center items-center rounded-br-lg"
          onClick={() => setMode("events")}
        >
          <FaCalendarAlt size={32} color="white" />
        </div>
      </div>
      {mode === "events" ? (
        <div>
          <EventList data={data} />
          <AddEvent />
        </div>
      ) : (
        <p>reports</p>
      )}
    </>
  );
};

export default NavigationBar;
