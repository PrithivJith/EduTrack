import express, { request, response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./config.js";
import eventRoute from "./routes/eventRoute.js";
import studentRoute from "./routes/studentRoute.js";
import cors from "cors";
import loginRoute from "./routes/loginRoute.js";
import rateLimiter from "express-rate-limit";


const app = express();
app.use(express.json());
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
const mongoDBURL = process.env.mongoDBURL;

app.use(cors());
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET","POST","PUT","DELETE"]
// }))

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("This is api home.");
});
app.use("/events", eventRoute);
app.use("/students", studentRoute);
app.use("/user", loginRoute);

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
