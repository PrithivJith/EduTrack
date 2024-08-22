  import React, { useState } from "react";
  import EventList from "./EventList";

  import BarLoader from "react-spinners/BarLoader";
  import AddEvent from "./AddEvent";
  const Events = ({eLoad,data,reload}) => {
    const [addLoad, setAddLoad] = useState(false);

    function handleAddLoad(loading) {
      setAddLoad(loading);
    }


    return (
      <div>
        <div>
          <div className="flex justify-center fixed top-[72px] w-[100%]">
            {addLoad || (eLoad[0] && eLoad[1] === "add") || false ? (
              <BarLoader color="#000" width="800px" size={32} />
            ) : (
              ""
            )}
          </div>
          <EventList eLoad={eLoad} data={data} reload={reload} />
          <AddEvent loadingEvent={handleAddLoad} reload={reload} />
        </div>
      </div>
    );
  };

  export default Events;
