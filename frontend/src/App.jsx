import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./Home";
import Events from "./components/Events";
import Reports from "./components/Reports";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const [data, setData] = useState(null);
  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState([false, ""]);
  const [studentLoad, setStudentLoad] = useState([false, ""]);

  const [startLoading, setStartLoading] = useState([true, ""]);
  const [startStudentLoad, setStartStudentLoad] = useState([true, ""]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/events/")
      .then((response) => {
        setData(response.data);
        setStartLoading([false, ""]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setStartLoading([false, ""]);
      });

    axios
      .get("http://localhost:5555/students/")
      .then((response) => {
        setStudent(response.data[0]);
        setStartStudentLoad([false, ""]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setStartStudentLoad([false, ""]);
      });
  }, []);

  function reload(id) {
    setLoading([true, id]);
    setStudentLoad([true, id]);
    axios
      .get("http://localhost:5555/events/")
      .then((response) => {
        setData(response.data);
        setLoading([false, id]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading([false, id]);
      });

    axios
      .get("http://localhost:5555/students/")
      .then((response) => {
        setStudent(response.data[0]);
        setStudentLoad([false, id]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setStudentLoad([false, id]);
      });
  }
  if (startLoading[0] || startStudentLoad[0]) {
    return (
      <h1>
        Loading. Please wait for 2 minutes at maximum as our servers are
        starting.
      </h1>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  startStudentLoad={startStudentLoad}
                  startLoading={startLoading}
                />
              }
            ></Route>
            <Route
              path="/events"
              element={
                <div>
                  <Home
                    startStudentLoad={startStudentLoad}
                    startLoading={startLoading}
                  />
                  <Events data={data} eLoad={loading} reload={reload} />
                </div>
              }
            ></Route>
            <Route
              path="/reports"
              element={
                <div>
                  <Home
                    startStudentLoad={startStudentLoad}
                    startLoading={startLoading}
                  />
                  <Reports
                    student={student}
                    reload={reload}
                    sLoad={studentLoad}
                  />
                </div>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <div>
                  <Home
                    startStudentLoad={startStudentLoad}
                    startLoading={startLoading}
                  />
                  <Login />
                </div>
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <div>
                  <Home
                    startStudentLoad={startStudentLoad}
                    startLoading={startLoading}
                  />

                  <Signup />
                </div>
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
