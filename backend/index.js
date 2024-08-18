import express, { request, response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Event } from "./models/eventModel.js";
import eventRoute from "./routes/eventRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"]
}))

app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("Hello.");
});
app.use("/events", eventRoute);

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
