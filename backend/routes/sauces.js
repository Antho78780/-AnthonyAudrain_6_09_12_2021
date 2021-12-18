const express = require("express");

const router = express.Router();

const controllersSauces = require("../controllers/sauces");

router.get("/sauces" , controllersSauces.sauce);
router.get("/sauces/:id", controllersSauces.sauceId);


module.exports = router;