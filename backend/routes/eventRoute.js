import express from "express";
import { Event } from "../models/eventModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
    try {
        if (!request.body.date || !request.body.description) {
            return response.status(400).send({
                message: "Send all required fields: date, description",
            });
        }
        const newEvent = {
            date: request.body.date,
            description: request.body.description,
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
        const events = await Event.find({});
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
        if (!request.body.date || !request.body.description) {
            return response.status(400).send({
                message: "Send all required fields: date, description",
            });
        }
        const { id } = request.params;
        const result = await Event.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).send({ message: "Event Not found" });
        }
        return response
            .status(200)
            .send({ message: "Event updated successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Event.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).send({ message: "Event Not found" });
        }
        return response
            .status(200)
            .send({ message: "Event deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default router;
