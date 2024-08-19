import React, { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import EventList from "./components/EventList";

import axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5555/events/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <NavigationBar />
      <EventList data={data} />
    </div>
  );
};

export default Home;
