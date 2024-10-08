import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
const AddEvent = ({ reload, loadingEvent }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const userId = user.user_id;

  useEffect(() => {
    loadingEvent(loading);
  }, [loading]);

  async function add() {
    setLoading(true);
    try {

      const response = await axios.post(
        `http://localhost:5555/events/`,
        {
          title: "Enter Title",
          description: "Enter Description",
          date: "Enter Date",
          star: false,
          user_id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
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
