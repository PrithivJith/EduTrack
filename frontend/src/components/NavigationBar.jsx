import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import EventList from "./EventList";
import { CgProfile } from "react-icons/cg";
import AddEvent from "./AddEvent";
import { MdDone } from "react-icons/md";
import PieChart from "./PieChart";
import { MdModeEditOutline } from "react-icons/md";
import BarChart from "./BarChart";
import axios from "axios";
const NavigationBar = ({ data, student,reload,sLoad,eLoad }) => {
  const [mode, setMode] = useState("events");
  const [edit, setEdit] = useState(false);
  
  const [positive, setPositive] = useState(student.positive);
  const [negative, setNegative] = useState(student.negative);
  const [attendance, setAttendance] = useState(student.attendance);
  async function handleEdit() {
    if (!positive || !negative || !attendance) {
      return;
    }
    try {
      const response = await axios.put(
        `https://edutackprivate.onrender.com/students/${student._id}`,
        {
          positive: positive,
          negative: negative,
          attendance: attendance,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setEdit(false);
      reload();
    } catch (error) {
      console.error("There was an error!", error);
    }
  }
  return (
    <>
      <div className=" flex items-center justify-between hover:cursor-pointer  h-16  fixed w-[100%] top-0 z-10">
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
          <EventList eLoad={eLoad} data={data} reload={reload}/>
          <AddEvent reload={reload} />
        </div>
      ) : (
        <div>
          {!edit ? (
            <div>
              <PieChart student={student} />
              <BarChart student={student} />
              <div
                className="bg-rose-500 hover:cursor-pointer flex items-center justify-center gap-8 h-16 rounded-tl-lg rounded-tr-lg fixed w-[100%] bottom-[0vh]"
                onClick={() => setEdit(true)}
              >
                <h1 className="text-3xl text-white">Edit student: </h1>
                <MdModeEditOutline color="white" size={32} />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center">
                <CgProfile size={256} className="relative top-20" />
              </div>
              <h1 className="relative top-20 mt-12 mb-6 text-4xl text-center ">
                Behavior
              </h1>
              <div className="flex items-center justify-center m-3">
                <label
                  className="text-black relative top-20 text-2xl mr-2"
                  htmlFor="positive"
                >
                  Positive:&nbsp;&nbsp;
                </label>
                <input
                  id="positive"
                  className=" bg-rose-100 rounded-md h-9 relative top-20"
                  type="text"
                  value={positive}
                  onChange={(e) => setPositive(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center m-3">
                <label
                  className="text-black relative top-20 text-2xl mr-2"
                  htmlFor="negative"
                >
                  Negative:
                </label>
                <input
                  id="negative"
                  className=" bg-rose-100 rounded-md h-9 relative top-20"
                  type="text"
                  value={negative}
                  onChange={(e) => setNegative(e.target.value)}
                />
              </div>
              <h1 className="relative top-20 mt-14 mb-4 text-4xl text-center ">
                Attendance
              </h1>
              <h2 className="relative top-20 mt-8 mb-8 text-md opacity-70 text-center ">
                (enter percentages without sign separated by commas)
              </h2>
              <div className="flex items-center justify-center m-3">
                <label
                  className="text-black relative top-20 text-2xl mr-2"
                  htmlFor="attendance"
                >
                  Attendance:
                </label>
                <input
                  id="attendance"
                  className=" bg-rose-100 rounded-md h-9 relative top-20"
                  type="text"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                />
                <div
                  className="bg-rose-500 hover:cursor-pointer flex items-center justify-center gap-4 h-16 rounded-tl-lg rounded-tr-lg fixed w-[100%] bottom-[0vh]"
                  onClick={handleEdit}
                >
                  <h1 className="text-3xl text-white">Confirm: </h1>
                  <MdDone color="white" size={32} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavigationBar;
