//LMS looks different: const express = require("express");
import express from "express";
import cors from "cors";
import booksRoute from "./routes/books.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

// outdated: const bodyParser = require('body-parser');
//const cors = require("cors");

dotenv.config();

// Initialize Backend Server App

const app = express();
//important for deployment:
const port = process.env.PORT || 5000;

//Connection DB MongoDB
//edit db:  I don't remember how I called my database
mongoose
  .connect(process.env.DB)
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));

//Middleware check npm documentation
//bodyparser: sends data in postrequest
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Cors

app.use(cors());

//Router
app.use("/api/books", booksRoute);

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
// in package.json: type: module (import express)
app.use("/books", require("./routes/books"));
