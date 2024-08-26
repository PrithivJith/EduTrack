import React, { useState } from "react";
import EventList from "./EventList";
import { GrClearOption } from "react-icons/gr";
import BarLoader from "react-spinners/BarLoader";
import AddEvent from "./AddEvent";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
const Events = ({ eLoad, data, reload }) => {
  const [addLoad, setAddLoad] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const { user } = useAuthContext();
  const [isEmpty,setIsEmpty] = useState(null);


  
  function handleAddLoad(loading) {
    setAddLoad(loading);
  }
  async function handleDeleteAll() {
    setDelLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5555/events/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Response:", response.data);
      reload();
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setDelLoading(false);
    }
  }

  return (
    <div>
      <div>
        <div className="flex justify-center fixed top-[72px] w-[100%]">
          {addLoad || (eLoad[0] && eLoad[1] === "add" || delLoading) || false ? (
            <BarLoader color="#000" width="800px" size={32} />
          ) : (
            ""
          )}
        </div>

        <EventList setIsEmpty={setIsEmpty} eLoad={eLoad} data={data} reload={reload} />
        {!isEmpty&&<div className="flex relative top-16 justify-center ">
          <div
            onClick={handleDeleteAll}
            className="bg-red-700 hover:cursor-pointer items-center justify-center gap-5 flex p-[8.5px] pb-[9px] w-[80%] relative bottom-32 rounded-lg "
          >
            <p className="text-white text-2xl">Clear All</p>
            <GrClearOption size={32} color="white" />
          </div>
        </div>}
        <AddEvent loadingEvent={handleAddLoad} reload={reload} />
      </div>
    </div>
  );
};

export default Events;
