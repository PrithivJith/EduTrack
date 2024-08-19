import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Event = ({ data }) => {
  console.log(data);
  const normal = document.getElementById("normal");
  const starred = document.getElementById("starred");
  normal.style.display = "inline";
  starred.style.display = "none";
  return (
    <>
      <div className="bg-rose-100 min-h-[200px] m-4 rounded-md shadow-lg p-4 flex flex-col justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl text-center underline">{data.title}</h2>
          <p className="text-center text-lg m-4">{data.description}</p>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="ml-1">Date: {data.date}</h3>
          <div className="flex gap-1">
            <MdDelete size={32} />
            <MdEdit size={32} />
            <FaRegStar
              id="normal"
              size={32}
              onClick={() => {
                normal.style.display = "none";

                starred.style.display = "inline";
              }}
            />
            <FaStar
              id="starred"
              color="hsl(54, 93.00%, 40%)"
              
              size={32}
              onClick={() => {
                normal.style.display = "inline";

                starred.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
