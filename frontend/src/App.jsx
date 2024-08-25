import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

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
  const [loading, setLoading] = useState([false, ""]);
  const [studentLoad, setStudentLoad] = useState([false, ""]);

  const [startLoading, setStartLoading] = useState([true, ""]);
  const [startStudentLoad, setStartStudentLoad] = useState([true, ""]);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5555/events/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
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
        .then(async (response) => {
          const userId = user.user_id;
          if (response.data.length === 0) {
            try {
              const response = await axios.post(
                `http://localhost:5555/students/`,
                {
                  positive: 10,
                  negative: 20,
                  attendance: "90,90,75,20,90,95,85,75,70,364,100",
                  user_id: userId,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );

              console.log(response);
              reload("add");
            } catch (error) {
              console.log(error);
            } finally {
            }
          }
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
        .then(async (response) => {
          const userId = user.user_id;
          if (response.data.length === 0) {
            try {
              const response = await axios.post(
                `http://localhost:5555/students/`,
                {
                  positive: 10,
                  negative: 20,
                  attendance: "90,90,75,20,90,95,85,75,70,364,100",
                  user_id: userId,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );

              console.log(response);
              reload("add");
            } catch (error) {
              console.log(error);
            } finally {
            }
          }
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
              !user ? (
                <Navigate to="/login" />
              ) : (
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
              !user ? (
                <Navigate to="/login" />
              ) : (
                <div>
                  <Home
                    startStudentLoad={startStudentLoad}
                    startLoading={startLoading}
                  />
                  <Events data={data} eLoad={loading} reload={reload} />
                </div>
              )
            }
          ></Route>
          <Route
            path="/reports"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
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
              )
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
