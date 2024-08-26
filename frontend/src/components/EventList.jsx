import React, { useEffect } from "react";
import Event from "./Event";

const EventList = ({ data,reload, eLoad,setIsEmpty }) => {
  useEffect(()=>{
    if(data.length===0){
      //alert(typeof data)
      setIsEmpty(true)
    }else{
      //alert(data.length)
      setIsEmpty(false)
    }
  },[data])
  
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
