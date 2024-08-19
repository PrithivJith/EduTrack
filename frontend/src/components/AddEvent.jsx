import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
const AddEvent = () => {
  async function add(){
    try {
      const response = await axios.post(
        `http://localhost:5555/events/`,
        {
          title: "Enter Title",
          description: "Enter Description",
          date: "Enter Date",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("There was an error!", error);
    }
  }
  

  return (
    <div>
      <div className="bg-rose-500 flex items-center justify-center gap-4 h-16 rounded-tl-lg rounded-tr-lg fixed w-[100%] bottom-[0vh]" onClick={add}>
        <IoMdAddCircleOutline color="white" size={64} />
      </div>
    </div>
  );
};

export default AddEvent;
