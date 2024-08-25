import React from "react";
import Event from "./Event";

const EventList = ({ data,reload, eLoad }) => {
  const events = [];
  
  return (
    <div className="mb-20">
      <h1 className="!m-6 text-3xl text-center ">&nbsp;</h1>
      <ul>
        {
          data.map((element) => (
            <li key={element._id}>
              <Event eLoad={eLoad}  data={element} reload={reload} />
            </li>
          ))
        }
      </ul>
    </div>
    
  );
};

export default EventList;
