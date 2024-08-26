import express from "express";
import { Event } from "../models/eventModel.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);

router.post("/", async (request, response) => {
  try {
    if (
      JSON.stringify(request.body.date).length > 75 ||
      JSON.stringify(request.body.description).length > 75 ||
      JSON.stringify(request.body.title).length > 75
    ) {
      return response.status(400).send({
        message: "Too much information was entered.",
      });
    }
    if (
      !request.body.date ||
      !request.body.description ||
      !request.body.title ||
      !request.body.star === null
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    const user_id = request.user._id;

    const newEvent = {
      date: request.body.date,
      title: request.body.title,
      description: request.body.description,
      star: request.body.star,
      user_id: user_id,
    };
    const event = await Event.create(newEvent);
    return response.status(201).send(event);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});
router.get("/", async (request, response) => {
  try {
    const user_id = request.user._id;
    const events = await Event.find({user_id});
    return response.status(200).json(events);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const event = await Event.findById(id);
    return response.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.put("/:id", async (request, response) => {
  try {
    if (
      JSON.stringify(request.body.date).length > 75 ||
      JSON.stringify(request.body.description).length > 75 ||
      JSON.stringify(request.body.title).length > 75
    ) {
      return response.status(400).send({
        message: "Too much information was entered.",
      });
    }
    if (
      !request.body.date ||
      !request.body.description ||
      !request.body.title ||
      !request.body.star === null
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    const { id } = request.params;
    const result = await Event.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: "Event Not found" });
    }
    return response.status(200).send({ message: "Event updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user_id = request.user._id;
    if (id==="all"){
      const result = await Event.deleteMany({user_id:user_id});
      return response.status(200).send({ message: "All events deleted successfully" });
    }
    const result = await Event.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: "Event Not found" });
    }
    return response.status(200).send({ message: "Event deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
export default router;
