import React, { useState } from "react";
import { FaEdit, FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete, MdEdit, MdDone } from "react-icons/md";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";

const Event = ({ data, reload, eLoad }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [date, setDate] = useState(data.date);
  const [description, setDescription] = useState(data.description);
  const [starLoading, setStarLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  async function toggleStar() {
    setStarLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5555/events/${data._id}`,
        {
          title: data.title,
          description: data.description,
          date: data.date,
          star: !data.star,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setIsEdit(false);
      reload(data._id);
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setStarLoading(false);
    }
  }

  async function handleEdit() {
    if (!title || !description || !date) {
      return;
    }
    setEditLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5555/events/${data._id}`,
        {
          title: title,
          description: description,
          date: date,
          star: data.star,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setIsEdit(false);
      reload(data._id);
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setEditLoading(false);
    }
  }

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  async function del() {
    setDelLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5555/events/${data._id}`
      );
      console.log("Response:", response.data);
      reload(data._id);
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setDelLoading(false);
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
          <div>
            <input
              required
              className="ml-4"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        )}

        <div className="flex gap-1">
          {(eLoad[0] && eLoad[1] === data._id) || starLoading||delLoading||editLoading ? (
            <BarLoader size={10} color="#000" />
          ) : (
            <div>
              {!isEdit ? (
                <div className="flex items-center">
                  <MdDelete
                    size={32}
                    className="hover:cursor-pointer"
                    onClick={del}
                  />
                  <MdEdit
                    size={32}
                    className="hover:cursor-pointer"
                    onClick={toggleEdit}
                  />
                  {data.star ? (
                  <FaStar
                    size={32}
                    color="hsl(54, 93.00%, 40%)"
                    onClick={toggleStar}
                    className="hover:cursor-pointer"
                  />
                  ) : (
                  <FaRegStar
                    className="hover:cursor-pointer"
                    size={32}
                    onClick={toggleStar}
                  />
                  )}
                </div>
              ) : (
                <MdDone
                  size={32}
                  className="hover:cursor-pointer"
                  onClick={handleEdit}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
