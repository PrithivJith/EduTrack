import React, { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";

import axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);
  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [studentLoad, setStudentLoad] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:5555/events/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    axios
      .get("http://localhost:5555/students/")
      .then((response) => {
        setStudent(response.data[0]);
        setStudentLoad(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setStudentLoad(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (studentLoad){
    return <div>Loading...</div>;

  }

  return (
    <div>
      <NavigationBar data={data} student={student} />
    </div>
  );
};

export default Home;
