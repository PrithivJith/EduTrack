import React, { useState } from "react";
import { FaEdit, FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { MdDone } from "react-icons/md";
import axios from "axios";

const Event = ({ data, defaultEdit }) => {
  const [isStarred, setIsStarred] = useState(false);
  const [isEdit, setIsEdit] = useState(defaultEdit);
  const [title, setTitle] = useState(data.title);
  const [date, setDate] = useState(data.date);
  const [description, setDescription] = useState(data.description);

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };
  async function handleEdit() {
    if (!title || !description || !date) {
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5555/events/${data._id}`,
        {
          title: title,
          description: description,
          date: date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setIsEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("There was an error!", error);
    }
  }
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };
  async function del() {
    try {
      const response = await axios.delete(
        `http://localhost:5555/events/${data._id}`
      );
      console.log("Response:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("There was an error!", error);
    }
  }
  return (
    <div className="bg-rose-100 min-h-[200px] m-4 rounded-md shadow-lg p-4 flex flex-col justify-between">
      <div className="flex flex-col">
        {!isEdit ? (
          <h2 className="text-3xl text-center underline">{data.title}</h2>
        ) : (
          <input
            required
            className="m-4"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}
        {!isEdit ? (
          <p className="text-center text-lg m-4">{data.description}</p>
        ) : (
          <input
            required
            className="m-4"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
      </div>
      <div className="flex items-end justify-between">
        {!isEdit ? (
          <h3 className="ml-1">Date: {data.date}</h3>
        ) : (
          <input
            required
            className="ml-4"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        )}

        <div className="flex gap-1">
          {!isEdit ? (
            <div className="flex">
              <MdDelete size={32} onClick={del} />
              <MdEdit size={32} onClick={toggleEdit} />
              {isStarred ? (
                <FaStar
                  size={32}
                  color="hsl(54, 93.00%, 40%)"
                  onClick={toggleStar}
                />
              ) : (
                <FaRegStar size={32} onClick={toggleStar} />
              )}
            </div>
          ) : (
            <MdDone size={32} onClick={handleEdit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
