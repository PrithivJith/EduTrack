import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";

const AddEvent = ({ reload,loadingEvent }) => {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    loadingEvent(loading);
  },[loading])
  async function add() {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://edutackprivate.onrender.com/events/`,
        {
          title: "Enter Title",
          description: "Enter Description",
          date: "Enter Date",
          star: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setLoading(false);
      reload("add");
    } catch (error) {
      console.error("There was an error!", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div
        className="bg-rose-500 hover:cursor-pointer flex items-center justify-center gap-4 h-16 rounded-tl-lg rounded-tr-lg fixed w-[100%] bottom-[0vh]"
        onClick={add}
      >
        <IoMdAddCircleOutline color="white" size={64} />
      </div>
    </div>
  );
};

export default AddEvent;
