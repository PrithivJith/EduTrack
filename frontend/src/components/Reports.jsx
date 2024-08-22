import React, { useState } from "react";
import PieChart from "./PieChart";
import { MdDone } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import PropagateLoader from "react-spinners/PropagateLoader";
import { CgProfile } from "react-icons/cg";
import BarChart from "./BarChart";
import axios from "axios";

const Reports = ({student,reload,sLoad}) => {
  const [edit, setEdit] = useState(false);
  const [positive, setPositive] = useState(student.positive);
  const [negative, setNegative] = useState(student.negative);
  const [attendance, setAttendance] = useState(student.attendance);
  const [editLoad, setEditLoad] = useState(false);

  async function handleEdit() {
    if (!positive === null || !negative === null || !attendance) {
      return;
    }
    setEditLoad(true);
    try {
      const response = await axios.put(
        `http://localhost:5555/students/${student._id}`,
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
      setEditLoad(false);
      console.log(editLoad);
      reload();
    } catch (error) {
      console.error("There was an error!", error);
      setEditLoad(false);
    } finally {
      setEditLoad(false);
      console.log(editLoad);
    }
  }

  return (
    <div>
      <div>
        {!edit ? (
          <div>
            <PieChart student={student} />
            <BarChart student={student} />
            <div
              className="bg-rose-500 hover:cursor-pointer flex items-center justify-center gap-8 h-16 rounded-tl-lg rounded-tr-lg fixed w-[100%] bottom-[0vh]"
              onClick={() => setEdit(true)}
            >
              <div className="flex gap-4 items-center">
                <h1 className="text-3xl text-white">Edit student: </h1>
                <MdModeEditOutline color="white" size={32} />
              </div>
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
                {editLoad||sLoad[0] ? (
                  <div>
                    <PropagateLoader color="white" />
                  </div>
                ) : (
                  <div className="flex gap-4 items-center">
                    <h1 className="text-3xl text-white">Confirm: </h1>
                    <MdDone color="white" size={32} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
