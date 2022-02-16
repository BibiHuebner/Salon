//let's write a test route just to make sure everything is connected correctly.

import express from "express";
import bookModel from "../models/bookModel.js";
//create an instance of the express router by setting it to a variable called "router".
const router = express.Router();

router.get("/all", (req, res) => {
  //res.send({ msg: "Test route." });
  bookModel.find({}, (err, books) => {
    if (err) {
      res.send(err);
    } else {
      res.send(books);
    }
  });
});
//tested in Postman, it works
// question: on test empty array, does it have to be exact?
// router.get("/Louis", (req, res) => {
//   bookModel.find({ author: "Louis" }, (err, books) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(books);
//     }
//   });
// });

//test works with exact name
router.get("/Louis", (req, res) => {
  bookModel.find({ author: "Édouard Louis" }, (err, books) => {
    if (err) {
      res.send(err);
    } else {
      res.send(books);
    }
  });
});

//module.exports = router;
export default router;
