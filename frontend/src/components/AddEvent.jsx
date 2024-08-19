import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

const AddEvent = () => {
  function add(){

  }

  return (
    <div>
      <div className="bg-rose-500 flex items-center justify-center gap-4 h-16 rounded-tl-lg rounded-tr-lg absolute w-[100%] bottom-[0vh]">
        <IoMdAddCircleOutline color="white" size={64} onClick={add}/>
      </div>
    </div>
  );
};

export default AddEvent;
