import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Events from "./components/Events";
import Reports from "./components/Reports";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const [data, setData] = useState(null);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState([false, ""]);
  const [studentLoad, setStudentLoad] = useState([false, ""]);

  const [startLoading, setStartLoading] = useState([true, ""]);
  const [startStudentLoad, setStartStudentLoad] = useState([true, ""]);

  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5555/events/", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setStartLoading([false, ""]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setStartLoading([false, ""]);
        });

      axios
        .get("http://localhost:5555/students/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setStudent(response.data[0]);
          setStartStudentLoad([false, ""]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setStartStudentLoad([false, ""]);
        });
    } else {
      setStartLoading([false, ""]);
      setStartStudentLoad([false, ""]);
      navigate("/login");
    }
  }, [user]);

  function reload(id) {
    if (user) {
      setLoading([true, id]);
      setStudentLoad([true, id]);
      axios
        .get("http://localhost:5555/events/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setLoading([false, id]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading([false, id]);
        });

      axios
        .get("http://localhost:5555/students/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setStudent(response.data[0]);
          setStudentLoad([false, id]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setStudentLoad([false, id]);
        });
    } else {
      setLoading([false, ""]);
      setStudentLoad([false, ""]);
      navigate("/login");
    }
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
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={
              !user ? null : (
                <Home
                  startStudentLoad={startStudentLoad}
                  startLoading={startLoading}
                />
              )
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
    </div>
  );
};

export default App;
