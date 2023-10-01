import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//cors middlewere for policy error

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     method: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("welcome to MERN Stack");
});

app.use("/books", bookRoutes);

//mongodb connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
