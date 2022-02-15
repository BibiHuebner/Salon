//let's write a test route just to make sure everything is connected correctly.

import express from "express";
//create an instance of the express router by setting it to a variable called "router".

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: "Test route." });
});
//module.exports = router;

export default router;
