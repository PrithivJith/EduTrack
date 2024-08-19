import express from "express";
import { Student } from "../models/studentModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
    try {
        if (!request.body.positive || !request.body.negative || !request.body.attendance){
            return response.status(400).send({
                message: "Send all required fields",
            });
        }
        const newStudent = {
            positive: request.body.positive,
            negative: request.body.negative,
            attendance: request.body.attendance,

        };
        const student = await Student.create(newStudent);
        return response.status(201).send(student);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});
router.get("/", async (request, response) => {
    try {
        const students = await Student.find({});
        return response.status(200).json(students);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const student = await Student.findById(id);
        return response.status(200).json(student);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
router.put("/:id", async (request, response) => {
    try {
      if (!request.body.positive || !request.body.negative || !request.body.attendance ) {
        return response.status(400).send({
            message: "Send all required fields",
        });
    }
        const { id } = request.params;
        const result = await Student.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).send({ message: "Student Not found" });
        }
        return response
            .status(200)
            .send({ message: "Student updated successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Student.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).send({ message: "Student Not found" });
        }
        return response
            .status(200)
            .send({ message: "Student deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default router;
