import express, { request, response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import { PORT } from "./config.js";
import { Event } from "./models/eventModel.js";
import eventRoute from "./routes/eventRoute.js";
import studentRoute from "./routes/studentRoute.js"
import cors from "cors";

const app = express();
app.use(express.json());
const mongoDBURL = process.env.mongoDBURL;

app.use(cors());
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET","POST","PUT","DELETE"]
// }))

app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("Hello.");
});
app.use("/events", eventRoute);
app.use("/students", studentRoute);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to db.");
        app.listen(PORT, () => {
            console.log("Server is listening...");
        });
    })
    .catch((error) => {
        console.log(error);
        console.log("failed");
    });
