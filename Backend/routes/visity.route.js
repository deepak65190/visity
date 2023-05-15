const express = require("express");
const { visityModal } = require("../models/visity.modal");
const visityRoute = express.Router();
//get post Route
visityRoute.get("/list", async (req, res) => {
  try {
    const sendData = await visityModal.find();
    res.send(sendData);
  } catch (err) {
    console.log(err.message);
  }
});

//post post Route
visityRoute.post("/form", async (req, res) => {
  try {
    const data = req.body;
    const getData = new visityModal(data);
    await getData.save();
    res.send("form submitted successfully");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
//edit post Route or put data
visityRoute.patch("/editPost/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await visityModal.findByIdAndUpdate({ _id: ID }, payload);
    res.send("post updated successfully");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
//delete post Route
visityRoute.delete("/deletePost/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await visityModal.findByIdAndDelete({ _id: ID });
    res.send("deleted post successfull");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
module.exports = {
  visityRoute,
};
