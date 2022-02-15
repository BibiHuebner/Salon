//LMS looks different: const express = require("express");
import express from "express";
import cors from "cors";
// outdated: const bodyParser = require('body-parser');
const cors = require("cors");

// Initialize Backend Server App

const app = express();
//important for deployment:
const port = process.env.PORT || 5000;

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

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
// in package.json: type: module (import express)
