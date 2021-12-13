const express = require("express");
const router = express.Router();

const sauces = require("../models/sauces")

router.post("/", (req, res, next) => {
  const Sauces = new sauces({
    ...req.body
  })
  console.log(req.body)
  Sauces.save();
  next();
})
router.get("/", (req, res, next) => {
  res.status(200).json();
})

module.exports = router;