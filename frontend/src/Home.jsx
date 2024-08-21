import React, { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";

import axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);
  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState([true,""]);
  const [studentLoad, setStudentLoad] = useState([true,""])

  const [startLoading, setStartLoading] = useState([true,""]);
  const [startStudentLoad, setStartStudentLoad] = useState([true,""])

  useEffect(() => {
    axios
      .get("https://edutackprivate.onrender.com/events/")
      .then((response) => {
        setData(response.data);
        setStartLoading([false,""]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        startStudentLoad([false,""]);
      });

    axios
      .get("https://edutackprivate.onrender.com/students/")
      .then((response) => {
        setStudent(response.data[0]);
        setStartStudentLoad([false,""]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setStartStudentLoad([false,""]);
      });
  }, []);

function reload(id){
  setLoading([true,id]);
  setStudentLoad([true,id]);
  axios
  .get("https://edutackprivate.onrender.com/events/")
  .then((response) => {
    setData(response.data);
    setLoading([false,id]);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    setLoading([false,id]);
  });

axios
  .get("https://edutackprivate.onrender.com/students/")
  .then((response) => {
    setStudent(response.data[0]);
    setStudentLoad([false,id]);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    setStudentLoad([false,id]);
  });

}
  if(startLoading[0]||startStudentLoad[0]){
    return <h1>Loading</h1>
  }

  return (
    <div>
      <NavigationBar reload={reload} sLoad={studentLoad} eLoad={loading} data={data} student={student} />
    </div>
  );
};

export default Home;
