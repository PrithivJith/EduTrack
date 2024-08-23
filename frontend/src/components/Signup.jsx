import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <div>
      <form
        className="signup flex justify-start flex-col gap-10 items-center"
        onSubmit={handleSubmit}
      >
        <h3 className="text-5xl">Sign up</h3>
        <div className=" flex flex-wrap justify-center gap-2">
          <label for="username" className="text-2xl">
            Username:{" "}
          </label>
          <input
            className="bg-rose-300 rounded-md h-10 text-[1.2rem] pl-2"
            type="text"
            id="username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className=" flex flex-wrap justify-center gap-2">

          <label for="password" className="text-2xl">
            &nbsp;Password:{" "}
          </label>
          <input
            className="bg-rose-300 rounded-md h-10  text-[1.2rem] p-2"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="text-xl rounded-md bg-rose-500 p-[0.7rem] w-40 text-white">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
