import React from "react";
import Event from "./Event";

const EventList = ({ data }) => {
  const events = [];
  while (!data) {
    //
  }
  console.log(events);
  return (
    <div className="mb-24">
      <h1 className="!m-6 text-3xl text-center">Events</h1>
      <ul>
        {
          data.map((element) => (
            <li key={element._id}>
              <Event data={element} defaultEdit={false} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default EventList;
